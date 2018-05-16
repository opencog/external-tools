#!/usr/bin/env python3

# Takes a SUO-kif file in argument and generate a file associating
# each SUMO instance to an atom type. Each line is formatted as
# followed
#
# <instance-name> <atom-type>

import sys
import copy
import kifparser
from collections import defaultdict
from opencog.atomspace import AtomSpace, TruthValue, types

# Given a s-expression (already decomposed in a list)
#
# (instance <instance-name> <class-name>)
#
# return the pair (<instance-name>, <class-name>)
def extract_instance_and_class(s_expr):
    instance_name = s_expr[1]
    if isinstance(instance_name, str):
        class_name = s_expr[2]
        if isinstance(class_name, str):
            return (instance_name, class_name)
    return None

def gen_instance2classes(s_exprs):
    instance2classes = defaultdict(lambda: set())
    for s_expr in s_exprs:
        if s_expr[0] == 'instance':
            ic = extract_instance_and_class(s_expr)
            if ic:
                instance2classes[ic[0]].add(ic[1])
    return instance2classes

# Given a s-expression (already decomposed in a list)
#
# (subrelation <instance-name-1> <instance-name-2>)
#
# return the pair (<instance-name-1>, <instance-name-2>)
def extract_subrelation(s_expr):
    instance_name_1 = s_expr[1]
    instance_name_2 = s_expr[2]
    return (instance_name_1, instance_name_2)

def gen_subrelations(s_exprs):
    subrelations = defaultdict(lambda: set())
    for s_expr in s_exprs:
        if s_expr[0] == 'subrelation':
            sr = extract_subrelation(s_expr)
            if sr:
                subrelations[sr[0]].add(sr[1])
    return subrelations

def calculate_i2c_closure(instance2classes, subrelations):
    # Put all super instances classes in the set of instances classes
    new_instance2classes = copy.deepcopy(instance2classes)
    for instance in subrelations:
        for superinstance in subrelations[instance]:
            if superinstance in instance2classes:
                new_instance2classes[instance].update(instance2classes[superinstance])

    # If nothing has changed then the closure is complete
    if new_instance2classes == instance2classes:
        return new_instance2classes

    # Otherwise re-iterate
    return calculate_i2c_closure(new_instance2classes, subrelations)

def classes2atomtype(instance, classes):
    for cl in classes:
        if cl.endswith("Predicate") \
           or (cl.endswith("Relation") and not instance.endswith("Fn")):
            return "PredicateNode"
        if cl.endswith("Function") or instance.endswith("Fn"):
            return "SchemaNode"
    return "ConceptNode"

def output_instance2atomtype(instance2classes):
    for instance in instance2classes:
        print(instance, classes2atomtype(instance, instance2classes[instance]))

if __name__ == '__main__':
    # Turn the kif file into a list of s-expressions
    s_exprs = []
    for i in range(1, len(sys.argv)):
        s_exprs.extend(kifparser.parse_kif_file(sys.argv[i]))

    # Associate each instance to its SUMO classes
    instance2classes = gen_instance2classes(s_exprs)

    # Associate each instance to its super-instance. Properties are
    # transfered by subrelation
    subrelations = gen_subrelations(s_exprs)

    # Calculate the instance2classes closure by subrelation
    instance2classes = calculate_i2c_closure(instance2classes, subrelations)

    # Determine the correct atom type given instance2classes
    output_instance2atomtype(instance2classes)
