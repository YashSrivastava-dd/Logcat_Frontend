import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSalesConfirmedAction } from "../../../store/action/ProjectAction";

const SalesConfirmed = ({leadId }) => {
    const [formData, setFormData] = useState({
        advanceAmmount: "",
        paymentProof: "",
        commitedDeliveryDate: "",
        schedulePayment: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateSalesConfirmedAction({
            advanceAmount: formData?.advanceAmmount,
            paymentProof: formData?.paymentProof,
            commitedDeliveryDate: formData?.commitedDeliveryDate,
            scheduleOfPayment: formData?.schedulePayment,
            leadId:leadId
        }))
    };

    return (
        <div className="w-lg mx-auto p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">CONFIRM - SALES</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                {/* Left Column Inputs */}
                <div>
                    <label
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >Advance Amount</label>
                    <input
                        type="number"
                        name="advanceAmmount"
                        placeholder="Enter Advance Ammount"
                        value={formData.advanceAmmount}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900"
                    >Payment Proof</label>
                    <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        name="paymentProof" onChange={handleChange} required>
                        <option>Select Proof</option>
                        <option value="Cheque">Cheque</option>
                        <option value="NEFT">NEFT</option>
                        <option value="RTGS">RTGS</option>
                        <option value="UPI">UPI</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Committed Date Delivery Date</label>
                    <input
                        type="date"
                        name="commitedDeliveryDate"
                        value={formData.commitedDeliveryDate}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        min={new Date().toISOString().split("T")[0]} // Prevent past dates
                        
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Schedule of Payment</label>
                    <input
                        type="date"
                        name="schedulePayment"
                        placeholder="Enter chedule of Payment"
                        value={formData.schedulePayment}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        min={new Date().toISOString().split("T")[0]} // Prevent past dates
                       
                        required
                    />
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

export default SalesConfirmed;
