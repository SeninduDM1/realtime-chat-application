const express = require('express');
const app = express();

// Middelware
app.use((req,res,next)=>{
    console.log("Request Recieved");
    next();
});

// Home Route
app.get('/',(req,res)=>{
    res.send("Home Route");
});

// About Route
app.get('/about',()=>{
    res.send("About Route");
});

// User Route
app.get('/users',(req,res)=>{
    res.json({
        users:["Senindu","Alex","John"]
    });
});

app.listen(5000,()=>{
    console.log("Server started on port 5000");
});