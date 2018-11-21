# Webdevelopment_React_Exam

## Description
This is my exam project for PG6300, which is a multiplayer Quiz Game made with React, Redux and WebSockets. <br/>
In this Quiz Game every user has 5 seconds to answer the given Questions and there is 8 question in each round <br/>
The DB is for simplicity Mocked as arrays an Maps as the task said it would.

## Feature requirements done
- Implemented at least two pages that are linked with React Router
- Implement state in at least one page
- RESTful API with GET and POST with JSON 
    - make the frontend display, put or change the data in the DB via the API
- Implemented WebSockets and make frontend use it
- Session-based authentication/authorization

**EXTRA**
- Docker for deployment
- Redux on login state
- SASS for styling

### Known bugs
- Score
    - If a user doesn't answer a question it will count the point as a correct answer at 0 sec, 
    i didnt get the time to fix this bug, so I marked it for later FIXME
    
    

## How to run
1. Clone this repo
2. 
    a) Docker
    - from deploy folder run: 
    - `docker-compose build`
    - `docker-compose up`
    
    b) Webpack and Node
    - from root folder: run:
    - `npm run dev`
3. Enter [localhost:8080](http://www.localhost:8080)
4. Have fun!
