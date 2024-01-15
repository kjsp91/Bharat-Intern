var express = require('express');
var bp = require('body-parser')
var cors = require('cors')
var app = express();

app.use(bp.urlencoded({extended:true}));
app.use(cors());
app.use(express.static(__dirname+"/public"));

const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/register");
const studSchema = new mongoose.Schema({
    name : String,
    email : String,
    pass : String,
    cpass : String
});
const Stud = mongoose.model("Student",studSchema);

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})
app.post("/submit",(req,res)=>{
    n1 = req.body.name;
    n2 = req.body.email;
    n3 = req.body.pass;
    n4 = req.body.cpass;
    const student = new Stud({
        name : n1,
        email : n2,
        pass: n3,
        cpass: n4
    });
    if(n1!='' && n2!='' && n3!='' && n4!=''){
    student.save().then(()=>{
        res.sendFile(__dirname+"/success.html")
    }).catch((err)=>{
        console.log(err)
    })
  }
 else{
    res.send("Try Again")
 }
})
app.listen(5656,()=>{
    console.log("Server started")
})