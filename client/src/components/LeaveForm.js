import React,{useState} from "react";


function LeaveForm({applyLeave}){


const [leave,setLeave]=useState({

name:"",
email:"",
reason:"",
fromDate:"",
toDate:""

});



const change=(e)=>{

setLeave({

...leave,

[e.target.name]:e.target.value

});

};




const submit=async(e)=>{

e.preventDefault();


await applyLeave(leave);


setLeave({

name:"",
email:"",
reason:"",
fromDate:"",
toDate:""

});


};





return(

<div style={wrapper}>


<form 
onSubmit={submit}
style={form}
>


<h2 style={title}>
📝 Apply Leave
</h2>




<input

style={input}

name="name"

placeholder="Employee Name"

value={leave.name}

onChange={change}

/>





<input

style={input}

name="email"

placeholder="Email"

value={leave.email}

onChange={change}

/>





<textarea

style={textarea}

name="reason"

placeholder="Reason for leave"

value={leave.reason}

onChange={change}

/>





<div style={dateRow}>


<div style={dateBox}>

<label style={label}>
From Date
</label>

<input

style={input}

type="date"

name="fromDate"

value={leave.fromDate}

onChange={change}

/>

</div>




<div style={dateBox}>

<label style={label}>
To Date
</label>


<input

style={input}

type="date"

name="toDate"

value={leave.toDate}

onChange={change}

/>

</div>



</div>





<button

style={button}

type="submit"

>

Apply Leave

</button>



</form>


</div>

);

}





const wrapper={

display:"flex",

justifyContent:"center",

width:"100%",

marginBottom:"30px"

};





const form={

width:"420px",

background:"#2A070C",

padding:"30px",

borderRadius:"20px",

display:"flex",

flexDirection:"column",

gap:"15px",

boxShadow:
"0 10px 30px rgba(0,0,0,0.25)"

};





const title={

color:"#DDC8B3",

textAlign:"center",

marginBottom:"10px"

};





const input={

width:"100%",

boxSizing:"border-box",

padding:"12px",

borderRadius:"10px",

border:"none",

outline:"none",

background:"#DDC8B3",

color:"#2A070C"

};





const textarea={

width:"100%",

height:"80px",

boxSizing:"border-box",

padding:"12px",

borderRadius:"10px",

border:"none",

resize:"none",

background:"#DDC8B3"

};





const dateRow={

display:"flex",

gap:"15px"

};





const dateBox={

flex:1

};





const label={

color:"#DDC8B3",

fontSize:"13px"

};





const button={

padding:"13px",

borderRadius:"12px",

border:"none",

background:"#9F8E87",

color:"#2A070C",

fontWeight:"bold",

cursor:"pointer",

fontSize:"16px"

};



export default LeaveForm;