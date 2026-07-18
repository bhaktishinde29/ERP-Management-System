import React, { useEffect, useState } from "react";


function Reports() {


const token = localStorage.getItem("token");



const [report,setReport] = useState({

employees:0,

attendance:0,

present:0,

absent:0,

payroll:0,

leaves:0

});



const [loading,setLoading]=useState(true);




// ===============================
// GET REPORT DATA
// ===============================

const loadReports = async()=>{


try{


const response = await fetch(

"https://erp-management-system-g9n6.onrender.com/api/reports",

{

headers:{

Authorization:

`Bearer ${token}`

}

}

);



const data = await response.json();



console.log(
"Reports Data:",
data
);



if(response.ok){

setReport(data);

}

else{

alert(data.message);

}


}

catch(error){

console.log(error);

}


finally{

setLoading(false);

}


};







useEffect(()=>{


loadReports();


},[]);








// ===============================
// PDF DOWNLOAD
// ===============================


const downloadPDF = async(type)=>{


const urls={


employee:

"https://erp-management-system-g9n6.onrender.com/api/reports/employee/pdf",



attendance:

"https://erp-management-system-g9n6.onrender.com/api/reports/attendance/pdf",



payroll:

"https://erp-management-system-g9n6.onrender.com/api/reports/payroll/pdf"



};




try{


const response = await fetch(

urls[type],

{

headers:{

Authorization:

`Bearer ${token}`

}

}

);





if(!response.ok){


alert("Unable to generate PDF");


return;


}




const blob = await response.blob();



const fileURL =
window.URL.createObjectURL(blob);



const link =
document.createElement("a");



link.href=fileURL;



link.download =

`${type}_report.pdf`;



document.body.appendChild(link);



link.click();



link.remove();



window.URL.revokeObjectURL(fileURL);



}

catch(error){


console.log(
"PDF Error:",
error
);


}


};









return(


<div style={container}>


<h1 style={heading}>

📊 Reports & Analytics

</h1>



<p style={subText}>

Generate ERP employee, attendance and payroll reports

</p>





{

loading ?


<div style={loadingBox}>

Loading Reports...

</div>



:

<>



<div style={cardGrid}>


<Card

icon="👥"

title="Employees"

value={report.employees}

/>



<Card

icon="📅"

title="Attendance Records"

value={report.attendance}

/>



<Card

icon="🟢"

title="Present"

value={report.present}

/>



<Card

icon="🔴"

title="Absent"

value={report.absent}

/>



<Card

icon="💰"

title="Payroll"

value={`₹ ${report.payroll}`}

/>



<Card

icon="📝"

title="Leaves"

value={report.leaves}

/>



</div>








<div style={downloadBox}>


<h2>

Generate PDF Reports

</h2>




<div style={buttonContainer}>



<button

style={button}

onClick={()=>downloadPDF("employee")}

>

📄 Employee PDF

</button>





<button

style={button}

onClick={()=>downloadPDF("attendance")}

>

📄 Attendance PDF

</button>







<button

style={button}

onClick={()=>downloadPDF("payroll")}

>

📄 Payroll PDF

</button>




</div>


</div>





</>


}




</div>


);

}









function Card({

icon,

title,

value

}){


return(


<div style={card}>


<div style={iconStyle}>

{icon}

</div>



<h1>

{value}

</h1>



<p>

{title}

</p>



</div>


);


}









// ===============================
// STYLES
// ===============================



const container={


minHeight:"100vh",


padding:"35px",


background:

"linear-gradient(135deg,#DDC8B3,#9F8E87)",



boxSizing:"border-box"


};







const heading={


fontSize:"42px",


fontWeight:"800",


color:"#2A070C",


marginBottom:"10px"


};







const subText={


fontSize:"18px",


color:"#2A070C",


marginBottom:"35px"


};







const cardGrid={


display:"grid",


gridTemplateColumns:

"repeat(auto-fit,minmax(230px,1fr))",


gap:"25px"


};








const card={


background:

"#2A070C",


color:

"#DDC8B3",


padding:"30px",


borderRadius:"25px",


textAlign:"center",


boxShadow:

"0 15px 35px rgba(42,7,12,0.35)",


transition:"0.3s"


};







const iconStyle={


fontSize:"45px",


marginBottom:"15px"


};







const downloadBox={


marginTop:"45px",


padding:"30px",


background:

"rgba(255,255,255,0.35)",


borderRadius:"25px",


textAlign:"center"


};







const buttonContainer={


display:"flex",


justifyContent:"center",


gap:"20px",


flexWrap:"wrap",


marginTop:"25px"


};







const button={


padding:

"15px 30px",


borderRadius:"15px",


border:"none",


background:"#2A070C",


color:"#DDC8B3",


fontSize:"16px",


fontWeight:"bold",


cursor:"pointer",


transition:"0.3s"


};








const loadingBox={


background:"#2A070C",


color:"#DDC8B3",


padding:"30px",


borderRadius:"20px",


textAlign:"center",


fontSize:"20px"


};






export default Reports;