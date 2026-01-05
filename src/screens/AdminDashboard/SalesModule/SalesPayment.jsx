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
import { useDispatch, useSelector } from "react-redux";
import FinallPaymentComplete from "./FinallPaymentComplete";
import { getAllLeadAction } from "../../../store/action/ProjectAction";
import { Link } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const KPI_METRICS = [
  { label: "TOTAL", value: "210 K", color: "bg-gray-400" },
  { label: "TODAY", value: "55 K", color: "bg-green-500" },
  { label: "7 DAYS", value: "78 K", color: "bg-yellow-400" },
  { label: "14 DAYS", value: "78 K", color: "bg-red-500" },
  { label: "MONTH", value: "80 K", color: "bg-blue-400" },
];
const SalesPayment = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [leadId, setLeadId] = useState("");
  const [paymentAllData, setPaymentAllData] = useState("");
  const [openPaymentModel, setOpenPaymentModel] = useState(false)
  const { loading, data } = useSelector((state) => state.getAllSalesLeadReducer);
  const paymentData = data?.data;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllLeadAction());
  }, [dispatch]);
  const chartOptions = useMemo(
    () => ({
      plugins: { title: { display: true } },
      responsive: true,
      scales: {
        x: { grid: { display: false }, stacked: true },
        y: { grid: { display: false }, stacked: true },
      },
    }),
    []
  );

  const filteredPayments = useMemo(() =>
    paymentData?.filter(payment =>
      payment.hospitalName?.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm, paymentData]
  );

  const chartData = useMemo(
    () => ({
      labels: ["Jan", "Feb", "Mar", "Apr"],
      datasets: [
        { data: [26, 35, 45, 48], backgroundColor: "rgb(76, 187, 23)", borderRadius: 0, },
        { data: [23, 24, 35, 45], backgroundColor: "rgb(211, 211, 211)", borderRadius: 4, },
      ],
    }),
    []
  );

  const pieData = useMemo(
    () => ({
      labels: ["Production", "Demo"],
      datasets: [{
        data: [35, 65],
        backgroundColor: ["rgb(54, 162, 235)", "rgb(152, 0, 76)"],
      }],
    }),
    []
  );

  return (
    <div className="flex-1 p-6">
      <div className="grid grid-cols-5 gap-4 p-2 bg-white shadow-lg rounded-lg">
        {KPI_METRICS.map(({ label, value, color }, index) => (
          <div key={index} className="p-4 flex flex-col items-center text-center">
            <div className="flex items-center gap-2">
              <span className={`rounded-full h-3 w-3 ${color}`} />
              <h2 className="text-gray-600 text-sm">{label}</h2>
            </div>
            <p className="text-4xl font-bold text-gray-700">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        {["WEEKLY RECEIPTS", "MONTHLY RECEIPTS"].map((title, i) => (
          <div key={i} className="bg-white p-4 shadow-lg rounded-lg">
            <h2 className="text-gray-700 font-semibold mb-2">{title}</h2>
            <div className="h-40 flex items-center justify-center">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        ))}
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-gray-700 font-semibold mb-2">DEVCIE</h2>
          <div className="h-70 w-50 flex items-center justify-center mt-10">
            <Pie data={pieData} />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 shadow-lg rounded-lg mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-gray-700 font-semibold">UPCOMING PAYMENTS</h2>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search Hospital"
              className="border rounded-lg px-3 py-1 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-purple-600 text-white p-2 rounded-lg">
              <Search size={18} />
            </button>
            <button className="border p-2 rounded-lg">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-sm">
              {["Lead Id", "HOSPITAL", "DEALER", "TOTAL PAYMENT", "AMOUNT", "REMAINING", "DATE", "PAYMENT MODE", "REMARKS", "PAYMENT PROOF", "ACTION"]
                .map((header, index) => (
                  <th key={index} className="p-4 text-left">{header}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {filteredPayments?.filter((item) => item?.dispatchSalesDevice?.length > 0 ? item : '')?.map((payment, index) => {
              // console.log('first', payment.paymentUpdates?.[0]?.totalAmount)
              return (
                <tr key={index} className="text-gray-700 border-t border-gray-300 text-sm">
                  <td className="p-4">
                    <span className={`h-3 w-3 rounded-full ${payment.status === "paid" ? "bg-green-500" : "bg-red-500"}`} />
                    {payment.leadId || '--'}
                  </td>
                  <td className="p-4">{payment.hospitalName || '--'}</td>
                  <td className="p-4">{payment.dealerName || '--'}</td>
                  <td className="p-4">{payment.sales?.[0]?.totalAmount || '--'}</td>
                  <td className="p-4">{payment.sales?.[0]?.advanceAmount || '--'}</td>
                  <td className="p-4">{payment.paymentUpdates?.[0]?.remainingAmount || '--'}</td>
                  <td className="p-4">{payment.leadAddedDate || '--'}</td>
                  <td className="p-4">{payment.paymentUpdates?.[0]?.paymentMode || '--'}</td>
                  <td className="p-4">{payment.paymentUpdates?.[0]?.paymentTerms || '--'}</td>
                  <td className="p-3">
                    {payment?.paymentUpdates?.[0]?.paymentImageUrl ?
                      <Link loading='lazy' className="px-4 py-2 text-white bg-pink-600 rounded" to={payment?.paymentUpdates?.[0]?.paymentImageUrl}>View</Link>
                      : '--'}
                  </td>
                  <td className="p-4">
                    {
                      payment.paymentUpdates?.[0]?.remainingAmount <= "0"  ?
                        'Payment Completed' :
                        <button
                          onClick={() => {
                            setOpenPaymentModel(true)
                            setLeadId(payment?.leadId)
                            setPaymentAllData(payment)
                          }}
                          className="bg-pink-600 text-white px-3 py-1 rounded-lg">
                          UPDATE
                        </button>
                    }

                  </td>
                </tr>
              );
            })}
          </tbody>

          {/* // Modal rendering outside of the map loop */}
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
                {/* Conditional Content */}
                <FinallPaymentComplete paymentAllData={paymentAllData} leadId={leadId} />
              </div>
            </div>
          )}

        </table>

      </div>
    </div>
  );
};

export default SalesPayment;