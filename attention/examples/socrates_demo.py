"""
For running socrates_agent.py without the cogserver
Requires mongodb to be installed as specified in attention/README.md
mongodb needs to be started with 'sudo service mongod start'
"""

import os
from pln.examples.socrates_demo import socrates_agent
from opencog.atomspace import types, AtomSpace, TruthValue
from opencog.scheme_wrapper import load_scm, scheme_eval, scheme_eval_h, __init__
from attentional_focus_slideshow import render_image
from attention_interface import clear_atomspace, scheme, dump_atomspace_dot

__author__ = 'Cosmo Harrigan, Sebastian Ruder'

ANALYSIS_FOLDER = os.path.dirname(__file__)

sub_dir = "timeseries"
if not os.path.exists(sub_dir):
    os.makedirs(sub_dir)

# client = pymongo.MongoClient(MONGODB_CONNECTION_STRING)
# mongo = client[MONGODB_DATABASE]
#
# points = mongo['points']

atomspace = AtomSpace()
__init__(atomspace)

coreTypes = "../opencog/atomspace/core_types.scm"
utilities = "../opencog/scm/utilities.scm"
data = "../opencog/python/pln/examples/socrates_demo/socrates-r2l.scm"

num_steps = 1000
print_starting_contents = True

for item in [coreTypes, utilities, data]:
    load_scm(atomspace, item)

agent = socrates_agent.SocratesAgent()

if print_starting_contents:
    print('AtomSpace starting contents:')
    atomspace.print_list()

outputs_produced = 0

for i in range(0, num_steps):
    result = agent.run(atomspace)

    output = None
    input = None
    rule = None
    if result is not None:
        (rule, input, output) = result
        outputs_produced += 1

        print("\n----- [Output # {0}] -----".format(outputs_produced))
        for j in output:
            print("-- Output:\n{0}".format(j))
        print("-- using production rule: {0}".format(rule.name))
        print("\n-- based on this input:\n{0}".format(input))

        clear_atomspace()
        scheme(atomspace.get_atoms_by_type(types.Atom))
        dot = dump_atomspace_dot()

        render_image(dot, outputs_produced, ANALYSIS_FOLDER, sub_dir)
