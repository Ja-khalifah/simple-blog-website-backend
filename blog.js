const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

var corsOptions = {
    origin: 'http://localhost:8080'
    // origin: 'https://codetechweb.com'
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: true}));
//parse requests of content-type application/json
app.use(bodyParser.json());

//database
const db = require("./app/model");
const Role = db.role;

// db.sequelize.sync();
//force: true. it will drop the table if it already exists
db.sequelize.sync({force: true}).then(() =>{
    console.log('Drop and Resync Database with {force: true}');
    initial();
});

//route
app.get("/", (req, res) => {
    res.json({message: "Welcome to codetech blog"});
});

//set port, listen to requests
const PORT = process.env.PORT || 4800;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

function initial(){
    Role.create({
        id: 1,
        name: "user"
    });
    Role.create({
        id: 2,
        name: "author"
    });
    Role.create({
        id: 3,
        name: "admin"
    });
}