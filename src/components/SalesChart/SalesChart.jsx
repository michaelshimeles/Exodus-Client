import "./SalesChart.scss";
import { Scatter } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ping from "../../utils/ping";

const SalesChart = () => {
  const [salesChart, setSalesChart] = useState(null);

  const { id } = useParams();

  const URL = `http://localhost:8080/sales/${id}`;

  useEffect(() => {
    ping(`${URL}`, setSalesChart);
    ping(`${URL}`, setSalesChart, 10000);
  }, [URL]);

  const options = {
    scales: {
      xAxis: {
        ticks: {
          callback: (value) => {
            return new Date(value).toLocaleTimeString();
          },
        },
      },
    },
  };

  const data = {
    datasets: [
      {
        label: "Sales Chart",
        data: salesChart
          ? salesChart.map((sales) => {
              return {
                x: sales.timestamp,
                y: sales.priceInEth,
              };
            })
          : "",
      },
    ],
  };
  return (
    <div className="sales-section">
      <Scatter className="sales-section__chart" options={options} data={data} />
    </div>
  );
};

export default SalesChart;