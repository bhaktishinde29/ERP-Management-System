const express = require("express");

const router = express.Router();


const Payroll =
require("../models/Payroll");


const User =
require("../models/User");


const Attendance =
require("../models/Attendance");



const {
protect,
authorize
}
=
require("../middleware/authMiddleware");





// =======================================
// GENERATE PAYROLL
// ADMIN + HR ONLY
// =======================================


router.post(
"/generate",
protect,
authorize("admin","hr"),

async(req,res)=>{


try{


const {

employeeId,

month,

year

}=req.body;




if(
!employeeId ||
!month ||
!year
){

return res.status(400).json({

message:
"Employee, month and year required"

});

}




// Find employee


const employee =
await User.findById(employeeId);





if(!employee){


return res.status(404).json({

message:
"Employee not found"

});


}





// ===============================
// Attendance Calculation
// ===============================



const attendance =
await Attendance.find({

userId:employeeId

});




const monthlyAttendance =

attendance.filter((item)=>{


const date =
new Date(item.date);



return (

date.getMonth()+1
===
Number(month)

&&

date.getFullYear()
===
Number(year)

);


});





const presentDays =

monthlyAttendance.filter(

(item)=>

item.status==="Present"

).length;





const absentDays =

monthlyAttendance.filter(

(item)=>

item.status==="Absent"

).length;





const workingDays = 30;





// ===============================
// Salary Calculation
// ===============================



const basicSalary =
employee.salary || 0;




const perDaySalary =

basicSalary / workingDays;




const deduction =

Math.round(
absentDays * perDaySalary
);





const netSalary =

basicSalary - deduction;





// Check duplicate payroll


const existing =

await Payroll.findOne({

employeeId,

month,

year

});





if(existing){


return res.status(400).json({

message:
"Payroll already generated for this month"

});


}





const payroll =

new Payroll({

employeeId,

employeeName:
employee.name,

email:
employee.email,


month,

year,


basicSalary,


workingDays,


presentDays,


absentDays,


deduction,


netSalary



});






await payroll.save();





res.status(201).json({

message:
"Payroll generated successfully",

payroll


});



}


catch(err){


console.log(err);


res.status(500).json({

message:err.message

});


}



});
// =======================================
// GET ALL PAYROLL
// ADMIN + HR ONLY
// =======================================


router.get(
"/",
protect,
authorize("admin","hr"),

async(req,res)=>{


try{


const payroll =

await Payroll.find()

.populate(
"employeeId",
"name email department designation"
)

.sort({

createdAt:-1

});



res.json(payroll);



}

catch(err){


console.log(err);


res.status(500).json({

message:err.message

});


}



});







// =======================================
// UPDATE PAYROLL STATUS
// ADMIN + HR ONLY
// =======================================


router.put(
"/:id",

protect,
authorize("admin","hr"),

async(req,res)=>{


try{


const {

status

}=req.body;



const payroll =

await Payroll.findByIdAndUpdate(

req.params.id,

{

status

},

{

new:true

}

);





if(!payroll){


return res.status(404).json({

message:
"Payroll not found"

});


}




res.json({

message:
"Payroll status updated",

payroll

});



}


catch(err){


console.log(err);


res.status(500).json({

message:err.message

});


}



});









// =======================================
// DELETE PAYROLL
// ADMIN ONLY
// =======================================


router.delete(

"/:id",

protect,

authorize("admin"),


async(req,res)=>{


try{


const payroll =

await Payroll.findByIdAndDelete(

req.params.id

);





if(!payroll){


return res.status(404).json({

message:
"Payroll not found"

});


}





res.json({

message:
"Payroll deleted successfully"

});



}


catch(err){


console.log(err);


res.status(500).json({

message:err.message

});


}



});
// =======================================
// EMPLOYEE VIEW OWN PAYROLL
// =======================================


router.get(

"/my",

protect,


async(req,res)=>{


try{


const payroll =

await Payroll.find({

employeeId:req.user._id

})

.sort({

createdAt:-1

});





res.json(payroll);



}

catch(err){


console.log(err);



res.status(500).json({

message:err.message

});


}



});





// =======================================
// EMPLOYEE VIEW SINGLE PAYSLIP
// =======================================


router.get(

"/my/:id",

protect,


async(req,res)=>{


try{


const payroll =

await Payroll.findOne({

_id:req.params.id,

employeeId:req.user._id

});





if(!payroll){


return res.status(404).json({

message:
"Payroll record not found"

});


}





res.json(payroll);



}

catch(err){


console.log(err);



res.status(500).json({

message:err.message

});


}


});
module.exports = router;
