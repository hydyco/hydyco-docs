---
sidebar_position: 2
title: Manage Authorization
---

# Manage Authorization

## Intro

Control your api access from admin it self. Allow only specific routes to be public.

![auth-management](https://raw.githubusercontent.com/iamrahultanwar/hydyco-preview/master/v1/4.png)

## Features

- Check box the method you want to make public, other methods will be treated as authorized route
- Make authorization just by adding `makeAuth` middleware to your custom api.
- Access user info in the `request` just by access it like this `request.user`

## Handle auth from code

You can configure your authorization from code. You can config `token` and other attributes as well

```js
const server = new HydycoServer({
  port: 3002,
  logger: false,
  auth: {
    secretOrKey: "random", // your can update your jwt secret from here
  },
});
```

## Use authorization in custom routes

```js
const { generateAuthToken, makeAuth } = require("@hydyco/auth");
```

You can use `makeAuth` as route middleware to make your route authorized.

```js
router.post(defaultPath + "/auth", makeAuth, async (request, response) => {});
```

You can use `generateAuthToken` to generate a valid token for authentication
It takes two parameters as input

- payload - data required to generate the token, keep it similar across the app to generate a valid token
- secret - jwt secret to generate the token, keep it similar across the app to generate a valid token

```js
const token = generateAuthToken(user, "random");
```

## Access user from request

You can access user info directly from request itself. If you are having a authorized route

```js
authorizedRoute(request,response){
    const {user} = request; // access all user info
}
```

## Mongoose auth plugin

> Hydyco core uses this plugin by default, so no need to use it manually. You need to use this when you are manually updating the user schema.

Auth also exports a mongoose plugin that handles password hashing and comparison

```js
const { authMongoosePlugin } = require("@hydyco/auth");
const userSchema = new HydycoModel("user").mongooseSchema();

userSchema.plugin(authMongoosePlugin);
```

- By doing this, now any new record getting created will hash the password by it self.

- Plus this will expose a helper method `comparePassword` to compare password, generally while making a user auth.

```js
const user = new HydycoModel("user").mongooseModel();

user.comparePassword(req.body.password, (err, isMatch) => {
  if (err) {
    console.log(err);
  }
  if (isMatch) {
    console.log("Password Matched");
  }
});
```
