# Node.js backend
Api documentation is made with swagger in /docs path. 

Tests are made with jest 
Use `npm test` to run


This app should not be run directly with 
`npm run serve`
Unless developing or debugging. 
Remember to also edit ormconfig for correct database.

Normal usage should be with docker containers

REQUired env variables are 
TYPEORM_HOST
TYPEORM_USERNAME
TYPEORM_PASSWORD
TYPEORM_DATABASE



This program is made with node.js + typescript