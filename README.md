# Serverless TODO

This appliation will allow to create/remove/update/get TODO items. Each TODO item can optionally have an attachment image. Each user only has access to TODO items that he/she has created. 

# Functions implemented

The below functions configured in the `serverless.yml` file:

* `Auth` - this function should implement a custom authorizer for API Gateway that should be added to all other functions.
* `GetTodos` - should return all TODOs for a current user. 
* `CreateTodo` - should create a new TODO for a current user. 
* `UpdateTodo` - should update a TODO item created by a current user. 
* `DeleteTodo` - should delete a TODO item created by a current user.
* `GenerateUploadUrl` - returns a presigned url that can be used to upload an attachment file for a TODO item. 

# Frontend

The `client` folder contains a web application that can use the API that should be developed in the project.

# How to run the application

## Backend

To deploy an application run the following commands:

```
cd backend
npm install
sls deploy -v
```

## Frontend

To run a client application first edit the `client/src/config.ts` file to set correct parameters. And then run the following commands

```
cd client
npm install
npm run start
```

This should start a development server with the React application that will interact with the serverless TODO application.

