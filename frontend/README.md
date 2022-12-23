# WORDY - FRONTEND

This is a frontend or view, all of the pages in this project with name wordy. Base on React, here you will find the struture of a frontend project, and how to try it in your computer. Depending on the platfrom you will need to configurate it to deploy this project in a server for production in case you want to use the code.

## Dependencias

* React
* React-router
* Frame-motion
* Sass
* Redux
* Axios

## Development

### `Requirements`

* [Node.js](https://nodejs.org/en/)
* [VS code](https://code.visualstudio.com/)

## Put the Frontend app to work

Open a new CMD or Terminal an go to the folder **wordy**/**frontend** Put the Frontend app to work

Open a new CMD or Terminal an go to the folder **wordy**/**frontend**

on Windows CMD is 'cd' the command:

```cmd
  cd frontend
```

Install the dependencies in the package.json with:

>this will install the required packages

```cmd
 npm install
```

> Copy and set the frontend variables (on Windows)

```cmd
  copy .env-vars .env
```

> Set the variables (it's the backend direction)

```env
# API route

REACT_APP_BACKEND_API_URL='http://127.0.0.1:8000/api/'
```

>This will put the frontend to work

```cmd
  npm start
```

After this you should start the backend server, or just use the frontend application.
