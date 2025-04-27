import { useState, useEffect } from 'react';
import './Dashboard.css';
import Dashnav from './Dashnav';
import Sidebar from './Sidebar';
import Chart from 'chart.js/auto';
import Stat from './Stat'; // Import the StatBox component
import { Line } from 'react-chartjs-2';
import PieChart from './PieChart';

const Dashboard = () => {
    const [totalProductsSold, setTotalProductsSold,] = useState(0);
    const [chartInstance, setChartInstance] = useState(null);
    const [totalRevenue, setTotalRevenue] = useState("");
    const [monthlyRevenueData, setMonthlyRevenueData] = useState("");

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],

    });
    useEffect(() => {


        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', "August", 'September', "November", "Octomber", "December"],
            datasets: [
                {
                    label: 'Total Products sold',
                    data: [65, 59, 80, 31, 100, 10, 40, 80, 78, 98, 28, 39],
                    fill: true,
                    borderColor: 'red',
                    tension: 0.4,
                },
                {
                    label: 'Total revenue in k',
                    data: [40, 60, 10, 88, 33, 44, 93, 12, 31, 20, 11, 29],
                    fill: true,
                    borderColor: 'lightgreen',
                    tension: 0.4,
                },

            ],
        };
        setChartData(data);
    }, []);

    const generateNumberOfProductsData = () => {
        return chartData.labels.map(() => Math.floor(Math.random() * 100) + 1);
    };

    const numberOfProductsData = generateNumberOfProductsData();


    const [sidebarOpen, setSidebarOpen] = useState(false);

    const openSidebar = () => {
        setSidebarOpen(true);
    }

    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    const MyChartComponent = () => {
        // Sample monthly revenue data
        const [monthlyRevenueData, setMonthlyRevenueData] = useState([65, 59, 80, 81, 56, 55, 40]);

        // State to hold total revenue
        const [totalRevenue, setTotalRevenue] = useState(calculateTotalRevenue(monthlyRevenueData));

        useEffect(() => {
            // Recalculate total revenue whenever monthly revenue data changes
            setTotalRevenue(calculateTotalRevenue(monthlyRevenueData));
        }, [monthlyRevenueData]);

        // Function to calculate total revenue
        function calculateTotalRevenue(data) {
            return data.reduce((acc, currentValue) => acc + currentValue, 0);
        }
    }
    // };
    return (
        <div className='container'>
            <Dashnav />
            <PieChart />

            <div className='boxchart' style={{ width: '1258px', height: '400px', top: "429px", left: "429px", border: "2px solid black" }}>
                <Line data={chartData} options={{
                    maintainAspectRatio: false, // Disable aspect ratio to allow scaling
                    responsive: true, // Make the chart responsive
                    plugins: {}
                }} />
            </div>



            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
            <div className='stat1'>
                <Stat title="Total Products Sold" value={708} />
            </div>
            <div className='stat2'>
                <Stat title="Total revenue" value={471} />
            </div>
            <div className='stat3'>
                <Stat title="Total Orders" value={510} />
            </div>
            <div className='stat4'>
                <Stat title="Cancelled Order" value={71} />
            </div>
            <div>
                <canvas id="myPieChart"></canvas>
            </div>
            <div className='chart-container'>
                <canvas id='myChart'></canvas>
            </div>
            <div>
            </div>
        </div>
    )
}

export default Dashboard;
