import React, { useState } from "react";


function DashboardCard({title, value, icon}) {


  const [hover, setHover] = useState(false);



  return (

    <div

      onMouseEnter={()=>setHover(true)}

      onMouseLeave={()=>setHover(false)}

      style={{

        background: hover
        ? "rgba(221,200,179,0.25)"
        : "rgba(221,200,179,0.12)",


        border:"1px solid rgba(221,200,179,0.25)",


        borderRadius:"20px",


        padding:"25px",


        textAlign:"center",


        color:"#DDC8B3",


        transition:"0.3s ease",


        transform:hover
        ?"translateY(-8px)"
        :"translateY(0)",


        boxShadow:hover
        ?"0 15px 40px rgba(0,0,0,0.5)"
        :"0 8px 20px rgba(0,0,0,0.3)"


      }}

    >


      <div
        style={{
          fontSize:"40px",
          marginBottom:"15px"
        }}
      >

        {icon}

      </div>



      <h2>

        {value}

      </h2>



      <p

        style={{
          color:"#9F8E87",
          fontSize:"16px"
        }}

      >

        {title}

      </p>



    </div>


  );

}


export default DashboardCard;