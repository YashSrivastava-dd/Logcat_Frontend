import React, { useEffect, useState } from "react";
import { Search, Filter } from "lucide-react";
import lead from "../../../assets/icons/lead.png";
import AddLeadForm from "./AddLeadForm";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getAllLeadAction, getDemoDeviceGraphCount, getDemoLeadCountAction, getSingleSalesLeadAction } from "../../../store/action/ProjectAction";
import UpdateDemoLead from "./UpdateDemoLead";
import PaymentUpdate from "./PaymentUpdate";
import { Link } from "react-router-dom";
import SingleViewData from "./SingleViewData";

const SalesLeads = () => {
    const [showAddLead, setShowAddLead] = useState(false);
    const [showUpdateLead, setShowUpdateLead] = useState(false);
    const [saleLead, setSaleLead] = useState(false);
    const [singleLead, setSinglLead] = useState(false);
    const [singleLeadsData, setSinglLeadsData] = useState('');

    const getDemoDeviceGraphCountReducer = useSelector((state) => state.getDemoDeviceGraphCountReducer);
    const { data: graphCount } = getDemoDeviceGraphCountReducer;
    const salesCount = graphCount?.data?.salesCount;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDemoDeviceGraphCount())
    }, [dispatch]);

    const [leadId, setLeadId] = useState('');
    // Selectors
    const { loading, data } = useSelector((state) => state.getAllSalesLeadReducer);
    const { data: leadData } = useSelector((state) => state.getSingleSaleLeadReducer);
    const { data: demoCount } = useSelector((state) => state.getDemoCountReducer);

    const salesLeadData = leadData?.data;

    // Lead update state
    const [updateLeadStatus, setUpdateLeadStatus] = useState(false);
    const [updateLeadData, setUpdateLeadData] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [singleLeadData, setSingleLeadData] = useState(false);


    useEffect(() => {
        dispatch(getAllLeadAction());
        dispatch(getDemoLeadCountAction());
    }, [dispatch]);

    useEffect(() => {
        if (!updateLeadStatus) {
            setUpdateLeadData(salesLeadData);
        } else {
            setUpdateLeadData(null);
        }
    }, [salesLeadData, updateLeadStatus]);

    const filteredData = data?.data?.filter((lead) =>
        lead.hospitalName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.dealerName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {singleLead && (
                <SingleViewData
                    singleLeadsData={singleLeadsData}
                    onGoBack={() => setSinglLead(false)} // Function to go back
                />
            )}

            {!singleLead &&
                <div className="flex-1 p-6">
                    {/* KPI Metrics */}
                    <div className="grid grid-cols-5 gap-4 p-4 bg-white shadow-lg rounded-lg">
                        {[
                            { label: "ACTIVE LEADS", value: demoCount?.data?.activeLeads, color: "bg-gray-400" },
                            { label: "SALE", value: salesCount, color: "bg-green-500" },
                            { label: "HOT LEADS", value: demoCount?.data?.hotLeads, color: "bg-red-500" },
                            { label: "WARM LEADS", value: demoCount?.data?.warmLeads, color: "bg-yellow-400" },
                            { label: "COLD LEADS", value: demoCount?.data?.coldLeads, color: "bg-blue-400" },
                        ].map((item, index) => (
                            <div key={index} className="p-4 flex flex-col items-center text-center">
                                <div className="flex items-center gap-2">
                                    <span className={`rounded-full h-3 w-3 ${item.color}`} />
                                    <h2 className="text-gray-600 text-sm">{item.label}</h2>
                                </div>
                                <p className="text-4xl font-bold text-gray-700">{item.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Leads Table */}
                    <div className="bg-white mt-6 p-4 shadow-lg rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-gray-700 text-2xl font-bold">LEADS</h2>
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
                                    {["LEAD ID", "HOSPITAL", "DEALER", "CITY", "STATE", "SALE AMOUNT", "QUANTITY", "VISITING CARD", "ACTION"].map((header, index) => (
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
                                    filteredData?.map((lead, index) => (
                                        <tr key={index} className="text-gray-700 border-t border-gray-300 text-sm">
                                            <td className="p-3">{lead.leadId || "---"}</td>
                                            <td className="p-3">{lead.hospitalName || "---"}</td>
                                            <td className="p-3">{lead.dealerName || "---"}</td>
                                            <td className="p-3">{lead.city || "---"}</td>
                                            <td className="p-3">{lead.state || "---"}</td>
                                            <td className="p-3">{lead?.paymentUpdates?.[0]?.totalAmount || "---"}</td>
                                            <td className="p-3">{lead?.paymentUpdates?.[0]?.deviceIds?.length || "---"}</td>
                                            <td className="p-3">
                                                {lead?.visitingCardImageUrl ?
                                                    <Link to={lead?.visitingCardImageUrl} className="px-4 py-2 bg-pink-600 rounded text-white">View</Link>
                                                    : '---'}
                                            </td>
                                            <td >
                                                <select onChange={(e) => {
                                                    let value = e.target.value;
                                                    if (value === 'Edit') {
                                                        dispatch(getSingleSalesLeadAction({ leadId: lead?.leadId }))
                                                            .then(() => {
                                                                setUpdateLeadStatus(true); // Mark it as update mode
                                                            });
                                                        setShowAddLead(true);
                                                        setLeadId(lead?.leadId)
                                                        return;
                                                    }
                                                    else if (value === 'Update') {
                                                        setLeadId(lead?.leadId)
                                                        setShowUpdateLead(true); // Open the UpdateDemoLead modal
                                                        setSingleLeadData(lead)
                                                        return;
                                                    }
                                                    else if (value === 'Sale') {
                                                        setLeadId(lead?.leadId)
                                                        setSaleLead(true); // Open the UpdateDemoLead modal
                                                        setSingleLeadData(lead)
                                                        return;
                                                    }
                                                    else if (value === 'More') {
                                                        setSinglLead(true)
                                                        setSinglLeadsData(lead)
                                                        return;
                                                    }
                                                    else {
                                                        return;
                                                    }
                                                }} style={{ padding: '10px', width: '5rem' }} className="text-pink-700 bg-white rounded-lg shadow text-sm ring-2 ring-gray-300">
                                                    <option>Select</option>
                                                    {lead?.scheduledDemo?.length > 0 || lead?.sales?.length > 0 ?
                                                        <>
                                                            <option value="Edit">Edit Lead</option>
                                                            <option value="More">View Lead</option>
                                                        </> :
                                                        lead?.scheduledDemo?.length > 0 && lead?.sales?.length < 0 ?
                                                            <>
                                                                <option value="Edit">Edit Lead</option>
                                                                <option value="Sale">Add Sale</option>
                                                                <option value="More">View Lead</option>
                                                            </>
                                                            :
                                                            <>
                                                                <option value="Edit">Edit Lead</option>
                                                                <option value="Update">Schedule Demo</option>
                                                                <option value="More">View Lead</option>
                                                            </>
                                                    }
                                                </select>
                                            </td>
                                        </tr>
                                    )))}
                            </tbody>
                        </table>
                    </div>
                    {/* Add Lead Button */}
                    <div className="fixed bottom-6 right-6">
                        <button
                            type="button"
                            onClick={() => {
                                setUpdateLeadData(null); // Ensure it's cleared for a new lead
                                setUpdateLeadStatus(false); // Reset update status
                                setShowAddLead(true);
                            }}
                            className="text-white bg-pink-600 hover:bg-pink-700 focus:outline-none font-medium rounded-lg text-sm px-8 py-3 flex items-center gap-2"
                        >
                            <img src={lead} alt="lead" className="w-5 h-5" />
                            <span className="text-white">Lead</span>
                        </button>

                    </div>

                    {showUpdateLead && (
                        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                            <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-4xl relative">
                                {/* Close Button */}
                                <button
                                    onClick={() => {
                                        setShowUpdateLead(false)
                                    }}
                                    className="absolute top-2 right-2 text-white px-3 py-1 rounded-lg"
                                >
                                    <IoClose size={28} color="black" />
                                </button>

                                {/* UpdateDemoLead Component */}
                                <UpdateDemoLead salesLeadData={singleLeadData} updateLeadStatus={updateLeadStatus} leadId={leadId} />
                            </div>
                        </div>
                    )}
                    {/* Add Lead Form (Popup) */}
                    {showAddLead && (
                        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                            <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-4xl relative">
                                {/* Close Button */}
                                <button
                                    onClick={() => {
                                        setShowAddLead(false);
                                        setUpdateLeadStatus(false);
                                    }}
                                    className="absolute top-2 right-2 text-white px-3 py-1 rounded-lg"
                                >
                                    <IoClose size={28} color="black" />
                                </button>

                                {/* AddLeadForm Component */}
                                <AddLeadForm salesLeadData={updateLeadData} updateLeadStatus={updateLeadStatus} leadId={leadId}/>

                            </div>
                        </div>
                    )}

                    {saleLead && (
                        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                            <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-4xl relative">
                                {/* Close Button */}
                                <button
                                    onClick={() => {
                                        setShowAddLead(false);
                                        setUpdateLeadStatus(false);
                                        setSaleLead(false)
                                    }}
                                    className="absolute top-2 right-2 text-white px-3 py-1 rounded-lg"
                                >
                                    <IoClose size={28} color="black" />
                                </button>

                                {/* AddLeadForm Component */}
                                <PaymentUpdate salesLeadData={updateLeadData} updateLeadStatus={updateLeadStatus} leadId={leadId} />
                            </div>
                        </div>
                    )}
                </div>
            }
        </>
    );
};

export default SalesLeads;