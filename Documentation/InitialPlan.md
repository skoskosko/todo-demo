# Initial Plan

Initial plan is to create application followin mvc architecture. 

## Front

    Made with react native. 
    Automated tests and documentation

## Back

    Made with Node.js
    Autometaed test and documentation following OpenApi syntax
    For docker-compose implimentation back end is divided to parts and ran behind nginx proxy

## Database

    Made with mariadb
    Versioning with flyway


## DevOps

    Everything is served in docker containers, startable with one docker-compose file.
    Aws cloudformation files for aws publication with necessary kubernetes files.
    Jenkinsfile for automated builds
