## Restaurants microservice

Based in framework [Nest](https://github.com/nestjs/nest) 

## First the first

Install dependecies with the next command in your CLI
```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Read documentation

You need a pluggin to read .vuerd.json files, we recomended:
[ERD Editor](https://marketplace.visualstudio.com/items?itemName=dineug.vuerd-vscode)

## Use Local DB

You need create a .env file, you can copy .env.sample and use that value.
After that need to use [Docker-Compose](https://docs.docker.com/compose/) and run

```bash
# You can escape use ctrl+C (cmd+C)
$ docker-compose up
```

## Use Migrations

You can use this command

```bash
# Create a new migration
$ npm run migration:generate -- 'src/database/migrations/customMigrationName'

# Execute a migration
$ npm run migration:run
```