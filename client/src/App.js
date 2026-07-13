import React from "react";

import {
BrowserRouter,
Routes,
Route,
Navigate
} from "react-router-dom";


import Sidebar from "./components/Sidebar";


import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";

import Employees from "./pages/Employees";

import Attendance from "./pages/Attendance";

import MyAttendance from "./pages/MyAttendance";

import Leave from "./pages/Leave";

import LeaveManagement from "./pages/LeaveManagement";

import Payroll from "./pages/Payroll";

import MyPayroll from "./pages/MyPayroll";

import Analytics from "./pages/Analytics";

import Reports from "./pages/Reports";





function App(){



const token =
localStorage.getItem("token");



const user =

JSON.parse(
localStorage.getItem("user")
);






// ==============================
// ROLE PROTECTION
// ==============================


const ProtectedRoute = ({children,roles})=>{



if(!token){

return <Navigate to="/login"/>

}




if(

roles &&

!roles.includes(user?.role)

){


return <Navigate to="/dashboard"/>


}




return children;


};







return(

<BrowserRouter>


{

token &&

<Sidebar/>

}





<div style={styles.main}>


<Routes>





{/* LOGIN */}

<Route

path="/login"

element={<Login/>}

/>







{/* DASHBOARD */}

<Route

path="/dashboard"

element={

<ProtectedRoute>

<Dashboard/>

</ProtectedRoute>

}

/>









{/* EMPLOYEES */}

<Route

path="/employees"

element={

<ProtectedRoute

roles={[
"admin",
"hr"
]}

>

<Employees/>

</ProtectedRoute>

}

/>









{/* ADMIN + HR ATTENDANCE */}

<Route

path="/attendance"

element={

<ProtectedRoute

roles={[
"admin",
"hr"
]}

>

<Attendance/>

</ProtectedRoute>

}

/>








{/* EMPLOYEE ATTENDANCE */}

<Route

path="/my-attendance"

element={

<ProtectedRoute

roles={[
"employee"
]}

>

<MyAttendance/>

</ProtectedRoute>

}

/>








{/* EMPLOYEE LEAVE */}

<Route

path="/leave"

element={

<ProtectedRoute

roles={[
"employee"
]}

>

<Leave/>

</ProtectedRoute>

}

/>








{/* ADMIN HR LEAVE */}

<Route

path="/leave-management"

element={

<ProtectedRoute

roles={[
"admin",
"hr"
]}

>

<LeaveManagement/>

</ProtectedRoute>

}

/>








{/* ADMIN PAYROLL */}

<Route

path="/payroll"

element={

<ProtectedRoute

roles={[
"admin"
]}

>

<Payroll/>

</ProtectedRoute>

}

/>








{/* EMPLOYEE PAYROLL */}

<Route

path="/my-payroll"

element={

<ProtectedRoute

roles={[
"employee"
]}

>

<MyPayroll/>

</ProtectedRoute>

}

/>








{/* ADMIN ANALYTICS */}

<Route

path="/analytics"

element={

<ProtectedRoute

roles={[
"admin"
]}

>

<Analytics/>

</ProtectedRoute>

}

/>








{/* ADMIN REPORTS */}

<Route

path="/reports"

element={

<ProtectedRoute

roles={[
"admin"
]}

>

<Reports/>

</ProtectedRoute>

}

/>








{/* DEFAULT */}

<Route

path="*"

element={

<Navigate to="/dashboard"/>

}

/>





</Routes>


</div>



</BrowserRouter>


);


}





const styles={


main:{


marginLeft:"70px",

minHeight:"100vh"


}


};



export default App;