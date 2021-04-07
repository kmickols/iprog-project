# iprog-project
Project for DH2642

## Prerequisites
Python 3.9 installed
Node.js with npm (Can be installed from https://www.npmjs.com/get-npm)
Django REST Framework (Install with '$pip install django djangorestframework')

## Setup
Run the server by using the command
  $py manage.py runserver
  or
  $python manage.py runserver
  depending on your python installation.
in the music_quiz folder.

To automatically recompile react, run
  $npm run dev
in the music_quiz/frontend folder

Whenever an update is made to the database, run
  $py manage.py makemigrations
  $py manage.py migrate
  or
  $python manage.py makemigrations
  $python manage.py migrate
  depending on your python installation
in the music_quiz/music_quiz folder to apply changes.

To handle HTTPS request we use axios. 
https://github.com/axios/axios
do $npm install axios in root map. So the map that is the base of your local git 
reepo.
