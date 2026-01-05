import React, { useEffect, useMemo, useState } from "react";
import { Search, Filter } from "lucide-react";
import { Bar, Pie } from "react-chartjs-2";
import { IoClose } from "react-icons/io5";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import UpdateDispatchDemo from "./UpdateDispatch/UpdateDispatchDemo";
import { useDispatch, useSelector } from "react-redux";
import { getAllLeadAction, getWeeklyDispatchDataAction, getMonthlyDispatchDataAction, getDispatchDeviceChartDataAction } from "../../../store/action/ProjectAction";
import UpdateDispatchSale from "./UpdateDispatch/UpdateDispatchSale";
import UpdateDemoCompleted from "./UpdateDispatch/UpdateDemoCompleted";
import { Link } from "react-router-dom";
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const DispatchDevices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openPaymentModel, setOpenPaymentModel] = useState(false)
  const [openCompleteDemo, setOpenCompleteDemo] = useState(false)
  const [updaetDispatchDemo, setUpdaetDispatchDemo] = useState(false)

  const [devieType, setDeviceType] = useState('');
  const [leadId, setLeadId] = useState('');

  const getWeeklyDispatchReducer = useSelector((state) => state.getWeeklyDispatchReducer);
  const { data: weeklyData } = getWeeklyDispatchReducer;

  const getMonthlyDispatchDataReducer = useSelector((state) => state.getMonthlyDispatchDataReducer);
  const { data: monthlyData } = getMonthlyDispatchDataReducer;

  const getDispatchDeviceDataChartReducer = useSelector((state) => state.getDispatchDeviceDataChartReducer);
  const { data: chartData } = getDispatchDeviceDataChartReducer;

  console.log('chartData', chartData)

  const getAllSalesLeadReducer = useSelector((state) => state.getAllSalesLeadReducer);
  const { loading, data } = getAllSalesLeadReducer;
  const allDispatchData = data?.data;

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllLeadAction());
    dispatch(getWeeklyDispatchDataAction())
    dispatch(getMonthlyDispatchDataAction())
    dispatch(getDispatchDeviceChartDataAction())
  }, [dispatch]);

  const chartOptions = useMemo(
    () => ({
      plugins: {
        legend: {
          display: false
        }, title: { display: true }
      },
      responsive: true,
      scales: {
        x: { grid: { display: false }, stacked: true },
        y: { grid: { display: false }, stacked: true },
      },
    }),
    []
  );

  const chartOptions2 = useMemo(
    () => ({
      plugins: {
        legend: {
          display: false
        }, title: { display: true }
      },
    }),
    []
  );

  const chartData3 = useMemo(
    () => ({
      labels: weeklyData?.dispatchDemoCount?.map((item) => item?.data),
      datasets: [
        {
          data: weeklyData?.dispatchDemoCount?.map((item) => item?.count),
          backgroundColor: "rgb(76, 187, 23)", borderRadius: 0,
        },
        {
          data: weeklyData?.dispatchSalesCount?.map((item) => item?.count),
          backgroundColor: "rgb(211, 211, 211)", borderRadius: 4,
        },
      ],
    }),
    []
  );
  const chartData2 = useMemo(
    () => ({
      labels: monthlyData?.dispatchDemoCount?.map((item) => item?.data),
      datasets: [
        {
          data: monthlyData?.dispatchDemoCount?.map((item) => item?.count),
          backgroundColor: "rgb(76, 187, 23)", borderRadius: 0,
        },
        {
          data: monthlyData?.dispatchSalesCount?.map((item) => item?.count),
          backgroundColor: "rgb(211, 211, 211)", borderRadius: 4,
        },
      ],
    }),
    []
  );
  const pieData = useMemo(
    () => ({
      labels: ["Production", "Demo"],
      datasets: [{
        data: [chartData?.demoDispatchData?.confirmedDispatch, chartData?.demoDispatchData?.pending],
        backgroundColor: ["rgb(54, 162, 235)", "rgb(152, 0, 76)"],
      }],
    }),
    []
  );

  const filteredData = allDispatchData?.filter((lead) =>
    lead.leadId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 p-6">
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <div className="flex justify-between">
            <h2 className="text-gray-700 font-semibold mb-2">WEEKLY DISPATCH</h2>
            <div>
              <p className="flex text-center items-center gap-2">
                <div style={{ width: '15px', height: '15px', backgroundColor: 'green', borderRadius: '5px' }}></div>
                <span className="text-black">
                  Demo
                </span>
              </p>
              <p className="flex text-center items-center gap-2">
                <div style={{ width: '15px', height: '15px', backgroundColor: 'grey', borderRadius: '5px' }}></div>
                <span className="text-black">
                  Sale
                </span>
              </p>
            </div>
          </div>
          <div className="h-40 flex items-center justify-center">
            <Bar data={chartData3} options={chartOptions} />
          </div>
        </div>
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <div className="flex justify-between">
            <h2 className="text-gray-700 font-semibold mb-2">MONTHLY DISPATCH</h2>
            <div>
              <p className="flex text-center items-center gap-2">
                <div style={{ width: '15px', height: '15px', backgroundColor: 'green', borderRadius: '5px' }}></div>
                <span className="text-black">
                  Demo
                </span>
              </p>
              <p className="flex text-center items-center gap-2">
                <div style={{ width: '15px', height: '15px', backgroundColor: 'grey', borderRadius: '5px' }}></div>
                <span className="text-black">
                  Sale
                </span>
              </p>
            </div>
          </div>
          <div className="h-40 flex items-center justify-center">
            <Bar data={chartData2} options={chartOptions} />
          </div>
        </div>
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <div className="flex justify-between">
            <h2 className="text-gray-700 font-semibold mb-2">DEVICE</h2>
            <div>
              <p className="flex text-center items-center gap-2">
                <div className="bg-pink-600" style={{ width: '15px', height: '15px', borderRadius: '5px' }}></div>
                <span className="text-black">
                  Demo
                </span>
              </p>
              <p className="flex text-center items-center gap-2">
                <div style={{ width: '15px', height: '15px', backgroundColor: 'skyblue', borderRadius: '5px' }}></div>
                <span className="text-black">
                  Production
                </span>
              </p>
            </div>
          </div>
          <div className="h-70 w-50 flex items-center justify-center mt-10">
            <Pie data={pieData} options={chartOptions2} />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 shadow-lg rounded-lg mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-gray-700 font-semibold">UPCOMING DISPATCH</h2>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-3 border rounded-lg px-2 py-1 outline-none">
              <input
                type="text"
                placeholder="Search Lead Id"
                style={{ border: '0px' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search size={18} color="gray" />
            </div>
            <button className="border p-2 rounded-lg">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-sm">
              {["LEAD ID", "CONSIGNEE", "ASM/RSM", "CITY", "STATE", "SALE AMOUNT", "COMMITED DATE", "DEVICE", "FILE", "ACTION"]
                .map((header, index) => (
                  <th key={index} className="p-2 text-center">{header}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {filteredData?.filter((item) => item?.scheduledDemo?.length > 0)?.map((payment, index) => (
              <tr key={index} className="text-gray-700 border-t border-gray-300 text-sm ">
                <td style={{ textAlign: 'center', padding: '15px', width: 'auto' }}>{payment.leadId ? payment.leadId : '--'}</td>
                <td style={{ textAlign: 'center', padding: '15px', width: 'auto' }}>{payment.hospitalName ? payment.hospitalName : '--'}</td>
                <td style={{ textAlign: 'center', padding: '15px', width: 'auto' }}>{payment.dealerName ? payment.dealerName : '--'}</td>
                <td style={{ textAlign: 'center', padding: '15px', width: 'auto' }}>{payment.city ? payment.city : '--'}</td>
                <td style={{ textAlign: 'center', padding: '15px', width: 'auto' }}>{payment.state ? payment.state : '--'}</td>
                <td style={{ textAlign: 'center', padding: '15px', width: 'auto' }}>{payment?.completedDemo?.[0]?.amountQuoted ? payment?.completedDemo?.[0]?.amountQuoted : '--'}</td>
                <td style={{ textAlign: 'center', padding: '15px', width: 'auto' }}>{payment?.scheduledDemo?.[0]?.demoDate ? payment?.scheduledDemo?.[0]?.demoDate : '--'}</td>
                <td style={{ textAlign: 'center', padding: '15px', width: 'auto' }}>{payment.scheduledDemo?.[0]?.deviceType ? payment.scheduledDemo?.[0]?.deviceType : '--'}</td>
                <td style={{ textAlign: 'center', padding: '15px', width: 'auto' }}>
                  {payment?.completedDemo?.[0]?.feedBackReportImageUrl ?
                    <Link className="px-4 py-2 bg-pink-700 rounded text-white" to={payment?.completedDemo?.[0]?.feedBackReportImageUrl}>View</Link>
                    : '---'}
                </td>
                <td style={{ textAlign: 'center', padding: '15px', width: 'auto' }}>
                  {
                    <select onChange={(e) => {
                      let value = e.target.value;
                      if (value === 'Dispatch Sale') {
                        setDeviceType(payment.scheduledDemo?.[0]?.deviceType || "");
                        setLeadId(payment?.leadId || "");
                        setOpenCompleteDemo(true);
                        return;
                      }
                      else if (value === 'Update Demo') {
                        setDeviceType(payment.scheduledDemo?.[0]?.deviceType || "");
                        setLeadId(payment?.leadId || "");
                        setOpenPaymentModel(true);
                        return;
                      }
                      else if (value === "Dispatch Demo") {
                        setUpdaetDispatchDemo(true)
                        setLeadId(payment?.leadId || "");
                      }
                    }}
                      style={{ padding: '10px', width: '5rem' }} className="text-pink-700 bg-white rounded-lg shadow text-sm ring-2 ring-gray-300"
                    >
                      <option>Select</option>
                      {
                        payment?.dispatchSalesDevice?.length > 0 ?
                          <option disabled>Payment Update</option>
                          :
                          payment?.sales?.[0]?.salesStatus === 'Confirmed' ?
                            <option value="Dispatch Sale">Dispatch Sale</option>
                            :
                            payment?.completedDemo?.length > 0 && payment?.scheduledDemo?.length > 0 && payment?.dispatchDemo?.length > 0 ?
                              <option disabled>Demo completed</option> :
                              payment?.dispatchDemo?.length > 0 && payment?.scheduledDemo?.length > 0 ?
                                <option value='Update Demo'>
                                  Demo Complete
                                </option>
                                :
                                payment?.dispatchDemo?.length < 0 || payment?.scheduledDemo?.length > 0 ?
                                  <option value='Dispatch Demo'>Dispatch Demo</option>
                                  :
                                  ''
                      }
                    </select>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {openCompleteDemo && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-4xl relative">
              {/* Close Button */}
              <button
                onClick={() => setOpenCompleteDemo(false)}
                className="absolute top-2 right-2 text-white px-3 py-1 rounded-lg"
              >
                <IoClose size={28} color="black" />
              </button>
              {/* Update dispatch Component */}
              <UpdateDispatchSale leadId={leadId} />
            </div>
          </div>
        )}

        {updaetDispatchDemo && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-4xl relative">
              {/* Close Button */}
              <button
                onClick={() => setUpdaetDispatchDemo(false)}
                className="absolute top-2 right-2 text-white px-3 py-1 rounded-lg"
              >
                <IoClose size={28} color="black" />
              </button>
              <UpdateDispatchDemo leadId={leadId} />
            </div>
          </div>
        )}

        {openPaymentModel && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-4xl relative">
              {/* Close Button */}
              <button
                onClick={() => setOpenPaymentModel(false)}
                className="absolute top-2 right-2 text-white px-3 py-1 rounded-lg"
              >
                <IoClose size={28} color="black" />
              </button>
              <UpdateDemoCompleted leadId={leadId} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default DispatchDevices;