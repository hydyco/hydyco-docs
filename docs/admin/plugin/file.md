---
sidebar_position: 1
title: File Management
---

# File Management

## Intro

Manage your file assets here. You can see all your uploaded assets here, which can be of any type.

![file-management](https://raw.githubusercontent.com/iamrahultanwar/hydyco-preview/master/v1/7.png)

## Features

- Upload assets from UI
- Remove assets
- Bulk Upload
- Bulk Delete

## How it works ?

File management plugin under the hood is `express middleware` which uses `multer` to store assets in file disk.

If you want to upload your assets you can basically make a api call like this

```shell
curl --location --request POST 'https://demo.hydyco.com/admin/file/manual' \
--form 'manual=@"/Users/rt/Desktop/Screenshot 2021-08-15 at 6.16.49 PM.png"'
```

which is return will give you the asset id.

File is consist these fields

<img src="/img/admin/core/fileType.png" width="300" />

Add to access the assets, you can the path stored with asset.

```
https://demo.hydyco.com/*admin/file/get/1628449258410-994352432-10.jpg*
```
