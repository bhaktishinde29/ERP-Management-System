const express = require("express");
const router = express.Router();

const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



// ==========================
// LOGIN
// ==========================

router.post("/login", async(req,res)=>{


try{


const {
email,
password
}=req.body;



// Find user

const user = await User.findOne({
email
});



if(!user){

return res.status(400).json({

message:"Invalid email"

});

}




// Compare password

const match =
await bcrypt.compare(
password,
user.password
);



if(!match){

return res.status(400).json({

message:"Invalid password"

});

}




// Create token

const token =
jwt.sign(

{
id:user._id,
role:user.role
},

process.env.JWT_SECRET,

{
expiresIn:"1d"
}

);





res.json({

    message: "Login successful",

    token,

    user: {

        _id: user._id,

        name: user.name,

        email: user.email,

        role: user.role,

        department: user.department,

        designation: user.designation,

        phone: user.phone,

        salary: user.salary,

        joiningDate: user.joiningDate

    }

});



}

catch(err){


console.log(err);


res.status(500).json({

message:err.message

});


}


});






// ==========================
// REGISTER (OPTIONAL)
// ==========================

router.post("/register",async(req,res)=>{


try{


const {

name,
email,
password,
role,
department,
    designation,
    phone,
    salary

}=req.body;




const existing =
await User.findOne({
email
});



if(existing){

return res.status(400).json({

message:"User already exists"

});

}





const hashedPassword =
await bcrypt.hash(
password,
10
);


const user = new User({

    name,

    email,

    password: hashedPassword,

    role: role || "employee",

    department: department || "",

    designation: designation || "",

    phone: phone || "",

    salary: Number(salary) || 0

});



await user.save();



res.status(201).json({

message:"User registered successfully"

});



}

catch(err){

res.status(500).json({

message:err.message

});

}


});



module.exports=router;