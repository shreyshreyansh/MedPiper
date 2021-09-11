# Medpiper backend coding round

This project consist of rest API's build in node-js using express and mongo-db for APIs for 
- Users to signup as new user, login, and logout 
- Password are encrypted before saving using the Bcrypt library
- User session is maintained on the frontend level using JWT token
- User is able to update his name, password and upload his profile picture
- After logging in the user is able to create a new board and delete an existing board
- Inside the board, the user is able to implement CRUD functionality for a to-do list
- User can also change the status of the list item as - Todo, Doing, and Done

---
## Requirements

For development, you will need Node.js and a node global package, Yarn, installed in your environement and many other packages also which are stated further

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###
### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

    
## packages you need to install
```
  express
  mongoose
  body-parser
  cookie-parser
  bcrypt
  jsonwebtoken
  passport
  passport-jwt
  nodemon
  
```
for installing the above packages you have to run the below command

```
  npm install <package_name>
  
```

## Running the project

    $ yarn start

## Simple build for production

    $ yarn build
