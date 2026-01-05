import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllLeadAction, getDeviceGraphCountAction, getDeviceSumarryAction, getTotalDeviceCountDetailsAction } from '../../../store/action/ProjectAction';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import '../../../../src/css/SalesCharts.css';
import { ArrowLeft, ArrowRight, Link } from 'lucide-react';
import { useNavigate } from 'react-router';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend);
export const DemoSaleDevices = () => {
    const { loading, data: dataa } = useSelector((state) => state.getDeviceSumarryReducer);

    const getTotalDeviceCountReducer = useSelector((state) => state.getTotalDeviceCountReducer);
    const { data: demoCount } = getTotalDeviceCountReducer;
    const getDeviceGraphCountReducer = useSelector((state) => state.getDeviceGraphCountReducer);
    const { data: deviceCount } = getDeviceGraphCountReducer;
    console.log('demoCount', demoCount)
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items per page
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getTotalDeviceCountDetailsAction());
        dispatch(getAllLeadAction());
        dispatch(getDeviceSumarryAction());
        dispatch(getDeviceGraphCountAction());
    }, [dispatch]);

    // const filteredData = dataa?.data?.filter((lead) =>
    //     lead.hospitalName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     lead.serialNumber?.toLowerCase().includes(searchTerm.toLowerCase())
    // ) || [];

    // This data is without filter hospitalName and serialNumber if this not woring uncomment the upper data .  
    const filteredData = dataa?.data || [];

    // Pagination logic
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const options = useMemo(() => ({
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
            },
        },
        responsive: true,
        scales: {
            x: { grid: { display: false }, stacked: true },
            y: { grid: { display: false }, stacked: true },
        },
    }), []);

    const optionss = useMemo(() => ({
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
            },
        },
    }), [])
    const labels = useMemo(() => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], []);
    const data = useMemo(() => ({
        labels,
        datasets: [
            {
                label: '',
                data: deviceCount?.activeDeviceCount?.map((item) => item?.count),
                backgroundColor: 'rgb(76, 187, 23)',
                borderRadius: 0,
            },
            {
                label: '',
                data: deviceCount?.totalDeviceCount?.map((item) => item?.count),
                backgroundColor: 'rgb(211, 211, 211)',
                borderRadius: 4,
            },
        ],
    }), [labels]);
    const data2 = useMemo(() => ({
        labels: ['Production', 'Demo'],
        datasets: [
            {
                data: [demoCount?.data?.productionCount, demoCount?.data?.demoCount],
                backgroundColor: ["rgb(152, 0, 76)", "rgb(54, 162, 235)", "green", "grey"],
                borderRadius: 8,
                hoverOffset: 4,
            },
        ],
    }), []);
    return (
        <div className="flex-1 p-6">
            <div className="grid grid-cols-5 shadow rounded-lg p-2">
                {[
                    { color: "bg-gray-300", label: "TOTAL DEVICES", value: demoCount?.data?.totalDeviceCount },
                    { color: "bg-green-600", label: "ACTIVE IN 24 HOUR", value: demoCount?.data?.activeLast24Hours },
                    { color: "bg-yellow-300", label: "ACTIVE IN 7 DAYS", value: demoCount?.data?.activeLast7Days },
                    { color: "bg-red-300", label: "INACTIVE IN 7 DAYS", value: demoCount?.data?.inactiveLast7Days },
                    { color: "bg-blue-300", label: "PRODUCTION", value: demoCount?.data?.productionCount },
                ].map((item, index) => (
                    <div key={index} className="bg-white p-4 text-center flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2">
                            <span className={`rounded h-3 w-3 ${item.color}`} />
                            <h2 className="text-gray-600">{item.label}</h2>
                        </div>
                        <p className="text-4xl font-bold text-gray-500">{item.value}</p>
                    </div>
                ))}
            </div>

            <div className="flex gap-16 mt-6">
                <div className='shadow rounded' style={{
                    background: '#ffffff 0% 0% no-repeat paddingBbox',
                    borderradius: '15px',
                    opacity: 1,
                    width: '65rem',
                    height: '33rem',
                    padding: '1rem',
                }}>
                    <div className="flex items-center justify-between">
                        <h2 className="text-gray-600">DEVICE GRAPH</h2>
                        <div className="flex gap-4 p-2">
                            <div className="flex gap-2 items-center"><span className="rounded h-2 w-2 bg-green-600"></span>ACTIVE</div>
                            <div className="flex gap-2 items-center"><span className="rounded h-2 w-2 bg-gray-300"></span>TOTAL</div>
                        </div>
                    </div>
                    <div style={{
                        boxSizing: 'borderBox',
                        display: 'block',
                        height: '14rem',
                        width: '54rem'
                    }}>
                        <Bar data={data} options={options} />
                    </div>
                </div>

                <div style={{ boxShadow: ' 0px 5px 30px #0000001a', borderRadius: '15px' }} >
                    <div style={{
                        background: '#ffffff 0% 0% no-repeat paddingBbox',
                        borderradius: '15px',
                        opacity: 1,
                        width: '30rem',
                        height: '28rem',
                        padding: '1rem',
                    }}>
                        <h2 className="text-gray-600">CHART</h2>
                        <div style={{
                            boxSizing: 'borderBox',
                            display: 'block',
                            height: '14rem',
                            width: '25rem'
                        }}>
                            <Pie data={data2} options={optionss} />
                            <div className='flex justify-between p-4'>
                                <div className='flex gap-2 items-center'><span className='rounded h-2 w-2 bg-red-800'></span>PRODUCTION</div>
                                <div className='flex gap-2 items-center'><span className='rounded h-2 w-2 bg-blue-600'></span>DEMO</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 py-4">
                <div className="bg-white mt-6 p-4 shadow-lg rounded-lg mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-gray-700 text-2xl font-bold">ALL DEVICES</h2>
                        <input
                            type="text"
                            placeholder="Search Hospital / Dealer"
                            className="border rounded-lg px-4 py-2 outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 text-sm">
                                {["DEVICE ID", "STATUS", "SERIAL NO.", "LAST ACTIVE", "TYPE", "HOSPITAL NAME", "CITY", "EMAIL", "ASM/RSM", "ACTION"].map((header, index) => (
                                    <th key={index} className="p-2 text-left">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                [...Array(5)].map((_, index) => (
                                    <tr key={index} className="animate-pulse bg-gray-100 border-t">
                                        {[...Array(8)].map((_, i) => (
                                            <td key={i} className="p-3">
                                                <div className="h-4 bg-gray-300 rounded"></div>
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                paginatedData?.map((lead, index) => {
                                    return (
                                        <tr key={index} className="text-gray-700 border-t border-gray-300 text-sm">
                                            <td className="p-3">{lead.deviceId || "---"}</td>
                                            <td className="p-3">
                                                {lead.message === "ACTIVE" ? (
                                                    <span className="w-2 h-2 bg-green-500 inline-block rounded-full"></span>
                                                ) : (
                                                    <span className="w-2 h-2 bg-red-500 inline-block rounded-full"></span>
                                                )}
                                            </td>
                                            <td className="p-3">{lead.serialNumber || "---"}</td>
                                            <td className="p-3">{lead.message === "ACTIVE" ? '---' : lead.lastActive?.split(" ")[0] || "---"}</td>
                                            <td className="p-3">{lead.type || "---"}</td>
                                            <td className="p-3">{lead.hospitalName || "---"}</td>
                                            <td className="p-3">{lead.city || "---"}</td>
                                            <td className="p-3">{lead.email || "---"}</td>
                                            <td className="p-3">{lead.dealerName || "---"}</td>
                                            <td className="p-3">
                                                <button onClick={() => { navigate(`/deviceOverview?code=009&DeviceId=${lead.deviceId}`) }} style={{ backgroundColor: 'rgb(152, 0, 76)', color: 'white' }} className="text-white font-medium rounded-lg text-sm px-3 py-2.5">
                                                    Action
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            )}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <div className="flex justify-end mt-4 space-x-2">
                        {currentPage > 1 && (
                            <button
                                className="bg-gray-300 text-gray-700 px-2 py-2"
                                style={{ backgroundColor: 'rgb(152, 0, 76)', borderRadius: '30px' }}
                                onClick={() => {

                                    setCurrentPage((prev) => prev - 1)
                                }}
                            >
                                <ArrowLeft size={25} color='white' />
                            </button>
                        )}
                        {currentPage < totalPages && (
                            <button
                                className="bg-gray-300 text-gray-700 px-2 py-2"
                                style={{ backgroundColor: 'rgb(152, 0, 76)', borderRadius: '30px' }}
                                onClick={() => {
                                    setCurrentPage((prev) => prev + 1)
                                    const page = currentPage;
                                    const limit = itemsPerPage;
                                    getDeviceSumarryAction(page, limit)
                                }}
                            >
                                <ArrowRight size={25} color='white' />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DemoSaleDevices