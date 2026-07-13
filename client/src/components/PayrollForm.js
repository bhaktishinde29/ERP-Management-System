import React,{useState} from "react";


function PayrollForm({addPayroll}){


const [data,setData]=useState({

name:"",
email:"",
department:"",
month:"",
basicSalary:"",
bonus:"",
deduction:""

});



const change=(e)=>{

setData({

...data,

[e.target.name]:e.target.value

});

};





const netSalary =
(Number(data.basicSalary)||0)
+
(Number(data.bonus)||0)
-
(Number(data.deduction)||0);





const submit=(e)=>{

e.preventDefault();


addPayroll({

...data,

netSalary

});


setData({

name:"",
email:"",
department:"",
month:"",
basicSalary:"",
bonus:"",
deduction:""

});


};





return(

<div style={wrapper}>


<form
onSubmit={submit}
style={card}
>


<div style={header}>

<h2>
💰 Salary Generator
</h2>

<p>
Create employee payroll record
</p>

</div>





<div style={section}>

<h3>
👤 Employee Details
</h3>



<input
style={input}
name="name"
placeholder="Employee Name"
value={data.name}
onChange={change}
/>



<input
style={input}
name="email"
placeholder="Email"
value={data.email}
onChange={change}
/>




<input
style={input}
name="department"
placeholder="Department"
value={data.department}
onChange={change}
/>


</div>





<div style={section}>

<h3>
📅 Salary Information
</h3>



<input
style={input}
name="month"
placeholder="Salary Month"
value={data.month}
onChange={change}
/>




<div style={row}>


<input
style={smallInput}
name="basicSalary"
placeholder="Basic Salary"
value={data.basicSalary}
onChange={change}
/>



<input
style={smallInput}
name="bonus"
placeholder="Bonus"
value={data.bonus}
onChange={change}
/>


</div>




<input
style={input}
name="deduction"
placeholder="Deduction"
value={data.deduction}
onChange={change}
/>



</div>







<div style={salaryCard}>


<h3>
💳 Net Salary
</h3>


<h1>
₹ {netSalary}
</h1>


</div>






<button style={button}>

Generate Payroll 🚀

</button>




</form>


</div>

);

}





const wrapper={

display:"flex",

justifyContent:"center",

padding:"30px"

};




const card={

width:"450px",

background:
"linear-gradient(145deg,#2A070C,#4b1820)",

padding:"30px",

borderRadius:"25px",

color:"#DDC8B3",

boxShadow:
"0 15px 35px rgba(0,0,0,0.4)",

animation:"float 3s infinite"

};





const header={

textAlign:"center",

borderBottom:
"1px solid #9F8E87",

marginBottom:"20px"

};





const section={

background:
"rgba(255,255,255,0.08)",

padding:"15px",

borderRadius:"15px",

marginBottom:"20px"

};





const input={

width:"100%",

boxSizing:"border-box",

padding:"12px",

marginTop:"10px",

borderRadius:"12px",

border:"none",

background:"#DDC8B3"

};





const row={

display:"flex",

gap:"10px"

};





const smallInput={

width:"50%",

padding:"12px",

marginTop:"10px",

borderRadius:"12px",

border:"none",

background:"#DDC8B3"

};





const salaryCard={

background:"#9F8E87",

color:"#2A070C",

padding:"15px",

borderRadius:"18px",

textAlign:"center",

marginBottom:"20px"

};





const button={

width:"100%",

padding:"14px",

borderRadius:"15px",

border:"none",

background:"#DDC8B3",

color:"#2A070C",

fontWeight:"bold",

fontSize:"16px",

cursor:"pointer"

};



export default PayrollForm;