<h1 align="center" id="title">Slot Front</h1>

<p id="description">Simple Slot machine singlepage frontend machine written in Nest js by TS</p>

<h2> To see in local machine </h2>

``-----------  ``  [localhost:3004](localhost:3004) ``-----------  ``

<h2>  Features</h2>



* Whole game can be configured by editing documnet in database ``config`` collection
 ```javascript
{
  "prizes": [
    {
      "id": 1,
      "figure": "🔔",
      "prizes_count": 20,
      "chance": 25
    },
    {
      "id": 2,
      "figure": "❤️",
      "prizes_count": 8,
      "chance": 35
    },
    {
      "id": 3,
      "figure": "💎",
      "prizes_count": 4,
      "chance": 40
    }
  ],
          "possible_bets": [
    1,
    5,
    10
  ],
          "slot_count": 3
}
```
here is default value as an example 

!!! NOTE by adding figures be sure all properties are properly described
* Game are user based, every time new user (browser) starts to play new uid was generated and saved in db   
* Users also has point that after reaching 0 or below message "isnuficent points "shown to user


<h2>🛠️ Installation Steps:</h2>
Docker :

- run ``docker`` command in package.json

- this will automatically deploy mongodb and current project

    - ``"docker": "docker-compose -f docker.compose.yaml up --build"``

- [localhost:6061](localhost:6061) exposed for api

- [localhost:6060](localhost:6060) exposed for mongodb connection

Local :

- first we need to deploy db
- run ``docker-db-only`` command in package.json
    - ``"docker-db-only": "docker-compose -f docker.compose.db.only.yaml up --build"``
- this will automatically deploy mongodb and expose [localhost:6060](localhost:6060)
- "start-dev": "NODE_ENV=development nest start",
- app will start on [localhost:3000](localhost:3004)

<h2> Built with</h2>

prod :

- PORT:3004
- MONGO_INITDB_ROOT_USERNAME=root
- MONGO_INITDB_ROOT_PASSWORD=yourpassword
- MONGODB_PORT=27017
- MONGODB_DB_NAME=slot
- MONGO_HOST=slot_mongo

development

- PORT:3004
- MONGO_INITDB_ROOT_USERNAME=root
- MONGO_INITDB_ROOT_PASSWORD=yourpassword
- MONGODB_PORT=6060
- MONGODB_DB_NAME=slot
- MONGO_HOST=localhost

<h2> Api Docs </h2>

Created swagger documentation ``/docs`` based on type hosted


<h2> Built with</h2>

Technologies used in the project:

* typescript
* nest.js
* monogodb
* docker
