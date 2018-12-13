#!/bin/bash
if [ "$TRAVIS_BRANCH" == "dev" ]; then
  pip install --user awscli # install aws cli w/o sudo
  export PATH=$PATH:$HOME/.local/bin # put aws in the path
  eval $(aws ecr get-login --region us-east-1) #needs AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY envvars
  docker build -t parkingnotifier-api .
  docker tag parkingnotifier-api:latest 571228505279.dkr.ecr.us-east-1.amazonaws.com/parkingnotifier-api:latest
  docker push 571228505279.dkr.ecr.us-east-1.amazonaws.com/parkingnotifier-api:latest
fi