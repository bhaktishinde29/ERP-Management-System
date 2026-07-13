import React, { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";


function HRDashboard(){



const [data,setData] = useState({

totalEmployees:0,

presentToday:0,

absentToday:0,

pendingLeaves:0,

totalPayroll:0,

departments:0

});



const [loading,setLoading] = useState(true);





useEffect(()=>{


const token =
localStorage.getItem("token");



const loadDashboard = async()=>{


try{


const res = await fetch(

"http://localhost:5000/api/dashboard/hr",

{

headers:{


Authorization:

`Bearer ${token}`


}

}

);





const result =
await res.json();



console.log(
"HR Dashboard:",
result
);





if(res.ok){


setData(result);


}

else{


console.log(
result.message
);


}



}

catch(err){


console.log(
"HR Dashboard Error:",
err
);


}

finally{


setLoading(false);


}



};





loadDashboard();



},[]);







if(loading){


return(

<div style={container}>


<h2 style={heading}>
Loading Dashboard...
</h2>


</div>

);


}









return(


<div style={container}>


<h1 style={heading}>
👨‍💼 HR Dashboard
</h1>




<p style={description}>
Manage employees, attendance and leave activities
</p>






<div style={grid}>




<DashboardCard

title="Employees Managed"

value={data.totalEmployees}

icon="👥"

/>








<DashboardCard

title="Present Today"

value={data.presentToday}

icon="🟢"

/>







<DashboardCard

title="Absent Today"

value={data.absentToday}

icon="🔴"

/>








<DashboardCard

title="Pending Leaves"

value={data.pendingLeaves}

icon="📝"

/>








<DashboardCard

title="Total Payroll"

value={`₹ ${data.totalPayroll}`}

icon="💰"

/>








<DashboardCard

title="Departments"

value={data.departments}

icon="🏢"

/>






</div>



</div>


);


}









const container = {


padding:"35px",


minHeight:"100vh",


background:

"linear-gradient(135deg,#120304,#2A070C,#9F8E87)"


};






const heading = {


fontSize:"38px",


fontWeight:"bold",


color:"#DDC8B3",


marginBottom:"10px"


};






const description = {


color:"#fff",


fontSize:"17px",


marginBottom:"35px"


};







const grid = {


display:"grid",


gridTemplateColumns:

"repeat(auto-fit,minmax(250px,1fr))",


gap:"25px"


};






export default HRDashboard;