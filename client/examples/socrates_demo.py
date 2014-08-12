"""
A demo application to run socrates.py using Python using the visualization
component but neglecting attention allocation (for the moment)

Prerequisites:
    - Requires mongodb to be installed as specified in client/README.md
    - mongodb needs to be started with 'sudo service mongod start'
    - Requires a running CogServer to retrieve the dot representation after
      each inference
    - Requires a running REST API (to be started with 'restapi.Start' in the
      CogServer)

After the inference, the produced images can be viewed with
'gwenview ./timeseries -s'.
"""

import os
import re
from pln.examples.socrates_demo import socrates_agent
from opencog.atomspace import types, AtomSpace, TruthValue
from opencog.scheme_wrapper import load_scm, scheme_eval, scheme_eval_h, __init__
from client import clear_atomspace, scheme, dump_atomspace_dot
from subprocess import check_call

__author__ = 'Sebastian Ruder'

ANALYSIS_FOLDER = os.path.dirname(__file__)

sub_dir = "timeseries"
if not os.path.exists(sub_dir):
    os.makedirs(sub_dir)


#TODO: method should be ported to client.py so it can be reused
#more easily
def render_image(dot, uid):
    """
    Renders a PNG image from a DOT graph description;
    Method copied from attentional_focus_slideshow.py because import didn't
    work properly

    Parameters:

    dot (required) The DOT graph description of the point in time
    uid (required) A unique identifier, which should increment at each time interval
    """
    dot_filename = "{0}-{1:05d}.dot".format(sub_dir, uid)
    png_filename = "{0}-{1:05d}.png".format(sub_dir, uid)

    dot_full_path = os.path.join(ANALYSIS_FOLDER, sub_dir, dot_filename)
    png_full_path = os.path.join(ANALYSIS_FOLDER, sub_dir, png_filename)

    with open(dot_full_path, 'w') as outfile:
        outfile.write(dot)

    # Render the image using Graphviz
    check_call(['dot', '-Tpng', dot_full_path, '-o', png_full_path])
    os.remove(dot_full_path)
    print("\n-- Rendered image {0} --".format(png_filename))

# Parameters
num_steps = 1000
print_starting_contents = True

# Initialization of atomspace and agent
atomspace = AtomSpace()
__init__(atomspace)
agent = socrates_agent.SocratesAgent()

# Preloaded files
coreTypes = "../opencog/atomspace/core_types.scm"
utilities = "../opencog/scm/utilities.scm"
data = "../opencog/python/pln/examples/socrates_demo/socrates-r2l.scm"

for item in [coreTypes, utilities, data]:
    load_scm(atomspace, item)

if print_starting_contents:
    print('AtomSpace starting contents:')
    atomspace.print_list()

# Types of links that should not be visualized
not_visualized_links = [types.ExecutionLink, types.GroundedSchemaNode,
                        types.ListLink, types.VariableNode]
result_found = False
outputs_produced = 0

for i in range(0, num_steps):
    result = agent.run(atomspace)

    output = None
    input = None
    rule = None
    if result is not None:
        atomspace_string = ""
        (rule, input, output) = result
        outputs_produced += 1

        print("\n----- [Output # {0}] -----".format(outputs_produced))
        for j in output:
            print("-- Output:\n{0}".format(j))
        print("-- using production rule: {0}".format(rule.name))
        print("\n-- based on this input:\n{0}".format(input))

        clear_atomspace()
        # visualization filtering
        for atom in atomspace.get_atoms_by_type(types.Atom):
            # links that shouldn't be visualized are skipped
            if atom.type in not_visualized_links:
                continue

            if atom not in [types.ConceptNode, types.PredicateNode]:
                out = [atom1 for atom1 in atomspace.get_outgoing(atom.h)]
                # links involving automatically generated VariableNodes are
                # skipped
                if out and "$pln_var_" in out[0].name:
                    continue
                # check if result is found
                if atom.is_a(types.EvaluationLink):
                    if out[0].is_a(types.PredicateNode)\
                        and "breathe" in out[0].name\
                        and out[1].is_a(types.ListLink)\
                        and "Socrates" in out[1].out[0].name\
                        and "air" in out[1].out[1].name:
                        result_found = True

            atomspace_string += str(atom)
        # the atom uuids are shortened for the visualization
        atomspace_string = re.sub(r"""@..+?(?=\")""", "@X", atomspace_string)

        # The scheme representation is imported in the atomspace, the dot
        # representation is retrieved and the image is rendered
        scheme(atomspace_string)
        dot = dump_atomspace_dot()
        render_image(dot, outputs_produced)

        if result_found:
            print("\n-- Result found! --")
            break
