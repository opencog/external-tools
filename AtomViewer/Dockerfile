# This docker file creates a simple apache server for use with the visualizer
# Tested using docker version 1.4.1
# docker build -t $USER/visualizer .

FROM ubuntu:trusty

RUN apt-get update
RUN apt-get -y install apache2
COPY visualizer.conf /etc/apache2/sites-available/
RUN a2dissite 000-default ; a2ensite visualizer
ADD WebContent /var/www/visualizer
RUN chown -R www-data:www-data /var/www

# Create and switch user. The user is privileged with no password required
RUN adduser --disabled-password --gecos "OpenCog Developer" visualizer &&\
    adduser visualizer sudo ; adduser visualizer www-data &&\
    echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

# Defaults
USER visualizer
WORKDIR /home/visualizer
CMD sudo apache2ctl -D FOREGROUND

# Note:
# 1. This setup maybe unsecure
# 2. Should the WebContent dirctory change frequently then an Ambassador pattern
#    for data volume containing WebContent may be an option
