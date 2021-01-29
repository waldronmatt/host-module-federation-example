# Host - Module Federation Example

[![Netlify Status](https://api.netlify.com/api/v1/badges/595adb9f-acb4-4284-84c5-20c9581bc682/deploy-status)](https://app.netlify.com/sites/host-module-federation-example/deploys)

A consumer module federated app. [Click here to see it live on Netlify](https://host-module-federation-example.netlify.app/).

This stand-alone app consumes / 'hosts' the portion of the remote app that is exposed.

Run this project alongside [the remote app](https://github.com/waldronmatt/remote-module-federation-example).

## Installation

Install dependencies:

        npm install

## Usage

Run dev environment:

        npm run dev

\*\*Build for production (locally):

        npm run build

Serve the production bundle (locally):

        npm run start

Navigate to [http://localhost:9001/](http://localhost:9001/)

\
\***\*Note**: Update public path to `http://localhost:9001/` in `webpack.production.config`

\***\*Note**: Update the remote path to `FormApp@http://localhost:9000/remoteEntry.js` in `webpack.production.config`

\***\*Note**: Update entry point to `./server.js` in `webpack.server.config`

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
