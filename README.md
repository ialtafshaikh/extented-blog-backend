
# Blog Backend REST API SERVER

A Blog backend built using express server in NodeJS and  mongoDB atlas is used to store the data 

## Getting Started

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
/blogs?author&random - query this endpoint to get all the property based blogs
/blogs/id : (method:get) - to get a single blog of using _id (mongoose id)
```

## Steps to Host on Heroku

[refer this gist](https://gist.github.com/ialtafshaikh/8336df5d417109b12c46bd20ccda4e17)


## Author

* **Altaf Shaikh** - *work by* - [ialtafshaikh](https://github.com/ialtafshaikh)

![altaf shaikh](https://raw.githubusercontent.com/ialtafshaikh/static-files/master/coollogo_com-327551664.png)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
