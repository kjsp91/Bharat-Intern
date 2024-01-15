const mongoose = require('mongoose');
const formSchema = new mongoose.Schema({
    title:String,
    post:String,
    author:String,
    date:Date,
    image:String
});
const form = mongoose.model("Form",formSchema);
module.exports=form;