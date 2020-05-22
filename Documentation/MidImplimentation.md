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

To make my api work i need. 

get/put/post/delete for users
get/put/post/delete for notes 
Note place swapping post

Nothing else? probably not..

I wanted to take full use of typescript so i tried with typeorm
https://www.npmjs.com/package/typeorm
https://www.infoq.com/articles/typescript-mysql/
Appereantly typeorm can handle database migrations too. Well at least creation.. Migration with some extra tricks. But then again. This can downgrade it too. So that is cool.
So i removed my flyway. That was some useless work....

I usually implement my own database class. But typeorm handles all that. I quite like sql(in its own way), but this time it seems I dont get to write it. 

typeorm example i used https://github.com/typeorm/typescript-express-example

I Decided to write all basic stuff first. 
And implemnent little bit more documentation, tests, and ordering afterwards.

Now I am just wondering if i should have put every api endpoint in its own file. Or just users and notes file seperatly. Not that it matters but meaby if this api would have had more endpoints i would probably had to either put these files in subfolder or combine them a little bit.

I also decided to test everything through api. This requires database to work but i dont really have any seperate functions to test without it anyways.
For testing i decided to go with sqljs database so there would not be need to run mysql when testing. This makes my life a lot easier later on. 
I also got lazy and becuase NOW or not any other timestamp workd with mariadb and sqllite so i just removed my on update and on create. If i had more time i would have just mocked mysql but I did not want to use too much time on this one. Maybe i fix it someday.

But at least my tests work, and I even found some bugs when testing them out. Hopefully everything will work when i start working on the GUI

## 6. Making GUI

Making GUI is always little bit annoying. You have some kind of vision and when you start chancing your mind. 
I start making this QUI with vision of single page application with top bar. With search, add user and add note buttons. 
Body of the ui is filled with notes. Ordered in columns if screen is wide enough. In one continous line if not(mobile). 

I also noticed that i needed to create docker containers for my api. So i did that. It proved to be quite annoying to get typescript compiling working properly. In the end it was my type: "module" in package.json that did the trick. I was not making a node module after all...

I picked colors for my gui from https://coolors.co/
/* CSS */
--color1: hsla(197%, 54%, 33%, 1);
--color2: hsla(207%, 31%, 45%, 1);
--color3: hsla(209%, 82%, 22%, 1);

/* HEX */
$color1: #264653ff; main
$color2: #4f6272ff; light
$color3: #0a2239ff; dark

/* HSL */
$color1: hsla(197%, 54%, 33%, 1);
$color2: hsla(207%, 31%, 45%, 1);
$color3: hsla(209%, 82%, 22%, 1);

/* RGB */
$color1: rgba(38, 70, 83, 1);
$color2: rgba(79, 98, 114, 1);
$color3: rgba(10, 34, 57, 1);

/* GRADIENT */
$gradient-top: linear-gradient(0deg, #264653ff, #4f6272ff, #0a2239ff);
$gradient-right: linear-gradient(90deg, #264653ff, #4f6272ff, #0a2239ff);
$gradient-bottom: linear-gradient(180deg, #264653ff, #4f6272ff, #0a2239ff);
$gradient-left: linear-gradient(270deg, #264653ff, #4f6272ff, #0a2239ff);
$gradient-top-right: linear-gradient(45deg, #264653ff, #4f6272ff, #0a2239ff);
$gradient-bottom-right: linear-gradient(135deg, #264653ff, #4f6272ff, #0a2239ff);
$gradient-top-left: linear-gradient(225deg, #264653ff, #4f6272ff, #0a2239ff);
$gradient-bottom-left: linear-gradient(315deg, #264653ff, #4f6272ff, #0a2239ff);
$gradient-radial: radial-gradient(#264653ff, #4f6272ff, #0a2239ff);


Also, im not a design guy. I can fight my way trough css but why would I? i decided to use https://material-ui.com