---
sidebar_position: 1
title: Routes
---

**Hydyco Routes** allow us to override core Routes functionality

## How it works ?

Hydyco Routes are set of express routes which provides all the crud operations by default

These routes can be defined from **[admin panel](/docs/admin/core/collectoins#create-new-schema)**, which will tell Hydyco to generate allowed routes.

`MongooseExpress` class is used under the hood to generate routes for **[Hydyco Server](/docs/framework/hydyco-core/server)**

## Generating routes manually

If you want to register routes manually you can do something like thing
and pass on to **[Hydyco Server Routes](/docs/framework/hydyco-core/server#register-routes)**

```js
const cart = new MongooseExpress("cart");

server.registerRoutes([cart]);
```

## Main Methods

> Methods can be managed from **[admin panel](/docs/admin/core/collectoins#create-new-schema)**

### list

List out all the data

```js
list(request, response, mongooseModel, [helperMongooseModel]);
```

### create

Create data

```js
create(request, response, mongooseModel, [helperMongooseModel]);
```

### read

Read data

```js
read(request, response, mongooseModel, [helperMongooseModel]);
```

### update

Update data

```js
update(request, response, mongooseModel, [helperMongooseModel]);
```

### delete

Delete data

```js
delete (request, response, mongooseModel, [helperMongooseModel]);
```

### deleteAll

Delete all data

```js
deleteAll(request, response, mongooseModel, [helperMongooseModel]);
```

All methods except same arguments

```js
// complete example
 async read(req, res, Cart, [CartItem]) {
    try {
      const cart = await Cart.findById(req.params.id).lean();
      const cartItems = await CartItem.find({
        cart: cart._id,
        orderPlaced: false,
      }).lean();
      cart.items = cartItems;
      return res.send({ cart });
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  }
```

## Route Helper Methods

### before

`before method` runs before every request. Before can be treated as pre middleware that will get execute before every request made in `HydycoRoutes`.

> request has special attribute **methodCall** - which is basically the current method which will get executed, rest remains the same

| Params               | Description                                        |
| :------------------- | :------------------------------------------------- |
| request              | express request, includes **methodCall**           |
| response             | express response                                   |
| next                 | express next function, to forward the request call |
| MongooseModel        | working mongoose model                             |
| HelperMongooseModels | helper mongoose models                             |

```js
  async before(req, res, next, MongooseModel,[helperModel]) {
    if (req.methodCall === "update") {
      if (req.body.count === 0) {
        await MongooseModel.findByIdAndDelete(req.params.id);
        return res.send({ status: true, message: "Item Removed" });
      }
      return next();
    }
    if (req.methodCall === "create") {
      req.body.orderPlaced = false;
      return next();
    }

    if (req.methodCall === "list") {
      req.query.filter.orderPlaced = false;
      return next();
    }

    next();
  }
```

## Adding Route Middleware

```js
cart.addMiddleware("list", (req, res, next) => {
  next();
});
```

```js
const { MongooseExpress } = require("@hydyco/mongoose-plugin");

class CartRoutes extends MongooseExpress {
  constructor() {
    super("cart", ["cartItem"]);
  }

  async read(req, res, Cart, [CartItem]) {
    try {
      const cart = await Cart.findById(req.params.id).lean();
      const cartItems = await CartItem.find({
        cart: cart._id,
        orderPlaced: false,
      }).lean();
      cart.items = cartItems;
      return res.send({ cart });
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  }
}
```
