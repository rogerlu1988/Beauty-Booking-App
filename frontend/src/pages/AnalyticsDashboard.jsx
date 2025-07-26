import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function AnalyticsDashboard() {
  const [data, setData] = useState({ labels: [], values: [] });

  useEffect(() => {
    // Example: pull pre-aggregated analytics from your backend
    axios.get("http://localhost:5000/api/analytics/most-booked-hours").then(res => {
      setData(res.data); // { labels: [...], values: [...] }
    });
  }, []);

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Bookings",
        data: data.values,
      },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Most Booked Hours</h1>
      <Bar data={chartData} />
    </div>
  );
}
