# iprog-project: Music Quiz with Spotify
Project for DH2642, VT2021
Anton Björklund, Richard Lästh, Kristin Mickols, Max Wippich

Link to the running app:
https://iprog-project.herokuapp.com

## Description

Takes music and song data from the spotify API and generates a music quiz from songs in a specific genre
The quiz will ask for names of songs, artists, release year and other information. 
The quiz can be hosted on one device and then other devices can join in, via a code, to submit answers to the questions. The host will be playing songs via Spotify webbplayer for the players to hear. 
Questions will be shown on the host’s webpage, while the client pages will contain questions and answer fields. 
At the end of a quiz all player's score will be compared, and a winner will be revealed!

### Project file structure

The project has several folders:
* api
    * handles database api calls, hold the database and its models. This is crucial for multiple players to be able to join a room. Also will be responsible for generating questions.

* frontend
    * src contains MVP, respectively in their own folder and files 
    * static contains css files
    * templates contains index.html file
    * migrations: used for the database
    
* music_quiz
    * settings and other information that is needeed to start the server.

* spotify
    * COntains information to handle spotify api requests and handling of user authentication

* staticfiles
    * files generated to be able to host the application.



## Prerequisites
Python 3.9 installed

Node.js with npm (Can be installed from https://www.npmjs.com/get-npm)

Django REST Framework (Install with '$pip install django djangorestframework django_extensions')

Modules required for heroku 

```
pip install gunicorn whitenoise django-heroku psycopg2 python-dotenv
```

npm modules that are used can be installed by running the following commands in the frontend directory
```
npm init -y
npm i webpack webpack-cli --save-dev
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
npm i react react-dom --save-dev
npm install @material-ui/core
npm install @babel/plugin-proposal-class-properties
npm install react-router-dom
npm install @material-ui/icons
npm install css-loader --save-dev
```

## Setup
Run the server by using the command

  ```$py manage.py runserver```

(replace "py" by ```python```, or ```python3```, depending on your python installation)

  depending on your python installation.
in the /music_quiz directory.

To automatically recompile react and js code, run

  ```$npm run dev```

to build for production, run

  ```$npm run build```

in the music_quiz/frontend folder


Whenever an update is made to the database, run
```
  $py manage.py makemigrations
  $py manage.py migrate
```
in the music_quiz/music_quiz folder to apply changes.

To handle HTTPS request we use axios.

https://github.com/axios/axios

do 

```$npm install axios```,

in root directory, the directory that is the base of your local git 
repo.
