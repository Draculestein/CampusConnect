# Campus Connect

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

The project has been structed such that all files are categorized by their purpose. The main entry point of the project is `server.ts` where the environment variables are read, the database connection is initialized, and the Express server is started.

Below is the project structure.
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