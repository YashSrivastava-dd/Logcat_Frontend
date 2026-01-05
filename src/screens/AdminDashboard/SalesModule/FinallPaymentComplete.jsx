import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newDeviceAction } from "../../../store/action/DeviceAction";
import { addPaymentUpdatesAction } from "../../../store/action/ProjectAction";
import axios from "axios";

const FinallPaymentComplete = ({ paymentAllData, leadId }) => {
    const [formData, setFormData] = useState({
        paymentReceived: "",
        advanceAmount: "",
        paymentMode: "",
        nextPaymentDate: "",
        paymentTerms: null,
        deviceId: []
    });
    console.log('leadId', leadId)
    const [deviceInput, setDeviceInput] = useState(""); // State for input field
    const [showDropdown, setShowDropdown] = useState(false);
    const newDeviceReducer = useSelector((state) => state.newDeviceReducer);
    const { data: deviceIdData, error } = newDeviceReducer;
    useEffect(() => {
        dispatch(newDeviceAction({ page: 1, limit: 100, projectCode: '007' }));
    }, []);
    const handleDeviceSelect = (deviceId) => {
        setFormData((prev) => ({ ...prev, deviceId: [...prev.deviceId, deviceId] }));
        setDeviceInput("");
        setShowDropdown(false);
    };
    const filteredDevices = deviceIdData?.data?.data?.filter(device =>
        device.deviceId.toLowerCase().includes(deviceInput.toLowerCase())
    ) || [];

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Prevent overwriting `deviceSerialNo` array with a string
        if (name === "deviceSerialNo") return;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };



    const handleDeviceInputChange = (e) => {
        let value = e.target.value;
        if (value === "") {
            setShowDropdown(false)
            setDeviceInput('');
            return;
        }
        else {
            setDeviceInput(e.target.value);
            setShowDropdown(true)
            return;
        }
    };

    const handleDeviceKeyDown = (e) => {
        if (e.key === "Enter" && deviceInput.trim() !== "") {
            e.preventDefault();
            setFormData({ ...formData, deviceId: [...formData.deviceId, deviceInput.trim()] });
            setDeviceInput(""); // Clear input field
        }
    };
    // Handle Enter Key Press for Serial Number

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

    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addPaymentUpdatesAction({
            paymentReceived: formData?.paymentReceived,
            advanceAmount: formData?.advanceAmount,
            paymentMode: formData?.paymentMode,
            nextPaymentDate: formData?.nextPaymentDate,
            paymentTerms: formData?.paymentTerms,
            leadId: leadId,
            paymentImageUrl: pdfUrl
        }))
    };
    const classCss = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5';
    const lableCss = 'block mb-2 text-sm font-medium text-gray-900';
    return (
        <div className="flex-1 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">UPDATE - PAYMENT</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 mt-4">
                {/* Dispatched payment */}
                <div>
                    <label for="concerned_person_name"
                        className={lableCss}
                    >Payment Terms</label>
                    <input type="text"
                        name="paymentTerms"
                        placeholder="Enter Payment Terms"
                        value={formData.paymentTerms}
                        onChange={handleChange}
                        className={classCss}
                        required />
                </div>
                {/* Docket No. */}
                <div className="col-span-1">
                    <label className={lableCss}>Payment Received Amount</label>
                    <input
                        type="number"
                        name="paymentReceived"
                        placeholder="Enter Payment Received"
                        value={formData.paymentReceived}
                        onChange={handleChange}
                        className={classCss}
                    />
                </div>
                {/* Expected Delivery Date */}
                <div className="col-span-1">
                    <label className={lableCss}>Next Payment Date</label>
                    <input
                        type="date"
                        name="nextPaymentDate"
                        value={formData.nextPaymentDate}
                        onChange={handleChange}
                        className={classCss}
                        min={new Date().toISOString().split("T")[0]} // Prevent past dates
                    />

                </div>
                {/* Delivery Via */}
                <div className="col-span-1">
                    <label className={lableCss}>Payment Mode</label>
                    <select
                        name="paymentMode"
                        value={formData.paymentMode}
                        onChange={handleChange}
                        className={classCss}
                    >
                        <option value="">Select (UPI, Cheque, NEFT)</option>
                        <option value="UPI">UPI</option>
                        <option value="Cheque">Cheque</option>
                        <option value="NEFT">NEFT</option>
                    </select>
                </div>
                {/* Delivery Note (File Upload) */}
                <div className="col-span-1">
                    <label className={lableCss}>Payment Proof</label>
                    <div className="flex flex-column gap-2">
                        <input type="file" name="visitingCard" onChange={handleImageSelect} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        <button type="button" onClick={generatePdfAndUploadToS3} className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-pink-700 rounded-lg border border-gray-200">{loading === true ? 'Loading...' : 'Upload Payment Proof'}</button>
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
export default FinallPaymentComplete;