# User Authentication

Basics of user autehentication involves creating a new entry into a database based on username/email with an encrypted password, and so the user is able to access the protected pages using their own password.

## Basics

I have set up a database using MongoDB, since its a cloud based and doesn't use SQL.

The code is built using Express with different routes for authentication:
/signup
/signin
/logout
/refresh_token

The authentication uses access and refresh tokens that is randomly generated string of alphanumeric characters that allows a user to sign in. I believe the access token is currently only set to 15 mins.

There is also a refresh token, that will reset the timer on the access token, and this lasts for 7 days.

## Sending Emails

When first setting up, the tutorial includes a method to send an email to the user if they want to reset their password, and using that, I made a route that would verify their email. This works locally, when using insomnia and a google email address. However, upon hosting this API to render, google blocks these requests.

I have attempted to use a "developer friendly" service for sending emails, although this requires the use of a private domain that you own.

So while this would be a nice freature to have, I think we can skip this as the signing up/in works anyways.

## Backend

- Install bcryptjs, cookie-parser, cors, dotenv, express, jsonwebtoken, mngodb, mongoose
- Set up scripts
  - "start": "node app.js",
  - "dev": "nodemon app.js localhost 8080"

### /app.js

```js
require('dotenv').config();
// importing the mongoose module
const mongoose = require('mongoose');

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

const PORT = 8080;

const app = express();

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/auth', authRouter);

app.listen(PORT, function () {
  console.log(`🚀 Listening on port ${PORT}`);
});
console.log('MONGO_URI:', process.env.MONGO_URI);
// connecting to the database
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB connection is established successfully! 🎉');
});
```

## Frontend

The frontend is relatively simple. It requires a form element with an input for the email and input for the password. Using a submit button, we can extract the value of these input and make a post request to the api to register a user
