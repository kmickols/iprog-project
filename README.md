# iprog-project
Project for DH2642

## Prerequisites
Python 3.9 installed

Node.js with npm (Can be installed from https://www.npmjs.com/get-npm)

Django REST Framework (Install with '$pip install django djangorestframework')

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
in the music_quiz folder.

To automatically recompile react, run

  ```$npm run dev```

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
