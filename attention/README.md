Attention Interface
===================

Defines an interface to allow ECAN attention allocation experiments to be written as short Python scripts.

#### Functionality

- Control the steps of each mind agent
- Capture the contents of the attentional focus at each step in Scheme format
- Capture the discrete dynamical evolution of the attentional focus
- Capture the discrete dynamical evolution of the STI of each atom in the attentional focus
- Store the captured data as a timeseries in a CSV file for plotting and analysis (using pandas, matplotlib, SciPy, etc.)
- Render the captured data as a sequence of graphical visualizations of the attentional focus

#### Requirements

- Requires the REST API to be configured as described here:

    http://wiki.opencog.org/w/REST_API#Configuration

    The REST API must be started before using this interface.

- Requires the requests library:

    http://docs.python-requests.org/en/latest/user/install/#install

- Requires the PyMongo library:

    http://api.mongodb.org/python/current/installation.html

- Requires MongoDB:

    http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/

#### Example

See the usage example in ```example.py```

See an example visualization of the attentional focus dynamics as a slideshow of PNG images rendered from DOT representations in ```attentional_focus_slideshow.py```

#### Documentation

The attention_interface API has docstrings for each method that describe correct usage.
