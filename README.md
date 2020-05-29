# This Demo program is made to demostrate authors basic programming skills.
This program was created with following requirements.

### demo
https://note-wall.com/


###  Simple program for adding and editing notes, with possibility to add assignees.

 - View with all notes
 - Simple search/filter
 - Adding notes
 - Editing notes
 - Deleting notes
 - Assingning authors
 - Removing authors


This project comes with extra specific documentation. These files are in "Documentation" folder. Those files are for explaining my decisions and for giving better image about my tought process. I do not normally make these files inside version control, but on postit notes and handwritten notes. 

Documentations that i normally make are in this README and inside projects subfolders.


[Initial Plan](./Documentation/InitialPlan.md)

[Mid implimentation notices](./Documentation/MidImplimentation.md)



## Usage

Best results for locat testing can be achieved with docker-compose

Due to some limitations in mariadb container and pm2 + typeorm it may be necessary to 
stop and start the container so database has enough time to initialize 

docker-compose build
docker-compose up # wait for mariadb to start properly
docker-compose stop
docker-compose up

application should be in http://localhost:5000/
