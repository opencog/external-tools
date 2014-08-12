"""
Defines an interface to allow ECAN attention allocation experiments to be
written as short Python scripts.

See README.md for documentation and instructions.
"""

__author__ = 'Cosmo Harrigan'

from configuration import *
import os
from subprocess import check_call, Popen

# MongoDB needs to be started with 'sudo service mongod start'
# If MongoDB refuses to start, e.g. after a recent crash, check the log at
# /var/log/mongodb/mongodb.log. This may be due to an old lock file which can
# be easily removed with "rm /var/lib/mongodb/mongod.lock"

# Create a MongoDB connection
client = pymongo.MongoClient(MONGODB_CONNECTION_STRING)
mongo = client[MONGODB_DATABASE]


def clear_mongodb():
    client.drop_database(MONGODB_DATABASE)
    mongo = client[MONGODB_DATABASE]


class Atom(object):
    """
    Stores an atom handle and an STI value

    Represents the STI value of an atom at a particular point in time.
    Intended to be contained in a PointInTime object with a timestep value.
    """
    def __init__(self):
        self.handle = None
        self.sti = None


def create_point(timestep, atoms, scheme=None):
    """
    Create a PointInTime dictionary from a JSON atom representation

    Represents a discrete point in time in a time series from an experiment
    with the ECAN attention allocation discrete dynamical system

    Each point in time contains:

    - a list of "atoms" which consists of a list of objects of type Atom
      (Refer to the definition of the Atom object)
    - an integer "timestep"
    - (optional) A Scheme representation of the point in time
    """

    atom_list = []

    for atom in atoms:
        data = {
            'handle': atom['handle'],
            'sti': atom['attentionvalue']['sti']
        }
        atom_list.append(data)

    point = {
        'timestep': timestep,
        'atoms': atom_list,
        'scheme': scheme
    }

    return point


def _pause():
    """
    As recorded in issue #859:
    https://github.com/opencog/opencog/issues/859

    the CogServer throws a segmentation fault if repeated requests are made
    without rate limiting them. Once that issue has been addressed, this
    method should not be used anymore.
    """
    sleep(.5)


def shell(command):
    """
    Send a command to the CogServer shell
    """
    _pause()

    data = {'command': command + '\n'}

    post(uri + 'shell', data=json.dumps(data), headers=headers)


def scheme(command):
    """
    Send a Scheme command to the Scheme interpreter
    """
    _pause()

    data = {'command': command + '\n'}

    result = post(uri + 'scheme', data=json.dumps(data), headers=headers)
    return result.json()['response']


def load_scheme_files(files):
    """
    Loads a list of Scheme files into the cogserver
    """
    for datafile in files:
        command = "(load-scm-from-file \"" + \
                  OPENCOG_SOURCE_FOLDER + datafile + "\")"
        scheme(command)


def load_python_agent(path):
    """
    Load an arbitrary Python MindAgent in the CogServer

    Parameters:
    path (required) Relative path to the agent, including the filename,
      without the file extension

    Example of 'path':
      ../opencog/python/pln/examples/tuffy/smokes/smokes_agent
    """
    arg = "loadpy {0}".format(path)
    shell(arg)


def start_python_agent(path, name):
    """
    Start a Python MindAgent that has already been loaded

    Parameters:
    path (required) Relative path to the agent, including the filename,
      without the file extension

    Example of 'path':
      ../opencog/python/pln/examples/tuffy/smokes/smokes_agent

    name (required) Name of the agent

    Example of 'name':
      InferenceAgent
    """
    arg = "agents-start {0}.{1}".format(path, name)
    shell(arg)


def step_agent(name):
    """
    Run a step of an arbitrary C++ agent in the CogServer

    Parameters:
    name (required) Name of the agent

    Example of 'name':
      SimpleImportanceDiffusionAgent
    """
    arg = "agents-step opencog::{0}".format(name)
    shell(arg)


def step_python_agent(path, name):
    """
    Run a step of an arbitrary Python agent in the CogServer

    Parameters:
    path (required) Relative path to the agent, including the filename,
      without the file extension
    name (required) Name of the agent

    Example of 'path':
      ../opencog/python/pln/examples/tuffy/smokes/smokes_agent
    Example of 'name':
      InferenceAgent
    """
    arg = "agents-step opencog::PyMindAgent({0}.{1})".format(path, name)
    shell(arg)


def get_attentional_focus(timestep, scheme=False):
    """
    Get the atoms in the attentional focus

    Parameters:
    timestep (required) You should provide a monotonically increasing timestep
      value to uniquely identify the timestep of this attentional focus
      snapshot.
    scheme (optional) If True, the Scheme representation of the attentional
      focus will also be captured. Default is False.
    """
    get_response = get(uri + 'atoms?filterby=attentionalfocus')
    get_result = get_response.json()['result']['atoms']

    if not scheme:
        return create_point(timestep, get_result)
    else:
        af_contents = dump_attentional_focus_scheme()
        return create_point(timestep, get_result, scheme=af_contents)


