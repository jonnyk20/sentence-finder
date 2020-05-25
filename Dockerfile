# base image
FROM python:3

#maintainer
LABEL Author="Jonny"

# The enviroment variable ensures that the python output is set straight
# to the terminal with out buffering it first
ENV PYTHONBUFFERED 1

#switch to /app directory so that everything runs from here
WORKDIR /app/

ADD ./django-project/requirements.txt /app/requirements.txt

#let pip install required packages
RUN pip install -r requirements.txt