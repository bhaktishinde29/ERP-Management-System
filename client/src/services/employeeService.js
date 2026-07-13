const API = "http://localhost:5000/api/employees";



// =======================
// GET ALL EMPLOYEES
// =======================

export const getEmployees = async () => {

    try {

        const response = await fetch(API);


        const data = await response.json();


        return data;


    }
    catch(error){

        console.log("Get Employees Error:",error);

        return [];

    }

};





// =======================
// ADD EMPLOYEE
// =======================

export const addEmployee = async(employeeData)=>{


    try{


        console.log(
            "Sending Employee Data:",
            employeeData
        );



        const response = await fetch(API,{


            method:"POST",


            headers:{

                "Content-Type":"application/json"

            },


            body:JSON.stringify({

                name:employeeData.name,

                email:employeeData.email,

                password:employeeData.password,

                role:employeeData.role,

                department:employeeData.department,

                designation:employeeData.designation,

                phone:employeeData.phone,

                salary:Number(employeeData.salary)

            })


        });



        const data = await response.json();


        console.log(
            "Add Employee Response:",
            data
        );


        return data;



    }
    catch(error){


        console.log(
            "Add Employee Error:",
            error
        );


        return null;


    }


};






// =======================
// DELETE EMPLOYEE
// =======================

export const deleteEmployee = async(id)=>{


    try{


        const response = await fetch(

            `${API}/${id}`,

            {

            method:"DELETE"

            }

        );



        const data =
        await response.json();



        return data;



    }
    catch(error){


        console.log(
            "Delete Error:",
            error
        );


        return null;


    }


};