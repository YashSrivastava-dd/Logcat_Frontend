import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDispatchDemoAction } from "../../../../store/action/ProjectAction";
import { newDeviceAction } from "../../../../store/action/DeviceAction";
import axios from "axios";

const UpdateDispatchDemo = ({ leadId }) => {
    const [formData, setFormData] = useState({
        dispatchedFrom: "",
        deviceSerialNo: [],
        docketNo: "",
        expectedDeliveryDate: "",
        deliveryVia: "",
        deliveryNote: null,
        deviceId: []
    });
    console.log('formData', formData?.deviceSerialNo)
    const [deviceInput, setDeviceInput] = useState(""); // State for input field
    const [showDropdown, setShowDropdown] = useState(false);
    const newDeviceReducer = useSelector((state) => state.newDeviceReducer);
    const { data: deviceIdData, error } = newDeviceReducer;
    console.log('deviceIdData', deviceIdData)
    useEffect(() => {
        dispatch(newDeviceAction({ page: 1, limit: 100, projectCode: '007' }));
    }, []);

    const [loading, setLoading] = useState(false)
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
        setLoading(true)
        const formData = new FormData();
        formData.append('file', selectedImage);
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/s3/upload-visiting-card`, formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            setPdfUrl(response?.data?.location);
            alert('Uploaded successful')
            setLoading(false)
        } catch (error) {
            console.error('Error generating PDF:', error);
            console.error('Error Serial Number:', error);
        }
    };

    const handleDeviceSelect = (deviceId) => {
        if (formData.deviceId.includes(deviceId)) {
            alert("This Device ID has already been selected!");
            return;
        }
        setFormData((prev) => ({ ...prev, deviceId: [...prev.deviceId, deviceId] }));
        setDeviceInput("");
        setShowDropdown(false);
    };

    const filteredDevices = deviceIdData?.data?.data?.filter(device =>
        device.deviceId.toLowerCase().includes(deviceInput.toLowerCase())
    ) || [];

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "deviceSerialNo") return;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDeviceInputChange = (e) => {
        let value = e.target.value;
        if (value === "") {
            setShowDropdown(false);
            setDeviceInput('');
            return;
        }
        else {
            setDeviceInput(e.target.value);
            setShowDropdown(true);
            return;
        }
    };

    const handleSerialNoKeyPress = (e) => {
        if (e.key === "Enter" && e.target.value.trim() !== "") {
            e.preventDefault();
            setFormData((prev) => ({
                ...prev,
                deviceSerialNo: Array.isArray(prev.deviceSerialNo)
                    ? [...prev.deviceSerialNo, e.target.value.trim()]
                    : [e.target.value.trim()]
            }));
        }
    };

    const removeDeviceId = (index) => {
        setFormData({
            ...formData,
            deviceId: formData.deviceId.filter((_, i) => i !== index)
        });
    };

    const removeSerialNo = (index) => {
        setFormData((prev) => ({
            ...prev,
            deviceSerialNo: prev.deviceSerialNo.filter((_, i) => i !== index)
        }));
    };

    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateDispatchDemoAction({
            dispatchedFrom: formData?.dispatchedFrom,
            serialNumbers: formData?.deviceSerialNo,
            deviceIds: formData?.deviceId,
            docketNo: formData?.docketNo,
            expectedDeliveryDate: formData?.expectedDeliveryDate,
            deliveringVia: formData?.deliveryVia,
            leadId: leadId
        }));
    };

    const classCss = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5';
    const lableCss = 'block mb-2 text-sm font-medium text-gray-900';
    return (
        <div className="flex-1 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">UPDATE - DISPATCH DEMO</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 mt-4">
                {/* Device ID */}
                <div className="relative">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Device Id</label>
                    <input type="text"
                        placeholder="Enter Device Id"
                        value={deviceInput}
                        onChange={handleDeviceInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                    {showDropdown && (
                        <div style={{ height: '15rem' }} className="absolute bg-white border-2 border-dotted border-gray-400 rounded-lg shadow-lg w-full mt-1 overflow-y-auto">
                            {filteredDevices.length > 0 ? (
                                filteredDevices.map((device, index) => (
                                    <div
                                        key={index}
                                        className="px-2 py-2 hover:bg-gray-100 cursor-pointer font-mono text-lg tracking-wide transform hover:scale-105"
                                        onClick={() => handleDeviceSelect(device.deviceId)}
                                    >
                                        {device.deviceId}
                                    </div>
                                ))
                            ) : (
                                <div className="px-2 py-1 text-gray-500 font-mono text-lg tracking-wide transform hover:scale-105">No results found</div>
                            )}
                        </div>
                    )}
                    <div className="mt-2 flex flex-wrap gap-2">
                        {formData?.deviceId?.map((id, index) => (
                            <span key={index} className="bg-blue-200 text-blue-700 px-3 py-1 rounded-md flex items-center">
                                {id}
                                <button type="button" onClick={() => removeDeviceId(index)} className="ml-2 text-red-600 font-bold">×</button>
                            </span>
                        ))}
                    </div>
                </div>
                {/* Dispatched From */}
                <div>
                    <label for="concerned_person_name"
                        className={lableCss}
                    >Dispatched From</label>
                    <input type="text"
                        name="dispatchedFrom"
                        placeholder="Enter Dispatched From"
                        value={formData.dispatchedFrom}
                        onChange={handleChange}
                        className={classCss}
                        required />
                </div>
                {/* Device Serial No. */}
                <div className="col-span-1">
                    <label className={lableCss}>Device Serial No.</label>
                    <input
                        type="text"
                        name="deviceSerialNo"
                        placeholder="Enter Serial Number"
                        onKeyPress={handleSerialNoKeyPress} // Capture enter key
                        className={classCss}
                    />

                    <div className="mt-2">
                        {formData?.deviceSerialNo?.map((serial, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-200 p-1 rounded mt-1">
                                <span>{serial}</span>
                                <button
                                    type="button"
                                    className="text-red-500 text-sm"
                                    onClick={() => removeSerialNo(index)}
                                >
                                    ✖
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Docket No. */}
                <div className="col-span-1">
                    <label className={lableCss}>Docket No.</label>
                    <input
                        type="text"
                        name="docketNo"
                        placeholder="Enter Number"
                        value={formData.docketNo}
                        onChange={handleChange}
                        className={classCss}
                        required
                    />
                </div>
                {/* Expected Delivery Date */}
                <div className="col-span-1">
                    <label className={lableCss}>Expected Delivery Date</label>
                    <input
                        type="date"
                        name="expectedDeliveryDate"
                        value={formData.expectedDeliveryDate}
                        onChange={handleChange}
                        className={classCss}
                        min={new Date().toISOString().split("T")[0]} // Prevent past dates
                    />
                </div>
                {/* Delivery Via */}
                <div className="col-span-1">
                    <label className={lableCss}>Delivery Via</label>
                    <select
                        name="deliveryVia"
                        value={formData.deliveryVia}
                        onChange={handleChange}
                        className={classCss}
                    >
                        <option value="">Select (Delhivery, Bluedart, Train, Bus)</option>
                        <option value="Delhivery">Delhivery</option>
                        <option value="Bluedart">Bluedart</option>
                        <option value="Train">Train</option>
                        <option value="Bus">Bus</option>
                    </select>
                </div>
                {/* Delivery Note (File Upload) */}
                <div className="col-span-1">
                    <label className={lableCss}>Delivery Note</label>
                    <div className="flex flex-column gap-2">
                        <input type="file" name="visitingCard" onChange={handleImageSelect} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        <button type="button" onClick={generatePdfAndUploadToS3} className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-pink-700 rounded-lg border border-gray-200 ">{loading === true ? 'Loading...' : 'Upload'}</button>
                    </div>
                </div>
                {/* Submit Button */}
                <div className="col-span-2 flex justify-start">
                    <button type="submit" className="bg-pink-800 text-white px-4 py-2 rounded-lg w-full">
                        SUBMIT
                    </button>
                </div>
            </form>
        </div>
    );
};
export default UpdateDispatchDemo;