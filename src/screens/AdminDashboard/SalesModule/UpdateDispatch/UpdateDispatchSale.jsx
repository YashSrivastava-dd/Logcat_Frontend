import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDispatchSaleAction } from "../../../../store/action/ProjectAction";
import { newDeviceAction } from "../../../../store/action/DeviceAction";

const UpdateDispatchSale = ({ salesLeadData, updateLeadStatus, leadId }) => {
    const [formData, setFormData] = useState({
        deviceId: [],
        deviceSerialNo: [],
        docketNo: "",
        deliveryBy: "",
        deliveryVia: "",
        invoiceNo: "",
    });
    const newDeviceReducer = useSelector((state) => state.newDeviceReducer);
    const { data: deviceIdData, error } = newDeviceReducer;
    const [deviceInput, setDeviceInput] = useState(""); // State for input field
    const [showDropdown, setShowDropdown] = useState(false);
    const handleDeviceSelect = (deviceId) => {
        setFormData((prev) => ({ ...prev, deviceId: [...prev.deviceId, deviceId] }));
        setDeviceInput("");
        setShowDropdown(false);
    };
    const filteredDevices = deviceIdData?.data?.data?.filter(device =>
        device.deviceId.toLowerCase().includes(deviceInput.toLowerCase())
    ) || [];

    // const handleChange = (e) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // };

    useEffect(() => {
        dispatch(newDeviceAction({ page: 1, limit: 100, projectCode: '007' }));
    }, []);

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

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Prevent overwriting `deviceSerialNo` array with a string
        if (name === "deviceSerialNo") return;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
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

            // e.target.value = ""; // Clear input field after adding
        }
    };

    // Remove Serial Number
    const removeSerialNo = (index) => {
        setFormData((prev) => ({
            ...prev,
            deviceSerialNo: prev.deviceSerialNo.filter((_, i) => i !== index)
        }));
    };

    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateDispatchSaleAction({
            serialNumbers: formData?.deviceSerialNo,
            deviceIds: formData?.deviceId,
            deliveringVia: formData?.deliveryVia,
            docketNo: formData?.docketNo,
            expectedDeliveryDate: formData?.deliveryBy,
            invoiceNumber: formData?.invoiceNo,
            leadId: leadId,
        }))
    };

    const classCss = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
    const lableCss = 'block mb-2 text-sm font-medium text-gray-900'
    return (
        <div className="flex-1 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">UPDATE - DISPATCH SALES</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 mt-4">
                {/* Device ID */}
                <div className="relative">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Device Id</label>
                    <input type="text"
                        placeholder="Enter Device Id"
                        value={deviceInput}
                        onChange={handleDeviceInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                    {showDropdown === true ?
                        <div style={{ height: '15rem' }} className="absolute bg-white border-2 border-dotted border-gray-400 rounded-lg shadow-lg w-full mt-1 overflow-y-auto">
                            {filteredDevices.length > 0 ? (
                                filteredDevices?.map((device, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="px-2 py-2 hover:bg-gray-100 cursor-pointer font-mono text-lg tracking-wide transform hover:scale-105"
                                            onClick={() => handleDeviceSelect(device.deviceId)}
                                        >
                                            {device.deviceId}
                                        </div>
                                    )
                                })
                            ) : (
                                <div className="px-2 py-1 text-gray-500 font-mono text-lg tracking-wide transform hover:scale-105">No results found</div>
                            )}
                        </div>

                        : ''}
                    <div className="mt-2 flex flex-wrap gap-2">
                        {formData?.deviceId?.map((id, index) => (
                            <span key={index} className="bg-blue-200 text-blue-700 px-3 py-1 rounded-md flex items-center">
                                {id}
                                <button type="button" onClick={() => setFormData({ ...formData, deviceId: formData.deviceId.filter((_, i) => i !== index) })} className="ml-2 text-red-600 font-bold">×</button>
                            </span>
                        ))}
                    </div>
                </div>
                {/* Device Serial No. */}
                <div>
                    <label className={lableCss}>Device Serial No.</label>
                    <input
                        type="text"
                        name="deviceSerialNo"
                        placeholder="Enter Serial Number"
                        onKeyPress={handleSerialNoKeyPress} // Capture enter key
                        className={classCss}
                    />
                </div>
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
                {/* Docket No. */}
                <div>
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

                {/* Delivery By (Date) */}
                <div>
                    <label className={lableCss}>Delivery By</label>
                    <input
                        type="date"
                        name="deliveryBy"
                        value={formData.deliveryBy}
                        onChange={handleChange}
                        className={classCss}
                        min={new Date().toISOString().split("T")[0]} // Prevent past dates

                        required
                    />
                </div>

                {/* Delivery Via */}
                <div>
                    <label className={lableCss}>Delivery Via</label>
                    <select
                        name="deliveryVia"
                        value={formData.deliveryVia}
                        onChange={handleChange}
                        className={classCss}
                        required

                    >
                        <option value="">Select (Delhivery, Bluedart, Train, Bus)</option>
                        <option value="Delhivery">Delhivery</option>
                        <option value="Bluedart">Bluedart</option>
                        <option value="Train">Train</option>
                        <option value="Bus">Bus</option>
                    </select>
                </div>

                {/* Invoice No. */}
                <div>
                    <label className={lableCss}>Invoice No.</label>
                    <input
                        type="text"
                        name="invoiceNo"
                        placeholder="Enter No."
                        value={formData.invoiceNo}
                        onChange={handleChange}
                        className={classCss}
                        required

                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-start">
                    <button type="submit" className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700">
                        SUBMIT
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateDispatchSale;
