const mongoose = require("mongoose");


const attendanceSchema = new mongoose.Schema(

{

userId:{

type:mongoose.Schema.Types.ObjectId,

ref:"User",

required:true

},


status:{

type:String,

enum:[
"Present",
"Absent"
],

required:true

},


date:{

type:String,

required:true

},


time:{

type:String

}

},

{
timestamps:true
}

);


module.exports =
mongoose.model(
"Attendance",
attendanceSchema
);