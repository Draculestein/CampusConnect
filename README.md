# Campus Connect

## Table of Content

## Project Architecture

Frontend: HTML, CSS, Javascript, and React. 

Backend: Express.js, MySQL, Docker.

## Setup Guide
1. Clone the repo.
2. Run `npm install`.
3. Create the `dist` folder.
4. Create the `.env` file. The file should contain:
```
PORT= # port number
LOG_LEVEL= # default should be debug
JWT_SECRET= # secret for debug
```

## Project Structure

The project has been structured such that all files are categorized by their purpose. The main entry point of the project is `server.ts` where the environment variables are read, the database connection is initialized, and the Express server is started.

The main files and directories are displayed below. 
```
.
├── config
├── controllers
├── db
│   ├── db.ts
│   ├── models
│   └── repositories
├── devenv.nix
├── devenv.yaml
├── dist
├── docker-compose.yaml
├── middleware
├── package.json
├── package-lock.json
├── public
│   ├── css
│   ├── images
│   └── js
├── README.md
├── routes
│   ├── api.route.ts
│   ├── route.ts
│   └── views.route.ts
├── server.ts
├── tools
├── tsconfig.json
├── tslint.json
└── views
```
- `package.json`, `package-lock.json`: main files for NPM.
- `tsconfig.json`, `tslint.json`: Typescript configurations.
- `docker-compose.yaml`: Docker compose configuration.
- `devenv.nix`, `devenv.yaml`: devenv.sh files, for setting up dev environment when using Nix.
- `config`: files for setting up project configurations such as loggers.
- `controllers`: contains [controller](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes) files. This should be where code logic lives. All files in this directory should be named in the format of `{name}.controllers.ts`.
- `db`: files related to database and models. The folder consists of one Typescript file and two subfolders:
  - `db.ts`: contains the database configuration and TypeORM AppDataSource initialization.
  - `models`: contains Entity classes/models/tables for the database. All files in this directory should be named in the format of `{name}.model.ts`.
  - `repositories`: contains TypeORM repositories to extend functionality of Entity classes. See [TypeORM's custom repository](https://typeorm.io/custom-repository). All files in this directory should be named in the format of `{name}.repositories.ts`.
- `dist`: contains the transpiled Javascript from compiling Typescript.
- `middleware`: contains [middleware](https://expressjs.com/en/guide/writing-middleware.html#:~:text=Middleware%20functions%20are%20functions%20that,middleware%20succeeding%20the%20current%20middleware.) functions. All files in this directory should be named in the format of `{name}.middleware.ts`.
- `public`: contains files used for the frontend.