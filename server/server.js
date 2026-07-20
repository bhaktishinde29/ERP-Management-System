const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();


const app = express();



// Middleware

app.use(cors());

app.use(express.json());




// MongoDB

mongoose.connect(process.env.MONGO_URI)

.then(()=>{

console.log("MongoDB Connected");

})

.catch(err=>{

console.log(
"MongoDB Error:",
err
);

});




// Routes

const authRoutes =
require("./routes/authRoutes");


const attendanceRoutes =
require("./routes/attendanceRoutes");


const employeeRoutes =
require("./routes/employeeRoutes");


const leaveRoutes =
require("./routes/leaveRoutes");


const payrollRoutes =
require("./routes/payrollRoutes");


const reportRoutes =
require("./routes/reports");


const dashboardRoutes =
require("./routes/dashboardRoutes");





// API Routes


app.use(
"/api/auth",
authRoutes
);



app.use(
"/api/attendance",
attendanceRoutes
);



app.use(
"/api/employees",
employeeRoutes
);



app.use(
"/api/leaves",
leaveRoutes
);



app.use(
"/api/payroll",
payrollRoutes
);



app.use(
"/api/dashboard",
dashboardRoutes
);



app.use(
"/api/reports",
reportRoutes
);





// Test

app.get("/",(req,res)=>{

res.json({

message:"ERP Server Running"

});

});





// Server

const PORT =
process.env.PORT || 5000;


app.listen(PORT,()=>{

console.log(
`Server running on port ${PORT}`
);

});