import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import back from "../../../assets/images/back.png";
import Style from "../../../css/Production.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { deviceAction } from '../../../store/action/DeviceAction';
import { getAllDevicesDataInMarket, postUpdateDeviceAllData } from '../../../store/action/ServiceEngAction';
function AllDataInOneMarketing() {
    const [updateData, setUpdateData] = useState({
        deviceId: '',
        serialNumber: "",
        hospitalName: '',
        aliasName: "",
        department: "",
        doctorName: "",
        wardNumber: "",
        imeiNo: "",
        bioMed: "",
        status: "",
        purpose: ""
    });

    useEffect(() => {
        const deviceId = updateData?.deviceId
        dispatch(getAllDevicesDataInMarket(deviceId))
    }, [updateData?.deviceId])

    const goBack = () => {
        window.history.go(-1)
    }
    const navigate = useNavigate();
    const handleAddHospital = () => {
        navigate("/add_hospital");
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(deviceAction())
    }, [])

    const getAllDeviceDataReducer = useSelector((state) => state.getAllDeviceDataReducer);
    const { data: dataa } = getAllDeviceDataReducer;
    const deviceData = dataa

    useEffect(() => {
        if (deviceData) {
            setUpdateData(prevDetails => ({
                ...prevDetails, // Retain previous values to avoid overwriting them unintentionally
                deviceId: deviceData?.DeviceId,
                department: deviceData?.Department_Name,
                hospitalName: deviceData?.Hospital_Name,
                doctorName: deviceData?.Doctor_Name,
                wardNumber: deviceData?.Ward_No,
                imeiNo: deviceData?.IMEI_NO,
                bioMed: deviceData?.Bio_Med,
                aliasName: deviceData?.Alias_Name,
                serialNumber: deviceData?.serialNumber,
                purpose: deviceData?.purpose,
                status: deviceData?.message
            }));
        }
    }, [])

    const deviceReducer = useSelector((state) => state.deviceReducer);
    const { data, message: messagee, error } = deviceReducer;
    const deviceIdData = data && data.data && data.data.data

    const handleSubmitData = () => {
        dispatch(postUpdateDeviceAllData({
            DeviceId: updateData?.deviceId,
            Department_Name: updateData?.department,
            Hospital_Name: updateData?.hospitalName,
            Doctor_Name: updateData?.doctorName,
            Ward_No: updateData?.wardNumber,
            IMEI_NO: updateData?.imeiNo,
            Bio_Med: updateData?.bioMed,
            Alias_Name: updateData?.aliasName,
            serialNumber: updateData?.serialNumber,
            purpose: updateData?.purpose,
            message: updateData?.status
        }))
    }
    return (
        <div className={Style.mainContainer}>
            <div className={Style.dispatchContainer}>
                <div style={{ display: "flex", gap: "1rem", justifyContent: 'space-between' }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <Link onClick={goBack} style={{ display: 'block' }}>
                            <img src={back} loading='lazy' style={{ width: "3rem", }} />
                        </Link>
                        <h1 className="text-2xl font-extrabold">Device<small className="ml-2 font-semibold text-gray-500 dark:text-gray-400">Details</small></h1>
                        <hr style={{ color: "rgb(152, 0, 76)" }} />
                    </div>
                    <div>
                        <button
                            onClick={handleAddHospital}
                            style={{ backgroundColor: "rgb(152, 0, 76)" }}
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                            Add Hospital
                        </button>
                    </div>
                </div>
                <form>
                    <div className="grid gap-6 mb-6 md:grid-cols-2" style={{ textAlign: 'start' }}>
                        <div>
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 ">Device Id</label>
                            <input list='deviceid' onChange={(e) =>
                                setUpdateData({ ...updateData, deviceId: e.target.value })}
                                value={updateData.deviceId} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400  :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Device Id" required />
                            <datalist id='deviceid'>
                                {deviceIdData?.length > 0 ?
                                    deviceIdData && deviceIdData.map((item, index) => {
                                        return (
                                            <option value={item.deviceId} key={index}>{item.deviceId}</option>
                                        )
                                    })
                                    :
                                    <option>Loading...</option>
                                }
                            </datalist>
                        </div>
                        <div>
                            <label htmlFor="serial_number" className="block mb-2 text-sm font-medium text-gray-900 ">Serial Number</label>
                            <input onChange={(e) =>
                                setUpdateData({ ...updateData, serialNumber: e.target.value })}
                                defaultValue={updateData?.deviceId?.length > 0 ? deviceData?.serialNumber : ''} list='serialnumber' type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400  :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Serial Number" required />
                        </div>
                        <div>
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 ">Hospital Name</label>
                            <input list='hospitalname'
                                onChange={(e) =>
                                    setUpdateData({ ...updateData, hospitalName: e.target.value })}
                                defaultValue={updateData?.deviceId?.length > 0 ? deviceData?.Hospital_Name : ''}
                                type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400  :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Hospital Name" required />

                        </div>
                        <div>
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 ">Alias Name</label>
                            <input list='aliasname' onChange={(e) =>
                                setUpdateData({ ...updateData, aliasName: e.target.value })}
                                defaultValue={updateData?.deviceId?.length > 0 ? deviceData?.Alias_Name : ''} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400  :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Alias Name" required />
                        </div>
                        <div>
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 ">Department</label>
                            <input list='department' onChange={(e) =>
                                setUpdateData({ ...updateData, department: e.target.value })}
                                defaultValue={updateData?.deviceId?.length > 0 ? deviceData?.Department_Name : ''}
                                type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400  :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Department Name" required />
                        </div>
                        <div>
                            <label htmlFor="doctorname" className="block mb-2 text-sm font-medium text-gray-900 ">Doctor Name</label>
                            <input list='doctorname' onChange={(e) =>
                                setUpdateData({ ...updateData, doctorName: e.target.value })}
                                defaultValue={updateData?.deviceId?.length > 0 ? deviceData?.Doctor_Name : ""} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400  :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Doctor Name" required />
                        </div>
                        <div>
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 ">Ward Number</label>
                            <input list='wardnumber' onChange={(e) =>
                                setUpdateData({ ...updateData, wardNumber: e.target.value })}
                                defaultValue={updateData?.deviceId?.length > 0 ? deviceData?.Ward_No : ''} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400  :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Ward Number" required />
                        </div>
                        <div>
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 ">IMEI Number</label>
                            <input list='imei' onChange={(e) =>
                                setUpdateData({ ...updateData, imeiNo: e.target.value })}
                                defaultValue={updateData?.deviceId?.length > 0 ? deviceData?.IMEI_NO : ''} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400  :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter IMEI Number" required />
                        </div>
                        <div>
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 ">Bio-Med</label>
                            <input list='biomed' onChange={(e) =>
                                setUpdateData({ ...updateData, bioMed: e.target.value })}
                                defaultValue={updateData?.deviceId?.length > 0 ? deviceData?.Bio_Med : ""} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400  :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Bio Med" required />
                        </div>
                        <div>
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 ">Status</label>
                            <input list='status' onChange={(e) =>
                                setUpdateData({ ...updateData, status: e.target.value })}
                                defaultValue={updateData?.deviceId?.length > 0 ? deviceData?.message : ''} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400  :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Status" required />
                            <datalist id='status'>
                                <option >ACTIVE</option>
                                <option >INACTIVE</option>
                            </datalist>
                        </div>
                        <div>
                            <label htmlFor="purpose" className="block mb-2 text-sm font-medium text-gray-900 ">Purpose</label>
                            <input list='purpose' onChange={(e) =>
                                setUpdateData({ ...updateData, purpose: e.target.value })}
                                defaultValue={updateData?.deviceId?.length > 0 ? deviceData?.purpose : ''} type="text" id="purpose" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400  :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Purpose" required />
                            {/* <datalist id='purpose'>
                                <option>Demo</option>
                                <option>Sold</option>
                                <option>Return</option>
                            </datalist> */}
                        </div>
                    </div>
                </form>
                <div>
                    <button type="submit" onClick={handleSubmitData} style={{ backgroundColor: 'rgb(152, 0, 76)' }} className="text-white bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">Submit</button>
                </div>
            </div>
        </div>
    )
}
export default AllDataInOneMarketing