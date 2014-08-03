OpenCog Python Scripting Interface
==================================

Defines an interface to allow OpenCog experiments to be written as short Python scripts.

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

The attention_interface API has docstrings for each method that describe correct usage. A summary of the available methods is presented below.

##### OpenCog Python Scripting Interface API

###### create_point(timestep, atoms, scheme=None)
    Create a PointInTime dictionary from a JSON atom representation

    Represents a discrete point in time in a time series from an experiment
    with the ECAN attention allocation discrete dynamical system

    Each point in time contains:

    - a list of "atoms" which consists of a list of objects of type Atom
      (Refer to the definition of the Atom object)
    - an integer "timestep"
    - (optional) A Scheme representation of the point in time

###### shell(command)
    Send a command to the CogServer shell

###### scheme(command)
    Send a Scheme command to the Scheme interpreter

###### load_scheme_files(files)
    Loads a list of Scheme files into the cogserver

###### load_python_agent(path)
    Load an arbitrary Python MindAgent in the CogServer

    Parameters:
    path (required) Relative path to the agent, including the filename,
      without the file extension

    Example of 'path':
      ../opencog/python/pln/examples/tuffy/smokes/smokes_agent
    
###### start_python_agent(path, name)
    Start a Python MindAgent that has already been loaded

    Parameters:
    path (required) Relative path to the agent, including the filename,
      without the file extension

    Example of 'path':
      ../opencog/python/pln/examples/tuffy/smokes/smokes_agent

    name (required) Name of the agent

    Example of 'name':
      InferenceAgent

###### step_agent(name)
    Run a step of an arbitrary C++ agent in the CogServer

    Parameters:
    name (required) Name of the agent

    Example of 'name':
      SimpleImportanceDiffusionAgent

###### step_python_agent(path, name)
    Run a step of an arbitrary Python agent in the CogServer

    Parameters:
    path (required) Relative path to the agent, including the filename,
      without the file extension
    name (required) Name of the agent

    Example of 'path':
      ../opencog/python/pln/examples/tuffy/smokes/smokes_agent
    Example of 'name':
      InferenceAgent

###### get_attentional_focus(timestep, scheme=False)
    Get the atoms in the attentional focus

    Parameters:
    timestep (required) You should provide a monotonically increasing timestep
      value to uniquely identify the timestep of this attentional focus
      snapshot.
    scheme (optional) If True, the Scheme representation of the attentional
      focus will also be captured. Default is False.

###### get_atomspace(timestep, scheme=False)
    Take a snapshot of the atomspace at a given point in time

    :param timestep: an integer representing a monotonically increasing
    timestep value which identifies the timestep of this atomspace snapshot
    :param scheme: If True, the Scheme representation of the atomspace will
    also be captured.
    :return: a PointInTime dictionary that captures the atomspace at the given
    timestep

###### export_timeseries_csv(timeseries, filename, scheme=False)
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

###### export_timeseries_mongodb(timeseries)
    Export the timeseries to a MongoDB database.

    Parameters:
    timeseries (required) The timeseries that will be exported.
    
###### dump_atomspace_scheme()
    Returns all atoms in the atomspace in Scheme format
    
###### dump_atomspace_dot()
    Returns all atoms in the atomspace in DOT graph description language
    format
    
###### dump_attentional_focus_scheme()
    Returns all atoms in the attentional focus in Scheme format

###### clear_atomspace()
    Clear the atomspace

###### stop_agent_loop()
    Stop the automatic stepping of agents in the CogServer, so that agents
    can be stepped manually
    
###### set_af_boundary(value)
    Set the AttentionalFocusBoundary

    Parameters:
    value The STI value to set the AttentionalFocusBoundary to

###### importance_diffusion()
    Run a step of the simple importance diffusion agent

###### importance_updating()
    Run a step of the importance updating agent
    
###### hebbian_updating()
    Run a step of the hebbian updating agent

###### forgetting()
    Run a step of the forgetting agent

###### clear_mongodb()

###### set_diffusion_percent(value)
    Sets the diffusion percentage parameter for the importance diffusion agent
    value is a probability value between 0 and 1 representing the percentage
    of an atom's STI that should be diffused at each step

###### set_stimulus_amount(value)
    Sets the stimulus amount parameter for the PLN reasoning agent
    Integer value representing the amount of stimulus to be assigned to the target

###### class Atom(object)
    Stores an atom handle and an STI value

    Represents the STI value of an atom at a particular point in time.
    Intended to be contained in a PointInTime object with a timestep value.

