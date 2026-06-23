const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcrypt");

const User = require("./models/User");

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
app.get('/about',(req,res)=>{
    res.send("About Route");
});

// User Route
app.get('/users',async (req,res)=>{
    try{

        const users = await User.find();
        res.json(users);

    }catch(error){
        console.log(error);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
});

app.get("/users/:id", async (req,res)=>{

    try{

        const user = await User.findById(req.params.id);

        if(!user){

            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);

    }catch(error){

        console.log(error);

        res.status(500).json({
            message: "Something went wrong"
        });

    }
    

});

app.get('/create-user',async (req,res)=>{

        try{
            const user = await User.create({
                username:"Senindu",
                email:"senindu@gmail.com"
            });

            res.status(201).json(user);

        }catch(error){
            console.log(error);
            res.status(500).json({
                message: "Something went wrong",
            });
        }
});


app.get("/user-by-email",async (req,res)=>{

    try{
  
        const user = await User.findOne({
            email:req.query.email,    
        });

        res.json(user);

    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "Something went wrong"
        });
    }
});



app.get("/user-by-username", async(req,res)=>{

    try{

         const user = await User.findOne({
            username:req.query.username,
        });

        


        if(!user){
            return res.status(404).json({
                message: "User not found"
            });
        }


        res.json(user);





    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "Something went wrong"
        });
    }
   
});
    


app.post("/users",async(req,res)=>{
    try{
        const user = await User.create({
            username:req.body.username,
            email:req.body.email
        });

        res.status(201).json(user);

    }catch(error){

        console.log(error);

        res.status(500).json({
            message: "Something went wrong"
        });

    }

});

app.post("/register", async(req,res)=>{

    try{

        const hashedPassword = await bcrypt.hash(
            req.body.password,
            10
        );

        const user = await User.create({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
        });

        res.status(201).json(user);

    }catch(error){

        console.log(error);

        res.status(500).json({
            message:"Something went wrong",
        });

    }


});






mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("MongoDB conncted");

        app.listen(5000,()=>{
            console.log("Server is running on port 5000");
        });
    })
    .catch((err)=>{
        console.log("Error connecting to MongoDB");
        console.log(err);
    });
