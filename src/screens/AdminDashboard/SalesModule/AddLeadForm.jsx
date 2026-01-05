import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editSalesLeadAction, postSalesLeadAction } from "../../../store/action/ProjectAction";
import { getPincodeData } from "../../../store/action/DispatchDetailsAction"
import axios from "axios";

// AddLeadForm Component
const AddLeadForm = ({ salesLeadData, updateLeadStatus, leadId }) => {
    const [formData, setFormData] = useState({
        dealerName: "",
        email: "",
        contact: "",
        address: "",
        city: "",
        state: "",
        leadSource: "",
        type: "",
        concernPersonName: "",
        concernPersonContact: "",
        visitingCard: null,
        pincode: '',
        leadType: '',
        leadId: ''
    });
    console.log('formData', formData)
    const [deviceInput, setDeviceInput] = useState(""); // State for input field
    const [showDropdown, setShowDropdown] = useState(false);
    const [hospitalName, setHospitalName] = useState('');

    const dispatch = useDispatch();
    const postSalesLeadReducer = useSelector((state) => state.postSalesLeadReducer);
    const { data, error } = postSalesLeadReducer;

    const getHospitalFromAdding = useSelector((state) => state.getHospitalFromAdding);
    const { data: dataHospital } = getHospitalFromAdding;
    const filterHospital = dataHospital?.filter(device =>
        device.Hospital_Name.toLowerCase().includes(deviceInput.toLowerCase())
    ) || [];

    // state reducer for pincode data
    const getPiincodeDatReducer = useSelector((state) => state.getPiincodeDatReducer);
    const { data: pincodeData } = getPiincodeDatReducer;
    const getPincodeAllData = pincodeData && pincodeData.data && pincodeData.data[0];

    const handleDeviceSelect = (hospitalName) => {
        setHospitalName(hospitalName);
        setDeviceInput("");
        setShowDropdown(false);
    };

    useEffect(() => {
        // If salesLeadData is available, populate the formData with salesLeadData
        if (salesLeadData) {
            setFormData((prevData) => ({
                ...prevData,
                ...salesLeadData, // Merge salesLeadData into formData
            }));

            // Handle pincode from salesLeadData
            if (salesLeadData.pincode?.length === 6) {
                const { city, state } = getPincodeAllData || {}; // Try to get city/state from pincode data

                if (city && state) {
                    setFormData((prevData) => ({
                        ...prevData,
                        city: city,
                        state: state,
                    }));
                } else {
                    // If city/state not available from pincode data, clear city and state to allow manual input
                    setFormData((prevData) => ({
                        ...prevData,
                        city: "",
                        state: "",
                    }));
                }
            } else {
                // If no valid pincode in salesLeadData, allow manual entry of city/state
                setFormData((prevData) => ({
                    ...prevData,
                    city: "",
                    state: "",
                }));
            }
            return;
        }

        // If salesLeadData is not available, and pincode is entered
        if (formData.pincode?.length === 6) {
            const { city, state } = getPincodeAllData || {}; // Fetch city/state based on pincode

            if (city && state) {
                setFormData((prevData) => ({
                    ...prevData,
                    city: city,
                    state: state,
                }));
            } else {
                // If no city/state from pincode, clear them to allow manual input
                setFormData((prevData) => ({
                    ...prevData,
                    city: "",
                    state: "",
                }));
            }
        } else {
            // If pincode is empty or invalid, clear city and state fields
            setFormData((prevData) => ({
                ...prevData,
                city: "",
                state: "",
            }));
        }
    }, [formData.pincode, getPincodeAllData, salesLeadData]);  // Dependencies include pincode and salesLeadData

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "pincode") {
            // When pincode is updated, fetch pincode data
            setFormData({ ...formData, [name]: value });
            dispatch(getPincodeData(value)); // Dispatch API to get the pincode data
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    const [selectedImage, setSelectedImage] = useState(null);
    const [pdfUrl, setPdfUrl] = useState('');
    const handleImageSelect = (event) => {
        setSelectedImage(event.target.files[0]);
    };
    const generatePdfAndUploadToS3 = async () => {
        if (!selectedImage) {
            alert('Please select a file');
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedImage);
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/s3/upload-visiting-card`, formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            setPdfUrl(response?.data?.location);
            alert('Uploaded successful')
        } catch (error) {
            console.error('Error generating PDF:', error);
            console.error('Error Serial Number:', error);
        }
    };


    const hospitalChange = (e) => {
        const { value, name } = e.target;
        setHospitalName(value);
        setDeviceInput(value);

        if (value === "") {
            setShowDropdown(false); // Hide dropdown when the input is empty
        } else {
            setShowDropdown(true); // Show dropdown when input is present
        }
    };

    useEffect(() => {
        dispatch(getPincodeData()); // Fetch pincode data initially
    }, [dispatch]);

    // Update formData when salesLeadData is available
    useEffect(() => {
        if (salesLeadData) {
            setFormData((prevData) => ({
                ...prevData,  // Keep default values if `salesLeadData` fields are missing
                ...salesLeadData,   // Overwrite with salesLeadData values
            }));
            setHospitalName(salesLeadData?.hospitalName)
        }
    }, [salesLeadData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formPayload = {
            hospitalName: hospitalName,
            email: formData?.email,
            contact: formData?.contact,
            leadSource: formData?.leadSource,
            dealerName: formData?.dealerName,
            address: formData?.address,
            state: formData?.state,
            city: formData?.city,
            concernPersonName: formData?.concernPersonName,
            concernPersonContact: formData?.concernPersonContact,
            pincode: formData?.pincode,
            leadType: formData?.leadType,
            visitingCardImageUrl: pdfUrl,
            type:formData?.type,
        };

        const formPayloadEdit = {
            hospitalName: hospitalName,
            email: formData?.email,
            contact: formData?.contact,
            leadSource: formData?.leadSource,
            dealerName: formData?.dealerName,
            type: formData?.type,
            address: formData?.address,
            state: formData?.state,
            city: formData?.city,
            concernPersonName: formData?.concernPersonName,
            concernPersonContact: formData?.concernPersonContact,
            pincode: formData?.pincode,
            leadType: formData?.leadType,
            visitingCardImageUrl: pdfUrl,
            leadId: leadId,
        };
        if (updateLeadStatus) {
            dispatch(editSalesLeadAction(formPayloadEdit));
        } else {
            dispatch(postSalesLeadAction(formPayload));
        }
    };

    return (
        <div className="p-2 min-h-screen flex justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-2 rounded-lg w-full max-w-4xl"
            >
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">{updateLeadStatus ? 'EDIT LEAD' : 'ADD LEAD'}</h2>
                <div className="grid grid-cols-2 gap-4">
                    {/* Left Side Fields */}
                    <div className="space-y-3">
                        <div>
                            <label htmlFor="concerned_person_name" className="block mb-2 text-sm font-medium text-gray-900">Dealer Name</label>
                            <input type="text" name="dealerName"
                                value={formData.dealerName}
                                onChange={handleChange}
                                placeholder="Enter Dealer Name" id="concerned_person_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div>
                            <label htmlFor="concerned_person_name" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                            <input type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter Email" id="concerned_person_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>

                        <div>
                            <label htmlFor="concerned_person_name" className="block mb-2 text-sm font-medium text-gray-900">Mobile</label>
                            <input
                                type="number"
                                name="contact"
                                value={formData.contact}
                                onChange={handleChange}
                                placeholder="Enter Mobile Number"
                                id="concerned_person_name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required />
                        </div>
                        <div>
                            <label htmlFor="hospitalName" className="block mb-2 text-sm font-medium text-gray-900">Hospital Name</label>
                            <input type="text"
                                name="hospitalName"
                                value={hospitalName}
                                onChange={hospitalChange}
                                placeholder="Enter Hospital Name"
                                id="hospitalName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>

                        {showDropdown && filterHospital.length > 0 && (
                            <div style={{ height: '15rem', width: '25rem' }} className="absolute bg-white border-2 border-dotted border-gray-400 rounded-lg shadow-lg mt-1 overflow-y-auto">
                                {filterHospital.map((hospital, index) => (
                                    <div
                                        key={index}
                                        className="px-2 py-2 hover:bg-gray-100 cursor-pointer font-mono text-lg tracking-wide transform hover:scale-105"
                                        onClick={() => handleDeviceSelect(hospital.Hospital_Name)}
                                    >
                                        {hospital.Hospital_Name}
                                    </div>
                                ))}
                            </div>
                        )}

                        <div>
                            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">Address</label>
                            <input type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter Address Detail"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required />
                        </div>
                        <div>
                            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">City</label>
                            <input type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="Enter city"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required />
                        </div>
                        <div>
                            <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900">State</label>
                            <input type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                placeholder="Enter state"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required />
                        </div>
                    </div>
                    {/* Right Side Fields */}
                    <div className="space-y-3">
                        <div>
                            <label htmlFor="pincode" className="block mb-2 text-sm font-medium text-gray-900">Pincode</label>
                            <input
                                type="number"
                                name="pincode"
                                value={formData.pincode}
                                onChange={(e) => {
                                    setFormData({ ...formData, pincode: e.target.value });
                                    dispatch(getPincodeData(e.target.value)); // Fetch pincode data when changed
                                }}
                                placeholder="Enter Pincode"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="leadSource" className="block mb-2 text-sm font-medium text-gray-900">Lead Source</label>
                            <input type="text"
                                name="leadSource"
                                value={formData.leadSource}
                                onChange={handleChange}
                                placeholder="Enter leadSource"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required />
                        </div>
                        <div>
                            <label htmlFor="leadType" className="block mb-2 text-sm font-medium text-gray-900">Lead Type</label>
                            <select
                                name="leadType"
                                value={formData.leadType}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required
                            >
                                <option>Select Lead Type</option>
                                <option value="HOT LEADS">Hot Leads</option>
                                <option value="WARM LEADS">Warm Leads</option>
                                <option value="COLD LEADS">Cold Leads</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900">Device</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required >
                                <option>Select Device Type</option>
                                <option value="AgVa Pro-ATP">AgVa Pro-ATP</option>
                                <option value="AgVa Pro-ATN">AgVa Pro-ATN</option>
                                <option value="Suction Pump">Suction Pump</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="concernPersonName" className="block mb-2 text-sm font-medium text-gray-900">Concern Person Name</label>
                            <input type="text"
                                name="concernPersonName"
                                value={formData.concernPersonName}
                                onChange={handleChange}
                                placeholder="Enter Name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required />
                        </div>
                        <div>
                            <label htmlFor="concernPersonContact" className="block mb-2 text-sm font-medium text-gray-900"> Concern Person Mobile</label>
                            <input type="number"
                                name="concernPersonContact"
                                value={formData.concernPersonContact}
                                onChange={handleChange}
                                placeholder="Enter Mobile"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required />
                        </div>
                        <div>
                            <label htmlFor="visitingCard" className="block mb-2 text-sm font-medium text-gray-900">Visiting Card</label>
                            <div className="flex flex-column gap-2">
                                <input type="file" name="visitingCard" onChange={handleImageSelect} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                <button type="button" onClick={generatePdfAndUploadToS3} className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-pink-700 rounded-lg border border-gray-200">Upload</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-4">
                    <button
                        type="submit"
                        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
                    >
                        {updateLeadStatus ? "Update Lead" : "Add Lead"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddLeadForm;
