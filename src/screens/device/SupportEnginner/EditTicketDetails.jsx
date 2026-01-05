import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import back from "../../../assets/images/back.png";
import Style from "../../../css/Production.module.css";
import { getTicketDetailsInSupport } from '../../../store/action/ServiceEngAction';
import { postSerialNoFromTicketDetailsAction } from '../../../store/action/StoreSystem';
import FileUploadComponent from './FileUploadComponent';
import { getSerialNumberList } from '../../../store/action/DispatchDetailsAction';
// import { getTicketDetailsInSupport, updateTicketDetails } from '../../../store/action/ServiceEngAction';

function EditTicketDetails() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ticket = urlParams.get("ticketDetails");
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        serialNumber: '',
        pinCode: '',
        hospitalName: '',
        department: '',
        serviceEngineer: '',
        tagName: '',
        concernedPersonName: '',
        concernedPersonEmail: '',
        contactNumber: '',
        priority: '',
        wardNo: '',
        serviceIssuedFrom: '',
        issueDetails: '',
        toolsProvided: '',
        warranty_status: '',
        issues: [], // Always ensure issues is initialized as an array
    });
    const issueOptions = [
        "General Service",
        "Operating Support",
        "Request for Consumables",
        "Physical Damage",
        "Issue in Ventilation",
        "Apply for CMC/AMC"
    ];
    console.log('formData', formData)
    const goBack = () => {
        window.history.go(-1);
    };
    // Serial Number Data
    const getSerialNumberListReducer = useSelector((state) => state.getSerialNumberListReducer);
    const { data: dataSerialNumbers } = getSerialNumberListReducer;
    useEffect(() => {
        dispatch(getSerialNumberList())
        if (ticket) {
            dispatch(getTicketDetailsInSupport(ticket));
        }
    }, [dispatch, ticket]);

    const { data, loading } = useSelector((state) => state.getTicketDetailsByNumberReducer);

    useEffect(() => {
        if (data) {
            setFormData({
                serialNumber: data?.data?.ticketInfo?.serialNumber || '',
                pinCode: data?.data?.ticketInfo?.pincode || '',
                hospitalName: data?.data?.hospitalName || '',
                department: data?.data?.department || '',
                serviceEngineer: data?.data?.ticketInfo?.service_engineer || '',
                tagName: data?.data?.ticketInfo?.tag || '',
                concernedPersonName: data?.data?.ticketInfo?.concerned_p_name || '',
                concernedPersonEmail: data?.data?.ticketInfo?.concerned_p_email || '',
                contactNumber: data?.data?.contactNo || '',
                priority: data?.data?.priority || '',
                wardNo: data?.data?.wardNo || '',
                serviceIssuedFrom: data?.data?.serviceRaisedFrom || '',
                issueDetails: data?.data?.remark || '',
                toolsProvided: data?.data?.toolsProvided || '',
                warranty_status: data?.data?.ticketInfo?.waranty_status || '',
                issues: data?.data?.message?.split(",") || [], // Ensure it's an array
            });
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            issues: checked
                ? [...prevState.issues, value] // Add to array if checked
                : prevState.issues.filter((issue) => issue !== value), // Remove if unchecked
        }));
        console.log('formatedata', formData.issues)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postSerialNoFromTicketDetailsAction({
            ticket: ticket,
            serialNumber: formData.serialNumber || '',
            pincode: formData.pinCode || '',
            hospitalName: formData.hospitalName || '',
            department: formData.department || '',
            service_engineer: formData.serviceEngineer || '',
            tag: formData.tagName || '',
            concerned_p_name: formData.concernedPersonName || '',
            concerned_p_email: formData.concernedPersonEmail || '',
            concerned_p_contact: formData.contactNumber || '',
            priority: formData.priority || '',
            wardNo: formData.wardNo || '',
            serviceRaisedFrom: formData.serviceIssuedFrom || '',
            remark: formData.issueDetails || '',
            toolsProvided: formData.toolsProvided || '',
            waranty_status: formData.warranty_status || '',
            message: formData?.issues?.join(","), // Send issues array
        }));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={Style.mainContainer}>
            <div className={Style.dispatchContainer}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <Link onClick={goBack} style={{ display: 'block' }}>
                            <img src={back} style={{ width: "3rem" }} alt="Go back" />
                        </Link>
                        <h1 className="text-2xl font-extrabold">
                            Edit
                            <small className="ml-2 font-semibold text-gray-500 dark:text-gray-400">Ticket details</small>
                        </h1>
                        <hr style={{ color: "rgb(152, 0, 76)" }} />
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        {/* {setFormData?.serialNumber? */}
                        <div>
                            <label htmlFor="serialNumber" className="flex text-center block mb-2 text-sm font-medium text-gray-900">
                                Serial Number
                            </label>
                            <input
                                name="serialNumber"
                                list='serialno'
                                value={formData.serialNumber}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder="Enter Serial Number"
                                required
                            />
                            <datalist id='serialno'>
                                {dataSerialNumbers?.data?.map((item, index) => {
                                    return (
                                        <option key={index} value={item.serialNumber}>{item.serialNumber}</option>
                                    )
                                })}
                            </datalist>
                        </div>
                        <div>
                            <label htmlFor="pinCode" className="flex text-center mb-2 text-sm font-medium text-gray-900">
                                Pin code
                            </label>
                            <input
                                name="pinCode"
                                value={formData.pinCode}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder="Enter Serial Number"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="hospitalName" className="flex text-center mb-2 text-sm font-medium text-gray-900">
                                Hospital Name
                            </label>
                            <input
                                name="hospitalName"
                                value={formData.hospitalName}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder="Enter Hospital Name"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="warranty_status" className="flex text-center mb-2 text-sm font-medium text-gray-900">
                                Select Warranty
                            </label>
                            <select onChange={handleChange}
                                name="warranty_status"
                                value={formData.warranty_status} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                                {/* <option>{formData.warranty_status}</option> */}
                                <option value='ACTIVE'>ACTIVE</option>
                                <option value='INACTIVE'>INACTIVE</option>
                                <option value='AMC'>AMC</option>
                                <option value='CMC'>CMC</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="department" className="flex text-center mb-2 text-sm font-medium text-gray-900">
                                Department Name
                            </label>
                            <input
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder="Enter Department Name"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="serviceEngineer" className="flex text-center mb-2 text-sm font-medium text-gray-900">
                                Service Engineer
                            </label>
                            <input
                                name="serviceEngineer"
                                value={formData.serviceEngineer}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder="Enter Service Eng"
                                required
                            />
                        </div><div>
                            <label htmlFor="tagName" className="flex text-center mb-2 text-sm font-medium text-gray-900">
                                Tag Name
                            </label>
                            <select onChange={handleChange}
                                name="tagName"
                                value={formData.tagName} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                                <option value='Installation'>Installation</option>
                                <option value='Service'>Service</option>
                            </select>
                        </div><div>
                            <label htmlFor="serialNumber" className="flex text-center mb-2 text-sm font-medium text-gray-900">
                                Concerned Person Name
                            </label>
                            <input
                                name="concernedPersonName"
                                value={formData.concernedPersonName}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder="Enter Concerned Person Name"
                                required
                            />
                        </div><div>
                            <label htmlFor="concernedPersonEmail" className="flex text-center block mb-2 text-sm font-medium text-gray-900">
                                Concerned Person Email
                            </label>
                            <input
                                name="concernedPersonEmail"
                                value={formData.concernedPersonEmail}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder="Enter Concerned Person Email"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="contactNumber" className="flex text-center block mb-2 text-sm font-medium text-gray-900">
                                Concerned Person Number
                            </label>
                            <input
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder="Enter Concerned Person Number"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="priority" className="flex text-center block mb-2 text-sm font-medium text-gray-900">
                                Priority
                            </label>
                            <select value={formData.priority} name="priority"
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                                <option value='Medium'>Medium</option>
                                <option value='High'>High</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="wardNo" className="flex text-center block mb-2 text-sm font-medium text-gray-900">
                                Ward Number
                            </label>
                            <input
                                name="wardNo"
                                value={formData.wardNo}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder="Enter Ward Number"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="serviceIssuedFrom" className="flex text-center block mb-2 text-sm font-medium text-gray-900">
                                Service Issued From
                            </label>
                            <input
                                name="serviceIssuedFrom"
                                value={formData.serviceIssuedFrom}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder="Enter Issued From"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="issueDetails" className="flex text-center block mb-2 text-sm font-medium text-gray-900">
                                Issues Details
                            </label>
                            <textarea
                                name="issueDetails"
                                value={formData.issueDetails}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder="Enter Issues Details"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="toolsProvided" className="flex text-center block mb-2 text-sm font-medium text-gray-900">
                                Tools provided
                            </label>
                            <input
                                name="toolsProvided"
                                value={formData.toolsProvided}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder="Enter Tools Providedr"
                                required
                            />
                        </div>
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            {/* Render existing form fields here */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'start' }}>
                                <h4>Issues Category</h4>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        padding: '1rem',
                                        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                                        borderRadius: '10px',
                                        width: '500px'
                                    }}
                                >
                                    <div>
                                        {issueOptions.slice(0, 3).map((issue) => (
                                            <div key={issue} className="flex items-start mb-6">
                                                <div className="flex items-center h-5">
                                                    <input
                                                        value={issue}
                                                        checked={formData.issues.includes(issue)}
                                                        onChange={handleCheckboxChange}
                                                        type="checkbox"
                                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50"
                                                    />
                                                </div>
                                                <label className="ms-2 text-sm font-medium text-gray-900">
                                                    {issue}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        {issueOptions.slice(3).map((issue) => (
                                            <div key={issue} className="flex items-start mb-6">
                                                <div className="flex items-center h-5">
                                                    <input
                                                        value={issue}
                                                        checked={formData.issues.includes(issue)}
                                                        onChange={handleCheckboxChange}
                                                        type="checkbox"
                                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50"
                                                    />
                                                </div>
                                                <label className="ms-2 text-sm font-medium text-gray-900">
                                                    {issue}
                                                </label>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                                <div>
                                </div>
                                {/* Add other form fields similarly */}

                            </div>
                        </div>
                        <FileUploadComponent ticket={ticket} />
                    </div>
                    <button
                        type="submit"
                        className="text-white rounded-lg px-5 py-2.5" style={{ backgroundColor: '#98004c' }}
                    >
                        Update Ticket
                    </button>
                </form>
            </div>
        </div>
    );
}
export default EditTicketDetails;