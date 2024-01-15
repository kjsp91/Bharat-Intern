var express = require('express');
var bp  = require('body-parser');
var mongoose = require('mongoose')
var app = express();
app.use(bp.urlencoded({extended:true}));
app.use(bp.json());
// app.use(express.static("public"));
app.use("/", express.static(__dirname));
app.set('view engine','ejs')
const url = 'mongodb://127.0.0.1:27017/blog';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
const form = require('./collections/createPost');

db.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err);
});

db.once('open', () => {
    console.log('Connected successfully to MongoDB');
});
 

app.get("/",(req,res)=>{
    form.find().then((data)=>{
        // console.log("Data : "+data);
        res.render('index.ejs',{details:data})
    }).catch((err)=>{
        console.log(err)
    });
})
app.get("/new",(req,res)=>{
    res.render('create.ejs');
})
app.post("/submit",(req,res)=>{
    const data = new form ({
        title : req.body.title,
        post : req.body.post,
        author : req.body.author,
        date : req.body.date,
        image : req.body.image
    })
    data.save();
    res.redirect("/");
})
app.get("/edit:id",(req,res)=>{
    form.findById(req.params.id).then((data)=>{
        res.render('modify.ejs',{result:data})
    }).catch((err)=>{
        console.log(err)
    })
})
app.post("/editing:id",(req,res)=>{
        form.updateOne({_id:req.params.id},{
            title:req.body.title,
            post : req.body.post,
            author : req.body.author,
            date : req.body.date,
            image : req.body.image
        }).then((data)=>{
            res.redirect("/")
        })
        .catch((err)=>{
        console.log(err)
    }) 
})
app.get("/delete:id",(req,res)=>{
    form.findByIdAndDelete(req.params.id).then((data)=>{
        // console.log("deleted : "+data);
        res.redirect("/");
    }).catch((err)=>{
        console.log(err);
    });
})
app.listen(7878);