const express = require("express");

const router = express.Router();

const Employee = require("../models/Employee");
const Attendance = require("../models/Attendance");
const Leave = require("../models/Leave");
const Payroll = require("../models/Payroll");



// GET ANALYTICS DATA

router.get("/", async (req,res)=>{


try{


// Total Employees

const employees = await Employee.countDocuments();



// Today's Attendance

const today = new Date();

today.setHours(0,0,0,0);


const presentToday = await Attendance.countDocuments({

date:{
$gte:today
},

status:"Present"

});




// Leave Data

const approvedLeaves = await Leave.countDocuments({

status:"Approved"

});


const pendingLeaves = await Leave.countDocuments({

status:"Pending"

});


const rejectedLeaves = await Leave.countDocuments({

status:"Rejected"

});




// Payroll

const payrollData = await Payroll.find();

let totalPayroll = 0;


payrollData.forEach(item=>{

totalPayroll += item.salary || 0;

});




// Monthly Payroll

const monthlyPayroll = [

{
month:"Jan",
salary:120000
},

{
month:"Feb",
salary:98000
},

{
month:"Mar",
salary:143000
},

{
month:"Apr",
salary:118000
},

{
month:"May",
salary:156000
},

{
month:"Jun",
salary:138000
}

];





res.json({

employees,

presentToday,

approvedLeaves,

pendingLeaves,

rejectedLeaves,

totalPayroll,

monthlyPayroll

});



}

catch(error){


console.log(error);


res.status(500).json({

message:"Analytics Error",

error:error.message

});


}


});



module.exports = router;