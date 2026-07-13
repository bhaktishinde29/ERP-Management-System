const express = require("express");
const router = express.Router();

const User = require("../models/User");
const bcrypt = require("bcryptjs");



// =====================================
// GET ALL USERS / EMPLOYEES
// =====================================

router.get("/", async (req, res) => {
  console.log("BACKEND RECEIVED:", req.body);

    try {

        const employees = await User.find()
            .select("-password")
            .sort({createdAt:-1});


        res.status(200).json(employees);


    } catch(err){

        console.log(err);

        res.status(500).json({
            message:err.message
        });

    }

});




// =====================================
// GET SINGLE EMPLOYEE
// =====================================

router.get("/:id", async(req,res)=>{
  

    try{


        const employee = await User.findById(
            req.params.id
        )
        .select("-password");



        if(!employee){

            return res.status(404).json({

                message:"Employee not found"

            });

        }



        res.json(employee);



    }catch(err){

        res.status(500).json({

            message:err.message

        });

    }


});




// =====================================
// ADD EMPLOYEE
// =====================================

router.post("/", async(req,res)=>{


    try{


        console.log(
            "Received Data:",
            req.body
        );



        const {

            name,
            email,
            password,
            role,
            phone,
            department,
            designation,
            salary,
            joiningDate


        } = req.body;




        // validation

        if(
            !name ||
            !email ||
            !password
        ){

            return res.status(400).json({

                message:
                "Name Email Password required"

            });

        }





        // check email exists

        const existingUser =
        await User.findOne({
            email
        });



        if(existingUser){

            return res.status(400).json({

                message:
                "Email already exists"

            });

        }





        // password encryption

        const hashedPassword =
        await bcrypt.hash(
            password,
            10
        );





        const employee = new User({


            name:name,


            email:email,


            password:hashedPassword,



            role:
            role || "employee",



            phone:
            phone || "",



            department:
            department || "",



            designation:
            designation || "",



            salary:
            Number(salary) || 0,



            joiningDate:
            joiningDate || Date.now()



        });



console.log("FINAL OBJECT BEFORE SAVE:");
console.log(employee.toObject());

        await employee.save();


const result = employee.toObject();

delete result.password;



res.status(201).json({

    message:"Employee Added Successfully",

    employee:result

});
    





    }
    catch(err){


        console.log(
            "ADD EMPLOYEE ERROR:",
            err
        );


        res.status(500).json({

            message:err.message

        });


    }


});







// =====================================
// UPDATE EMPLOYEE
// =====================================


router.put("/:id", async(req,res)=>{


    try{


        let updateData={
            ...req.body
        };





        // encrypt new password

        if(updateData.password){


            updateData.password =
            await bcrypt.hash(
                updateData.password,
                10
            );

        }




        if(updateData.salary){

            updateData.salary =
            Number(updateData.salary);

        }






        const employee =
        await User.findByIdAndUpdate(

            req.params.id,

            updateData,

            {
                new:true
            }

        )
        .select("-password");






        if(!employee){

            return res.status(404).json({

                message:
                "Employee not found"

            });

        }





        res.json({

            message:
            "Employee Updated Successfully",


            employee

        });




    }
    catch(err){


        res.status(500).json({

            message:err.message

        });


    }


});








// =====================================
// DELETE EMPLOYEE
// =====================================


router.delete("/:id", async(req,res)=>{


    try{


        const employee =
        await User.findByIdAndDelete(
            req.params.id
        );





        if(!employee){


            return res.status(404).json({

                message:
                "Employee not found"

            });


        }




        res.json({

            message:
            "Employee Deleted Successfully"

        });




    }
    catch(err){


        res.status(500).json({

            message:err.message

        });


    }


});





module.exports = router;