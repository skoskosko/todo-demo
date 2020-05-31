# CloudFormation

This folder contains resources necessary for publishing this application to aws fargate. 


This is publishing two containers from dockerhub into aws fargate. 
Database is created as a rds mariadb.
Forwarding to containers is handled with aws loadbalancers. 


## usage

I tested this stack with aws cloudfromation tool in __FRANKFURT__.

So aws console and search CloudFormation. Then i created new stack and imported this file.

Because i did not want to put my dns to aws this is published trough public aws loadbalancer

To get the url go to aws console EC2 > Load Balancers Open Todo-ServiceLoadBalancer and get the DNS name. 

That is the public url for the application in aws add 

/ is front
/docs/ is swagger
/api/notes for example returns all notes.
