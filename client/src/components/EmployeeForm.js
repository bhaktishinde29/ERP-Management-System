import React, { useState } from "react";


function EmployeeForm({ addEmployee }) {


const initialState = {

name:"",
email:"",
password:"",
role:"employee",
department:"",
designation:"",
phone:"",
salary:""

};



const [employee,setEmployee] =
useState(initialState);



const [message,setMessage] =
useState("");



const [loading,setLoading] =
useState(false);





const handleChange = (e)=>{


setEmployee({

...employee,

[e.target.name]:e.target.value

});


};






const handleSubmit = async(e)=>{


e.preventDefault();


setLoading(true);



try{


await addEmployee(employee);



setMessage(
"✅ Employee Added Successfully"
);



setEmployee(initialState);



setTimeout(()=>{

setMessage("");

},3000);



}

catch(err){


console.log(err);


setMessage(
"❌ Something went wrong"
);


}


finally{


setLoading(false);


}


};






return(



<div style={wrapper}>


<form

onSubmit={handleSubmit}

style={form}

>


<div style={topIcon}>

👤

</div>



<h2 style={heading}>

Add Employee

</h2>


<p style={subtitle}>

Create a new employee account

</p>




{

message &&

<div style={success}>

{message}

</div>

}







<div style={inputGroup}>


<span style={label}>

👤 Name

</span>


<input

style={input}

name="name"

placeholder="Employee Name"

value={employee.name}

onChange={handleChange}

required

/>


</div>








<div style={inputGroup}>


<span style={label}>

📧 Email

</span>


<input

style={input}

type="email"

name="email"

placeholder="Email Address"

value={employee.email}

onChange={handleChange}

required

/>


</div>







<div style={inputGroup}>


<span style={label}>

🔒 Password

</span>


<input

style={input}

type="password"

name="password"

placeholder="Create Password"

value={employee.password}

onChange={handleChange}

required

/>


</div>







<div style={inputGroup}>


<span style={label}>

👨‍💼 Role

</span>



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


</div>





<div style={inputGroup}>


<span style={label}>

🏢 Department

</span>


<input

style={input}

name="department"

placeholder="Department"

value={employee.department}

onChange={handleChange}

/>


</div>
<div style={inputGroup}>


<span style={label}>

💼 Designation

</span>



<input

style={input}

name="designation"

placeholder="Designation"

value={employee.designation}

onChange={handleChange}

/>


</div>








<div style={inputGroup}>


<span style={label}>

📱 Phone

</span>



<input

style={input}

name="phone"

placeholder="Phone Number"

value={employee.phone}

onChange={handleChange}

/>


</div>







<div style={inputGroup}>


<span style={label}>

💰 Salary

</span>



<input

style={input}

name="salary"

type="number"

placeholder="Salary"

value={employee.salary}

onChange={handleChange}

/>


</div>







<button

style={button}

type="submit"

disabled={loading}

>


{

loading

?

"Adding Employee..."

:

"➕ Add Employee"

}



</button>





</form>


</div>


);


}





// ===============================
// STYLES
// ===============================



const wrapper={

minHeight:"100vh",

display:"flex",

justifyContent:"center",

alignItems:"center",

padding:"30px",

background:

"linear-gradient(135deg,#DDC8B3,#9F8E87,#2A070C)"

};






const form={


width:"380px",


background:

"rgba(42,7,12,0.95)",


padding:"35px",


borderRadius:"30px",


boxShadow:

"0 25px 60px rgba(0,0,0,.45)",


border:

"1px solid rgba(221,200,179,.25)",


display:"flex",


flexDirection:"column",


gap:"18px",


animation:

"slideUp .7s ease"


};







const topIcon={


width:"75px",


height:"75px",


borderRadius:"50%",


background:"#DDC8B3",


color:"#2A070C",


display:"flex",


justifyContent:"center",


alignItems:"center",


fontSize:"35px",


margin:"0 auto",


boxShadow:

"0 10px 25px rgba(0,0,0,.3)",


animation:

"float 3s infinite"


};







const heading={


textAlign:"center",


fontSize:"30px",


color:"#DDC8B3",


fontWeight:"700",


marginTop:"10px"


};







const subtitle={


textAlign:"center",


color:"#9F8E87",


fontSize:"14px",


marginBottom:"10px"


};







const inputGroup={


display:"flex",


flexDirection:"column",


gap:"8px"


};







const label={


color:"#DDC8B3",


fontSize:"14px",


fontWeight:"600"


};







const input={


width:"100%",


padding:"14px 16px",


borderRadius:"14px",


border:"none",


outline:"none",


background:"#DDC8B3",


color:"#2A070C",


fontSize:"15px",


transition:"0.3s",


boxSizing:"border-box"


};







const button={


padding:"15px",


borderRadius:"16px",


border:"none",


background:

"linear-gradient(135deg,#DDC8B3,#9F8E87)",


color:"#2A070C",


fontSize:"16px",


fontWeight:"700",


cursor:"pointer",


marginTop:"10px",


boxShadow:

"0 10px 25px rgba(0,0,0,.35)",


transition:"0.3s"


};







const success={


background:

"rgba(46,204,113,.2)",


border:

"1px solid #2ecc71",


color:"#8AFFB0",


padding:"12px",


borderRadius:"14px",


textAlign:"center",


fontWeight:"600"


};

