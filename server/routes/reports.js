const PDFDocument = require("pdfkit");

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
// GET REPORT SUMMARY
// ADMIN + HR ONLY
// ======================================


router.get(

"/",

protect,

authorize("admin","hr"),


async(req,res)=>{


try{


// ==============================
// EMPLOYEE REPORT
// ==============================


const employees =

await User.countDocuments({

role:"employee"

});






// ==============================
// ATTENDANCE REPORT
// ==============================


const attendance =

await Attendance.countDocuments();





const present =

await Attendance.countDocuments({

status:"Present"

});





const absent =

await Attendance.countDocuments({

status:"Absent"

});







// ==============================
// PAYROLL REPORT
// ==============================


const payrollData =

await Payroll.find();





const payroll =

payrollData.reduce(

(sum,item)=>{


return sum +

Number(item.netSalary || 0);


},

0

);







// ==============================
// LEAVE REPORT
// ==============================


const leaves =

await Leave.countDocuments();







res.json({

employees,

attendance,

present,

absent,

payroll,

leaves

});






}


catch(err){


console.log(
"Report Error:",
err
);



res.status(500).json({

message:err.message

});


}


}



);





// ======================================
// DOWNLOAD EMPLOYEE PDF REPORT
// ======================================


router.get(

"/employee/pdf",

protect,

authorize("admin","hr"),


async(req,res)=>{


try{


const employees = await User.find({

role:"employee"

});




const doc = new PDFDocument();



res.setHeader(

"Content-Type",

"application/pdf"

);


res.setHeader(

"Content-Disposition",

"attachment; filename=Employee_Report.pdf"

);



doc.pipe(res);





doc.fontSize(20)

.text(

"ERP MANAGEMENT SYSTEM",

{

align:"center"

}

);



doc.moveDown();



doc.fontSize(16)

.text(

"Employee Report"

);





doc.moveDown();



employees.forEach((emp,index)=>{


doc.fontSize(12)

.text(

`${index+1}. ${emp.name}

Email: ${emp.email}

Department: ${emp.department || "-"}

Designation: ${emp.designation || "-"}

Salary: ₹${emp.salary || 0}

`

);


doc.moveDown();


});





doc.end();



}

catch(err){


res.status(500).json({

message:err.message

});


}


}


);
// ======================================
// DOWNLOAD ATTENDANCE PDF REPORT
// ======================================

router.get(
"/attendance/pdf",
protect,
authorize("admin","hr"),

async(req,res)=>{

try{

const attendance = await Attendance.find()
.populate("userId","name email");

const doc = new PDFDocument();

res.setHeader(
"Content-Type",
"application/pdf"
);

res.setHeader(
"Content-Disposition",
"attachment; filename=Attendance_Report.pdf"
);

doc.pipe(res);

doc.fontSize(20)
.text("ERP MANAGEMENT SYSTEM",{align:"center"});

doc.moveDown();

doc.fontSize(16)
.text("Attendance Report");

doc.moveDown();

attendance.forEach((item,index)=>{

doc.fontSize(12)
.text(

`${index+1}. ${item.userId?.name || "Unknown"}

Email : ${item.userId?.email || "-"}

Date : ${item.date}

Status : ${item.status}

Time : ${item.time || "-"}

`
);

doc.moveDown();

});

doc.end();

}

catch(err){

console.log(err);

res.status(500).json({

message:err.message

});

}

});

// ======================================
// DOWNLOAD PAYROLL PDF REPORT
// ======================================

router.get(
"/payroll/pdf",
protect,
authorize("admin","hr"),

async(req,res)=>{

try{

const payroll = await Payroll.find();

const doc = new PDFDocument();

res.setHeader(
"Content-Type",
"application/pdf"
);

res.setHeader(
"Content-Disposition",
"attachment; filename=Payroll_Report.pdf"
);

doc.pipe(res);

doc.fontSize(20)
.text("ERP MANAGEMENT SYSTEM",{align:"center"});

doc.moveDown();

doc.fontSize(16)
.text("Payroll Report");

doc.moveDown();

payroll.forEach((item,index)=>{

doc.fontSize(12)
.text(

`${index+1}. ${item.employeeName}

Email : ${item.email}

Month : ${item.month}/${item.year}

Basic Salary : ₹${item.basicSalary}

Working Days : ${item.workingDays}

Present Days : ${item.presentDays}

Absent Days : ${item.absentDays}

Deduction : ₹${item.deduction}

Net Salary : ₹${item.netSalary}

Status : ${item.status}

`
);

doc.moveDown();

});

doc.end();

}

catch(err){

console.log(err);

res.status(500).json({

message:err.message

});

}

});
module.exports = router;