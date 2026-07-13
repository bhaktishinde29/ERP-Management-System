import React, { useState } from "react";


function Login() {


const [email,setEmail] =
useState("");

const [password,setPassword] =
useState("");

const [show,setShow] =
useState(false);

const [loading,setLoading] =
useState(false);





const handleLogin = async(e)=>{


e.preventDefault();



const loginData={

email:email.trim().toLowerCase(),

password:password.trim()

};




if(!loginData.email || !loginData.password){

alert("Enter email and password");

return;

}



setLoading(true);



try{


const response = await fetch(

"http://localhost:5000/api/auth/login",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(loginData)

}

);





const data =
await response.json();





if(!response.ok){

alert(
data.message ||
"Login failed"
);

setLoading(false);

return;

}





localStorage.setItem(

"token",

data.token

);


localStorage.setItem(

"user",

JSON.stringify(data.user)

);



window.location.href="/dashboard";



}

catch(err){


alert(
"Backend connection failed"
);


}

finally{


setLoading(false);


}



};






return(


<div style={page}>


{/* Animated Background */}


<div style={circle1}></div>

<div style={circle2}></div>

<div style={circle3}></div>






<div style={left}>


<div style={logo}>

ERP

</div>



<h1 style={title}>

Welcome Back 👋

</h1>



<p style={subtitle}>

Smart Employee Management System

</p>



<div style={features}>


<div>
✓ Employee Management
</div>


<div>
✓ Attendance Tracking
</div>


<div>
✓ Payroll Automation
</div>


<div>
✓ Leave Management
</div>


</div>




</div>







<div style={right}>


<form

onSubmit={handleLogin}

style={card}

>


<h2 style={heading}>

Login

</h2>


<p style={smallText}>

Access your ERP dashboard

</p>





<div style={inputBox}>


<span>
📧
</span>


<input

type="email"

placeholder="Email Address"

value={email}

onChange={
(e)=>setEmail(e.target.value)
}

style={input}

/>


</div>







<div style={inputBox}>


<span>
🔒
</span>


<input

type={
show
?
"text"
:
"password"
}

placeholder="Password"

value={password}

onChange={
(e)=>setPassword(e.target.value)
}

style={input}

/>



<span

style={eye}

onClick={()=>setShow(!show)}

>

{
show
?
"🙈"
:
"👁"
}

</span>



</div>







<button

style={button}

disabled={loading}

>


{

loading

?

"Logging in..."

:

"Login →"

}


</button>




<div style={footer}>

ERP System v3.0

</div>



</form>



</div>




</div>


);


}






const page={

width:"100vw",

height:"100vh",

minHeight:"100vh",

display:"flex",

overflow:"hidden",

margin:0,

padding:0,

position:"fixed",

top:0,

left:0,

background:
"linear-gradient(135deg,#120304,#2A070C,#9F8E87)"

};

const left={

flex:1,


padding:"70px",


display:"flex",


flexDirection:"column",


justifyContent:"center",


color:"#DDC8B3",


animation:"slideLeft 1s ease"


};






const right={


flex:1,


display:"flex",


justifyContent:"center",


alignItems:"center"


};






const logo={


width:"90px",


height:"90px",


borderRadius:"25px",


background:

"linear-gradient(135deg,#DDC8B3,#9F8E87)",


color:"#2A070C",


display:"flex",


justifyContent:"center",


alignItems:"center",


fontSize:"35px",


fontWeight:"900",


boxShadow:

"0 0 40px rgba(221,200,179,.5)",


marginBottom:"30px",


animation:"float 3s infinite"


};






const title={


fontSize:"52px",


marginBottom:"10px"


};






const subtitle={


fontSize:"22px",


opacity:.9


};






const features={


marginTop:"35px",


fontSize:"18px",


lineHeight:"2.2"


};







const card={


width:"380px",


padding:"40px",


borderRadius:"30px",


background:

"rgba(255,255,255,.12)",


backdropFilter:"blur(20px)",


border:

"1px solid rgba(221,200,179,.3)",


boxShadow:

"0 20px 50px rgba(0,0,0,.5)",


animation:"slideUp 1s ease"


};






const heading={


textAlign:"center",


color:"#DDC8B3",


fontSize:"34px"


};






const smallText={


textAlign:"center",


color:"#fff",


marginBottom:"25px"


};







const inputBox={


display:"flex",


alignItems:"center",


gap:"10px",


background:"rgba(255,255,255,.1)",


borderRadius:"15px",


padding:"10px",


marginBottom:"18px"


};






const input={


width:"100%",


background:"transparent",


border:"none",


outline:"none",


color:"#fff",


fontSize:"16px"


};






const eye={


cursor:"pointer"

};






const button={


width:"100%",


padding:"15px",


border:"none",


borderRadius:"15px",


background:

"linear-gradient(135deg,#DDC8B3,#9F8E87)",


color:"#2A070C",


fontWeight:"bold",


fontSize:"18px",


cursor:"pointer",


marginTop:"15px"


};







const footer={


textAlign:"center",


color:"#DDC8B3",


marginTop:"25px",


fontSize:"13px"


};







const circle1={


position:"absolute",


width:"300px",


height:"300px",


borderRadius:"50%",


background:"#DDC8B3",


opacity:.08,


top:"-100px",


left:"-100px"


};



const circle2={


...circle1,


width:"400px",


height:"400px",


right:"-150px",


left:"auto",


bottom:"-150px"


};



const circle3={


...circle1,


width:"200px",


height:"200px",


right:"40%",


top:"20%"


};

export default Login;