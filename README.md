[TOC]

------------

#### First Step: run postgres with docker

    docker-compose up -d

#### Second Step: CREATE ENV FILE AND SET ENVIRONMENT VARIABLE

    DATABASE_URL="postgresql://root:123456@localhost:5432/ermandb?schema=public"

##### Last Step: Build && Start Express Server

    npm run build
    npm start

##### Add dummy data

    npm run dummy

------------

##### For test

    npm run test





    