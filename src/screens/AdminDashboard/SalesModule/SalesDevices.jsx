import React, { useEffect, useState } from "react";
import { Search, Filter } from "lucide-react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getAllLeadAction, getDemoLeadCountAction } from "../../../store/action/ProjectAction";
import PaymentUpdate from "./PaymentUpdate";
import SalesConfirmed from "./SalesConfirmed";
import { Link } from "react-router-dom";

const SalesDevices = () => {
  const [saleLead, setSaleLead] = useState(false);
  const [saleConfirmed, setSalesConfirmed] = useState(false);
  const dispatch = useDispatch();
  const [leadId, setLeadId] = useState('');
  // Selectors
  const { loading, data } = useSelector((state) => state.getAllSalesLeadReducer);
  const { data: leadData } = useSelector((state) => state.getSingleSaleLeadReducer);
  const salesLeadData = leadData?.data;
console.log('salesLeadData',salesLeadData)
  // Lead update state
  const [searchTerm, setSearchTerm] = useState("");
  const [singleLeadData, setSingleLeadData] = useState("");


  useEffect(() => {
    dispatch(getAllLeadAction());
    dispatch(getDemoLeadCountAction());
  }, [dispatch]);

  const filteredData = data?.data?.filter((lead) =>
    lead.hospitalName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.dealerName?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div className="flex-1 p-6">
        {/* Leads Table */}
        <div className="bg-white mt-6 p-4 shadow-lg rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-gray-700 text-2xl font-bold">SALES</h2>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                placeholder="Search Hospital / Dealer"
                className="border rounded-lg px-4 py-2 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={loading}
              />
              <button className="border p-2 rounded-lg">
                <Filter size={18} />
              </button>
            </div>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-600 text-sm">
                {["LEAD ID", "HOSPITAL", "DEALER", "CITY", "STATE", "SALE AMOUNT", "QUANTITY","PO IMAGE", "ACTION"].map((header, index) => (
                  <th key={index} className="p-2 text-left">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                // Skeleton Loader for Table
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
                filteredData?.filter((item) => item?.completedDemo?.length > 0 ? item : '')?.map((lead, index) => (
                  <tr key={index} className="text-gray-700 border-t border-gray-300 text-sm">
                    <td className="p-3">{lead.leadId || "---"}</td>
                    <td className="p-3">{lead.hospitalName || "---"}</td>
                    <td className="p-3">{lead.dealerName || "---"}</td>
                    <td className="p-3">{lead.city || "---"}</td>
                    <td className="p-3">{lead.state || "---"}</td>
                    <td className="p-3">{lead?.sale?.[0]?.totalAmount ? lead?.sale?.[0]?.totalAmount :lead?.completedDemo?.[0]?.amountQuoted}</td>
                    <td className="p-3">{lead?.dispatchDemo?.[0]?.deviceIds?.length || "---"}</td>
                    <td className="p-3">
                      {lead?.sales?.[0]?.poImageUrl?
                    <Link className="px-4 py-2 text-white bg-pink-600 rounded" to={lead?.sales?.[0]?.poImageUrl}>View</Link>
                    :'--'}
                    </td>
                    <td >
                      {lead?.sales?.[0]?.salesStatus === 'Confirmed' ?
                        "Sale Confirmed" :
                        <select onChange={(e) => {
                          let value = e.target.value;
                          if (value === 'Sale') {
                            setLeadId(lead?.leadId)
                            setSaleLead(true); // Open the UpdateDemoLead modal
                            setSingleLeadData(lead)
                            return;
                          }
                          else if (value === 'Sale Confirmed') {
                            setSalesConfirmed(true)
                            setSingleLeadData(lead)
                            setLeadId(lead?.leadId)
                          }
                          else {
                            return;
                          }
                        }} style={{ padding: '10px', width: '5rem' }} className="text-pink-700 bg-white rounded-lg shadow text-sm ring-2 ring-gray-300">
                          <option>Select</option>
                          {lead?.sales?.length > 0 ?
                            <option value="Sale Confirmed">Confirme Sale</option>
                            : <option value="Sale">Update Sales</option>}
                        </select>
                      }
                    </td>
                  </tr>
                )))}
            </tbody>
          </table>
        </div>

        {saleLead && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-4xl relative">
              {/* Close Button */}
              <button
                onClick={() => {
                  setSaleLead(false)
                }}
                className="absolute top-2 right-2 text-white px-3 py-1 rounded-lg"
              >
                <IoClose size={28} color="black" />
              </button>

              {/* AddLeadForm Component */}
              <PaymentUpdate singleLeadData={singleLeadData} leadId={leadId} />
            </div>
          </div>
        )}

        {saleConfirmed && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-4xl relative">
              {/* Close Button */}
              <button
                onClick={() => {
                  setSalesConfirmed(false)
                }}
                className="absolute top-2 right-2 text-white px-3 py-1 rounded-lg"
              >
                <IoClose size={28} color="black" />
              </button>

              {/* AddLeadForm Component */}
              <SalesConfirmed singleLeadData={singleLeadData} leadId={leadId} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SalesDevices;