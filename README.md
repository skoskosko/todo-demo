# This Demo program is made to demostrate authors basic programming skills.
This program was created with following requirements.

### demo
https://note-wall.com/  (No monitoring. So if it breaks i may not notice it.)


###  Simple program for adding and editing notes, with possibility to add assignees.

 - View with all notes :white_check_mark:
 - Simple search/filter :white_check_mark:
 - Adding notes :white_check_mark:
 - Editing notes :white_check_mark:
 - Deleting notes :white_check_mark:
 - Assingning authors :white_check_mark:
 - Removing authors :white_check_mark:

extra:
 - dragging and ordering notes :white_check_mark:
 - Reactive mobile friendly ui :white_check_mark:
 - nice documentation swagger etc. :white_check_mark:
 - ci pipelines with github actions :white_check_mark:

This project comes with extra specific documentation. These files are in "Documentation" folder. Those files are for explaining my decisions and for giving better image about my tought process. I do not normally make these files inside version control, but on postit notes and handwritten notes. 

Documentations that i normally make are in this README and inside projects subfolders.


[Initial Plan](./Documentation/InitialPlan.md)

[Mid implimentation notices](./Documentation/MidImplimentation.md)

[Final Thoughts](./Documentation/FinalNotes.md)

## Usage

Best results for locat testing can be achieved with docker-compose

Due to some limitations in mariadb container and pm2 + typeorm it may be necessary to 
stop and start the container so database has enough time to initialize 

docker-compose build

docker-compose up # wait for mariadb to start properly

docker-compose stop

docker-compose up

application should be in http://localhost:5000/

## AWS

cloudformation folder contains necessary information and files for automatic aws publication. 