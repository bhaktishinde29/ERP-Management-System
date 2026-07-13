import React, {useState} from "react";
import {
Link,
useLocation
} from "react-router-dom";



function Sidebar(){


const [open,setOpen]=useState(false);


const location =
useLocation();



const user =
JSON.parse(
localStorage.getItem("user")
);



const role =
user?.role;




const logout=()=>{


localStorage.removeItem("token");

localStorage.removeItem("user");


window.location.href="/";


};






const itemStyle=(path)=>(

{

display:"flex",

alignItems:"center",

gap:"12px",

padding:"12px 15px",

margin:"8px",

borderRadius:"12px",

textDecoration:"none",

color:"#DDC8B3",


background:

location.pathname===path

?

"rgba(221,200,179,.25)"

:

"rgba(255,255,255,.08)",


whiteSpace:"nowrap"

}

);







return(


<div

onMouseEnter={()=>setOpen(true)}

onMouseLeave={()=>setOpen(false)}


style={{

width:
open
?
"240px"
:
"70px",


height:"100vh",


position:"fixed",

left:0,

top:0,


background:
"linear-gradient(180deg,#2A070C,#120304)",


transition:"0.3s",


overflow:"hidden",

zIndex:1000,


display:"flex",

flexDirection:"column"


}}



>



{/* LOGO */}

<div

style={{

padding:"20px",

color:"#DDC8B3",

fontWeight:"bold",

fontSize:"20px"

}}

>

ERP

{

open && " SYSTEM"

}


</div>







{/* COMMON */}


<Link

to="/dashboard"

style={itemStyle("/dashboard")}

>

🏠 {open && "Dashboard"}

</Link>







{/* ADMIN + HR */}



{

(role==="admin" || role==="hr")

&&

<>



<Link

to="/employees"

style={itemStyle("/employees")}

>

👥 {open && "Employees"}

</Link>






<Link

to="/attendance"

style={itemStyle("/attendance")}

>

🕒 {open && "Attendance"}

</Link>






<Link

to="/leave-management"

style={itemStyle("/leave-management")}

>

📋 {open && "Leave Management"}

</Link>







<Link

to="/payroll"

style={itemStyle("/payroll")}

>

💰 {open && "Payroll"}

</Link>





</>



}









{/* EMPLOYEE */}



{

role==="employee"

&&

<>


<Link

to="/my-attendance"

style={itemStyle("/my-attendance")}

>

🕒 {open && "My Attendance"}

</Link>






<Link

to="/leave"

style={itemStyle("/leave")}

>

📝 {open && "Apply Leave"}

</Link>







<Link

to="/my-payroll"

style={itemStyle("/my-payroll")}

>

💰 {open && "My Payroll"}

</Link>





</>


}










{/* ADMIN ONLY */}



{

role==="admin"

&&

<>


<Link

to="/analytics"

style={itemStyle("/analytics")}

>

📊 {open && "Analytics"}

</Link>





<Link

to="/reports"

style={itemStyle("/reports")}

>

📄 {open && "Reports"}

</Link>



</>


}









<div

onClick={logout}


style={{

marginTop:"auto",

padding:"15px",

margin:"10px",

cursor:"pointer",

color:"#ffaaaa",

background:
"rgba(255,0,0,.15)",

borderRadius:"12px"

}}

>


🚪 {open && "Logout"}


</div>







<div

style={{

padding:"15px",

fontSize:"12px",

color:"#9F8E87"

}}

>


{

open

?

`ERP v4.0 • ${role}`

:

"v4"

}


</div>







</div>



);



}



export default Sidebar;