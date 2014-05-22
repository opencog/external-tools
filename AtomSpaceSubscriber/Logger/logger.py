"""
AtomSpace Event Logger

Receives AtomSpace events from the AtomSpacePublisherModule and stores them in
MongoDB for analysis.

Read the included README.md file for installation and usage instructions.
"""

__author__ = 'Cosmo Harrigan'

MONGODB_CONNECTION_STRING = "mongodb://localhost:27017"
CONTROL_IP_ADDRESS = "localhost"

COGSERVER_IP_ADDRESS = '127.0.0.1'
COGSERVER_PORT = '5563'

SUBSCRIPTIONS = ['add', 'remove', 'tvChanged', 'avChanged', 'addAF', 'removeAF']

import zmq
import pymongo
import json
from multiprocessing import Process

# ZeroMQ event loop setup
from zmq.eventloop import ioloop, zmqstream
ioloop.install()


def server(port="5556"):
    """Control process to shut down the client when finished"""
    context = zmq.Context()
    socket = context.socket(zmq.PAIR)
    socket.bind("tcp://*:%s" % port)

    raw_input()
    socket.send("Exit")


def get_command(msg):
    print "Received control command: %s" % msg
    if msg[0] == "Exit":
        print "Received exit command, client will shut down."
        ioloop.IOLoop.instance().stop()


def handler(message):
    print '\nProcessing [' + message[0] + ']'

    try:
        json_message = json.loads(message[1])
        print json.dumps(json_message, indent=4, sort_keys=True)
        id = db[message[0]].insert(json_message)
        print 'Inserted: {0} #{1}'.format(message[0], id)

        if len(message) > 2:
            print 'Alert: message contains more than two frames'
            for item in message:
                print item
    except ValueError, e:
        print 'Caught ValueError: {0}'.format(e.message)
        print 'Length of message array: {0}'.format(len(message))
        print 'Contents:'
        for item in message:
            print item
        raise Exception("Failure")


def atomspace_client(port_push=5556):
    context = zmq.Context()

    # Control setup
    socket_pull = context.socket(zmq.PAIR)
    socket_pull.connect("tcp://" + CONTROL_IP_ADDRESS + ":%s" % port_push)
    stream_pull = zmqstream.ZMQStream(socket_pull)
    stream_pull.on_recv(get_command)
    print 'Connected to control server on port {0}.'.format(port_push)

    socket = context.socket(zmq.SUB)
    socket.set_hwm(1000000)
    socket.connect("tcp://" + COGSERVER_IP_ADDRESS + ":" + COGSERVER_PORT)
    [socket.setsockopt(zmq.SUBSCRIBE, topic) for topic in SUBSCRIPTIONS]

    stream = zmqstream.ZMQStream(socket)
    stream.on_recv(handler)
    print 'Ready to accept messages.'
    ioloop.IOLoop.instance().start()

if __name__ == "__main__":
    MONGODB_DATABASE = 'atomspace_events'
    client = pymongo.MongoClient(MONGODB_CONNECTION_STRING)
    client.drop_database(MONGODB_DATABASE)
    db = client[MONGODB_DATABASE]

    Process(target=atomspace_client).start()
    server()
