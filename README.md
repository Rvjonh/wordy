# Wordy - Final Project

This is my final project done to get my System Engineer Degree in my country. Similar to applications like Duolingo, Memrise, this project for `Spanish speakers` and tries to offer a way to practice a new language through exercises, consist in a variety of exercises based on writting, reading, lisenting and speaking with the words or sentences added by the user, so too the user can register a dictionary with words and practice them, check the level of the word and improving their vocabulary.

There is a section which offers dictionaries full with words from basic to intermediate in case the users do not know how to start using the application.

> ----

**Link:** [Live Code App](https://aplicacion-wordy.netlify.app/)

> ----

![Wordy - Front Page](/previews/front-page.png "Front Page of the Application")

## Abstract

Software applications are used by the vast majority of people in society in different fields, administration, economy, sports, and of course in learning languages, these applications being developed with different technologies and resources, in some cases flexibly and others not so much. , focusing on a development closed to evolve. To find a solution to this case, the project seeks to investigate a new application development technology, progressive web applications to develop a multiplatform application that allows learning vocabulary through writing, reading, listening and pronunciation techniques through repetition in exercises designed for each of these areas. Applying a design of the scrum, flexible and incremental methodology for the development of minimum viable products, the project reflects a product resolution similar to the work of recognized companies in this field and of value to users, allowing to generate great expectations about the creation of applications with this PWA technology on the traditional model, this managing to help users who are learning a new language or simply expanding their vocabulary.

## State of the Project

I don't think I will continue adding features to the project, because it's quite large and copy many features from apps which have many teams working simultaneously in them. when I created this project I thought create a app which will show all my skills de fullstack developer and it was everything that I thought. However going on adding features I realized that I didn't add any test to check the quality of the code, so quite risky or tedius to keep the project.

## Development

In case you want to try it by yourself, check out the backend and frontend folder readme, there you'll find information to start a development server in your computer.
Since this day,  the project uses a MVC arquitecture (model, view, controller), so if you want to deploy to another server I recomender to deploy the project in next services:

* Frontend folder is optimized to be deployed in [Netlify](https://www.netlify.com/)
* [Render](https://render.com/)
* For a database I recommend you use [Clever Cloud](https://www.clever-cloud.com/)

### Teach Stack used in the project

1. [React with CRA](https://create-react-app.dev/)
2. [Python](https://www.python.org/) with [Django](https://www.djangoproject.com/) in a [environment](https://docs.python.org/3/library/venv.html)
3. [Django ORM](https://docs.djangoproject.com/en/4.1/#the-model-layer)(to conect with a MySQL)
4. [MySQL](https://www.mysql.com/)

### Technologies required to a start development server

1. [Node.js](https://nodejs.org/en/)
2. [Python](https://www.python.org/)
3. [MySQL](https://www.mysql.com/)
4. *Optional:* [VS code](https://code.visualstudio.com/) -> a Text Editor

## `Bugs`

* There could be problems if you use the project without internet and making the manage of dictionaries. why?, because there are no test which comprobate the quality of those features working without internet conection.

## License

MIT License

Copyright (c) 2022 Jonh Gomez

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
