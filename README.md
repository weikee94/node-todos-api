Init ToDo API
- mkdir node-todos-api
- cd node-todos-api
- npm init (create package json)
- npm install mongodb --save 

HTTP reference link
- https://httpstatuses.com/

MongoDB InsertOne Example
![Image](https://github.com/weikee94/node-todos-api/blob/master/images/mongodbinsertone.png "Mongodb InsertOne")

Setting Up Mongoose
- npm i mongoose --save
![Image](https://github.com/weikee94/node-todos-api/blob/master/images/settingupmongoose.png "Setting Mongoose")

Validators, Types, Defaults
![Image](https://github.com/weikee94/node-todos-api/blob/master/images/mongovalidator.png "Validators")

Endpoint: POST /todos
(body parser make string become js object)
- npm i express body-parser --save 
![Image](https://github.com/weikee94/node-todos-api/blob/master/images/todoapi.png "POST todos")
postman response
![Image](https://github.com/weikee94/node-todos-api/blob/master/images/postmanone.png "Postman example")

Testing: POST /todos
- expect for assertions
- mocha for the entire test suite
- supertest to test out express routes
- nodemon automatically restart the test suite
- npm i expect mocha nodemon supertest --save-dev

Endpoint: GET /todos
![Image](https://github.com/weikee94/node-todos-api/blob/master/images/getapi.png "GET todos")

Mongoose Queries and ID Validation
![Image](https://github.com/weikee94/node-todos-api/blob/master/images/idvalidation.png "Moogoose Queries and ID Validation")

Endpoint: GET /todos/:id
![Image](https://github.com/weikee94/node-todos-api/blob/master/images/getidapi.png "GET todos by id")