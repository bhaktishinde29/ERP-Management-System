const express = require("express");

const router = express.Router();

const Attendance =
require("../models/Attendance");

const {
protect,
authorize
}=require("../middleware/authMiddleware");




// =================================
// MARK ATTENDANCE
// ADMIN + HR ONLY
// =================================


router.post(
"/",
protect,
authorize("admin","hr"),

async(req,res)=>{


try{


const {

userId,
status

}=req.body;




if(!userId || !status){

return res.status(400).json({

message:"Missing attendance details"

});

}




const today =
new Date()
.toLocaleDateString();





const existing =
await Attendance.findOne({

userId,

date:today

});




if(existing){

return res.status(400).json({

message:"Attendance already marked"

});

}




const attendance =
new Attendance({

userId,

status,

date:today,

time:
new Date()
.toLocaleTimeString()

});




await attendance.save();



res.status(201).json({

message:"Attendance marked successfully",

attendance

});



}

catch(err){

console.log(err);

res.status(500).json({

message:err.message

});

}


});







// =================================
// HR / ADMIN VIEW ALL ATTENDANCE
// =================================


router.get(
"/",

protect,
authorize("admin","hr"),

async(req,res)=>{


try{


const attendance =
await Attendance.find()

.populate(
"userId",
"name email department designation"
)

.sort({

createdAt:-1

});



res.json(attendance);



}

catch(err){

res.status(500).json({

message:err.message

});

}



});







// =================================
// EMPLOYEE OWN ATTENDANCE
// =================================


router.get("/my", protect, async (req, res) => {

    try {

        console.log("========== MY ATTENDANCE ==========");
        console.log("Logged User ID:", req.user._id);

        const attendance = await Attendance.find({
            userId: req.user._id
        }).sort({ createdAt: -1 });

        console.log("Attendance Found:", attendance);

        res.json(attendance);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message
        });

    }

});





module.exports=router;