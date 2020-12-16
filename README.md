
# Blog Backend

A Blog backend built using express server, mongoDB atlas is used to store the data 

## Getting Started

### Downloading and Running this Project Locally
1. clone the repository
```
git clone https://github.com/ialtafshaikh/blog-backend.git
```
2. add a ``.env`` file inside the root folder
```
DATABASE_URL=local_moongodb
PORT=3000
```

### Supported Routes

```
/blogs : (method:get) - to get all blogs 
/blogs : (method:post) - to post blog
/blogs?author&random - query this endpoint to get all the property based blogs
/todos/id : (method:get) - to get a single blog of using _id (mongoose id)
```

## Author

* **Altaf Shaikh** - *work by* - [ialtafshaikh](https://github.com/ialtafshaikh)

![altaf shaikh](https://raw.githubusercontent.com/ialtafshaikh/static-files/master/coollogo_com-327551664.png)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
