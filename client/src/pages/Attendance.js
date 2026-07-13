import React, { useEffect, useState } from "react";


function Attendance() {


const token =
localStorage.getItem("token");



const [employees,setEmployees] =
useState([]);


const [attendance,setAttendance] =
useState([]);



const [loading,setLoading] =
useState(true);



const [search,setSearch] =
useState("");



const [statusFilter,setStatusFilter] =
useState("All");



const [dateFilter,setDateFilter] =
useState("");




// ===============================
// LOAD DATA
// ===============================


const loadData = async()=>{


try{


// ===============================
// EMPLOYEES
// ===============================


const empRes =
await fetch(

"http://localhost:5000/api/employees",

{

headers:{

Authorization:
`Bearer ${token}`

}

}

);



if(empRes.status===401){

localStorage.clear();

window.location.href="/";

return;

}



const empData =
await empRes.json();



setEmployees(

Array.isArray(empData)

?

empData

:

[]

);






// ===============================
// ATTENDANCE
// ===============================


const attRes =
await fetch(

"http://localhost:5000/api/attendance",

{

headers:{

Authorization:
`Bearer ${token}`

}

}

);



const attData =
await attRes.json();



setAttendance(

Array.isArray(attData)

?

attData

:

[]

);




}

catch(err){

console.log(err);

}



finally{


setLoading(false);


}



};





useEffect(()=>{


loadData();


},[]);






// ===============================
// MARK ATTENDANCE
// ===============================


const markAttendance =
async(employee,status)=>{


try{


const res =
await fetch(

"http://localhost:5000/api/attendance",

{

method:"POST",

headers:{


"Content-Type":
"application/json",


Authorization:
`Bearer ${token}`


},


body:JSON.stringify({

userId:
employee._id,


status:status


})

}

);



const data =
await res.json();



if(!res.ok){


alert(data.message);


return;


}



alert(
"Attendance marked successfully"
);



loadData();



}

catch(err){


console.log(err);


}


};
// ===============================
// FILTER EMPLOYEES
// ===============================


const filteredEmployees =
employees.filter((emp)=>{


return (

emp.name
?.toLowerCase()
.includes(
search.toLowerCase()
)

||

emp.email
?.toLowerCase()
.includes(
search.toLowerCase()
)

);


});





// ===============================
// FILTER ATTENDANCE HISTORY
// ===============================


const filteredAttendance =

attendance.filter((item)=>{


const name =
item.userId?.name || "";



const email =
item.userId?.email || "";



const matchSearch =

name
.toLowerCase()
.includes(
search.toLowerCase()
)

||

email
.toLowerCase()
.includes(
search.toLowerCase()
);




const matchStatus =

statusFilter==="All"

||

item.status===statusFilter;





const matchDate =

dateFilter===""

||

item.date===
new Date(dateFilter)
.toLocaleDateString("en-IN");





return (

matchSearch

&&

matchStatus

&&

matchDate

);


});






// ===============================
// STATISTICS
// ===============================


const presentCount =

attendance.filter(

(item)=>

item.status==="Present"

).length;





const absentCount =

attendance.filter(

(item)=>

item.status==="Absent"

).length;







return (

<div style={page}>


<h1 style={title}>

📅 Attendance Management

</h1>



<p style={desc}>

Manage employee attendance and view employee history

</p>





{/* =====================
STAT CARDS
===================== */}



<div style={stats}>


<div style={card}>

<h2>

{employees.length}

</h2>


<p>

Total Employees

</p>

</div>




<div style={card}>

<h2>

{presentCount}

</h2>


<p>

Present

</p>

</div>





<div style={card}>

<h2>

{absentCount}

</h2>


<p>

Absent

</p>

</div>



</div>









{/* =====================
SEARCH FILTERS
===================== */}



<div style={filterBox}>


<input


style={input}


placeholder="Search employee..."


value={search}


onChange={(e)=>

setSearch(e.target.value)

}


/>




<select


style={input}


value={statusFilter}


onChange={(e)=>

setStatusFilter(e.target.value)

}


>


<option value="All">

All Status

</option>


<option value="Present">

Present

</option>


<option value="Absent">

Absent

</option>


</select>





<input


style={input}


type="date"


value={dateFilter}


onChange={(e)=>

setDateFilter(e.target.value)

}


/>




</div>









{/* =====================
MARK ATTENDANCE
===================== */}


<h2 style={section}>

👨‍💼 Mark Attendance

</h2>




<div style={grid}>


{

filteredEmployees.length===0

?

<h3 style={{color:"#DDC8B3"}}>

No Employees Found

</h3>


:


filteredEmployees.map((emp)=>(


<div

key={emp._id}

style={employeeCard}

>



<div style={avatar}>


{

emp.name

?

emp.name
.charAt(0)
.toUpperCase()

:

"E"

}


</div>




<h3>

{emp.name}

</h3>




<p>

{emp.email}

</p>




<p>

{emp.department || "Department Not Assigned"}

</p>




<p>

{emp.designation || "Employee"}

</p>





<button


style={presentBtn}


onClick={()=>


markAttendance(
emp,
"Present"
)


}


>

✓ Present

</button>






<button


style={absentBtn}


onClick={()=>


markAttendance(
emp,
"Absent"
)


}


>

✕ Absent

</button>




</div>



))


}





</div>
{/* =====================
ATTENDANCE HISTORY
===================== */}


<div style={history}>


<h2>

📋 Attendance History

</h2>




{

loading

?

<div style={empty}>

Loading Attendance...

</div>


:


<div style={{overflowX:"auto"}}>



<table style={table}>


<thead>

<tr>


<th style={th}>
Employee
</th>


<th style={th}>
Email
</th>


<th style={th}>
Department
</th>


<th style={th}>
Date
</th>


<th style={th}>
Time
</th>


<th style={th}>
Status
</th>


</tr>

</thead>




<tbody>


{

filteredAttendance.length===0

?


<tr>

<td

colSpan="6"

style={empty}

>

No Attendance Records Found

</td>

</tr>



:


filteredAttendance.map((item)=>(


<tr key={item._id}>


<td style={td}>

{item.userId?.name || "-"}

</td>



<td style={td}>

{item.userId?.email || "-"}

</td>




<td style={td}>

{
item.userId?.department
||
"-"
}

</td>





<td style={td}>

{item.date}

</td>





<td style={td}>

{item.time || "-"}

</td>





<td style={td}>


<span

style={

item.status==="Present"

?

presentStatus

:

absentStatus

}

>


{item.status}


</span>


</td>



</tr>



))


}


</tbody>



</table>



</div>



}


</div>


</div>


);

}









