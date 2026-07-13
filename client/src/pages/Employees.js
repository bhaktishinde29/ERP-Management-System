import React,{useEffect,useState} from "react";

import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm";


import {
getEmployees,
deleteEmployee,
addEmployee
} from "../services/employeeService";



function Employees(){


const [employees,setEmployees]=useState([]);



const loadEmployees=async()=>{

const data=await getEmployees();

setEmployees(data);

};



useEffect(()=>{

loadEmployees();

},[]);




const removeEmployee=async(id)=>{

await deleteEmployee(id);

loadEmployees();

};




const createEmployee=async(data)=>{

await addEmployee(data);

loadEmployees();

};





return(

<div style={page}>


<div style={header}>

<h1 style={title}>
👥 Employee Management
</h1>


<p style={subtitle}>
Manage employees, roles and organization data
</p>


</div>




<div style={formCard}>

<EmployeeForm 
addEmployee={createEmployee}
/>


</div>




<div style={tableCard}>


<EmployeeTable

employees={employees}

deleteEmployee={removeEmployee}

/>


</div>



</div>


);


}






const page={

minHeight:"100vh",

padding:"35px",

background:
"linear-gradient(135deg,#DDC8B3,#9F8E87)",

animation:"fade 0.8s ease"

};





const header={

animation:"slideDown 0.8s ease",

marginBottom:"30px"

};





const title={

fontSize:"38px",

color:"#2A070C",

marginBottom:"5px"

};





const subtitle={

fontSize:"17px",

color:"#2A070C",

opacity:0.7

};





const formCard={

background:
"rgba(42,7,12,0.92)",

padding:"25px",

borderRadius:"20px",

boxShadow:
"0 10px 30px rgba(0,0,0,0.25)",

marginBottom:"35px",

animation:"fade 1s ease"

};





const tableCard={

background:
"rgba(255,255,255,0.25)",

padding:"25px",

borderRadius:"20px",

backdropFilter:"blur(12px)",

boxShadow:
"0 10px 30px rgba(0,0,0,0.2)",

animation:"slideUp 0.8s ease"

};





export default Employees;