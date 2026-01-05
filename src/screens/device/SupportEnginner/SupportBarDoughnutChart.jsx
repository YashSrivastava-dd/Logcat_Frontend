import React, { useEffect, useState, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getWeeklyActionCount } from "../../../store/action/StoreSystem";

function SupportBarDoughnutChart() {
  const [selectedOption, setSelectedOption] = useState("Open");
  const dispatch = useDispatch();

  // Fetching data from Redux
  const countData = useSelector(
    (state) => state.getWeeklyActionCountReducer?.data || []
  );

  // Fetch data on selection change
  useEffect(() => {
    dispatch(getWeeklyActionCount(selectedOption));
  }, [dispatch, selectedOption]);

  // Memoized function to compute chart data based on selectedOption
  const barChartData = useMemo(() => {
    const labels = countData.map((item) => item.duration || "N/A");
    const dataPoints = countData.map((item) => item.count || 0);

    return {
      labels,
      datasets: [
        {
          label: "Weekly Data",
          data: dataPoints,
          backgroundColor: "#98004c",
          borderColor: "red",
          borderWidth: 0,
        },
      ],
    };
  }, [countData]);

  const barChartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { grid: { display: false } },
        y: { beginAtZero: true, suggestedMax: 15 },
      },
      plugins: { legend: { display: false } },
    }),
    []
  );

  return (
    <div className="flex flex-col items-end" style={{ width: "60%" }}>
      {/* Dropdown */}
      <select
        onChange={(e) => setSelectedOption(e.target.value)}
        value={selectedOption}
        className="border border-gray-300 p-2 rounded-lg w-44 shadow-sm mb-4"
      >
        <option value="Open">Complain Register</option>
        <option value="Hold">Complain Pending</option>
        <option value="Closed">Complain Solved</option>
      </select>

      {/* Bar Chart */}
      <div style={{ width: "100%", height: "300px" }}>
        <Bar data={barChartData} options={barChartOptions} />
      </div>
    </div>
  );
}

export default SupportBarDoughnutChart;
