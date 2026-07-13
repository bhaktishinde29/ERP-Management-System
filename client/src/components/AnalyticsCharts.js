import React from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

ChartJS.register(...registerables);

const BORDO = "#2A070C";
const CREAM = "#DDC8B3";

function AnalyticsCharts() {
  const revenue = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Revenue",
        data: [20, 35, 40, 55, 70],
        borderColor: BORDO,
        backgroundColor: CREAM,
        fill: true,
      },
    ],
  };

  const growth = {
    labels: ["2021", "2022", "2023", "2024", "2025"],
    datasets: [
      {
        label: "Employees",
        data: [10, 14, 18, 22, 28],
        backgroundColor: BORDO,
      },
    ],
  };

  const pie = {
    labels: ["HR", "IT", "Sales", "Finance"],
    datasets: [
      {
        data: [10, 40, 30, 20],
        backgroundColor: [BORDO, "#9F8E87", CREAM, "#5A0F15"],
      },
    ],
  };

  return (
    <div style={grid}>

      <div style={box}>
        <h3>📈 Revenue Trend</h3>
        <Line data={revenue} />
      </div>

      <div style={box}>
        <h3>👥 Employee Growth</h3>
        <Bar data={growth} />
      </div>

      <div style={box}>
        <h3>🥧 Departments</h3>
        <Pie data={pie} />
      </div>

    </div>
  );
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gap: "20px",
  marginTop: "25px",
};

const box = {
  background: "#fff",
  padding: "15px",
  borderRadius: "15px",
  height: "320px",
};

export default AnalyticsCharts;