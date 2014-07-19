"""
An adaptation of the interface defined in client.py to the Socrates demo
"""

__author__ = 'Sebastian Ruder'

from client.client import *
from opencog.atomspace import AtomSpace, types
from opencog.scheme_wrapper import __init__, load_scm

data = ["opencog/atomspace/core_types.scm",
        "opencog/scm/utilities.scm",
        "opencog/python/pln/examples/attentionallocation/atomspace.log"]

# Configurable parameters:
num_steps = 2                            # Number of time steps
output_filename = 'ecan-timeseries.csv'   # Output filename

path = "../opencog/python/pln/examples/attentionallocation/" \
       "socrates_attention_agent"
name = "SocratesAgent"

clear_atomspace()
set_af_boundary(5)

stop_agent_loop()

load_python_agent(path)
start_python_agent(path, name)

load_scheme_files(["python/pln/examples/attentionallocation" +
                   "/socrates-attention-node-av.scm"])

# no query to be defined

timeseries = []  # list of timesteps
atomspace_series = []  # list of atomspaces pertaining to each timestep

atomspace = AtomSpace()
__init__(atomspace)

for t in range(0, num_steps):
    point_in_time = get_attentional_focus(timestep=t, scheme=True)
    timeseries.append(point_in_time)

    with open("../../../opencog/opencog/python/pln/examples/attentionallocation/atomspace.log", "w") as log:
        log.write(dump_atomspace_scheme())
    for item in data:
        load_scm(atomspace, item)

    atomspace_series.append(atomspace)

    importance_diffusion()
    importance_updating()
    step_python_agent(path, name)

    print "------------------------------------------------------\n"\
          "{0}\n".format(point_in_time)

    #print(dump_atomspace_scheme())
    print(dump_attentional_focus_scheme())

current_atoms = []
timestep_count = 0
for atomspace in atomspace_series:

    atoms = [atom for atom in atomspace.get_atoms_by_type(types.Atom)
             if atom not in current_atoms
             and not atom.type in (types.ConceptNode, types.PredicateNode,
                                   types.VariableNode, types.ListLink)]
    current_atoms.append(atoms)

    print("Timestep: {0}; additional atoms:".format(timestep_count))
    for atom in atoms:
        print(atom)
    print("\n")
    timestep_count += 1

export_timeseries_csv(timeseries, output_filename, scheme=True)
