import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateDemoCompleteAction } from "../../../../store/action/ProjectAction";
import axios from "axios";

const UpdateDemoCompleted = ({ leadId }) => {
    const [formData, setFormData] = useState({
        feedback: "",
        amountQuoted: "",
        expectedClosingAmount: "",
        expectedSalesDate: "",
        feedbackReport: null
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
        dispatch(updateDemoCompleteAction({
            feedBack: formData?.feedback,
            expectedSalesDate: formData?.expectedSalesDate,
            amountQuoted: formData?.amountQuoted,
            expectedClosingAmount: formData?.expectedClosingAmount,
            leadId: leadId,
            feedBackReportImageUrl: pdfUrl
        }))
    };

    return (
        <div className="flex-1 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">UPDATE - DEMO COMPLETED</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 mt-4">
                {/* Feedback */}
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Feedback</label>
                    <input
                        type="text"
                        name="feedback"
                        placeholder="Enter"
                        value={formData.feedback}
                        onChange={handleChange}
                        required
                        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>
                {/* Amount Quoted */}
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Amount Quoted</label>
                    <input
                        type="text"
                        name="amountQuoted"
                        placeholder="Enter Amount"
                        value={formData.amountQuoted}
                        onChange={handleChange}
                        required
                        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>

                {/* Expected Closing Amount */}
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Expected Closing Amount</label>
                    <input
                        type="number"
                        name="expectedClosingAmount"
                        placeholder="Enter Number"
                        value={formData.expectedClosingAmount}
                        onChange={handleChange}
                        required
                        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>

                {/* Expected Sales Date */}
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Expected Sales Date</label>
                    <input
                        type="date"
                        name="expectedSalesDate"
                        value={formData.expectedSalesDate}
                        onChange={handleChange}
                        required
                        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        min={new Date().toISOString().split("T")[0]} // Prevent past dates
                  
                  />
                </div>
                {/* Feedback Report Upload */}
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Feedback Report</label>
                    <div className="flex flex-column gap-2">
                        <input type="file" name="visitingCard" onChange={handleImageSelect} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required/>
                        <button type="button" onClick={generatePdfAndUploadToS3} className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-pink-700 rounded-lg border border-gray-200">{loading === true ? 'Loading...' : 'Upload'}</button>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="col-span-2 flex justify-start">
                    <button type="submit" className="w-full bg-pink-800 text-white px-6 py-2 rounded-lg">
                        SUBMIT
                    </button>
                </div>

            </form>
        </div>
    );
};

export default UpdateDemoCompleted;
