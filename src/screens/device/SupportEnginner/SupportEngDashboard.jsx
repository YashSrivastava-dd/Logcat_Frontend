import React, { useEffect, lazy, useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, CategoryScale, PointElement, LineElement, BarElement } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { getGraphDataCountAction, getTicketCountAction } from '../../../store/action/StoreSystem';
import openVector from "../../../assets/icons/OpenVector.png";
import closeVector from "../../../assets/icons/closeTicket.png";
import holdVector from "../../../assets/icons/holdVector.png";
import totalVector from "../../../assets/icons/allTicket.png";
import SupportBarDoughnutChart from './SupportBarDoughnutChart';
import { getSupportMapData } from '../../../store/action/ServiceEngAction';
// Lazy load components
const SupportEngDatamODULE = lazy(() => import("./SupportEngDataModule"));
const SupportCalender = lazy(() => import("./SupportCalender"));
const MapComponent = lazy(() => import("./MapComponent"));
const NewLeafMapComponent = React.lazy(() => import('../../AdminDashboard/GraphDataDetect/NewLeafMap'));

// Register Chart.js components
ChartJS.register(CategoryScale, ArcElement, Tooltip, Legend, LinearScale, PointElement, LineElement, BarElement);

const SupportEngDashboard = () => {
    const getTicketCountReducer = useSelector((state) => state.getTicketCountReducer);
    const { data: countData } = getTicketCountReducer;
    const dispatch = useDispatch();

    // getGraphDataCountReducer
    const getGraphDataCountReducer = useSelector((state) => state.getGraphDataCountReducer);
    const { data } = getGraphDataCountReducer;
    // pincode data
    const getSupportMapDataReducer = useSelector((state) => state.getSupportMapDataReducer);
    const { data: newData } = getSupportMapDataReducer;
    const pincodeData = newData?.data?.map((item) => item?.pincode) || [];
    // No need to split as pincodeData is already an array
    const pincodeArray = useMemo(() => pincodeData?.map(pin => pin.trim()), [pincodeData]);

    const [graphData, setGraphData] = useState('monthly')
    useEffect(() => {
        const fetchData = async () => {
            await new Promise(resolve => setTimeout(resolve, 500));
            let filter = '12month-data'
            dispatch(getTicketCountAction(filter));
        };
        fetchData();
    }, [dispatch]);
    useEffect(() => {
        let filter = graphData
        dispatch(getSupportMapData())
        dispatch(getGraphDataCountAction(filter))
    }, [dispatch])

    let value = data?.map((item) => item.count);
    let duration = data?.map((item) => item.duration);
    const data1 = {
        labels: duration,
        datasets: [{
            label: graphData.toUpperCase() + " " + 'DATA',
            data: value,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
        }]
    };

    const options1 = {
        scales: {
            x: {
                type: 'category',
                title: { display: true, text: '' },
            },
            y: {
                beginAtZero: true,
                suggestedMin: 0,
                suggestedMax: 50,
            },
        },
    };
    const handelChange = (e) => {
        setGraphData(e.target.value)
        let filter = e.target.value;
        dispatch(getGraphDataCountAction(filter))
    }
    return (
        <div style={{ height: '100%', width: '100%' }}>
            {/* Upper card */}
            <div style={{ display: 'flex', marginTop: '2rem' }}>
                {/* Left cards */}
                <div style={{ width: '50%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                    <div style={{ padding: '30px', marginBottom: '2rem', borderRadius: '8px', boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px', width: '40%', display: 'flex', gap: '20px', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h1 style={{ fontSize: '1rem', color: '#797979' }}>Active Tickets</h1>
                            <img loading='lazy' src={openVector} alt="openTicket" />
                        </div>
                        <span style={{ fontSize: '3rem', fontWeight: 'bolder', color: 'black' }}>{countData?.openTickets ? countData?.openTickets : countData?.data?.openTickets}</span>
                        <h1 style={{ fontSize: '0.8rem', color: 'grey' }}>Since last week</h1>
                    </div>
                    <div style={{ padding: '30px', marginBottom: '2rem', borderRadius: '8px', boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px', width: '40%', display: 'flex', gap: '20px', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h1 style={{ fontSize: '1rem', color: '#797979' }}>Closed Tickets</h1>
                            <img loading='lazy' src={closeVector} alt="closeTicket" />
                        </div>
                        <span style={{ fontSize: '3rem', fontWeight: 'bolder', color: 'black' }}>{countData?.closedTickets ? countData?.closedTickets : countData?.data?.closedTickets}</span>
                        <h1 style={{ fontSize: '0.8rem', color: 'grey' }}>Since last month</h1>
                    </div>
                    <div style={{ padding: '30px', borderRadius: '8px', boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px', width: '40%', display: 'flex', gap: '20px', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h1 style={{ fontSize: '1rem', color: '#797979' }}>On-Hold Tickets</h1>
                            <img loading='lazy' src={holdVector} alt="holdTicket" />
                        </div>
                        <span style={{ fontSize: '3rem', fontWeight: 'bolder', color: 'black' }}>{countData?.onHold ? countData?.onHold : countData?.data?.onHold}</span>
                        <h1 style={{ fontSize: '0.8rem', color: 'grey' }}>Since last week</h1>
                    </div>
                    <div style={{ padding: '30px', borderRadius: '8px', boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px', width: '40%', display: 'flex', gap: '20px', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h1 style={{ fontSize: '1rem', color: '#797979' }}>Total Tickets</h1>
                            <img loading='lazy' src={totalVector} alt="totalTicket" />
                        </div>
                        <span style={{ fontSize: '3rem', fontWeight: 'bolder', color: 'black' }}>{countData?.totalTickets ? countData?.totalTickets : countData?.data?.totalTickets}</span>
                        <h1 style={{ fontSize: '0.8rem', color: 'grey' }}>Since last week</h1>
                    </div>
                </div>
                {/* Right card for line chart */}
                <div style={{ width: '47%', borderRadius: '8px', boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px', padding: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h1>Recent Moments</h1>
                        <select onChange={handelChange} style={{ border: '1px solid #D3D3D3', borderRadius: '8px', width: '6rem', padding: '5px', boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}>
                            <option value="monthly">Monthly</option>
                            <option value="weekly">Weekly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </div>
                    <Line data={data1} options={options1} />
                </div>
            </div>

            {/* Middle card */}
            <div style={{ display: 'flex', gap: '100px', margin: '30px 60px' }}>
                <div style={{ borderRadius: '8px', boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px", padding: '10px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h1>Calendar</h1>
                    <SupportCalender />
                </div>
                <div style={{ width: '60%', height: '100px', borderRadius: '8px' }}>
                    <NewLeafMapComponent pincodes={pincodeArray} />
                    {/* <MapComponent latitude='51.50' longitude='-0.127' /> */}
                </div>
                <SupportBarDoughnutChart />
            </div>
            <SupportEngDatamODULE />
        </div>
    );
};
export default SupportEngDashboard;