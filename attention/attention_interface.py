"""
Defines an interface to allow ECAN attention allocation experiments to be
written as short Python scripts.

See README.md for documentation and instructions.
"""

__author__ = 'Cosmo Harrigan'

from requests import *
import json
import csv

# Configure the OpenCog REST API client
IP_ADDRESS = '127.0.0.1'
PORT = '5000'
uri = 'http://' + IP_ADDRESS + ':' + PORT + '/api/v1.1/'
headers = {'content-type': 'application/json'}


class PointInTime(object):
    """
    Represents a discrete point in time in a time series from an experiment
    with the ECAN attention allocation discrete dynamical system

    Each point in time contains:

    - a list of "atoms" which consists of a list of objects of type Atom
      (Refer to the definition of the Atom object)
    - an integer "timestep"
    """
    def __init__(self):
        self.atoms = []
        self.timestep = None

    def __str__(self):
        output = ""
        length = len(self.atoms)
        counter = 0

        for atom in self.atoms:
            counter += 1
            output += "Time: {0} Handle: {1} STI: {2}".\
                format(self.timestep, atom.handle, atom.sti)
            if counter != length:
                output += "\n"

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


def create_point(atoms):
    """
    Display the STI of an atom
    """
    point = PointInTime()
    for atom in atoms:
        data = Atom()
        data.handle = atom['handle']
        data.sti = atom['attentionvalue']['sti']
        point.atoms.append(data)

    return point


def oc(command):
    """
    Send a command to the CogServer shell
    """
    data = {'command': command + '\n'}

    post(uri + 'shell', data=json.dumps(data), headers=headers)


def get_attentional_focus():
    """
    Get the atoms in the attentional focus
    """
    get_response = get(uri + 'atoms?filterBy=af')
    get_result = get_response.json()['result']['atoms']
    return create_point(get_result)


def importance_diffusion():
    """
    Run the simple importance diffusion agent
    """
    oc("agents-step opencog::SimpleImportanceDiffusionAgent")


def write_timeseries(timeseries, filename):
    with open(filename, 'wb') as csvfile:
        writer = csv.writer(csvfile, delimiter=',')
        for point in timeseries:
            for atom in point.atoms:
                writer.writerow([point.timestep, atom.handle, atom.sti])
