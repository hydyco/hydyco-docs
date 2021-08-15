---
sidebar_position: 2
title: Collections
---

# Collections

## Intro

Collections provides the most useful feature. i.e **creating schema**. Creating schema also creates all crud operations by default.

## How to

### Create new schema

Click on `Create new`

<img src="/img/admin/core/newCollection.png"  />

- **Collection Name** - name of the collection
- **Show on data flow?** - if disable it will be treated as hidden collection, and can only be accessed through code.
- **Allowed Operations** - all allowed operation on the collection, disabling will not create that particular operation.

### Add new schema field

Click on `Add new field`

<img src="/img/admin/core/schemaTypes.png"  />

There are multiple Types available to select from. More will be available in future. There are options available to extend the type features.

> Types

- **String** - String type
- **Boolean** - Boolean type
- **Number** - Number type
- **Ref** - Define relationship between collections.
  - hasMany - many to many relationship
  - hasOne - one to one relationship
- **Date** - Date type
- **File** - File type allows to upload assets , its build on top of **Ref**
- **JSON** - JSON type , you can dump any json data
