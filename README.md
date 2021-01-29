# Host - Module Federation Example

A consumer module federated app. [Click here to see it live on Netlify](https://host-module-federation-example.netlify.app/).

[![Netlify Status](https://api.netlify.com/api/v1/badges/595adb9f-acb4-4284-84c5-20c9581bc682/deploy-status)](https://app.netlify.com/sites/host-module-federation-example/deploys)

This stand-alone app consumes / 'hosts' the portion of the remote app that is exposed.

Run this project alongside [the remote app](https://github.com/waldronmatt/remote-module-federation-example).

## Installation

Install dependencies:

        npm install

Run dev environment:

Navigate to [http://localhost:9000/](http://localhost:9000/)

        npm run dev

Build for production (locally)

Note: Update public path to `http://localhost:9000/` in `webpack.production.config`

Note: Update the remote path to `FormApp@http://localhost:9000/remoteEntry.js` in `webpack.production.config`

Note: Update entry point to `./server.js` in `webpack.server.config`

        npm run build

Serve the production bundle (locally)

        npm run start

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
