AtomSpaceSubscriber
===================

AtomSpaceSubscriber contains sample clients for usage with the [AtomSpacePublisherModule](https://github.com/opencog/opencog/blob/master/opencog/cogserver/modules/events) that can be extended to monitor the activity of the OpenCog system.

##### Potential usage examples:

- Debugging
- Monitoring the dynamics of the AttentionAllocation system as it propagates STI and LTI throughout the network and the AttentionalFocus changes
- Monitoring PLN
- Allowing external modules such as the AtomSpace Visualizer to subscribe to real-time updates

The AtomSpacePublisherModule class publishes AtomSpace change events across the network using [ZeroMQ sockets](http://zeromq.org) to allow for external clients to receive updates from the AtomSpace via a publish/subscribe pattern.

Clients can subscribe to the events by subscribing to a ZeroMQ socket.

##### Supported events:

*   **add**        (Atom added)
*   **remove**     (Atom removed)
*   **tvChanged**  (Atom TruthValue changed)
*   **avChanged**  (Atom AttentionValue changed)
*   **addAF**      (Atom was added to the AttentionalFocus)
*   **removeAF**   (Atom was removed from the AttentionalFocus)

The documentation of the AtomSpacePublisherModule is [here](https://github.com/opencog/opencog/blob/master/opencog/cogserver/modules/events/README.md).
