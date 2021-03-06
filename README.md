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

Deploy API to Heroku
- heroku create (this will create random name)
- https://quiet-spire-99849.herokuapp.com/ 
- heroku addons:create mongolab:sandbox
- heroku config (this will provide list of all configuration variables)
- heroku logs (if error will show here)
- git push heroku master (this push to heroku)
- heroku open (shortcut to open in browser)

update your port
![Image](https://github.com/weikee94/node-todos-api/blob/master/images/updateport.png "Update port")

heroku scripts and engine version
![Image](https://github.com/weikee94/node-todos-api/blob/master/images/herokuscripts.png "Heroku scripts")

update db uri
![Image](https://github.com/weikee94/node-todos-api/blob/master/images/dburi.png "Update db uri")

postman environments
![Image](https://github.com/weikee94/node-todos-api/blob/master/images/postmanenv1.png "Setup the postman environment variables")
![Image](https://github.com/weikee94/node-todos-api/blob/master/images/postmanenv2.png "Trigger by dropdown")

Endpoint: DELETE /todos/:id
![Image](https://github.com/weikee94/node-todos-api/blob/master/images/deleteapi.png "Delete API")

Endpoint: PATCH /todos/:id
- npm i lodash --save
![Image](https://github.com/weikee94/node-todos-api/blob/master/images/patchapi.png "Patch API")

Setting User Model 
Endpoint: POST /users
- npm install validator --save 
![Image](https://github.com/weikee94/node-todos-api/blob/master/images/usermodel.png "User model")

JWTs and Hashing
- npm i crypto-js --save (hashing algorithms playground only)
- npm i jsonwebtoken --save
- jwt.io (refer more jwt from the documentation)
![Image](https://github.com/weikee94/node-todos-api/blob/master/images/jwt.png "JWT")

Generating Auth Tokens and Setting Headers (Schema)
- there are two methods (model method and instance method)
- model method (Example: User.findByToken)
- instance method (Example: user.generateAuthToken)
- user.generateAuthToken (responsible for adding token to the individual user saving that and returning token)
- call generateAuthToken method and add token to header
![Image](https://github.com/weikee94/node-todos-api/blob/master/images/generateAuthToken.png "generate auth token")
- use user schema in order to create instance method 
- toJSON can override the return data
![Image](https://github.com/weikee94/node-todos-api/blob/master/images/userschema.png "user schema")


Private Routes and Auth Middleware
- UserSchema.methods will create instance method
- UserSchema.statics will create model method
- UserSchema.findByToken is the model method get back the user by passing token
![Image](https://github.com/weikee94/node-todos-api/blob/master/images/findByToken.png "model method")
- auth middleware, middleware function next(), if not passing this the following function wont execute
![Image](https://github.com/weikee94/node-todos-api/blob/master/images/authone.png "authentication middleware method")
![Image](https://github.com/weikee94/node-todos-api/blob/master/images/authtwo.png "authentication middleware method")

Hashing Password
- npm i bcryptjs@2.3.0 --save
- mongoose middleware let you run certain code before or after certain event like (pre, init)
- https://mongoosejs.com/docs/middleware.html (refer this for more details)
![Image](https://github.com/weikee94/node-todos-api/blob/master/images/hashpassword.png "hashpassword")

Endpoint: POST/users/login
![Image](https://github.com/weikee94/node-todos-api/blob/master/images/loginone.png "login model methods")
![Image](https://github.com/weikee94/node-todos-api/blob/master/images/logintwo.png "login endpoints")

Endpoint: DELETE /users/me/token
![Image](https://github.com/weikee94/node-todos-api/blob/master/images/deleteone.png "delete")
![Image](https://github.com/weikee94/node-todos-api/blob/master/images/deletetwo.png "delete")

Private ToDoRoutes
- add creator id in order to know who is the one create data
![Image](https://github.com/weikee94/node-todos-api/blob/master/images/privateroutes.png "private routes")
![Image](https://github.com/weikee94/node-todos-api/blob/master/images/privateroutestwo.png "private routes")

Update App Configuration
- create server config file to store environment variables
- heroku config (get mongodburi)
- manipulate jwtsecret key on heroku
- heroku config:set JWT_SECRET
- heroku config:get JWT_SECRET
- heroku config:unset JWT_SECRET 

Deploying to Heroku and Mongo Production Database
- heroku config:get MONGODB_URI (this will get the mongodb address)
![Image](https://github.com/weikee94/node-todos-api/blob/master/images/database.png "database")
