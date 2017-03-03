SUMO importer 
==============

The sumo-importer script is used to convert the SUMO logical expressions into Atomse 
representation to import into the atomspace.

 - Run ./sumo-opencog.sh to get clone SUMO and generate the output file.
 - It takes a few minute to convert all.
 - When it finish, you will get sumo directory with a bunch of kif files and Output sub directory,
 - The output directory (sumo/output/) contains the atomse representations of each kif files.

TODO lists:

A bit more of a transformation, we need to end up with something that is more transparent for OpenCog algorithms like PLN to deal with.

Improvements we discussed are:

1. Change the predicate-argument format to be frame-based, like in the output of the Lojban parser

2. where we have (instance x y), make sure that as well as (Inheritance x y) we also have (Inheritance x Definite) to indicate that x is a specific entity

3. make sure the temporal and spatial relations in SUMO are represented in a manner consistent with the Allen Interval Algebra (for time) and Region Connection Calculus (for space), as in the spatial and temporal inference code that Jade and Keyvan wrote for use with the old python PLN …

4. Replace ExecutionLink with ExecutionOutputLink for the SUMO terms ending in “Fn”

5. attribute = IntensionalInheritance

6. Apply SimultaneousImplication for some expressions like,

	(instance ?X OrganismRemains)
	(holdsDuring (WhenFn ?X) (attribute ?X Dead))) 
might be nicely translated as
	SimultaneousImplication
	    Inheritance $X OrganismRemains
	    IntensionalInheritance $X Dead

