import { useState, useEffect } from "react";
import { Home, Tablet, Users, Server, DollarSign, Truck, Settings, Notebook } from "lucide-react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend } from "chart.js";
import SalesModule from "./SalesModule";
import '../../../../src/css/SalesCharts.css';
import SalesLeads from "./SalesLeads";
import SalesPayment from "./SalesPayment";
import DispatchDevices from "./DispatchDevices";
import SalesDevices from "./SalesDevices";
import DemoSaleDevices from "./DemoSaleDevices";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend);

const Sidebar = () => {
    // Set the initial state from localStorage, or default to 'DEMO DEVICE' if not set
    const [active, setActive] = useState(localStorage.getItem("activeMenu") || "DEMO DEVICE");

    const menuItems = [
        { name: "DEMO DEVICE", icon: <Tablet size={20} /> },
        { name: "LEADS", icon: <Users size={20} /> },
        { name: "DEVICES", icon: <Server size={20} /> },
        { name: "PAYMENTS", icon: <DollarSign size={20} /> },
        { name: "DISPATCH", icon: <Truck size={20} /> },
        { name: "SALES", icon: <Notebook size={20} /> },
        // { name: "SETTINGS", icon: <Settings size={20} /> },
    ];

    // Save active menu item to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("activeMenu", active);
    }, [active]);

    const renderContent = () => {
        switch (active) {
            case "DEMO DEVICE":
                return <SalesModule />;
            case "LEADS":
                return <SalesLeads />;
            case "PAYMENTS":
                return <SalesPayment />;
            case "DISPATCH":
                return <DispatchDevices />;
            case "SALES":
                return <SalesDevices />;
            case "DEVICES":
                return <DemoSaleDevices />;
            case "SETTINGS":
                return;
            default:
                return (
                    <div className="flex-1 p-6">
                        <div className="grid grid-cols-2 gap-6 mt-6">
                            <div>
                                <h2 className="text-gray-600">DEMO DEVICE GRAPH</h2>
                                <div className="lineChart_data">
                                    <Bar data={{
                                        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                                        datasets: [
                                            {
                                                label: "Active",
                                                data: [80, 120, 20, 150, 100, 90, 70, 60, 110, 130, 140, 50],
                                                backgroundColor: "green",
                                            },
                                            {
                                                label: "Total",
                                                data: [200, 230, 210, 240, 250, 220, 200, 190, 230, 240, 250, 220],
                                                backgroundColor: "lightgray",
                                            }
                                        ]
                                    }} />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-gray-600">CHART</h2>
                                <div className="doughnut_data">
                                    <Pie data={{
                                        labels: ["Production", "Demo"],
                                        datasets: [
                                            {
                                                data: [65, 35],
                                                backgroundColor: ["#a83279", "#3498db"],
                                            }
                                        ]
                                    }} />
                                </div>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="h-screen flex">
            <div className="w-64 bg-gray-100 p-4 shadow-md">
                <ul className="space-y-2">
                    {menuItems.map((item) => (
                        <li
                            key={item.name}
                            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${active === item.name ? "bg-pink-100 text-black font-semibold border-l-4 border-red-600" : "text-gray-700"
                                }`}
                            onClick={() => setActive(item.name)}
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
            {renderContent()}
        </div>
    );
};

export default Sidebar;
