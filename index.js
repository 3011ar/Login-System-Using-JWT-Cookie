const express = require('express'); // getting express from our node_molues
const path = require('path');
const app = express(); // calling our express function here
const mysql = require('mysql'); // getting mysql from node_molues
const dotenv = require('dotenv'); // getting dotenv from node_modules
const cookieParser = require('cookie-parser');

dotenv.config({ path : './.env'}) // as we dont want to share our database user and pass so .env ( we can name it as any like xyz.env its just it should have extension of .env)
const PORT = process.env.PORT || 3002; // creating a port where our server should start


//creating connection with our databae
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST, // we are running our database on locally so local host , if it wasn't local host add the api here
    user: process.env.DATABASE_USER, // user is root
    password: process.env.DATABASE_PASSWORD, // passwd
    database: process.env.DATABASE // add here database name
});


//connecting our databse and checking everything works fine

db.connect( (error)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log("MySQL database connected.....")
    }
})


const publicDirectory = path.join(__dirname , './public');
app.use(express.static(publicDirectory));

// console.log(__dirname)


//parse URL-encoded bodies ( as sent by HTML forms )
app.use(express.urlencoded({ extended : false }));

//pasrse JSON bodies( as sent by API clients )
app.use(express.json());


app.use(cookieParser());

//setting our view engine , it will allows how we render our html
// app.set('view engine' , 'ejs');
// app.set('view engine', 'ejs');
app.set('view engine', 'hbs');


//define routes

app.use('/' , require('./routes/pages'));
// app.use('/register' , require('./routes/pages'));
app.use('/auth' , require('./routes/auth'))


//listening our express() here
app.listen(PORT , () => {
    console.log(`Server started on Port :  ${PORT}`)
});


// <!-- <% if (message) { %>
//     <h4 class="alert alert-danger mt-4"><% message %></h4>
// <%}%> -->