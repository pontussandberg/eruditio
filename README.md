# Eruditio

A tutoring platform created as a final project for [Salt](https://salt.study/).

**Eruditio** uses [WebRTC](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API) to allow users to make real time video calls.
Besides WebRTC, we have used the following main technologies:
* NodeJS and Express for the backend
* ReactJS for the frontend
* MongoDB for the database

## What is Eruditio?

Eruditio allows people who want to learn a new skill or need help with a subject to find and connect with a suitable tutor.
Once connected, student and tutor can have an online meeting via video call on the website.

## Download & Install

* Clone the project and install dependencies
    ```bash
    git clone git@github.com:pontussandberg/eruditio.git
    cd eruditio/server && npm i
    cd ../client && npm i
    ```

* Setup configuration:

    You will need to create [Google credentials](https://developers.google.com/identity/protocols/oauth2/openid-connect) for your app and update your [.env](server/.env.example) file accordingly.

* Run the docker container from the root folder:
    ```bash
    docker-compose up
    ```

* Populate the database (optional):
    ```bash
    node server/scripts/populateDb.js
    ```

* Start the server in development mode on another terminal:
    ```bash
    cd server && npm run restart
    ````

* Start the client in development mode on another terminal:
    ```bash
    cd client && npm start
    ```

* By default, the website will be running on port 3000. The node server will be running on port 5000. You can change those in the [Webpack configuration](client/webpack.config.js) and the [Server's entry point](server/server.js).

## Acknowledgements

Icons for mobile navigation made by [Freepik](https://www.flaticon.com/authors/freepik) from [flaticon](www.flaticon.com).
