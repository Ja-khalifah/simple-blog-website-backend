const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const authRoutes = require('../routes/auth.routes');

const app = express();

var corsOptions = {
    origin: 'http://127.0.0.1:4800'
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: true}));
//parse requests of content-type application/json
app.use(bodyParser.json());

//database
const db = require("./app/model");
const Role = db.role;

db.sequelize.sync();
//force: true. it will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() =>{
//     console.log('Drop and Resync Database with {force: true}');
//     initial();
// });

//routes
app.get("/", (req, res) => {
    res.send("Welcome to a simple blog website");
});

require('./app/routes/auth.routes')(app);
require('./app/routes/category.routes')(app);
require('./app/routes/page.routes')(app);
require('./app/routes/post.routes')(app);
require('./app/routes/comment.routes')(app);

//set port, listen to requests
const PORT = process.env.PORT || 4800;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

function initial(){
    Role.create({
        id: 1,
        name: "editor"
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