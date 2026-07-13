import React from "react";

function EmployeeTable({ employees = [], deleteEmployee }) {

  return (
    <table style={table}>

      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Designation</th>
          <th>Salary</th>
          <th>Action</th>
        </tr>
      </thead>


      <tbody>

        {employees.map((emp)=>(
          <tr key={emp._id}>

            <td>{emp.name}</td>

            <td>{emp.email}</td>

            <td>{emp.department}</td>

            <td>{emp.designation}</td>

            <td>{emp.salary}</td>

            <td>
              <button 
                onClick={()=>deleteEmployee(emp._id)}
              >
                Delete
              </button>
            </td>

          </tr>
        ))}

      </tbody>

    </table>
  );
}


const table={
  width:"100%",
  borderCollapse:"collapse",
};


export default EmployeeTable;