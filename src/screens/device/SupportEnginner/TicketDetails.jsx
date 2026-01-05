import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { changeTicketStatusAction, getTicketDetailsInSupport, getVerifiedOtpServiceAction, postServiceTicketStatus } from '../../../store/action/ServiceEngAction'
import { Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { CiEdit } from "react-icons/ci";
import { TextInput, Toast } from 'flowbite-react/lib/esm';
import Otpinput from '../../auth/OtpInput';
import { Toaster, toast } from 'react-hot-toast';

import { getSerialNumberList } from '../../../store/action/DispatchDetailsAction';
import back from "../../../assets/images/back.png";
import axios from 'axios';
import { Button } from 'antd';
function TicketDetails() {
    const dispatch = useDispatch();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ticket = urlParams.get("ticket");

    const getTicketDetailsByNumberReducer = useSelector(
        (state) => state.getTicketDetailsByNumberReducer,
        shallowEqual
    );
    const { data: ticketData } = getTicketDetailsByNumberReducer;

    const allTicketDataGet = ticketData && ticketData.data;
    const feedbackData = ticketData && ticketData.feedback;

    const [loadinState, setLoadingState] = useState(false)
    const [uploadTicketFile, setUploadTicketFile] = useState(false)
    const [pdfUrl, setPdfUrl] = useState('');
    const [location, setlocation] = useState('')
    const [reason, setReason] = useState('');
    const handelChange = (e) => {
        const { name, value } = e.target;
        setReason(value)
    }
    useEffect(() => {
        dispatch(getTicketDetailsInSupport(ticket));
    }, [ticket, dispatch]);
    // Serial Number Data
    const goBack = () => {
        window.history.go(-1)
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [note, setNote] = useState("");
    const [file, setFile] = useState(null);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setNote("");
        setFile(null);
    };
    const handleSubmitModel = () => {
        const ticket_number = allTicketDataGet?.ticket_number;
        const ticketStatus = "Closed";

        // Dispatch the action to close the ticket along with note and document
        const formData = new FormData();
        formData.append("ticket_number", ticket_number);
        formData.append("ticketStatus", ticketStatus);
        console.log('note', note)

        if (reason==="") {
            toast.error('Please Select reason of close ticket')
        }
        else if (reason === 'Select Reason') {
            toast.error('Please Select reason of close ticket')
        }
        else if (reason === 'onCall') {
            if (!note) {
                toast.error('Write remarkes')
            }
            else {

                let remark_2 = note
                dispatch(changeTicketStatusAction(ticket_number, ticketStatus, remark_2));
                toast.success('Ticket Closed')
                setTimeout(() => {
                    handleModalClose();
                }, 500);

            }
        }
        else if (reason === 'phycially') {
            if (!file) {
                toast.error('Attach document please')
            }
            else if (file) {
                if (uploadTicketFile === false) {
                    toast.error('Upload Document')
                }
                else {
                    let remark_2 = note
                    dispatch(changeTicketStatusAction(ticket_number, ticketStatus, remark_2));
                    setTimeout(() => {
                        handleModalClose();
                    }, 500);
                }
            }
        }
    };

    const generateDhrFile = async (e) => {
        e.preventDefault()
        setUploadTicketFile(true)
        if (!file) {
            toast.error('Please select a (JPG) file');
            return;
        }
        const formData = new FormData();
        formData.append('file', file);
        try {
            setLoadingState(true);
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/s3/upload-service-doc/${ticket}`, formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            setTimeout(() => {
                setLoadingState(false)
            }, 500);
            setPdfUrl(response.data.pdfUrl);
            setlocation(response?.data?.location)
            toast.success('File Uploaded')
        } catch (error) {
            console.error('Error generating PDF:', error);
            console.error('Error Serial Number:', error);
        }
    };

    return (
        <div>
            <Toaster />
            <div className="p-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", }}>
                    <Link onClick={goBack} style={{ display: 'block' }}>
                        <img src={back} style={{ width: "3rem", }} />
                    </Link>
                    <h1 className="text-2xl font-extrabold">Ticket<small className="ml-2 font-semibold text-gray-500 dark:text-gray-400">Details</small></h1>
                    <hr style={{ color: "rgb(152, 0, 76)" }} />
                </div>
                {/* <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgb(152, 0, 76)', padding: '8px', width: '5rem', color: 'white', borderRadius: '5px' }}>
                    <button onClick={() => { navigate(`/edit_Ticket_Details?ticketDetails=${ticket}`) }}>Edit
                        <CiEdit size={22} style={{ display: 'inline', marginLeft: '5px' }} />
                    </button>
                </div> */}
            </div>
            <div className="p-3">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ textAlign: 'start' }}>
                        <span style={{ color: 'black', fontWeight: 'bold' }}>Status</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <h6>
                                {allTicketDataGet && allTicketDataGet.priority === 'High' ?
                                    <div style={{ backgroundColor: 'red', borderRadius: '20rem', width: '1rem', height: '0.4rem', padding: '0.5rem' }}></div>
                                    : allTicketDataGet && allTicketDataGet.priority === "Medium" ?
                                        <div style={{ backgroundColor: "#f1c300", height: "1rem", borderRadius: "10px", width: "1rem", marginTop: "0.3rem" }}></div>
                                        :
                                        ""}
                            </h6>
                            <span style={{ color: 'black', padding: '10px' }}>{allTicketDataGet && allTicketDataGet.priority}</span>
                        </div>
                    </div>
                    <div style={{ textAlign: 'start' }}>
                        <span style={{ color: 'black', fontWeight: 'bold' }}>Serial Number</span>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ color: 'black', padding: '10px 10px 10px 0px' }}>{allTicketDataGet && allTicketDataGet?.ticketInfo?.serialNumber ? allTicketDataGet && allTicketDataGet?.ticketInfo?.serialNumber : '- - -'}</span>
                        </div>
                    </div>
                    <div style={{ textAlign: 'start' }}>
                        <span style={{ color: 'black', fontWeight: 'bold' }}>Device Id</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ color: 'black', padding: '10px 10px 10px 0px' }}>{allTicketDataGet && allTicketDataGet.deviceId ? allTicketDataGet && allTicketDataGet?.deviceId : '- - -'}</span>
                        </div>
                    </div>
                    <div style={{ textAlign: 'start' }}>
                        <span style={{ color: 'black', fontWeight: 'bold' }}>Ticket Number</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ color: 'black', padding: '10px 10px 10px 0px' }}>{allTicketDataGet && allTicketDataGet.ticket_number}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-3 flex justify-between">
                <div>
                    <h4 className="text-xl  font-bold mb-4 text-start">Ticket Details</h4>
                    <h1>
                        Ticket Status : <span style={allTicketDataGet?.ticketStatus === 'Open' ? { backgroundColor: '#FFBF00', color: 'white', width: '150px', height: '40px', padding: '8px', color: 'black', borderRadius: '5px' } : allTicketDataGet?.ticketStatus === 'Hold' ? { marginLeft: '5px', borderRadius: '5px', backgroundColor: '#AC0303', color: 'white', width: '120px', padding: '10px', height: '40px', } : { marginLeft: '5px', borderRadius: '5px', backgroundColor: 'grey', color: 'white', width: '120px', padding: '10px', height: '40px', }}>
                            {allTicketDataGet?.ticketStatus ? allTicketDataGet?.ticketStatus : 'Loading...'}
                        </span>
                    </h1>
                </div>
                {allTicketDataGet?.ticketStatus === "Open" ||
                    allTicketDataGet?.ticketStatus === "Hold" ? (
                    <button
                        style={{
                            backgroundColor: "#98004c",
                            color: "white",
                            width: "120px",
                            height: "40px",
                            padding: "10px",
                            borderRadius: "5px",
                        }}
                        onClick={handleModalOpen}
                    >
                        Close Ticket
                    </button>
                ) : null}
            </div>
            <div className='cardDiv' style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
                <div style={{ textDecoration: 'none', width: '100%', gap: '1rem', display: 'flex', flexDirection: 'row' }} className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 :bg-gray-800 :border-gray-700 :hover:bg-gray-700">
                    <div style={{ textDecoration: 'none', width: '100%', gap: '1rem', display: 'flex', flexDirection: 'column' }}>
                        <p className="font-normal text-gray-700">
                            <span style={{ color: 'black', fontWeight: 'bold', fontSize: '1.1rem' }}>
                                Address :
                            </span>
                            {allTicketDataGet && allTicketDataGet?.ticketInfo?.address}
                        </p>
                        <p className="font-normal text-gray-700">
                            <span style={{ color: 'black', fontWeight: 'bold', fontSize: '1.1rem' }}>
                                Concerned Person Name :
                            </span>
                            {allTicketDataGet && allTicketDataGet?.ticketInfo?.concerned_p_name}
                        </p>
                        <p className="font-normal text-gray-700">
                            <span style={{ color: 'black', fontWeight: 'bold', fontSize: '1.1rem' }}>
                                Service Engineer Name :
                            </span>{allTicketDataGet?.firstName} {allTicketDataGet?.lastName}
                        </p>
                        <p className="font-normal text-gray-700">
                            <span style={{ color: 'black', fontWeight: 'bold', fontSize: '1.1rem' }}>
                                Concerned Person Number :
                            </span>
                            {allTicketDataGet?.contactNo!=='NA'&& allTicketDataGet?.contactNo!==''?allTicketDataGet?.contactNo:allTicketDataGet?.ticketInfo?.concerned_p_contact}
                        </p>
                        <p className="font-normal text-gray-700">
                            <span style={{ color: 'black', fontWeight: 'bold', fontSize: '1.1rem' }}>
                                Department Name :
                            </span>
                            {allTicketDataGet && allTicketDataGet?.department}
                        </p>
                        <p className="font-normal text-gray-700">
                            <span style={{ color: 'black', fontWeight: 'bold', fontSize: '1.1rem' }}>
                                Pin Code :
                            </span>
                            {allTicketDataGet && allTicketDataGet?.ticketInfo?.pincode}
                        </p>
                        <p className="font-normal text-gray-700">
                            <span style={{ color: 'black', fontWeight: 'bold', fontSize: '1.1rem' }}>
                                Tools Provided :
                            </span>
                            {allTicketDataGet && allTicketDataGet?.toolsProvided}
                        </p>
                    </div>
                    <div style={{ textDecoration: 'none', width: '100%', gap: '1rem', display: 'flex', flexDirection: 'column' }}>
                        <p className="font-normal text-gray-700">
                            <span style={{ color: 'black', fontWeight: 'bold', fontSize: '1.1rem' }}>
                                Hospital Name :
                            </span>
                            {allTicketDataGet && allTicketDataGet?.hospitalName}
                        </p>
                        <p className="font-normal text-gray-700">
                            <span style={{ color: 'black', fontWeight: 'bold', fontSize: '1.1rem' }}>
                                Service Engineer Email :
                            </span>
                            {allTicketDataGet && allTicketDataGet?.ticketInfo?.service_engineer}
                        </p>
                        <p className="font-normal text-gray-700">
                            <span style={{ color: 'black', fontWeight: 'bold', fontSize: '1.1rem' }}>
                                Tag :
                            </span>
                            {allTicketDataGet && allTicketDataGet?.ticketInfo?.tag}
                        </p>
                        <p className="font-normal text-gray-700">
                            <span style={{ color: 'black', fontWeight: 'bold', fontSize: '1.1rem' }}>
                                Ticket Owner :
                            </span>
                            {allTicketDataGet && allTicketDataGet?.ticketInfo?.ticket_owner}
                        </p>
                        <p className="font-normal text-gray-700">
                            <span style={{ color: 'black', fontWeight: 'bold', fontSize: '1.1rem' }}>
                                Waranty Status :
                            </span>
                            {allTicketDataGet && allTicketDataGet?.ticketInfo?.waranty_status}
                        </p>
                        <p className="font-normal text-gray-700">
                            <span style={{ color: 'black', fontWeight: 'bold', fontSize: '1.1rem' }}>
                                Attachment :
                            </span>
                            {!allTicketDataGet?.ticketInfo?.location || allTicketDataGet?.ticketInfo?.location==="" || allTicketDataGet?.ticketInfo?.location==="NA" ?
                                "---"
                                :
                                <Link style={{ padding: '5px', backgroundColor: 'grey', color: 'white', borderRadius: '8px' }} to={allTicketDataGet?.ticketInfo?.location ? allTicketDataGet?.ticketInfo?.location : 'NA'}>View File</Link>}
                        </p>
                        <p className="font-normal text-gray-700">
                            <span style={{ color: 'black', fontWeight: 'bold', fontSize: '1.1rem' }}>
                                Service Document :
                            </span>
                            {!allTicketDataGet?.serviceDoc || allTicketDataGet?.serviceDoc==="" || allTicketDataGet?.serviceDoc==="NA" ?
                                "---"
                                :
                                <Link style={{ padding: '8px', backgroundColor: 'grey', color: 'white', borderRadius: '8px' }} to={allTicketDataGet?.serviceDoc ? allTicketDataGet?.serviceDoc : 'NA'}>View File</Link>}
                        </p>
                    </div>
                </div>
            </div>
            <div className="p-3">
                <h4 className="text-xl  font-bold :text-white">Solution Provided</h4>
            </div>
            <div className='cardDiv' style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
                <div style={{ textDecoration: 'none', width: '100%', gap: '1rem', display: 'flex', flexDirection: 'row' }}>
                    <div style={{ textDecoration: 'none', width: '100%', gap: '1rem', display: 'flex', flexDirection: 'column' }}>
                        <p className="font-normal text-gray-700">
                            Remarks : {allTicketDataGet && allTicketDataGet.remark_2}
                        </p>
                    </div>
                </div>
            </div>
            <div className="p-3">
                <h2 className="mb-2 text-lg font-semibold text-gray-900">Issue Details:</h2>
                <ul className="max-w-md space-y-1 text-gray-500 list-insid0">
                    <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-red-500 :text-red-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />
                        </svg>
                        {allTicketDataGet && allTicketDataGet.remark}
                    </li>
                </ul>
            </div>
            <div className="p-3">
                <h2 className="mb-2 text-lg font-semibold text-gray-900">Issue Categories:</h2>
                <ul className="max-w-md space-y-1 text-gray-500 list-insid0">
                    <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-red-500 :text-red-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />
                        </svg>
                        {allTicketDataGet && allTicketDataGet.message}
                    </li>
                </ul>
            </div>
            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Close Ticket</h3>
                        <label className="block text-gray-700 font-medium mb-2">
                            Select Reason
                        </label>
                        <select name="" id="" className='px-10 w-full py-2 rounded mb-4' style={{ padding: '8px' }} onChange={handelChange}>
                            <option>Select Reason</option>
                            <option value="onCall">On Call</option>
                            <option value="phycially">Physically</option>
                        </select>
                        {/* Attach Document */}
                        {reason === "phycially" ?
                            <>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Attach Document
                                    </label>
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.jpg,.png"
                                        onChange={(e) => setFile(e.target.files[0])}
                                        className="w-full p-2 border border-gray-300 rounded mb-2"
                                    />
                                    {file &&
                                        <Button className='w-full' onClick={generateDhrFile}>
                                            Upload Doc.
                                        </Button>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Remarke
                                    </label>
                                    <textarea
                                        rows="4"
                                        placeholder="Enter remark here..."
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded"
                                    ></textarea>
                                </div>
                            </>
                            :
                            reason === "onCall" ?
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Remarke
                                    </label>
                                    <textarea
                                        rows="4"
                                        placeholder="Enter remark here..."
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded"
                                    ></textarea>
                                </div>
                                : ""
                        }
                        {/* Buttons */}
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={handleModalClose}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmitModel}
                                className="px-4 py-2 bg-black text-white rounded hover:bg-blue-700"
                            >
                                Close Ticket
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TicketDetails