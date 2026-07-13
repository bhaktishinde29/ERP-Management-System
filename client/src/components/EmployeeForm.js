import React, { useState } from "react";


function EmployeeForm({ addEmployee }) {


const [employee,setEmployee]=useState({

name:"",
email:"",
password:"",
role:"employee",
department:"",
designation:"",
phone:"",
salary:""

});


const [message,setMessage]=useState("");



const handleChange=(e)=>{

setEmployee({

...employee,

[e.target.name]:e.target.value

});

};




const handleSubmit=async(e)=>{

e.preventDefault();


await addEmployee(employee);


setMessage("✅ Employee Added Successfully");


setEmployee({

name:"",
email:"",
password:"",
role:"employee",
department:"",
designation:"",
phone:"",
salary:""

});



setTimeout(()=>{

setMessage("");

},3000);


};





return(

<form 
onSubmit={handleSubmit}
style={form}
>


<h2 style={heading}>
➕ Add New Employee
</h2>



{
message &&

<div style={success}>
{message}
</div>

}




<input

style={input}

name="name"

placeholder="Employee Name"

value={employee.name}

onChange={handleChange}

/>




<input

style={input}

name="email"

type="email"

placeholder="Email Address"

value={employee.email}

onChange={handleChange}

/>





<input

style={input}

name="password"

type="password"

placeholder="Password"

value={employee.password}

onChange={handleChange}

/>






<select

style={input}

name="role"

value={employee.role}

onChange={handleChange}

>


<option value="employee">
Employee
</option>


<option value="hr">
HR
</option>


<option value="admin">
Admin
</option>


</select>






<div style={row}>


<input

style={halfInput}

name="department"

placeholder="Department"

value={employee.department}

onChange={handleChange}

/>



<input

style={halfInput}

name="designation"

placeholder="Designation"

value={employee.designation}

onChange={handleChange}

/>



</div>





<div style={row}>


<input

style={halfInput}

name="phone"

placeholder="Phone Number"

value={employee.phone}

onChange={handleChange}

/>



<input

style={halfInput}

name="salary"

placeholder="Salary"

value={employee.salary}

onChange={handleChange}

/>



</div>





<button

style={button}

type="submit"

>

Add Employee

</button>



</form>


);

}






const form={

background:
"rgba(255,255,255,0.12)",

padding:"25px",

borderRadius:"18px",

display:"flex",

flexDirection:"column",

gap:"15px",

};



const heading={

color:"#DDC8B3",

textAlign:"center",

marginBottom:"10px",

fontSize:"24px"

};




const input={

padding:"13px",

borderRadius:"10px",

border:"none",

outline:"none",

fontSize:"15px",

background:"#DDC8B3",

color:"#2A070C"

};




const row={

display:"flex",

gap:"15px"

};




const halfInput={

flex:1,

padding:"13px",

borderRadius:"10px",

border:"none",

outline:"none",

background:"#DDC8B3",

color:"#2A070C"

};





const button={

padding:"14px",

borderRadius:"12px",

border:"none",

background:"#9F8E87",

color:"#2A070C",

fontWeight:"bold",

fontSize:"16px",

cursor:"pointer",

transition:"0.3s"

};





const success={

background:"#2ecc71",

color:"white",

padding:"10px",

borderRadius:"10px",

textAlign:"center",

fontWeight:"bold"

};




export default EmployeeForm;