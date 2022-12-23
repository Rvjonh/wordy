# WORDY - BACKEND

This folder is the API to make transactions with the backend for wordy, store and manage, data of user in the server and keep saved in a MySQL database.

## Requirements

* Python
* Knowledge of Django
* MySQL

## Put the Backend app to work

Open another CMD or Terminal an go to the folder **wordy**/**backend**

on Windows CMD is 'cd' the command:

```cmd
  cd backend
```

Run the next commads:

(creates a environment to install required packages)(e.g. django)

```cmd
  python -m venv venv
```

`**REALLY IMPORTANT**` ACTIVATE THE ENVIRONMENT TO WORK WITH PYTHON AND PACKAGES

on Windows:

```cmd
  venv\Scripts\activate.bat
```

**Further information** [ENVIRONMENTS](https://docs.python.org/3/tutorial/venv.html)!!

(installs a list of packages need for development)

```cmd
  (venv): python -r install requirements.txt
```

(controls models to store data in a data base, this case [Django's ORM](https://docs.djangoproject.com/en/4.1/#the-model-layer))

`in order to use the Django's ORM you need to set variables of the database in .env`

(SET THE VARIABLES, IN THE FILE backend\.env)

(CREATE ENVIRONMENTAL VARIABLES): COPY OR CREATE A NEW .env file like the file .env-copy at the folder backend

```cmd
  copy backend\.env-vars backend\.env
```

```cmd
# EVIRONMENT VARIABLES


## you can generate a key with next code:
## in bash

> openssl rand -base64 32

## copy the text and pasete next the '=' symbol

SECRET_KEY=generateyourownsecret.key

DEBUG=1

# Remember to change in production...
ALLOWED_HOSTS=*

# API REQUEST - FROM FRONTEND
CORS_ORIGIN_WHITELIST=http://localhost:3000
URL_FRONTEND=http://localhost:3000

# DATABASE INIT SESSION
DATABASE_NAME=wordy
DATABASE_USER=root
DATABASE_PASSWORD=password
DATABASE_HOST=127.0.0.1
DATABASE_PORT=3306


# EMAIL SENDER (To recover passwords ... or send email with SMTP)
# Recommend a Gmail account with double factor check and a password for apps
EMAIL_HOST_USER=yourSMTPgmail@gmail.com
EMAIL_HOST_PASSWORD=yourSMTPgmailpassword

```

**`POSSIBLE PROBLEMS`**

You need to use mysql and check if you have installed, how?, run next command in a CMD or Terminal:

```cmd
  mysql --version
```

> should appear something like this

```cmd
  mysql  Ver 8.0.29 for Win64 on x86_64 (MySQL Community Server - GPL)
```

Django need a database in Mysql called equal to the **DATABASE_NAME** in **# DATABASE INIT SESSION** in the file '.env' so the those parameters of your MySQl instace:

> Once Installed MySql and init a session with

```cmd
  mysql -u [root | your_account] -p
  password: *******
```

> Create a database for Django

```cmd
  mysql> create database [wordy | your database's name]
```

(in case of changing the models, you should run this command, to control the version of the models.)

```cmd
  (venv): python manage.py makemigrations
```

(apply last models to the data base, update the data base schema)

```cmd
  (venv): python manage.py migrate
```

**`RUNNING THE SERVER`**

(run development server)

```cmd
  (venv): python manage.py runserver
```

(should appear something like this)

```cmd
  Watching for file changes with StatReloader Performing system checks...

  System check identified no issues (0 silenced).
  December 17, 2022 - 22:16:44
  Django version 4.1.4, using settings 'backend.settings'
  Starting development server at http://127.0.0.1:8000/
  Quit the server with CTRL-BREAK.

```

**Open in your browser:** [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin)

You will need and admin account
`pd`: the direction can change in some cases ...

**`Create an admin account`**

> stop the server with 'ctrl + z' or 'ctrl + c' and enter ...

in the terminal with environment active, so **(venv) FullStack-ToDo-App**/**backend**: type:

> You will be able to create an account to manage or develop in the admin panel

```cmd
  py manage.py createsuperuser
```

>run again

```cmd
  py manage.py runserver
```

> visit: [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin) and enter your information.