// ===============================
// STYLES
// ===============================


const page={

padding:"35px",

minHeight:"100vh",

background:
"linear-gradient(135deg,#120304,#2A070C,#9F8E87)"

};



const title={

color:"#DDC8B3",

fontSize:"38px",

fontWeight:"bold"

};



const desc={

color:"#fff",

fontSize:"17px",

marginBottom:"30px"

};




const stats={

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(220px,1fr))",

gap:"25px",

marginBottom:"35px"

};





const card={

background:
"linear-gradient(135deg,#DDC8B3,#9F8E87)",

color:"#2A070C",

padding:"25px",

borderRadius:"20px",

textAlign:"center",

boxShadow:
"0 10px 25px rgba(0,0,0,.3)"

};





const filterBox={

display:"flex",

gap:"20px",

flexWrap:"wrap",

marginBottom:"35px"

};





const input={

padding:"13px",

borderRadius:"12px",

border:"1px solid #DDC8B3",

background:
"rgba(255,255,255,.12)",

color:"#DDC8B3",

outline:"none",

fontSize:"15px"

};





const section={

color:"#DDC8B3",

marginBottom:"20px"

};





const grid={

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(270px,1fr))",

gap:"25px",

marginBottom:"45px"

};





const employeeCard={

background:
"rgba(255,255,255,.12)",

backdropFilter:
"blur(12px)",

padding:"25px",

borderRadius:"22px",

color:"#fff",

textAlign:"center",

boxShadow:
"0 10px 25px rgba(0,0,0,.3)"

};





const avatar={

height:"70px",

width:"70px",

borderRadius:"50%",

background:"#DDC8B3",

color:"#2A070C",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"30px",

fontWeight:"bold",

margin:"auto"

};





const presentBtn={

margin:"10px",

padding:"10px 18px",

border:"none",

borderRadius:"20px",

background:"#27ae60",

color:"#fff",

cursor:"pointer",

fontWeight:"bold"

};





const absentBtn={

margin:"10px",

padding:"10px 18px",

border:"none",

borderRadius:"20px",

background:"#e74c3c",

color:"#fff",

cursor:"pointer",

fontWeight:"bold"

};





const history={

background:"#fff",

padding:"30px",

borderRadius:"25px",

boxShadow:
"0 15px 30px rgba(0,0,0,.3)"

};





const table={

width:"100%",

borderCollapse:"collapse"

};





const th={

background:"#2A070C",

color:"#DDC8B3",

padding:"15px",

textAlign:"left"

};





const td={

padding:"15px",

color:"#2A070C",

borderBottom:
"1px solid #ddd"

};





const presentStatus={

background:"#27ae60",

color:"#fff",

padding:"8px 18px",

borderRadius:"20px",

fontWeight:"bold"

};





const absentStatus={

background:"#e74c3c",

color:"#fff",

padding:"8px 18px",

borderRadius:"20px",

fontWeight:"bold"

};





const empty={

padding:"30px",

textAlign:"center",

color:"#777"

};





export default Attendance;