import express from "express";
import path from "path";
const server=express();

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

// server.post("/",(req,res)=>{
//     // console.log(req.body);
//     // res.send(req.body);
//     user.push({username:req.body.name,email:req.body.email})
//     console.log(user)
//     // res.render("success")
//     res.redirect("success");
// })

server.post("/contact",(req,res)=>{
    
    user.push({username:req.body.name,email:req.body.email})
    console.log(user)
    
    res.redirect("success");
})



server.listen(5000,()=>{
    console.log("server started MR.SKY");
})