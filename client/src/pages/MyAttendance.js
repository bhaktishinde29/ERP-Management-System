import React, { useEffect, useState } from "react";


function MyAttendance() {


const token = localStorage.getItem("token");

const user = JSON.parse(
localStorage.getItem("user")
);



const [attendance,setAttendance] = useState([]);

const [loading,setLoading] = useState(true);





// ===============================
// LOAD MY ATTENDANCE
// ===============================


const loadAttendance = async()=>{


try{


const res = await fetch(

"http://localhost:5000/api/attendance/my",

{

headers:{

Authorization:
`Bearer ${token}`

}

}

);



const data = await res.json();



console.log(
"My Attendance",
data
);



setAttendance(

Array.isArray(data)

?

data

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


if(token && user){

loadAttendance();

}


},[]);








// ===============================
// STATISTICS
// ===============================


const totalDays =
attendance.length;



const presentDays =

attendance.filter(

(item)=>

item.status==="Present"

).length;





const absentDays =

attendance.filter(

(item)=>

item.status==="Absent"

).length;









return (


<div style={page}>


{/* HEADER */}


<div style={header}>


<h1>

🕒 My Attendance

</h1>


<p>

Welcome {user?.name} 👋

</p>


</div>







{/* STAT CARDS */}



<div style={stats}>


<Card

title="Total Days"

value={totalDays}

icon="📅"

/>


<Card

title="Present"

value={presentDays}

icon="🟢"

/>


<Card

title="Absent"

value={absentDays}

icon="🔴"

/>



</div>







{/* TABLE */}



<div style={tableBox}>


<h2>

📋 Attendance History

</h2>





{

loading ?


<div style={loadingBox}>

Loading Attendance...

</div>



:



<table style={table}>


<thead>


<tr>


<th style={th}>
Date
</th>


<th style={th}>
Check In Time
</th>


<th style={th}>
Status
</th>



</tr>


</thead>






<tbody>



{

attendance.length===0 ?


<tr>


<td

colSpan="3"

style={empty}

>


No Attendance Records Found


</td>


</tr>



:



attendance.map((item)=>(



<tr key={item._id}>


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

present

:

absent

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



}



</div>





</div>


);


}









// ===============================
// CARD COMPONENT
// ===============================


function Card({title,value,icon}){


return(


<div style={card}>


<div style={iconStyle}>

{icon}

</div>



<h2>

{value}

</h2>


<p>

{title}

</p>



</div>


);


}










// ===============================
// STYLES
// ===============================



const page={


minHeight:"100vh",

padding:"35px",

background:

"linear-gradient(135deg,#120304,#2A070C,#9F8E87)",


color:"#DDC8B3"


};






const header={


marginBottom:"35px",

animation:"slideUp 0.6s"


};






const stats={


display:"grid",

gridTemplateColumns:

"repeat(auto-fit,minmax(230px,1fr))",


gap:"25px",

marginBottom:"40px"


};






const card={


background:

"rgba(221,200,179,0.15)",


backdropFilter:

"blur(15px)",


border:

"1px solid rgba(221,200,179,.3)",


borderRadius:"25px",


padding:"25px",


textAlign:"center",


boxShadow:

"0 15px 35px rgba(0,0,0,.5)",


animation:

"float 4s infinite"


};






const iconStyle={


fontSize:"35px",

marginBottom:"10px"


};








const tableBox={


background:

"rgba(255,255,255,.12)",


backdropFilter:

"blur(20px)",


padding:"30px",


borderRadius:"25px",


boxShadow:

"0 20px 40px rgba(0,0,0,.4)"


};








const table={


width:"100%",

borderCollapse:"collapse"


};







const th={


padding:"15px",

background:"#DDC8B3",

color:"#2A070C",

textAlign:"left"


};







const td={


padding:"15px",

borderBottom:

"1px solid rgba(221,200,179,.2)",


color:"#fff"


};







const present={


background:"#27ae60",

padding:"8px 18px",

borderRadius:"20px",

color:"#fff",

fontWeight:"bold"


};






const absent={


background:"#e74c3c",

padding:"8px 18px",

borderRadius:"20px",

color:"#fff",

fontWeight:"bold"


};






const empty={


textAlign:"center",

padding:"30px",

color:"#DDC8B3"


};






const loadingBox={


padding:"30px",

textAlign:"center",

fontSize:"18px"


};







export default MyAttendance;