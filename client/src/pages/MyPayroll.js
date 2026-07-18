import React, {
useEffect,
useState
} from "react";



function MyPayroll(){


const token =
localStorage.getItem("token");



const user =
JSON.parse(
localStorage.getItem("user")
);



const [payroll,setPayroll]
=
useState([]);



const [loading,setLoading]
=
useState(true);





// =================================
// LOAD MY PAYROLL
// =================================


const loadPayroll = async()=>{


try{


const res =
await fetch(

"https://erp-management-system-g9n6.onrender.com/api/payroll/my",

{

headers:{

Authorization:
`Bearer ${token}`

}

}

);



const data =
await res.json();



console.log(
"My Payroll:",
data
);



setPayroll(

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


if(user && token){

loadPayroll();

}


},[]);







// ===============================
// STATISTICS
// ===============================



const totalSalary =

payroll.reduce(

(sum,item)=>

sum + item.netSalary,

0

);




const paidCount =

payroll.filter(

(item)=>

item.status==="Paid"

).length;






const latestSalary =

payroll.length>0

?

payroll[0].netSalary

:

0;








return(


<div style={page}>


<h1 style={title}>
💰 My Payroll
</h1>



<p style={desc}>
View your salary and payslip history
</p>





{/* =========================
USER INFO
========================= */}



<div style={profileCard}>


<h2>

👤 {user?.name}

</h2>


<p>

{user?.email}

</p>


</div>







{/* =========================
STATS
========================= */}



<div style={stats}>


<div style={card}>


<h2>

₹{latestSalary}

</h2>


<p>
Latest Salary
</p>


</div>





<div style={paidCard}>


<h2>

{paidCount}

</h2>


<p>
Paid Months
</p>


</div>





<div style={card}>


<h2>

₹{totalSalary}

</h2>


<p>
Total Received
</p>


</div>



</div>








{/* =========================
PAYROLL HISTORY
========================= */}



<div style={history}>


<h2>
📋 Salary History
</h2>






{

loading ?


<div style={empty}>

Loading Payroll...

</div>



:


payroll.length===0


?


<div style={empty}>

No Payroll Records Found

</div>



:



<div style={{overflowX:"auto"}}>


<table style={table}>


<thead>


<tr>


<th style={th}>
Month
</th>


<th style={th}>
Year
</th>


<th style={th}>
Basic Salary
</th>


<th style={th}>
Present Days
</th>


<th style={th}>
Absent Days
</th>


<th style={th}>
Deduction
</th>


<th style={th}>
Net Salary
</th>


<th style={th}>
Status
</th>


</tr>


</thead>





<tbody>


{


payroll.map((item)=>(


<tr key={item._id}>


<td style={td}>

{item.month}

</td>



<td style={td}>

{item.year}

</td>




<td style={td}>

₹{item.basicSalary}

</td>




<td style={td}>

{item.presentDays}

</td>




<td style={td}>

{item.absentDays}

</td>





<td style={td}>

₹{item.deduction}

</td>





<td style={td}>


<b>

₹{item.netSalary}

</b>


</td>







<td style={td}>


<span

style={

item.status==="Paid"

?

paidStatus

:

pendingStatus

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

marginBottom:"25px"

};





const profileCard={

background:
"rgba(255,255,255,.12)",

padding:"25px",

borderRadius:"22px",

color:"#DDC8B3",

marginBottom:"30px"

};






const stats={

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(220px,1fr))",

gap:"25px"

};





const card={

background:
"linear-gradient(135deg,#DDC8B3,#9F8E87)",

padding:"25px",

borderRadius:"22px",

color:"#2A070C",

textAlign:"center"

};





const paidCard={

background:"#27ae60",

padding:"25px",

borderRadius:"22px",

color:"#fff",

textAlign:"center"

};





const history={

marginTop:"45px",

background:"#fff",

padding:"30px",

borderRadius:"25px"

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





const paidStatus={

background:"#27ae60",

color:"#fff",

padding:"8px 18px",

borderRadius:"20px",

fontWeight:"bold"

};





const pendingStatus={

background:"#c27c1a",

color:"#fff",

padding:"8px 18px",

borderRadius:"20px",

fontWeight:"bold"

};





const empty={

padding:"30px",

textAlign:"center",

color:"#777",

fontSize:"17px"

};





export default MyPayroll;