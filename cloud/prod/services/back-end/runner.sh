#!/bin/bash

service postgresql start
sleep 15
cd /opt/services 
/opt/.pyenv/shims/python manage.py migrate
/opt/.pyenv/shims/python manage.py runserver 0.0.0.0:80
