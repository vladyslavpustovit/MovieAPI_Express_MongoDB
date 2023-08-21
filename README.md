# Movie API
## Install required packages
```
npm install express mongoose cors jsonwebtoken mongoose-unique-validator bcryptjs
```
## Install dotenv package as dev dependency
```
npm install dotenv -D --save
```
## Install nodemon for changes live reload
```
npm install nodemon -D --save
```
## package.json scripts
```
"scripts": {
"start": "node app.js",
"dev": "nodemon app.js",
},
```
## Create .env file and set up sensitive data in there, then import to the app
```
require('dotenv').config()
```
## Connect MongoDB to the project
```
const mongoose = require('mongoose');

module.exports = ()=>{
    mongoose.connect(process.env.DB_URL)
        .then(() => console.log('DB connected.'))
        .catch(e => console.log(e))
}
```