import React, { useEffect, useState } from "react";


function Leave(){


const token =
localStorage.getItem("token");



const [form,setForm] = useState({

reason:"",
fromDate:"",
toDate:""

});



const [leaves,setLeaves] = useState([]);

const [loading,setLoading] = useState(true);





// =============================
// LOAD MY LEAVES
// =============================


const loadLeaves = async()=>{


try{


const res = await fetch(

"https://erp-management-system-g9n6.onrender.com/api/leaves/my",

{

headers:{

Authorization:
`Bearer ${token}`

}

}

);



const data =
await res.json();



setLeaves(

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


loadLeaves();


},[]);








// =============================
// INPUT CHANGE
// =============================


const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:

e.target.value

});


};








// =============================
// APPLY LEAVE
// =============================


const submitLeave = async(e)=>{


e.preventDefault();



try{


const res = await fetch(

"https://erp-management-system-g9n6.onrender.com/api/leaves",

{


method:"POST",


headers:{


"Content-Type":"application/json",


Authorization:

`Bearer ${token}`


},


body:JSON.stringify({

reason:form.reason,

fromDate:form.fromDate,

toDate:form.toDate

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
"Leave Applied Successfully"
);



setForm({

reason:"",

fromDate:"",

toDate:""

});



loadLeaves();



}


catch(err){

console.log(err);

}


};








const pending =

leaves.filter(

l=>l.status==="Pending"

).length;



const approved =

leaves.filter(

l=>l.status==="Approved"

).length;



const rejected =

leaves.filter(

l=>l.status==="Rejected"

).length;









return(


<div style={page}>


<div style={header}>


<div style={icon}>
📝
</div>


<div>

<h1>
My Leave Management
</h1>


<p>
Apply leave and track approval status
</p>


</div>


</div>









<div style={stats}>


<div style={card}>

<h2>
{leaves.length}
</h2>

<p>
Total
</p>

</div>




<div style={pendingCard}>

<h2>
{pending}
</h2>

<p>
Pending
</p>

</div>





<div style={approvedCard}>

<h2>
{approved}
</h2>

<p>
Approved
</p>

</div>





<div style={rejectedCard}>

<h2>
{rejected}
</h2>

<p>
Rejected
</p>

</div>



</div>









<div style={layout}>



<div style={formCard}>


<h2>
Apply Leave
</h2>



<form onSubmit={submitLeave}>


<label>
Reason
</label>


<textarea

name="reason"

value={form.reason}

onChange={handleChange}

style={input}

required

/>





<label>
From Date
</label>


<input

type="date"

name="fromDate"

value={form.fromDate}

onChange={handleChange}

style={input}

required

/>





<label>
To Date
</label>


<input

type="date"

name="toDate"

value={form.toDate}

onChange={handleChange}

style={input}

required

/>






<button

style={submitBtn}

>

Apply Leave

</button>



</form>


</div>









<div style={historyCard}>


<h2>
📋 Leave History
</h2>





{

loading ?

<h3>
Loading...
</h3>


:


<table style={table}>


<thead>

<tr>

<th style={th}>
Reason
</th>


<th style={th}>
From
</th>


<th style={th}>
To
</th>


<th style={th}>
Status
</th>


</tr>


</thead>





<tbody>


{

leaves.length===0

?


<tr>

<td

colSpan="4"

style={empty}

>

No Leave Records

</td>

</tr>


:


leaves.map(leave=>(


<tr key={leave._id}>


<td style={td}>
{leave.reason}
</td>



<td style={td}>
{leave.fromDate}
</td>



<td style={td}>
{leave.toDate}
</td>




<td style={td}>


<span

style={

leave.status==="Approved"

?

approvedStatus

:

leave.status==="Rejected"

?

rejectedStatus

:

pendingStatus

}

>

{leave.status}

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



</div>


);


}









const page={

padding:"35px",

minHeight:"100vh",

background:
"linear-gradient(135deg,#120304,#2A070C,#9F8E87)"

};





const header={

display:"flex",

gap:"20px",

alignItems:"center",

padding:"25px",

borderRadius:"25px",

background:
"rgba(255,255,255,.12)",

color:"#DDC8B3"

};





const icon={

width:"70px",

height:"70px",

borderRadius:"50%",

background:"#DDC8B3",

color:"#2A070C",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"30px"

};





const stats={

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(220px,1fr))",

gap:"20px",

marginTop:"30px"

};





const card={

padding:"25px",

borderRadius:"20px",

background:"#DDC8B3",

color:"#2A070C",

textAlign:"center"

};





const pendingCard={

...card,

background:"#c27c1a",

color:"#fff"

};





const approvedCard={

...card,

background:"#1f8f4c",

color:"#fff"

};





const rejectedCard={

...card,

background:"#b52b38",

color:"#fff"

};





const layout={

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(350px,1fr))",

gap:"30px",

marginTop:"35px"

};





const formCard={

background:"#fff",

padding:"30px",

borderRadius:"25px",

color:"#2A070C"

};





const historyCard={

background:"#fff",

padding:"30px",

borderRadius:"25px",

color:"#2A070C"

};





const input={

width:"100%",

padding:"14px",

marginBottom:"20px",

borderRadius:"12px",

border:"1px solid #ccc",

boxSizing:"border-box"

};





const submitBtn={

width:"100%",

padding:"15px",

border:"none",

borderRadius:"30px",

background:"#2A070C",

color:"#DDC8B3",

cursor:"pointer",

fontWeight:"bold"

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

borderBottom:"1px solid #ddd"

};





const pendingStatus={

background:"#c27c1a",

color:"#fff",

padding:"8px 15px",

borderRadius:"20px"

};





const approvedStatus={

background:"#1f8f4c",

color:"#fff",

padding:"8px 15px",

borderRadius:"20px"

};





const rejectedStatus={

background:"#b52b38",

color:"#fff",

padding:"8px 15px",

borderRadius:"20px"

};





const empty={

padding:"30px",

textAlign:"center"

};





export default Leave;