## Installation

Before installing, download and install Node.js with version 20 or above

Installation is done using the `yarn install` command :

```console
$ yarn install
```

## Environment Variables setup

You will need to setup a list of environment variables as below in order to start / build the project propertly.

FIrst, create file with name .env

```.env
POSTGRES_HOST=xxx  ##The postgres server hostname
POSTGRES_DB=xxx  ##The postgres server default database name
POSTGRES_USER=xxx  ##The postgres server username
POSTGRES_PASSWORD=xxx  ##The postgres server password
```

## Start development

Start the express server can be done by using the `yarn dev` command :

```console
$ yarn dev
```

You can edit the server-side code and saveit, the express server will hot-reload.

Now, you can browse to [http://localhost:3000/](http://localhost:3000/) to check if the server is running.

## Production build

You can build the applicaiton by using `yarn build` command :

```console
$ yarn build
```

After finish building, the output of the files is inside `./dist` folder

Start production build:

```console
$ yarn start
```

## Production build (Docker)

If you wan to build and deploy the applicaiton with docker, you can follow the below commands

Docker build:

```console
$ docker build . -t {{IMAGE_NAME}}
```

This step will build a docker image and you can use this image for depolyment

### `yarn test`

Launches the test runner.
