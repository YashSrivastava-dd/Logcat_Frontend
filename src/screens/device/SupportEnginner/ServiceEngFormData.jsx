import React, { useCallback, useEffect, useState } from 'react'
import Style from "../../../css/Production.module.css"
import { useDispatch, useSelector } from 'react-redux';
import {
    deviceAction,
} from "../../../store/action/DeviceAction";

import { getAllHospitalData, getStoreSystem, putallStoreDataAction, getHospitalDataFromAdding, postTicketServiceDataAction } from "../../../store/action/StoreSystem"
import { Link, useNavigate } from 'react-router-dom';
import back from "../../../assets/images/back.png";
import { getSerialNumberList } from '../../../store/action/DispatchDetailsAction';
import { getTicketDetailsInSupport } from '../../../store/action/ServiceEngAction';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';

function ServiceEngFormData() {
    const [dispatchDetails, setDispatchDetails] = useState({
        service_engineer: "",
        issue: "",
        contactNo: "",
        priority: "",
        department: '',
        emailConcernedPerson: '',
        nameConcernedPerson: '',
        serialNumber: '',
        tagName: '',
        hospitalNamee: '',
        wardNo: '',
        issuedFrom: '',
        description: '',
        toolsProvided: '',
        productType: '',
        pincode: '',
        warrantyStatus: ''
    })
    console.log('dispatchDetails', dispatchDetails)
    const [checkedValue, setCheckedValue] = useState([]);
    const [loadinState, setLoadingState] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadTicketFile, setUploadTicketFile] = useState(false)
    const [pdfUrl, setPdfUrl] = useState('');
    const [location, setlocation] = useState('')
    const generateDhrFile = async (e) => {
        e.preventDefault()
        setUploadTicketFile(true)
        if (!selectedImage) {
            toast.error('Please select a (JPG) file');
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedImage);
        try {
            setLoadingState(true);
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/s3/upload-ticket-file`, formData,
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
    const handleImageSelect = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target
        if (checked) {
            setCheckedValue(prev => [...prev, value])
        }
        else (
            setCheckedValue(pre => {
                return [...pre.filter(skill => skill !== value)]
            })
        )
    };
    const newCheckedValue = checkedValue?.map(item => `${item}`).join(',');
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ticketNo = urlParams.get("ticketNo");

    const getDeviceIdBySerialNumberReducer = useSelector((state) => state.getDeviceIdBySerialNumberReducer);
    const { data: serialNoData } = getDeviceIdBySerialNumberReducer;
    console.log('serialNoData',serialNoData)
    const storeSystemReducer = useSelector((state) => state.storeSystemReducer);
    const { data: data121 } = storeSystemReducer;
    const serviceEngName = data121 && data121.data

    // Hpospital Data
    const getHospitalFromAdding = useSelector((state) => state.getHospitalFromAdding);
    const { data: dataHospital } = getHospitalFromAdding;

    const getTicketDetailsByNumberReducer = useSelector((state) => state.getTicketDetailsByNumberReducer);
    const { data: ticketData } = getTicketDetailsByNumberReducer;
    const allTicketDataGet = ticketData && ticketData.data

    useEffect(() => {
        dispatch(getSerialNumberList())
        dispatch(getTicketDetailsInSupport(ticketNo))
    }, [])

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(deviceAction({ page: 1, limit: 99000 }))
    }, [])

    // Hospital Name
    useEffect(() => {
        dispatch(getHospitalDataFromAdding())
    }, [])


    useEffect(() => {
        dispatch(getStoreSystem())
    }, [])

    useEffect(() => {
        dispatch(getAllHospitalData())
    }, [dispatch])

    const navigate = useNavigate()
    const allDataFromDeviceId = `Device Id: ${serialNoData && serialNoData.deviceId},
    Concerned Person Name: ${serialNoData && serialNoData.concerned_person}, 
    Concerned Person Email: ${dispatchDetails && dispatchDetails.emailConcernedPerson},
    Concerned Person Contact: ${serialNoData && serialNoData.concerned_p_contact},
    Hospital Name: ${serialNoData && serialNoData.hospitalName},
    Warrenty Status: ${serialNoData && serialNoData.dateOfWarranty},
    Sim Number: ${serialNoData && serialNoData.simNumber},
    Batch Number : ${serialNoData && serialNoData.batchNumber},
    Manufacturing : ${serialNoData && serialNoData.manufacturingDate},
    Dispatch Date: ${serialNoData && serialNoData.dispatchDate},
    Product Type:${serialNoData && serialNoData.productType},
    Address:${serialNoData && serialNoData.address},`
    var phoneno = /^\d{10}$/
    var pinCode = /^\d{6}$/
    let priuorityValid = "Select Priority"
    let tagValid = "Select Tag"
    var productValid = "Select Product Type"
    const dispatchHandler = (e) => {
        e.preventDefault()
        if (!dispatchDetails?.hospitalNamee) {
            toast.error('Enter Hospital Name')
        }
        else if (!dispatchDetails?.nameConcernedPerson) {
            toast.error('Enter Concerned Person Name')
        }
        else if (!dispatchDetails?.contactNo) {
            toast.error('Enter Contact Numer')
        }
        else if (!dispatchDetails?.service_engineer) {
            toast.error('Enter Service Engineer Name')
        }
        else if (!dispatchDetails?.productType) {
            toast.error('Select Product Type')
        }
        else if (!dispatchDetails?.productType === productValid) {
            toast.error('Select Product Type')
        }
        else if (!dispatchDetails?.tagName) {
            toast.error('Select Tag Name')
        }
        else if (dispatchDetails?.tagName === tagValid) {
            toast.error('Select Tag Name')
        }
        else if (!dispatchDetails?.priority) {
            toast.error('Select Priority')
        }
        else if (dispatchDetails?.priority === priuorityValid) {
            toast.error('Select Priority')
        }
        else if (dispatchDetails?.nameConcernedPerson && dispatchDetails?.contactNo && dispatchDetails?.service_engineer) {
            const serialNumber1 = dispatchDetails && dispatchDetails.serialNumber.length > 0 ? dispatchDetails && dispatchDetails.serialNumber : serialNoData && serialNoData.serialNumber
            if (!!ticketNo) {
                return dispatch(postTicketServiceDataAction({
                    ticket_number: ticketNo,
                    serialNumber: serialNumber1,
                    service_engineer: dispatchDetails?.service_engineer,
                    tag: dispatchDetails?.tagName,
                    dept_name: serialNoData && serialNoData.department_name,
                    waranty_status: dispatchDetails?.warrantyStatus,
                    concerned_p_name: dispatchDetails?.nameConcernedPerson,
                    concerned_p_email: dispatchDetails?.emailConcernedPerson,
                    concerned_p_contact: dispatchDetails?.contactNo,
                    priority: dispatchDetails?.priority,
                    details: allDataFromDeviceId,
                    deviceId: serialNoData && serialNoData.deviceId,
                    location: location,
                    pincode:dispatchDetails?.pincode,
                }))
            }
            else {
                dispatch(putallStoreDataAction({
                    service_engineer: dispatchDetails.service_engineer,
                    concerned_p_contact: dispatchDetails && dispatchDetails.concerned_p_contact,
                    contactNo: dispatchDetails?.contactNo,
                    priority: dispatchDetails.priority,
                    concerned_p_name: dispatchDetails && dispatchDetails.nameConcernedPerson,
                    concerned_p_email: dispatchDetails && dispatchDetails.emailConcernedPerson,
                    serialNumber: dispatchDetails?.serialNumber,
                    tag: dispatchDetails && dispatchDetails.tagName,
                    message: newCheckedValue?.length > 0 ? newCheckedValue : allTicketDataGet?.message,
                    hospitalName: dispatchDetails?.hospitalNamee,
                    wardNo: dispatchDetails?.wardNo,
                    department: dispatchDetails?.department,
                    remark: dispatchDetails?.description,
                    location: location,
                    toolsProvided: dispatchDetails?.toolsProvided,
                    productName: dispatchDetails?.productType,
                    pincode: dispatchDetails?.pincode,
                    waranty_status: dispatchDetails?.warrantyStatus
                }
                )
                )
                // toast.success('Ticket created')
            }
        }
    }
    const goBack = () => {
        window.history.go(-1)
    }
    const handleAddHospital = useCallback(() => {
        navigate('/add_hospital')
    })
    return (
        <>
            <Toaster />
            <div className={Style.mainContainer}>
                <div className={Style.dispatchContainer}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", }}>
                            <Link onClick={goBack} style={{ display: 'block' }}>
                                <img src={back} style={{ width: "3rem", }} />
                            </Link>
                            <h1 className="text-2xl font-extrabold">Assign<small className="ml-2 font-semibold text-gray-500 dark:text-gray-400">Tickets</small></h1>
                            <hr style={{ color: "rgb(152, 0, 76)" }} />
                        </div>
                        <button onClick={handleAddHospital} style={{ backgroundColor: 'rgb(152, 0, 76)' }} type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >Add Hospital</button>
                    </div>
                    <form >
                        <div>

                            <div className="grid gap-6 mb-6 md:grid-cols-2" style={{ textAlign: 'start' }}>
                                <div>
                                    <label htmlFor="first_name" style={{ textAlign: 'start' }}
                                        className="block mb-2 text-sm font-medium text-gray-900 ">Serial Number</label>

                                    <input list='serialno' type="text" onChange={(e) => {
                                        setDispatchDetails({ ...dispatchDetails, serialNumber: e.target.value })
                                    }} value={dispatchDetails.serialNumber} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Serial Number" />
                                </div>
                                <div>
                                    <label for="last_name" className="block mb-2 text-sm font-medium text-gray-900 ">Product Type</label>
                                    <select id="countries" onChange={(e) => {
                                        setDispatchDetails({ ...dispatchDetails, productType: e.target.value })
                                    }}
                                        value={dispatchDetails.productType} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        <option defaultChecked>{productValid}</option>
                                        <option>Agva Pro</option>
                                        <option>Suction</option>
                                        <option>Insulin</option>
                                        <option>AgVa Mini</option>
                                    </select>
                                </div>
                                {/* pin code */}
                                <div>
                                    <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 ">Pin Code</label>
                                    <input type="number" onChange={(e) => {
                                        setDispatchDetails({ ...dispatchDetails, pincode: e.target.value })
                                    }}
                                        value={dispatchDetails.pincode} id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter PinCode" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 "> Hospital Name <span>*</span></label>
                                    <input list="hospitalData" type="text"
                                        onChange={(e) => { setDispatchDetails({ ...dispatchDetails, hospitalNamee: e.target.value }) }}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Hospital Name" />
                                    <datalist onChange={(e) => { setDispatchDetails({ ...dispatchDetails, hospitalNamee: e.target.value }) }} id="hospitalData" name="newdata" style={{ padding: '8px', width: '12rem' }}>
                                        {dataHospital?.map((item, index) => {
                                            return (
                                                <option key={index}>{item.Hospital_Name}</option>
                                            )
                                        })}
                                    </datalist>
                                </div>
                                {/* select service enginner */}
                                <div >
                                    <label htmlFor="first_name" style={{ textAlign: 'start' }} className="block mb-2 text-sm font-medium text-gray-900 ">Service Engineer <span>*</span></label>
                                    <input list="nameList" onChange={(e) => setDispatchDetails({ ...dispatchDetails, service_engineer: e.target.value })} id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Service Enginner Name" />
                                    <datalist id='nameList' value={dispatchDetails.service_engineer}>
                                        {serviceEngName && serviceEngName.map((item, index) => {
                                            return (
                                                <option key={index} value={item.email}>{item.firstName} ({item.userStatus==='Active' ? 'On Work' : 'On Leave'})</option>
                                            )
                                        })}
                                    </datalist>
                                </div>
                                {/* tag name */}
                                <div>
                                    <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 ">Select Tag Name <span>*</span></label>
                                    <select onChange={(e) => setDispatchDetails({ ...dispatchDetails, tagName: e.target.value })}
                                        value={dispatchDetails.tagName} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" >
                                        <option>Select Tag</option>
                                        <option value='Installation'>Installation</option>
                                        <option value='Service'>Service</option>
                                    </select>
                                </div>
                                {/* Department */}
                                <div>
                                    <label htmlFor="departmentName" className="block mb-2 text-sm font-medium text-gray-900 ">Department Name</label>
                                    <div className="flex items-center">
                                        <input list="departmentName" onChange={(e) => setDispatchDetails({ ...dispatchDetails, department: e.target.value })} id="departmentName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Service Enginner Name" />
                                    </div>
                                </div>
                                {/* Warrenty Status */}

                                {/* nameConcernedPerson */}
                                <div>
                                    <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 ">Concerned Person Name <span>*</span></label>
                                    <input list='concernedName' type="text" onChange={(e) => {
                                        setDispatchDetails({ ...dispatchDetails, nameConcernedPerson: e.target.value })
                                    }} value={dispatchDetails.nameConcernedPerson} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Concerned Person Name" />
                                    <datalist id='concernedName'>
                                        <option value={serialNoData && serialNoData.concerned_person}>{serialNoData && serialNoData.concerned_person}
                                        </option>
                                    </datalist>
                                </div>
                                {/* concerned person email */}
                                <div>
                                    <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 ">Concerned Person Email</label>
                                    <div className="flex items-center">
                                        <input type="text" onChange={(e) => {
                                            setDispatchDetails({ ...dispatchDetails, emailConcernedPerson: e.target.value })
                                        }
                                        }
                                            value={dispatchDetails.emailConcernedPerson} id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Concerned Person Email" />
                                    </div>
                                </div>
                                {/* contact person number */}
                                <div>
                                    <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 ">Contact Number <span>*</span></label>
                                    <input list='concernedNumber' type="text" onChange={(e) => {
                                        setDispatchDetails({ ...dispatchDetails, contactNo: e.target.value })
                                    }} value={dispatchDetails.contactNo} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Concerned Person Contact" />
                                    <datalist id='concernedNumber'>
                                        <option value={serialNoData && serialNoData.contactNo}>{serialNoData && serialNoData.contactNo}
                                        </option>
                                    </datalist>
                                </div>
                                <div>
                                    <label htmlFor="warranty" className="block mb-2 text-sm font-medium text-gray-900 ">Warranty Status <span>*</span></label>
                                    <select onChange={(e) => {
                                        setDispatchDetails({ ...dispatchDetails, warrantyStatus: e.target.value })
                                    }} value={dispatchDetails.warrantyStatus} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        <option>Select warranty status</option>
                                        <option value='ACTIVE'>ACTIVE</option>
                                        <option value='INACTIVE'>INACTIVE</option>
                                        <option value='AMC'>AMC</option>
                                        <option value='CMC'>CMC</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 ">Priority <span>*</span></label>
                                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => setDispatchDetails({ ...dispatchDetails, priority: e.target.value })} value={dispatchDetails.priority}>
                                        <option>Select Priority</option>
                                        <option value='Medium'>Medium</option>
                                        <option value='High'>High</option>
                                    </select>
                                </div>
                            </div>
                            {ticketNo?.length > 0 ? '' :
                                <div className="grid gap-6 mb-6 md:grid-cols-2" style={{ textAlign: 'start' }}>
                                    {/* ### */}
                                    <div>
                                        <lable className="block mb-2 text-sm font-medium text-gray-900">Ward No.</lable>
                                        <input id='arrow' onChange={(e) => setDispatchDetails({ ...dispatchDetails, wardNo: e.target.value })} value={dispatchDetails?.wardNo}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Ward Number" />
                                        <lable className="block mb-2 text-sm font-medium text-gray-900 mt-8">Service Issued from</lable>
                                        <input type='text' onChange={(e) => setDispatchDetails({ ...dispatchDetails, issuedFrom: e.target.value })} value={dispatchDetails?.issuedFrom}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Service Issued From" />

                                        <lable className="block mb-2 text-sm font-medium text-gray-900 mt-8">Issue Details</lable>
                                        <textarea onChange={(e) => setDispatchDetails({ ...dispatchDetails, description: e.target.value })} value={dispatchDetails.description}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 " placeholder="Enter Issue details" />
                                        <lable className="block mb-2 text-sm font-medium text-gray-900 mt-8">Tools Provided</lable>
                                        <textarea onChange={(e) => setDispatchDetails({ ...dispatchDetails, toolsProvided: e.target.value })} value={dispatchDetails.toolsProvided}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 " placeholder="Enter Tools Provided" />

                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <h4>Issues <span>*</span></h4>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px", borderRadius: '10px' }}>
                                            <div>
                                                <div className="flex items-start mb-6">
                                                    <div className="flex items-center h-5">
                                                        <input
                                                            value='General Service'
                                                            onChange={handleCheckboxChange} id="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
                                                    </div>
                                                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">General Services</label>
                                                </div>
                                                <div className="flex items-start mb-6">
                                                    <div className="flex items-center h-5">
                                                        <input type="checkbox"
                                                            onChange={handleCheckboxChange} id="remember" value='Operating Support' className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
                                                    </div>
                                                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Operating Support</label>
                                                </div>
                                                <div className="flex items-start mb-6">
                                                    <div className="flex items-center h-5">
                                                        <input
                                                            onChange={handleCheckboxChange} id="remember" type="checkbox" value='Request For Consumables' className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
                                                    </div>
                                                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Request For Consumables</label>
                                                </div>
                                                <div className="flex items-start mb-6">
                                                    <div className="flex items-center h-5">
                                                        <input
                                                            onChange={handleCheckboxChange} id="remember" type="checkbox" value='Physical Damage' className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
                                                    </div>
                                                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Physical Damage</label>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex items-start mb-6">
                                                    <div className="flex items-center h-5">
                                                        <input
                                                            onChange={handleCheckboxChange} id="remember" type="checkbox" value='Issue in Ventilation' className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
                                                    </div>
                                                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Issue in Ventilation</label>
                                                </div>
                                                <div className="flex items-start mb-6">
                                                    <div className="flex items-center h-5">
                                                        <input
                                                            onChange={handleCheckboxChange} id="remember" type="checkbox" value='Apply For CMC/AMC' className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
                                                    </div>
                                                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Apply For CMC/AMC</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* ###### */}
                                </div>}
                            {/* *** */}
                            {/* upload file */}
                            <div>
                                <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 text-start">Upload File</label>
                                <div className="flex gap-2 mb-6 md:grid-cols-2" style={{ alignItems: 'center' }}>
                                    <input type="file" onChange={handleImageSelect} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                    <button style={{ width: '20%', height: '3rem', color: 'white' }} className="bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800" onClick={generateDhrFile} >
                                        {loadinState && <h6 style={{ fontSize: '0.9rem' }}>Uploading...</h6>}
                                        {!loadinState && <h6>Upload</h6>}
                                    </button>
                                </div>
                            </div >
                        </div>
                        <div style={{ margin: '6rem 0rem' }}>
                            <hr style={{ color: "#707070" }} />
                            <div className={Style.buttonContainer} >
                                <button className={Style.continuebtn} onClick={dispatchHandler}>Assign Ticket</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ServiceEngFormData