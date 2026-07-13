const express = require("express");
const router = express.Router();

const Leave = require("../models/Leave");

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");



// ==================================================
// EMPLOYEE APPLY LEAVE
// ==================================================

router.post(

"/",

protect,

async(req,res)=>{

try{

const {

reason,
fromDate,
toDate

}=req.body;


if(
!reason ||
!fromDate ||
!toDate
){

return res.status(400).json({

message:"All fields are required"

});

}


const leave = new Leave({

userId:req.user._id,

reason,

fromDate,

toDate

});


await leave.save();


res.status(201).json({

message:"Leave Applied Successfully",

leave

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




// ==================================================
// EMPLOYEE VIEW OWN LEAVES
// ==================================================

router.get(

"/my",

protect,

async(req,res)=>{

try{

const leaves =

await Leave.find({

userId:req.user._id

})

.sort({

createdAt:-1

});


res.json(leaves);

}

catch(err){

res.status(500).json({

message:err.message

});

}

}

);




// ==================================================
// ADMIN / HR VIEW ALL LEAVES
// ==================================================

router.get(

"/",

protect,

authorize("admin","hr"),

async(req,res)=>{

try{

const leaves =

await Leave.find()

.populate(

"userId",

"name email role"

)

.sort({

createdAt:-1

});


res.json(leaves);

}

catch(err){

res.status(500).json({

message:err.message

});

}

}

);




// ==================================================
// ADMIN / HR UPDATE LEAVE STATUS
// ==================================================

router.put(

"/:id",

protect,

authorize("admin","hr"),

async(req,res)=>{

try{

const {

status

}=req.body;


if(

!["Approved","Rejected"].includes(status)

){

return res.status(400).json({

message:"Invalid Status"

});

}


const leave =

await Leave.findByIdAndUpdate(

req.params.id,

{

status

},

{

new:true

}

)

.populate(

"userId",

"name email role"

);


if(!leave){

return res.status(404).json({

message:"Leave Not Found"

});

}


res.json({

message:"Leave Updated Successfully",

leave

});

}

catch(err){

res.status(500).json({

message:err.message

});

}

}

);



module.exports = router;