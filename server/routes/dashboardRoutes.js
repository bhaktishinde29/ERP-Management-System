const express = require("express");

const router = express.Router();


const User = require("../models/User");
const Attendance = require("../models/Attendance");
const Leave = require("../models/Leave");
const Payroll = require("../models/Payroll");


const {
    protect,
    authorize
} = require("../middleware/authMiddleware");




// ======================================
// ADMIN DASHBOARD
// ADMIN ONLY
// ======================================


router.get(
"/admin",
protect,
authorize("admin"),

async(req,res)=>{


try{


const today =
new Date().toLocaleDateString();




// Total Employees

const totalEmployees =
await User.countDocuments({

role:"employee"

});





// Present Today

const presentToday =
await Attendance.countDocuments({

status:"Present",

date:today

});





// Absent Today

const absentToday =
await Attendance.countDocuments({

status:"Absent",

date:today

});





// Pending Leaves

const pendingLeaves =
await Leave.countDocuments({

status:"Pending"

});





// Payroll Total

const payroll =
await Payroll.find();



const totalPayroll =

payroll.reduce(

(sum,item)=>

sum + Number(item.netSalary || 0),

0

);





res.json({

totalEmployees,

presentToday,

absentToday,

pendingLeaves,

totalPayroll

});




}

catch(err){


console.log(err);


res.status(500).json({

message:err.message

});


}



}

);









// ======================================
// HR DASHBOARD
// ADMIN + HR
// ======================================


router.get(

"/hr",

protect,

authorize("admin","hr"),


async(req,res)=>{


try{


const today =
new Date().toLocaleDateString();





const totalEmployees =

await User.countDocuments({

role:"employee"

});





const presentToday =

await Attendance.countDocuments({

status:"Present",

date:today

});






const absentToday =

await Attendance.countDocuments({

status:"Absent",

date:today

});





const pendingLeaves =

await Leave.countDocuments({

status:"Pending"

});







const payroll =

await Payroll.find();





const totalPayroll =

payroll.reduce(

(sum,item)=>

sum + Number(item.netSalary || 0),

0

);








const employees =

await User.find({

role:"employee"

});





const departments =

[

...new Set(

employees

.map(emp=>emp.department)

.filter(Boolean)

)

].length;







res.json({


totalEmployees,

presentToday,

absentToday,

pendingLeaves,

totalPayroll,

departments


});




}

catch(err){


console.log(err);


res.status(500).json({

message:err.message

});


}



}


);









// ======================================
// EMPLOYEE DASHBOARD
// EMPLOYEE ONLY
// ======================================


router.get(

"/employee/:id",

protect,


async(req,res)=>{


try{



const userId =
req.params.id;






// Security check

if(

req.user.role==="employee"

&&

req.user._id.toString()
!==
userId

){

return res.status(403).json({

message:
"Access denied"

});

}







const employee =

await User.findById(userId)

.select("-password");






if(!employee){


return res.status(404).json({

message:
"Employee not found"

});


}








const attendance =

await Attendance.find({

userId:userId

})

.sort({

createdAt:-1

});








const leaves =

await Leave.find({

userId:userId

})

.sort({

createdAt:-1

});








const payroll =

await Payroll.findOne({

employeeId:userId

})

.sort({

createdAt:-1

});








res.json({

employee,

attendance,

leaves,

payroll

});




}

catch(err){


console.log(err);


res.status(500).json({

message:err.message

});


}



}


);







module.exports = router;