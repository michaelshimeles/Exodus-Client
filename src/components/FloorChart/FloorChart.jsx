import { Bar, Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./FloorChart.scss";

const FloorChart = () => {
  const [floorChart, setFloorChart] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/volume/${id}`)
      .then((response) => {
        setFloorChart(response.data.collections);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  // Using chartjs to implement chart
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    tooltips: {
      enabled: false,
    },
    animations: {
      tension: {
        duration: 1000,
        easing: "linear",
        from: 1,
        to: 0,
        loop: true,
      },
    },
  };

  const dataLine = {
    datasets: [
      {
        label: "Volume Chart",
        data: floorChart?.map((floor, index, array) => {
          let reverseArr = array[array.length - 1 - index];
          return {
            x:
              new Date(Number(reverseArr?.timestamp) * 1000)
                .toDateString()
                .split(" ")[1] +
              " " +
              new Date(Number(reverseArr?.timestamp) * 1000)
                .toDateString()
                .split(" ")[2] +
              " " +
              new Date(Number(reverseArr?.timestamp) * 1000)
                .toDateString()
                .split(" ")[3],
            y: reverseArr?.volume,
          };
        }),
      },
    ],
  };

  const dataBar = {
    datasets: [
      {
        label: "Floor Chart",
        data: floorChart?.map((floor, index, array) => {
          let reverseArr = array[array.length - 1 - index];
          return {
            x:
              new Date(Number(reverseArr?.timestamp) * 1000)
                .toDateString()
                .split(" ")[1] +
              " " +
              new Date(Number(reverseArr?.timestamp) * 1000)
                .toDateString()
                .split(" ")[2] +
              " " +
              new Date(Number(reverseArr?.timestamp) * 1000)
                .toDateString()
                .split(" ")[3],
            y: reverseArr?.floor_sell_value,
          };
        }),
      },
    ],
  };

  return (
    <div className="floor-chart">
      <div className="floor-chart__volume">
        <h1 className="floor-chart__title">Volume Chart (1d)</h1>
        <Bar
          data={dataLine}
          options={options}
          className="floor-chart__volume-bar"
        ></Bar>
      </div>
      <div className="floor-chart__floor">
        <h1 className="floor-chart__title">Floor Chart (1d)</h1>
        <Line
          data={dataBar}
          options={options}
          className="floor-chart__floor-line"
        ></Line>
      </div>
    </div>
  );
};

export default FloorChart;
