import React, { useEffect, useState } from "react";


function LeaveManagement() {


  const [leaves,setLeaves] = useState([]);

  const [search,setSearch] = useState("");

  const [filter,setFilter] = useState("All");

 const [loading,setLoading] = useState(true);


const token =
localStorage.getItem("token");



  const loadLeaves = async()=>{

try{


const res = await fetch(

"https://erp-management-system-g9n6.onrender.com/api/leaves",

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
"Leaves:",
data
);



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
const updateStatus = async(id,status)=>{


try{


const res = await fetch(

`https://erp-management-system-g9n6.onrender.com/api/leaves/${id}`,

{


method:"PUT",


headers:{


"Content-Type":"application/json",


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



console.log(
"Update:",
data
);



if(!res.ok){

alert(data.message);

return;

}



alert(
"Leave Updated"
);



loadLeaves();


}

catch(err){

console.log(err);

}


};
 const filteredLeaves = leaves.filter((leave)=>{


const name =

leave.userId?.name || "";



const email =

leave.userId?.email || "";



const matchSearch =


name.toLowerCase()
.includes(search.toLowerCase())


||


email.toLowerCase()
.includes(search.toLowerCase());




const matchFilter =

filter==="All"

||

leave.status===filter;



return matchSearch && matchFilter;


});
  return (

    <div style={styles.page}>


      <h1 style={styles.title}>
        📋 Leave Management
      </h1>



      <div style={styles.cards}>


        <Box
        title="Total"
        value={leaves.length}
        />


        <Box
        title="Pending"
        value={
          leaves.filter(
            l=>l.status==="Pending"
          ).length
        }
        />


        <Box
        title="Approved"
        value={
          leaves.filter(
            l=>l.status==="Approved"
          ).length
        }
        />


        <Box
        title="Rejected"
        value={
          leaves.filter(
            l=>l.status==="Rejected"
          ).length
        }
        />



      </div>






      <div style={styles.container}>


        <div style={styles.controls}>


          <input

          placeholder="Search employee"

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

          style={styles.input}

          />



          <select

          value={filter}

          onChange={(e)=>setFilter(e.target.value)}

          style={styles.input}

          >


            <option>
              All
            </option>


            <option>
              Pending
            </option>


            <option>
              Approved
            </option>


            <option>
              Rejected
            </option>


          </select>


        </div>





        {
          loading ?

          <h2>
            Loading...
          </h2>


          :



          <table style={styles.table}>


          <thead>

          <tr>

          <th style={styles.th}>
            Name
          </th>

          <th style={styles.th}>
            Email
          </th>

          <th style={styles.th}>
            Reason
          </th>

          <th style={styles.th}>
            Status
          </th>

          <th style={styles.th}>
            Action
          </th>


          </tr>

          </thead>





          <tbody>


          {
            filteredLeaves.map((leave)=>(


              <tr key={leave._id}>


                <td style={styles.td}>
                  {leave.userId?.name || "-"}
                </td>


                <td style={styles.td}>
                  {leave.userId?.email || "-"}
                </td>


                <td style={styles.td}>
                  {leave.reason}
                </td>



                <td style={styles.td}>

                  <span style={
                    leave.status==="Approved"
                    ?
                    styles.approved
                    :
                    leave.status==="Rejected"
                    ?
                    styles.rejected
                    :
                    styles.pending
                  }>

                  {leave.status}

                  </span>


                </td>




                <td style={styles.td}>


                {
                  leave.status==="Pending"

                  &&

                  <>


                  <button

                  style={styles.approveBtn}

                  onClick={()=>
                    updateStatus(
                      leave._id,
                      "Approved"
                    )
                  }

                  >
                    Approve
                  </button>



                  <button

                  style={styles.rejectBtn}

                  onClick={()=>
                    updateStatus(
                      leave._id,
                      "Rejected"
                    )
                  }

                  >
                    Reject
                  </button>


                  </>

                }


                </td>


              </tr>


            ))
          }


          </tbody>


          </table>


        }



      </div>



    </div>

  );


}






function Box({title,value}){


return(

<div style={styles.card}>

<h3>
{title}
</h3>

<h1>
{value}
</h1>


</div>

);


}







const styles = {


page:{

padding:"35px",

minHeight:"100vh",

background:
"linear-gradient(135deg,#120304,#2A070C,#1B0507)",

color:"#DDC8B3"

},


title:{

fontSize:"34px",

fontWeight:"700",

marginBottom:"30px",

color:"#DDC8B3",

letterSpacing:"1px"

},



cards:{

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(220px,1fr))",

gap:"25px",

marginBottom:"35px"

},



card:{

background:
"rgba(221,200,179,0.12)",

backdropFilter:
"blur(15px)",

border:
"1px solid rgba(221,200,179,0.25)",

padding:"25px",

borderRadius:"22px",

textAlign:"center",

boxShadow:
"0 10px 30px rgba(0,0,0,0.5)",

transition:"0.3s",

color:"#DDC8B3"

},



container:{

background:
"rgba(255,255,255,0.08)",

backdropFilter:
"blur(18px)",

padding:"30px",

borderRadius:"25px",

boxShadow:
"0 15px 40px rgba(0,0,0,0.5)"

},



controls:{

display:"flex",

gap:"20px",

marginBottom:"25px",

flexWrap:"wrap"

},



input:{

padding:"14px",

borderRadius:"12px",

border:
"1px solid #DDC8B3",

background:
"rgba(255,255,255,0.1)",

color:"#DDC8B3",

outline:"none",

fontSize:"15px"

},



table:{

width:"100%",

borderCollapse:"collapse",

color:"#DDC8B3"

},



th:{

background:"#DDC8B3",

color:"#2A070C",

padding:"15px",

fontSize:"15px"

},



td:{

padding:"15px",

borderBottom:
"1px solid rgba(221,200,179,0.2)"

},



approved:{

background:"#1f8f4c",

padding:"8px 15px",

borderRadius:"20px",

color:"white"

},



rejected:{

background:"#b52b38",

padding:"8px 15px",

borderRadius:"20px",

color:"white"

},



pending:{

background:"#c27c1a",

padding:"8px 15px",

borderRadius:"20px",

color:"white"

},



approveBtn:{

background:"#2ecc71",

border:"none",

padding:"10px 15px",

borderRadius:"10px",

cursor:"pointer",

color:"white",

fontWeight:"bold",

marginRight:"8px"

},



rejectBtn:{

background:"#e74c3c",

border:"none",

padding:"10px 15px",

borderRadius:"10px",

cursor:"pointer",

color:"white",

fontWeight:"bold"

}



};



export default LeaveManagement;