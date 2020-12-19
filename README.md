
# Blog Backend REST API SERVER

A Blog backend built using express server in NodeJS and  mongoDB atlas is used to store the data and hosted on Heroku.

## Getting Started

- [Check the frontend application of the app](https://github.com/ialtafshaikh/blog-frontend)
- [Check the authentication backend code for the blog](https://github.com/ialtafshaikh/authentication-backend)

## Features

- get a list of all the blogs
- create a blog
- upload images to cloudinary or to local storage
- store data to mongoDB using atlas
- get blogs using Blog Id
- delete blog using blog Id
- update blog using Blog Id

## Additional Features

- used cloud storage cloudinary to upload and store the file
- used multer to accept multipart data
- dataURI to convert the buffer into readable stream support by clodinary
- authentication is done by the auth server and communication is done using axios api calls
- hosted in heroku platform

### Downloading and Running this Project Locally
1. clone the repository
```
git clone https://github.com/ialtafshaikh/blog-backend.git
```
2. add a ``.env`` file inside the root folder
```
DEBUG=false //set false to use atlas and true to use local mongodb
PORT=3000
STORAGE_TYPE=cloud // upload to cloudinary or set local to upload images to local server
LOCAL_DB_URL=mongodb://127.0.0.1:27017/localblogapp
DATABASE_URL=atlas url
STORAGE=local storage path
CLOUDINARY_CLOUD_NAME=your cloudinary cloud name
CLOUDINARY_API_KEY=your cloudinary api key
CLOUDINARY_API_SECRET=your cloudinary api secret
```

### Supported Routes

```
/blogs : (method:get) - to get all blogs 

/blogs : (method:post) - to post blog

/blogs?auther=value&select=title - query this endpoint to get all the blogs based on query and select filter

/blogs/id : (method:get) - to get a single blog using blogID

/blogs/id : (method:put) - to update post ``titile`` and ``content``  of a single blog using blogID

/blogs/id : (method:delete) - to delete blog using blogID

/signup : (method:post) - create user accout

/login : (method:post) - get jwt token and authenticate yourself using the creds (email,password)

/auth : to restrict the user from accessing the resources on route /blogs so send token in authorization header as bearer token


```

## Deployment

To Host the Project I had used **Heroku Platform**. 
To learn more [refer this gist](https://gist.github.com/ialtafshaikh/8336df5d417109b12c46bd20ccda4e17)


## Live Demo of this Project

[hosted backend server](https://extented-node-blog-backend.herokuapp.com/)

## Author

* **Altaf Shaikh** - *work by* - [ialtafshaikh](https://github.com/ialtafshaikh)

![altaf shaikh](https://raw.githubusercontent.com/ialtafshaikh/static-files/master/coollogo_com-327551664.png)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
