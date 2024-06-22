import express from "express";
import path from "path";
import mongoose from "mongoose";
import { error } from "console";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

//MongoDB start
//connect database
mongoose
  .connect("mongodb://localhost:27017/", {
    dbName: "practice",
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Error");
  });

//create schema for adding data to our collection(table)

const messageschema = new mongoose.Schema({
  name: String,
  email: String,
});

//Creating Model (used to calling the collection)
const Message = mongoose.model("message", messageschema); //it will create the scema as messages (it alws add s in the last)(e.g-abc->abcs)

const server = express(); //create server

//                                               -------------------------static folder-------------------------

server.use(express.json()); //middleware to update db

server.use(express.static(path.join(path.resolve(), "public"))); //make the public folder to static
server.use(express.urlencoded({ extended: true })); //middleware use for post form body

// const user=[];  //empty array

// console.log(path.join(path.resolve(),"public"));  get the proper path of public folder

//                                               ----------------------------for dynamic folder------------------

server.set("view engine", "ejs");
// server.get("/",(req,res)=>{
//     res.render("index",{name:"Akash Giri"});
// });

// server.get("/",(req,res)=>{
//     // res.render("index.ejs",{name:"Akash Giri"})
// })

server.get("/success", (req, res) => {
  res.render("success.ejs");
});

server.get("/user", (req, res) => {
  res.json({ user });
});
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

server.post("/contact", async (req, res) => {
  await Message.create({ name: req.body.name, email: req.body.email }); //here we are storing our data in DB
  res.redirect("success");
});
//Read

server.get("/userdetails", async (req, res) => {
  const dbData = await Message.find();
  res.send(dbData);
});

//Update

server.put("/update/:name", async (req, res) => {
  const { name } = req.params;
  const data = req.body;
  console.log(name);
  let response = await Message.updateOne({ name }, { ...data });
  res.send(response);
});

//Delete

server.delete("/deletedetails", async (req, res) => {
  let data = req.body;
  let response = await Message.deleteMany(data);
  res.send(response);
});

///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// Authantication               ///////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

server.use(cookieParser()); //middleware

const Authonatication = (req, res, next) => {
  //this is own handler or we can say it is our own middleware
  const { token } = req.cookies;

  if (token) {
    next(); //it will refer to the next handler of "Authonatication"
  } else {
    res.render("login.ejs");
  }
};
server.get("/", Authonatication, (req, res) => {
  // res.render("login.ejs")
  console.log(req.cookies); //for cookies install (cookie-parser) i.e. npm i cookie-parser and then import cookieParser  from "cookie-parser"; use middleware server.use(cookieParser());

  
  const { token } = req.cookies;
  if(token){
    const decodeToken=jwt.verify(token,"qwertyhjdggdjsgjfdfdf")
    console.log(decodeToken);
  }
  
  if (token) {
    res.render("logout.ejs");
  } else {
    res.render("login.ejs");
  }
});

//set cookies
server.post("/login", async (req, res) => {
  console.log(req.body);


  const userDataafterinsrt = await user.create(req.body); //Datas are store in userData

  console.log(userDataafterinsrt);

  const token=jwt.sign({_id:userDataafterinsrt._id},"qwertyhjdggdjsgjfdfdf");  //JsonWebToken.sign  qwertyhjdggdjsgjfdfdf(random secreat key)
  console.log(token);
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });
  res.redirect("/");
});

server.get("/logout", (req, res) => {
  res.cookie("token", "null", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.redirect("/");
  // res.send("Hiii Boss")
});

///////////////// We will create a new schema in mongo also create a model

//create schema
const userschema = new mongoose.Schema({
  name: String,
  email: String,
});

//create model
const user = mongoose.model("user", userschema);

server.listen(5000, () => {
  console.log("server started MR.SKY");
});
