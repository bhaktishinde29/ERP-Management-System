const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({

name:{
 type:String,
},

email:{
 type:String,
 unique:true,
},

password:{
 type:String,
},

role:{
 type:String,
 enum:["admin","hr","employee"],
 default:"employee",
},


department:{
 type:String,
},


designation:{
 type:String,
},


phone:{
 type:String,
},


salary:{
 type:Number,
},


},
{
timestamps:true
});


module.exports = mongoose.model("User",userSchema);