import React,{useEffect,useState} from "react";
import DashboardCard from "./DashboardCard";


function EmployeeDashboard(){


const [data,setData]=useState({

employee:{},

attendance:[],

leaves:[],

payroll:null

});



useEffect(()=>{


const user =
JSON.parse(localStorage.getItem("user"));



if(!user){

return;

}



fetch(
`http://localhost:5000/api/dashboard/employee/${user.id}`
)

.then(res=>res.json())

.then(result=>{


console.log("Employee Dashboard:",result);


setData(result);


})

.catch(err=>console.log(err));



},[]);





const present =
data.attendance.filter(
(a)=>a.status==="Present"
).length;




const pendingLeave =
data.leaves.filter(
(l)=>l.status==="Pending"
).length;





return(

<div style={container}>


<h1 style={heading}>
👨‍💻 Employee Dashboard
</h1>



<div style={grid}>


<DashboardCard

title="My Attendance"

value={present}

icon="🟢"

/>




<DashboardCard

title="Pending Leaves"

value={pendingLeave}

icon="📝"

/>





<DashboardCard

title="Monthly Salary"

value={
data.payroll
?
`₹ ${data.payroll.netSalary}`
:
"Not Assigned"
}

icon="💰"

/>




<DashboardCard

title="My Email"

value={
data.employee.email || "-"
}

icon="📧"

/>




</div>



</div>

);

}




const container={

padding:"30px",

minHeight:"100vh",

background:
"linear-gradient(135deg,#DDC8B3,#9F8E87)"

};



const heading={

fontSize:"38px",

color:"#2A070C"

};



const grid={

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(250px,1fr))",

gap:"25px",

marginTop:"30px"

};



export default EmployeeDashboard;