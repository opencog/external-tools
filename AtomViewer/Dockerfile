# This docker file creates a simple apache server for use with the visualizer
# Tested using docker version 1.3.2

FROM ubuntu:14.04

RUN apt-get update
RUN apt-get -y install apache2
COPY visualizer.conf /etc/apache2/sites-available/
RUN a2dissite 000-default ; a2ensite visualizer

# Create and switch user. The user is privileged with no password required
RUN adduser --disabled-password --gecos "OpenCog Developer" visualizer
RUN adduser visualizer sudo ; adduser visualizer www-data
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers
USER visualizer
WORKDIR /home/visualizer

# Defaults
CMD sudo service apache2 start ; bash
