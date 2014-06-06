Attention Interface
===================

Defines an interface to allow ECAN attention allocation experiments to be written as short Python scripts.

#### Functionality

- Control the steps of each mind agent
- Capture the contents of the attentional focus at each step
- Capture the discrete dynamical evolution of the attentional focus
- Capture the discrete dynamical evolution of the STI of each atom in the attentional focus
- Store the captured data as a timeseries in a CSV file for plotting and analysis (using pandas, matplotlib, SciPy, etc.)

#### Requirements

Requires the REST API to be configured as described here:

http://wiki.opencog.org/w/REST_API#Configuration

#### Example

See the usage example in ```experiment.py```
