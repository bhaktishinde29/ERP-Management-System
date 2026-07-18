import React, {
useEffect,
useState
} from "react";



function Payroll(){


const token =
localStorage.getItem("token");



const [employees,setEmployees]
=
useState([]);



const [payroll,setPayroll]
=
useState([]);



const [form,setForm]
=
useState({

employeeId:"",
month:"",
year:new Date().getFullYear()

});



const [loading,setLoading]
=
useState(true);







// ===============================
// LOAD EMPLOYEES + PAYROLL
// ===============================


const loadData = async()=>{


try{


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



const empData =
await empRes.json();



setEmployees(

Array.isArray(empData)

?

empData

:

[]

);






const payrollRes =
await fetch(

"https://erp-management-system-g9n6.onrender.com/api/payroll",

{

headers:{

Authorization:
`Bearer ${token}`

}

}

);



const payrollData =
await payrollRes.json();



setPayroll(

Array.isArray(payrollData)

?

payrollData

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
// FORM CHANGE
// ===============================


const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:
e.target.value

});


};







// ===============================
// GENERATE PAYROLL
// ===============================


const generatePayroll = async()=>{


try{


const res =
await fetch(

"https://erp-management-system-g9n6.onrender.com/api/payroll/generate",

{

method:"POST",

headers:{


"Content-Type":
"application/json",


Authorization:
`Bearer ${token}`


},


body:JSON.stringify({

employeeId:
form.employeeId,


month:
form.month,


year:
Number(form.year)

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
"Payroll Generated Successfully"
);



loadData();



}


catch(err){

console.log(err);

}


};
// ===============================
// UPDATE STATUS
// ===============================


const updateStatus = async(id,status)=>{


try{


const res =
await fetch(

`https://erp-management-system-g9n6.onrender.com/api/payroll/${id}`,

{

method:"PUT",

headers:{


"Content-Type":
"application/json",


Authorization:
`Bearer ${token}`


},


body:JSON.stringify({

status

})


}

);



const data =
await res.json();



if(!res.ok){

alert(data.message);

return;

}



loadData();



}

catch(err){

console.log(err);

}


};









return(


<div style={page}>


<h1 style={title}>
💰 Payroll Management
</h1>


<p style={desc}>
Generate employee salary and manage payroll records
</p>







{/* ===========================
GENERATE PAYROLL
=========================== */}


<div style={container}>


<h2 style={heading}>
✨ Generate Payroll
</h2>





<div style={formGrid}>



<select

name="employeeId"

value={form.employeeId}

onChange={handleChange}

style={input}

>


<option value="">
Select Employee
</option>



{

employees.map((emp)=>(


<option

key={emp._id}

value={emp._id}

>

{emp.name}

</option>


))

}



</select>








<select

name="month"

value={form.month}

onChange={handleChange}

style={input}

>


<option value="">
Select Month
</option>


<option value="1">
January
</option>


<option value="2">
February
</option>


<option value="3">
March
</option>


<option value="4">
April
</option>


<option value="5">
May
</option>


<option value="6">
June
</option>


<option value="7">
July
</option>


<option value="8">
August
</option>


<option value="9">
September
</option>


<option value="10">
October
</option>


<option value="11">
November
</option>


<option value="12">
December
</option>


</select>







<input

name="year"

value={form.year}

onChange={handleChange}

style={input}

/>




</div>






<button

style={generateBtn}

onClick={generatePayroll}

>


✨ Generate Payroll


</button>



</div>








{/* ===========================
PAYROLL HISTORY
=========================== */}



<div style={container}>


<h2 style={heading}>
📋 Payroll History
</h2>




{

loading ?

<h3>
Loading...
</h3>


:


<div style={{overflowX:"auto"}}>


<table style={table}>


<thead>

<tr>


<th style={th}>
Employee
</th>


<th style={th}>
Month
</th>


<th style={th}>
Year
</th>


<th style={th}>
Salary
</th>


<th style={th}>
Present
</th>


<th style={th}>
Absent
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


<th style={th}>
Action
</th>


</tr>


</thead>





<tbody>



{

payroll.length===0 ?


<tr>


<td

colSpan="10"

style={empty}

>


No Payroll Records Found


</td>


</tr>



:


payroll.map((item)=>(


<tr key={item._id}>


<td style={td}>

{item.employeeName}

</td>



<td style={td}>

{item.month}

</td>



<td style={td}>

{item.year}

</td>




<td style={td}>

₹ {item.basicSalary}

</td>




<td style={td}>

{item.presentDays}

</td>




<td style={td}>

{item.absentDays}

</td>




<td style={td}>

₹ {item.deduction}

</td>





<td style={td}>

₹ {item.netSalary}

</td>





<td style={td}>


<span

style={

item.status==="Paid"

?

paid

:

generated

}

>

{item.status}

</span>


</td>







<td style={td}>


{

item.status==="Generated"

&&


<button

style={paidBtn}

onClick={()=>


updateStatus(

item._id,

"Paid"

)


}


>

Mark Paid

</button>


}



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



const container={

background:
"rgba(255,255,255,.08)",

backdropFilter:"blur(15px)",

padding:"30px",

borderRadius:"25px",

marginBottom:"35px",

boxShadow:
"0 15px 30px rgba(0,0,0,.4)"

};



const heading={

color:"#DDC8B3",

marginBottom:"25px"

};



const formGrid={

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(250px,1fr))",

gap:"25px"

};



const input={

padding:"15px",

borderRadius:"12px",

border:"none",

background:"#DDC8B3",

color:"#2A070C",

fontSize:"16px"

};



const generateBtn={

marginTop:"25px",

padding:"14px 25px",

border:"none",

borderRadius:"20px",

background:"#DDC8B3",

color:"#2A070C",

fontWeight:"bold",

fontSize:"16px",

cursor:"pointer"

};



const table={

width:"100%",

borderCollapse:"collapse"

};



const th={

padding:"15px",

background:"#DDC8B3",

color:"#2A070C"

};



const td={

padding:"15px",

color:"#DDC8B3",

borderBottom:
"1px solid rgba(221,200,179,.2)"

};



const generated={

background:"#c27c1a",

padding:"8px 15px",

borderRadius:"20px",

color:"#fff"

};



const paid={

background:"#27ae60",

padding:"8px 15px",

borderRadius:"20px",

color:"#fff"

};



const paidBtn={

background:"#27ae60",

color:"#fff",

border:"none",

padding:"10px 15px",

borderRadius:"15px",

cursor:"pointer"

};



const empty={

textAlign:"center",

padding:"30px",

color:"#DDC8B3"

};



export default Payroll;