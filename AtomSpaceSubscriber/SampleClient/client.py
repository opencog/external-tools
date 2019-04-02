# Sample Python client for AtomSpacePublisherModule
#
# Prerequisite:
#   sudo pip install pyzmq
#   python client.py
#
# For use with this module:
#   https://github.com/opencog/opencog/tree/master/opencog/persist/zmq/events
 
__author__ = 'Cosmo Harrigan'
 
IP_ADDRESS = '127.0.0.1'
PORT = '5563'
 
import zmq
 
def main():
    # Prepare the context and subscriber
    context = zmq.Context(1)
    subscriber = context.socket(zmq.SUB)
    subscriber.set_hwm(1000000)
    subscriber.connect("tcp://" + IP_ADDRESS + ":" + PORT)
    subscriber.setsockopt(zmq.SUBSCRIBE, b"add")
    subscriber.setsockopt(zmq.SUBSCRIBE, b"remove")
    subscriber.setsockopt(zmq.SUBSCRIBE, b"tvChanged")
    subscriber.setsockopt(zmq.SUBSCRIBE, b"avChanged")
    subscriber.setsockopt(zmq.SUBSCRIBE, b"addAF")
    subscriber.setsockopt(zmq.SUBSCRIBE, b"removeAF")    

    while True:
        # Read envelope with address
        [address, contents] = subscriber.recv_multipart()
        print("[%s] %s" % (address, contents))
 
    # We never get here but clean up anyhow
    subscriber.close()
    context.term()
 
if __name__ == "__main__":
    main()
