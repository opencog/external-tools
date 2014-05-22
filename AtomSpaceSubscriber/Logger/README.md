## AtomSpace Event Logger

Receives AtomSpace events from the AtomSpacePublisherModule and stores them in MongoDB for analysis

Currently used for analyzing the ECAN Attention Allocation system

Read the included README.md for installation and usage instructions

### Instructions:

1. Install prerequisites:

    ```
    sudo pip install tornado
    sudo pip install pyzmq
    sudo pip install pymongo
    ```

2. Configure a MongoDB server:

    http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/

3. Configure the following parameters:

    - Set MONGODB_CONNECTION_STRING for your MongoDB server (default configuration is on localhost)
    - Set COGSERVER_IP_ADDRESS and COGSERVER_PORT for the AtomSpacePublisher module in the CogServer
    - Set SUBSCRIPTIONS to the list of topics that you want to store

### Logging

Start the logger:

```
python logger.py
```

Every time the logger starts, it clears the MongoDB log history by default.

To exit the logger, press 'Enter'.

### Log analysis

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