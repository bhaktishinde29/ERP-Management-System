import React, { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";


import {
  Bar,
  Doughnut,
  Line
} from "react-chartjs-2";


ChartJS.register(

  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend

);



function Analytics(){



const [dashboard,setDashboard] = useState({

employees:0,

attendance:0,

pending:0,

payroll:0

});




const [leaveData,setLeaveData] = useState({

approved:0,

pending:0,

rejected:0

});




const [payrollData,setPayrollData] = useState([]);



const fetchAnalytics = async()=>{


try{


const response = await fetch(

"https://erp-management-system-g9n6.onrender.com/api/analytics"

);



const data = await response.json();




setDashboard({

employees:data.employees || 0,

attendance:data.presentToday || 0,

pending:data.pendingLeaves || 0,

payroll:data.totalPayroll || 0

});





setLeaveData({

approved:data.approvedLeaves || 0,

pending:data.pendingLeaves || 0,

rejected:data.rejectedLeaves || 0

});





setPayrollData(

data.monthlyPayroll || []

);



}

catch(error){


console.log(
"Analytics Error:",
error
);


}



};





useEffect(()=>{


fetchAnalytics();


},[]);




const cards = [

{

title:"Total Employees",

value:dashboard.employees,

icon:"👨‍💼"

},

{

title:"Present Today",

value:dashboard.attendance,

icon:"🕒"

},

{

title:"Pending Leaves",

value:dashboard.pending,

icon:"📝"

},

{

title:"Total Payroll",

value:`₹ ${dashboard.payroll}`,

icon:"💰"

}

];




const attendanceChart = {


labels:[

"Mon",

"Tue",

"Wed",

"Thu",

"Fri",

"Sat"

],


datasets:[

{

label:"Attendance %",


data:[

92,

88,

96,

90,

97,

75

],


backgroundColor:"#DDC8B3",


borderRadius:10


}

]


};




const leaveChart = {


labels:[

"Approved",

"Pending",

"Rejected"

],


datasets:[

{

data:[

leaveData.approved,

leaveData.pending,

leaveData.rejected

],


backgroundColor:[

"#DDC8B3",

"#9F8E87",

"#6B3E44"

]


}

]


};
const payrollChart = {


labels:

payrollData.map(

(item)=>item.month

),


datasets:[

{

label:"Monthly Salary Expense",


data:

payrollData.map(

(item)=>item.salary

),



borderColor:"#DDC8B3",


backgroundColor:

"rgba(221,200,179,0.25)",


pointBackgroundColor:"#DDC8B3",


tension:0.4


}

]


};





const chartOptions = {


responsive:true,


maintainAspectRatio:false,



plugins:{


legend:{


labels:{


color:"#DDC8B3",


font:{


size:14


}


}


},



tooltip:{


backgroundColor:"#2A070C",


titleColor:"#DDC8B3",


bodyColor:"#DDC8B3"


}


},





scales:{


x:{


ticks:{


color:"#DDC8B3"


},


grid:{


color:"rgba(221,200,179,0.1)"


}


},



y:{


ticks:{


color:"#DDC8B3"


},


grid:{


color:"rgba(221,200,179,0.1)"


}


}


}


};







return (


<div style={styles.page}>


<h1 style={styles.heading}>

📊 ERP Analytics Dashboard

</h1>




{/* CARDS */}


<div style={styles.cardGrid}>


{

cards.map((card,index)=>(


<div

key={index}

style={styles.card}

>


<div style={styles.icon}>

{card.icon}

</div>


<h2 style={styles.cardValue}>

{card.value}

</h2>


<p style={styles.cardTitle}>

{card.title}

</p>



</div>


))


}


</div>






{/* CHART SECTION */}


<div style={styles.chartGrid}>




<div style={styles.chartCard}>


<h2 style={styles.chartTitle}>

📈 Weekly Attendance

</h2>



<div style={styles.chartBox}>


<Bar

data={attendanceChart}

options={chartOptions}

/>


</div>


</div>







<div style={styles.chartCard}>


<h2 style={styles.chartTitle}>

📝 Leave Status

</h2>



<div style={styles.chartBox}>


<Doughnut

data={leaveChart}

options={chartOptions}

/>



</div>



</div>







<div

style={{

...styles.chartCard,

gridColumn:"1 / span 2"

}}

>


<h2 style={styles.chartTitle}>

💰 Payroll Overview

</h2>




<div style={styles.payrollBox}>


<Line

data={payrollChart}

options={chartOptions}

/>



</div>



</div>





</div>



</div>


);

}
const styles = {


page:{


minHeight:"100vh",


padding:"35px",


background:
"linear-gradient(135deg,#120304,#2A070C,#120304)",


color:"#DDC8B3",


fontFamily:"Segoe UI, sans-serif"



},





heading:{


fontSize:"36px",


fontWeight:"700",


marginBottom:"35px",


letterSpacing:"1px",


textShadow:
"0 5px 20px rgba(221,200,179,0.25)"


},






cardGrid:{


display:"grid",


gridTemplateColumns:
"repeat(auto-fit,minmax(230px,1fr))",


gap:"25px",


marginBottom:"35px"



},






card:{


background:
"rgba(221,200,179,0.10)",


border:
"1px solid rgba(221,200,179,0.25)",


borderRadius:"24px",


padding:"28px",


textAlign:"center",


backdropFilter:"blur(18px)",


boxShadow:
"0 15px 40px rgba(0,0,0,0.5)",


transition:"0.3s"



},






icon:{


fontSize:"45px",


marginBottom:"15px"


},





cardValue:{


fontSize:"34px",


margin:"10px 0",


color:"#DDC8B3"


},






cardTitle:{


fontSize:"16px",


color:"#9F8E87"


},






chartGrid:{


display:"grid",


gridTemplateColumns:
"repeat(auto-fit,minmax(420px,1fr))",


gap:"30px"



},






chartCard:{


background:
"rgba(221,200,179,0.08)",


border:
"1px solid rgba(221,200,179,0.18)",


borderRadius:"25px",


padding:"28px",


backdropFilter:
"blur(18px)",


boxShadow:
"0 15px 35px rgba(0,0,0,0.45)"


},






chartTitle:{


fontSize:"22px",


marginBottom:"25px",


color:"#DDC8B3"



},






chartBox:{


height:"320px"



},






payrollBox:{


height:"350px"



}



};





export default Analytics;