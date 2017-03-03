## AtomSpace Event Logger

Receives AtomSpace events from the AtomSpacePublisherModule and stores them in MongoDB for analysis

Currently used for analyzing the ECAN Attention Allocation system

### Instructions

1. Install prerequisites:

    ```
    sudo pip install tornado pyzmq pymongo
    ```

2. Configure a MongoDB server:

    http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/

3. Ensure that the OpenCog event publisher is enabled. Follow the instructions [here](https://github.com/opencog/opencog/blob/master/opencog/cogserver/modules/events/README.md).

4. Configure the following parameters (optional):

    (All of these should work properly with the default settings if you have a default configuration)

    - Set MONGODB_CONNECTION_STRING for your MongoDB server (default configuration is on localhost)
    - Set COGSERVER_IP_ADDRESS and COGSERVER_PORT for the AtomSpacePublisher module in the CogServer
    - Set SUBSCRIPTIONS to the list of topics that you want to store

### Logging

Start the logger:

```
python logger.py
```

Now you can perform operations in the cogserver, and the change events will be recorded.

Every time the logger starts, it clears the MongoDB log history by default.

To exit the logger, press 'Enter'.

### Log Analysis

After collecting a log session, you can use a MongoDB client to query the logs.

Suggested client:

http://robomongo.org/

Example query:

```
db.tvChanged.find({
  "tvNew.details.strength": {"$gt": 0},
  "tvNew.details.confidence": {"$gt": 0},
  "atom.type": "EvaluationLink",
  "tvOld.details.confidence": {"$gt": 0},
  "tvOld.details.strength": {"$ne": "tvNew.details.strength"}
})
```

### Sample

Sample log status message when an event is recorded:

```
Processing [add]
{
    "atom": {
        "attentionvalue": {
            "lti": 0,
            "sti": 0,
            "vlti": false
        },
        "handle": "6367",
        "incoming": [],
        "name": "",
        "outgoing": [
            "921",
            "4887"
        ],
        "truthvalue": {
            "details": {
                "confidence": 0,
                "count": 0,
                "strength": 1
            },
            "type": "simple"
        },
        "type": "AsymmetricHebbianLink"
    },
    "timestamp": 1400741897
}
Inserted: add #537da00bc942244972e727a7
```

The event is then inserted into the MongoDB collection for later analysis.