def get_atomspace(timestep, scheme=False):
    """
    Take a snapshot of the atomspace at a given point in time

    :param timestep: an integer representing a monotonically increasing
    timestep value which identifies the timestep of this atomspace snapshot
    :param scheme: If True, the Scheme representation of the atomspace will
    also be captured.
    :return: a PointInTime dictionary that captures the atomspace at the given
    timestep
    """
    get_response = get(uri + 'atoms')
    get_result = get_response.json()['result']['atoms']

    if not scheme:
        return create_point(timestep, get_result)
    else:
        atomspace_contents = dump_atomspace_scheme()
        return create_point(timestep, get_result, scheme=atomspace_contents)


def export_timeseries_csv(timeseries, filename, scheme=False):
    """
    Export the timeseries to a CSV file.

    Parameters:
    timeseries (required) The timeseries that will be exported.
    filename (required) The name of the file that will be written to.
    scheme (optional) If True, the full Scheme representation of the point in
      in time will be included with each row. Defaults to False.

    Format:
    time, handle, sti

    If the timeseries contains a Scheme representation, the format is:
      time, handle, sti, scheme
    """
    with open(filename, 'wb') as csvfile:
        writer = csv.writer(csvfile, delimiter=',')
        for point in timeseries:
            for atom in point['atoms']:
                if point['scheme'] is not None and scheme is True:
                    writer.writerow([point['timestep'],
                                     atom['handle'],
                                     atom['sti'],
                                     point['scheme']])
                else:
                    writer.writerow([point['timestep'],
                                     atom['handle'],
                                     atom['sti']])


def export_timeseries_mongodb(timeseries):
    """
    Export the timeseries to a MongoDB database.

    Parameters:
    timeseries (required) The timeseries that will be exported.
    """
    clear_mongodb()
    mongo['points'].insert(timeseries)


def dump_atomspace_scheme():
    """
    Returns all atoms in the atomspace in Scheme format
    """
    return scheme("(cog-prt-atomspace)")


def dump_atomspace_dot():
    """
    Returns all atoms in the atomspace in DOT graph description language
    format
    """
    get_response = get(uri + 'atoms?dot=True')
    get_result = get_response.json()['result']
    return get_result


def dump_attentional_focus_scheme():
    """
    Returns all atoms in the attentional focus in Scheme format
    """
    return scheme("(cog-af)")


def clear_atomspace():
    """
    Clear the atomspace
    """
    scheme("(clear)")


def stop_agent_loop():
    """
    Stop the automatic stepping of agents in the CogServer, so that agents
    can be stepped manually
    """
    shell("agents-stop-loop")


def set_af_boundary(value):
    """
    Set the AttentionalFocusBoundary

    Parameters:
    value The STI value to set the AttentionalFocusBoundary to
    """
    arg = "(cog-set-af-boundary! {0})".format(value)
    scheme(arg)


def importance_diffusion():
    """
    Run a step of the simple importance diffusion agent
    """
    step_agent("SimpleImportanceDiffusionAgent")


def importance_updating():
    """
    Run a step of the importance updating agent
    """
    step_agent("ImportanceUpdatingAgent")


def hebbian_updating():
    """
    Run a step of the hebbian updating agent
    """
    step_agent("HebbianUpdatingAgent")


def forgetting():
    """
    Run a step of the forgetting agent
    """
    step_agent("ForgettingAgent")


def set_diffusion_percent(value):
    """
    Sets the diffusion percentage parameter for the attention allocation
    importance diffusion agent
    :param value: Probability value between 0 and 1 representing the percentage
    of an atom's STI that should be diffused at each step
    """
    scheme('(EvaluationLink (PredicateNode "CONFIG-DiffusionPercent") '
           '(ListLink (NumberNode "{0}")))'.format(value))


def set_stimulus_amount(value):
    """
    Sets the stimulus amount parameter for the PLN reasoning agent
    :param value: Integer value representing the amount of stimulus to be
    assigned to the target
    """
    scheme('(EvaluationLink (PredicateNode "CONFIG-StimulusAmount") (ListLink '
           '(NumberNode "{0}")))'.format(value))


def set_rent(value):
    """
    Sets the rent parameter for the attention allocation importance updating
    agent
    :param value: Integer value representing the amount of stimulus to be
    assigned to the target
    """
    scheme('(EvaluationLink (PredicateNode "CONFIG-Rent") (ListLink '
           '(NumberNode "{0}")))'.format(value))


def set_wages(value):
    """
    Sets the wages parameter for the attention allocation importance updating
    agent
    :param value: Integer value representing the amount of stimulus to be
    assigned to the target
    """
    scheme('(EvaluationLink (PredicateNode "CONFIG-Wages") (ListLink '
           '(NumberNode "{0}")))'.format(value))


def run_opencog_daemon():
    """
    Bootstraps the OpenCog CogServer daemon so that it will run in the
     background with the REST API so that further commands can be issued by
     sending them to the REST API
    """
    # Start the OpenCog CogServer daemon
    os.chdir(OPENCOG_SUBFOLDER)
    Popen([OPENCOG_COGSERVER_START])
    sleep(OPENCOG_INIT_DELAY)

    # Start the REST API so that further commands can be issued using it
    os.system(OPENCOG_RESTAPI_START)


def terminate_opencog_daemon():
    """
    Terminate the OpenCog CogServer daemon
    """
    # CogServer doesn't terminate cleanly when running REST API process. When
    # fixed, change this to a much friendlier mechanism
    os.system('pkill cogserver')
    sleep(OPENCOG_INIT_DELAY)
