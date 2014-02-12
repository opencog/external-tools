AtomSpaceSubscriber
===================

AtomSpaceSubscriber contains sample clients for usage with the [AtomSpacePublisherModule](https://github.com/opencog/opencog/tree/master/opencog/persist/zmq/events) that can be extended to monitor the activity of the OpenCog system.

Potential usage examples include: 

- debugging
- monitoring the dynamics of the AttentionAllocation system as it propagates STI and LTI throughout the network
- monitoring PLN
- allowing external modules such as the AtomSpace Visualizer to subscribe to real-time updates

The AtomSpacePublisherModule class publishes AtomSpace change events across the network using [ZeroMQ sockets](http://zeromq.org) to allow for external clients to receive updates from the AtomSpace via a publish/subscribe pattern.

Clients can subscribe to the events by subscribing to a ZeroMQ socket.

Supported events are:

-   add
-   remove
-   tvchanged
-   avchanged

Visit this link for the documentation of the AtomSpacePublisherModule:
https://github.com/opencog/opencog/blob/master/opencog/persist/zmq/events/README.md

