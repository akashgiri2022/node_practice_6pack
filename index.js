import express from "express";
import path from "path";
import mongoose from "mongoose";
import { error } from "console";

//MongoDB start 
//connect database
mongoose.connect("mongodb://localhost:27017/",{  
    dbName:"practice"
}).then(()=>{
    console.log("Database connected")
}).catch((error)=>{
    console.log("Error")
})


//create schema for adding data to our collection(table)

const messageschema=new mongoose.Schema({
    name:String,
    email:String
});

//Creating Model (used to calling the collection)
const Message=mongoose.model("message",messageschema);//it will create the scema as messages (it alws add s in the last)(e.g-abc->abcs)



const server=express();  //create server

//                                               -------------------------static folder-------------------------



server.use(express.static(path.join(path.resolve(),"public"))); //make the public folder to static
server.use(express.urlencoded({extended:true}))  //middleware use for post form body 

const user=[];  //empty array

// console.log(path.join(path.resolve(),"public"));  get the proper path of public folder



//                                               ----------------------------for dynamic folder------------------


server.set("view engine","ejs");
// server.get("/",(req,res)=>{
//     res.render("index",{name:"Akash Giri"});
// });

server.get("/",(req,res)=>{   
    res.render("index.ejs",{name:"Akash Giri"});
})

server.get("/success",(req,res)=>{
    res.render("success.ejs");
})


server.get("/user",(req,res)=>{
    res.json({user});
})
//using mongo
// server.get("/add",(req,res)=>{
//     Message.create({name:"Akash Giri",email:"akashgiri2022@gmail.com"}).then(()=>{
//         res.send("<h1>Noiceeeeeeee</h1>")
//     })
// })

//another method (using async ,await method)

// server.get("/add",async(req,res)=>{
//     await Message.create({name:"Yogita Giri",email:"yogitagiri2022@gmail.com"})
// });

// server.post("/",(req,res)=>{
//     // console.log(req.body);
//     // res.send(req.body);
//     user.push({username:req.body.name,email:req.body.email})
//     console.log(user)
//     // res.render("success")
//     res.redirect("success");
// })

server.post("/contact",async(req,res)=>{
    await Message.create({name:req.body.name,email:req.body.email}); //here we are storing our data in DB
    res.redirect("success");
})

server.get("/userdetails",async(req,res)=>{
    const dbData=await Message.find();
    res.send(dbData);
})



server.listen(5000,()=>{
    console.log("server started MR.SKY");
})