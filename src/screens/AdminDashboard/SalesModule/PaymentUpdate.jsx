import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSalesPaymentAction } from "../../../store/action/ProjectAction";
import axios from "axios";

const PaymentUpdate = ({ onClose, salesLeadData, updateLeadStatus, leadId }) => {
    const [formData, setFormData] = useState({
        totalAmount: "",
        paymentTerms: "",
        paymentType: "",
        warrantyDuration: "",
        accessories: "",
        deviceDeliveryDate: "",
        remark: "",
        poImage: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

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
        dispatch(updateSalesPaymentAction({
            totalAmount: formData?.totalAmount,
            expectedDeliveryDate: formData?.deviceDeliveryDate,
            accessories: formData?.accessories,
            paymentTerms: formData?.paymentTerms,
            remark: formData?.remark,
            warrantyDuration: formData?.warrantyDuration,
            paymentType: formData?.paymentType,
            leadId,
            poImageUrl:pdfUrl
        }))
    };

    return (
        <div className="w-lg mx-auto p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">ADD - SALES</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                {/* Left Column Inputs */}
                <div>
                    <label
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >Accessories</label>
                    <input
                        type="text"
                        name="accessories"
                        placeholder="Enter Accessories"
                        value={formData.accessories}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900"
                    >Total Amount</label>
                    <input
                        type="number"
                        name="totalAmount"
                        placeholder="Enter Amount"
                        value={formData.totalAmount}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Device Delivery Date</label>
                    <input
                        type="date"
                        name="deviceDeliveryDate"
                        value={formData.deviceDeliveryDate}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        min={new Date().toISOString().split("T")[0]} // Prevent past dates
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Remark</label>
                    <input
                        type="text"
                        name="remark"
                        placeholder="Enter Remark"
                        value={formData.remark}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Payment Terms</label>
                    <input
                        type="text"
                        name="paymentTerms"
                        placeholder="Enter Terms"
                        value={formData.paymentTerms}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Payment Proof</label>
                    <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        name="paymentType" onChange={handleChange}>
                        <option>Select</option>
                        <option value="UPI">UPI</option>
                        <option value="Cheque">Cheque</option>
                        <option value="NEFT">NEFT</option>
                        <option value="RTGS">RTGS</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Warranty Duration</label>
                    <input
                        type="date"
                        name="warrantyDuration"
                        placeholder="Enter Duration"
                        value={formData.warrantyDuration}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        min={new Date().toISOString().split("T")[0]} // Prevent past dates
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">PO Image</label>
                    <div className="flex flex-column gap-2">
                        <input type="file" name="visitingCard" onChange={handleImageSelect} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required/>
                        <button type="button" onClick={generatePdfAndUploadToS3} className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-pink-700 rounded-lg border border-gray-200 ">{loading === true ? 'Loading...' : 'Upload PO Image'}</button>
                    </div>
                </div>
                <div className="col-span-2 flex justify-start mt-2">
                    <button
                        type="submit"
                        className="bg-pink-800 text-white px-4 py-2 rounded-lg w-full"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PaymentUpdate;
