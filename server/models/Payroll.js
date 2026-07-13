const mongoose = require("mongoose");


const payrollSchema =
new mongoose.Schema({

employeeId:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},


employeeName:{
type:String,
required:true
},


email:{
type:String,
required:true
},


month:{
type:String,
required:true
},


year:{
type:Number,
required:true
},


basicSalary:{
type:Number,
required:true
},


workingDays:{
type:Number,
default:0
},


presentDays:{
type:Number,
default:0
},


absentDays:{
type:Number,
default:0
},


deduction:{
type:Number,
default:0
},


netSalary:{
type:Number,
required:true
},


status:{
type:String,
enum:[
"Generated",
"Paid"
],
default:"Generated"
}


},
{
timestamps:true
});


module.exports =
mongoose.model(
"Payroll",
payrollSchema
);