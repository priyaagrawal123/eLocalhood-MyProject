// import React from 'react';
import { Pie } from 'react-chartjs-2';
import "./PieChart.css";
import Chart from 'chart.js/auto';
import React, { useEffect, useRef } from 'react';

function PieChart() {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy()
        }
        const myChartRef = chartRef.current.getContext("2d");

        chartInstance.current = new Chart(myChartRef, {
            type: "pie",
            data: {
                labels: ["  Total Products Sold\n", "Total revenue in K", "Total Orders", "Cancelled Orders"],
                datasets: [
                    {
                        data: [708, 471, 510, 71],
                        backgroundColor: [
                            "red",
                            "lightgreen",
                            "yellow",
                            "lightblue"
                        ],
                    }
                ]
            }
        })

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy()
            }
        }
    }, []);
    const options = {
        plugins: {
            datalabels: {
                color: 'white', // Set label color
                font: {
                    size: 184 // Set label font size
                },
                anchor: 'start', // Position relative to the data point ('start', 'center', 'end', 'auto')
                align: 'start',   // Position relative to the anchor ('start', 'center', 'end', 'top', 'bottom')
                offset: 700
            }
        }
    };


    return (
        <div className='pie'>
            <h5>Sales Overview</h5>
            <canvas ref={chartRef} style={{ width: "304px" }} />
        </div>
    );
};

export default PieChart;