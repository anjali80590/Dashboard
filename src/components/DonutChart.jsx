
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ type }) => {
  const isCloudAccounts = type === "cloud-accounts";

  const data = isCloudAccounts
    ? {
        labels: ["Connected", "Not Connected"],
        datasets: [
          {
            label: "Cloud Accounts",
            data: [2, 2],
            backgroundColor: ["#3b82f6", "#e0e7ff"],
            hoverBackgroundColor: ["#3b82f6", "#e0e7ff"],
            borderWidth: 2,
            borderColor: "#fff",
            cutout: "70%",
          },
        ],
      }
    : {
        labels: ["Failed", "Warning", "Not Available", "Passed"],
        datasets: [
          {
            label: "Cloud Account Risk Assessment",
            data: [1689, 681, 36, 7253],
            backgroundColor: ["#f87171", "#fbbf24", "#f3f4f6", "#34d399"],
            hoverBackgroundColor: ["#f87171", "#fbbf24", "#f3f4f6", "#34d399"],
            borderWidth: 2,
            borderColor: "#fff",
            cutout: "70%",
          },
        ],
      };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop:"30px",
        gap: "100px", // space between the chart and the legend
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100px",
          height: "100px",
        }}
      >
        <Doughnut data={data} options={options} />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontWeight: "bold",
            fontSize: "16px",
            textAlign: "center",
          }}
        >
          {isCloudAccounts ? "2 Total" : "9659 Total"}
        </div>
      </div>
      <div>
        <div className="legend">
          {isCloudAccounts ? (
            <>
              <div className="legend-item">
                <span className="legend-color connected"></span>
                <span>Connected (2)</span>
              </div>
              <div className="legend-item">
                <span className="legend-color not-connected"></span>
                <span>Not Connected (2)</span>
              </div>
            </>
          ) : (
            <>
              <div className="legend-item">
           
                <span className="legend-color failed"></span>
                <span>Failed (1689)</span>
              </div>
              <div className="legend-item">
                <span className="legend-color warning"></span>
                <span>Warning (681)</span>
              </div>
              <div className="legend-item">
                <span className="legend-color not-available"></span>
                <span>Not Available (36)</span>
              </div>
              <div className="legend-item">
                <span className="legend-color passed"></span>
                <span>Passed (7253)</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
