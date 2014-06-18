"""
Configuration settings for the interface applications

See README.md for documentation and instructions.
"""

__author__ = 'Cosmo Harrigan'

from requests import *
import json
import csv
import pymongo
from os.path import expanduser
from time import sleep

# Configure the OpenCog REST API client
IP_ADDRESS = '127.0.0.1'
PORT = '5000'
uri = 'http://' + IP_ADDRESS + ':' + PORT + '/api/v1.1/'
headers = {'content-type': 'application/json'}

# Configure the path of the OpenCog source folder relative to the user's
# home directory
OPENCOG_SOURCE_FOLDER = expanduser("~") + "/opencog/opencog/"

# Configure MongoDB parameters
MONGODB_CONNECTION_STRING = "mongodb://localhost:27017"
MONGODB_DATABASE = 'attention-timeseries'
