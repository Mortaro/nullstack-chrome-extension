# Nullstack Chrome Extension

<img src='https://raw.githubusercontent.com/nullstack/nullstack/master/nullstack.png' height='60' alt='Nullstack' />

## How to run this Project

Install the dependencies:

`npm install`

Copy the environment sample to a .env file

```sh
NULLSTACK_PROJECT_NAME="[dev] Nullstack Chrome Extension"
NULLSTACK_PROJECT_DOMAIN="localhost"
NULLSTACK_PROJECT_COLOR="#D22365"
NULLSTACK_SERVER_PORT="3000"
NULLSTACK_WORKER_API="http://127.0.0.1:3000"
```

## Run the app in development mode:

`npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Run the extension:

`npm start`

Load the extension folder as an unpacked extension

Extension will have autoreload as you make updates

## Relevant files

- public/manifest.json creates the extension manifest
- .env adds `NULLSTACK_WORKER_API` to connect the extension with the server
- server.js disables the default service worker
- src/Application.jsx is the entry component
- src/Popup.jsx has the extension popup code
- src/Application.css defines the popup window size
- package.json sets mode to spa (default mode) and enables writing files to disk

## Learn more about Nullstack

[Read the documentation](https://nullstack.app/documentation)