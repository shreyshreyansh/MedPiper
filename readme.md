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

## Features snapshot

- Login a user <br/><br/>
  - ![Screenshot-2021-09-13-085413](https://user-images.githubusercontent.com/53744971/133021351-b65f2bef-53ed-4976-9d1c-66cee53039e4.jpg) <br/><br/>
- Register page for the user <br/><br/>
  - ![registerPhoto](https://user-images.githubusercontent.com/53744971/133021128-7119f40d-a663-476b-bd6a-06af4827c322.jpg) <br/><br/>
- Home page of the user <br/><br/>
  - ![homePhoto](https://user-images.githubusercontent.com/53744971/133021168-93861e8e-11ac-4bf7-9816-9a730321309b.jpg) <br/><br/>
- Board page of the user <br/><br/>
  - ![boardPhoto](https://user-images.githubusercontent.com/53744971/133021198-eefc778c-2285-46ff-ab45-dca640a9d725.jpg) <br/><br/>
- Settings page of the user <br/><br/>
  - ![settingsPhoto](https://user-images.githubusercontent.com/53744971/133021221-6e6d8f7c-47af-443e-bee9-2dcdfb0c50ba.jpg) <br/><br/>
- Auth token is stored in local storage of the browser <br/><br/>
  - ![authPhoto](https://user-images.githubusercontent.com/53744971/133021252-48277eb1-04fe-4527-b59f-c914d1d43bb7.jpg)


## Features Video Snapshots

  [See Video snapshots](https://drive.google.com/drive/folders/1qFJjxlrjGQB9OZTtbe3F34xKa4rIFNoZ?usp=sharing)


