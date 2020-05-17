# This file contains decisions made mid development.

## Workorder

1. Make docker-compose skeleton
    - folders
    - initate projects
    - Decide on architectures
2. Make Database
    - Design database for necessary functions
    - implement it in flyway
3. Implement node
    - research best documentation and tests
    - impliment
4. Implement react
    - research best documentation and tests
    - impliment
5. Make Api
    - Plan necessary getters and setters
    - Make authentication function placeholders
    - Implement
6. Make front
    - Make react front and implement it
7. Checkpoint
    - Check that everything is tested
    - Check that everything is documented
    - Check that all wanted enpoints work properly
8. Make CI 
    - Make necessary files for building and pushing docker images
    - implement with free with open-source travis
9. Make AWS Cloudfromation
    - Make necessary files and alterations
    - Test with aws


## 1. docker-compose and folders
Deciding on technologies used. These may not yet be final decision but at least they are what i have planned at the moment. I dont make dockerfiles yet becuase with as much work i can just make them as I get there. In docker file i added database stuffs so i had something in there


## 2. Database
I Decided to plan database first, because it defines how i make my gui and other stuffs. 
To make my life easier i decided that notes will be shown in one list. This is easy to show on all screen sizes. 
I also decided to make only one wall without authentication. so i removed mentions of authentication from my plans. This makes my database a lot simpler. However i plan everything in a way that authentication and multiple users are possible to implement on a later date.


At this point i Changed my task order again. I decided that it was better to implement one project at a time with documentation and tests.

## 3. Creating node project
I wanted to make this project with node.js typescript. Because I was told that I should learn it.
I decided to use Jest for testing. It is default for react and can be used with simple node.js so why not use it in both. Other option I would have considered is Mocha. 
I decided to use newest packages for everything. If making production environment i would have used little bit older versions to ensure that they actually work well.
I also decided to use commonjs for eslint because i dont like semicolons, also it seems to be the recommended one.
I had quite a lot problems with making node.js project working with yest and typescript. This was te first time i made a project like that.
for swagger i used https://levelup.gitconnected.com/swagger-time-to-document-that-express-api-you-built-9b8faaeae563 this tutorial

https://jsdoc.app/howto-es2015-classes.html <- Link i need later for cheking my documentation syntax



## 4. Creating react project
I haven't created a react project before. It looks a lot like Vue so hopefully it is not a problem.
I used https://medium.com/@feralamillo/create-react-app-typescript-testing-with-jest-and-enzyme-869fdba1bd3 to get me started

I am not as familiar with react as with node so I dont add anything extra at this point. I dont think my lint is currently working as intended but I dont know how it should work on this, so what can I do...


https://www.inkoop.io/blog/a-guide-to-js-docs-for-react-js/ <- Link i need later for cheking my documentation syntax

## 5. Make node api. (Finally to the fun part!)

Just making calls and functions that i need. And documenting them. 
I start with easy ones and then go to CHANCE PLACES ones when i have tested the easy ones.

