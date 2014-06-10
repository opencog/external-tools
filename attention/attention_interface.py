"""
Defines an interface to allow ECAN attention allocation experiments to be
written as short Python scripts.

See README.md for documentation and instructions.
"""

__author__ = 'Cosmo Harrigan'

from requests import *
import json
import csv
from os.path import expanduser

# Configure the OpenCog REST API client
IP_ADDRESS = '127.0.0.1'
PORT = '5000'
uri = 'http://' + IP_ADDRESS + ':' + PORT + '/api/v1.1/'
headers = {'content-type': 'application/json'}

# Configure the path of the OpenCog source folder relative to the user's
# home directory
OPENCOG_SOURCE_FOLDER = expanduser("~") + "/opencog/opencog/"


class PointInTime(object):
    """
    Represents a discrete point in time in a time series from an experiment
    with the ECAN attention allocation discrete dynamical system

    Each point in time contains:

    - a list of "atoms" which consists of a list of objects of type Atom
      (Refer to the definition of the Atom object)
    - an integer "timestep"
    - (optional) A Scheme representation of the point in time
    """
    def __init__(self, timestep):
        self.atoms = []
        self.timestep = timestep
        self.scheme = None

    def __str__(self):
        output = ""
        counter = 0

        output += "; Time: {0}\n".format(self.timestep)

        for atom in self.atoms:
            counter += 1
            output += "; Handle: {0} STI: {1}".\
                format(atom.handle, atom.sti)
            output += "\n"

        if self.scheme is not None:
            output += "; Scheme:\n"
            output += self.scheme

        return output


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
    Create a PointInTime object from a JSON atom representation
    """
    point = PointInTime(timestep)

    for atom in atoms:
        data = Atom()
        data.handle = atom['handle']
        data.sti = atom['attentionvalue']['sti']
        point.atoms.append(data)

    if scheme is not None:
        point.scheme = scheme

    return point


def shell(command):
    """
    Send a command to the CogServer shell
    """
    data = {'command': command + '\n'}

    post(uri + 'shell', data=json.dumps(data), headers=headers)


def scheme(command):
    """
    Send a Scheme command to the Scheme interpreter
    """
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
            for atom in point.atoms:
                if point.scheme is not None and scheme is True:
                    writer.writerow(
                        [point.timestep, atom.handle, atom.sti, point.scheme])
                else:
                    writer.writerow(
                        [point.timestep, atom.handle, atom.sti])


def export_timeseries_mongodb(timeseries, db, collection_name):
    """
    Export the timeseries to a MongoDB database.

    Parameters:
    timeseries (required) The timeseries that will be exported.
    db (required) A MongoDB database object to export to
    collection_name (required) The collection name to insert documents into

    Note: Not yet implemented
    """
    pass


def dump_atomspace_scheme():
    """
    Returns all atoms in the atomspace in Scheme format
    """
    return scheme("(cog-prt-atomspace)")


def dump_attentional_focus_scheme():
    """
    Returns all atoms in the attentional focus in Scheme format
    """
    return scheme("(cog-af)")


def clear_atomspace():
    scheme("(clear)")


def importance_diffusion():
    """
    Run a step of the simple importance diffusion agent
    """
    shell("agents-step opencog::SimpleImportanceDiffusionAgent")


def importance_spreading():
    """
    Run a step of the importance spreading agent
    """
    shell("agents-step opencog::ImportanceSpreadingAgent")


def hebbian_updating():
    """
    Run a step of the hebbian updating agent
    """
    shell("agents-step opencog::HebbianUpdatingAgent")


def forgetting():
    """
    Run a step of the forgetting agent
    """
    shell("agents-step opencog::ForgettingAgent")
