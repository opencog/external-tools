"""
An example implementation of the interface defined in attention_interface.py
"""

__author__ = 'Cosmo Harrigan'

from attention_interface import *
from time import sleep

# Configurable parameters:
num_steps = 10                            # Number of time steps
output_filename = 'ecan-timeseries.csv'   # Output filename

timeseries = []
t = 0

for i in range(0, num_steps):
    point = get_attentional_focus()
    point.timestep = t
    print point
    timeseries.append(point)
    importance_diffusion()
    sleep(.1)
    t += 1

write_timeseries(timeseries, output_filename)
