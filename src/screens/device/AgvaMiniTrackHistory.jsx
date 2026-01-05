import React, { useEffect, useState } from 'react'
import Style from "../../css//ProductionDataModul.module.css";
import { Row, Col } from "react-bootstrap";
import back from "../../assets/images/back.png";
import { useDispatch, useSelector } from "react-redux";
import { getSingleDataAgvaMiniAction, putDemoEndDateAction, trackHistorydataAction } from '../../store/action/DeviceAction';

function AgvaMiniTrackHistory() {
    const [openModel, setOpenModel] = useState(false);
    const [endData, setEndData] = useState({
        endDate: '',
        remark: '',
        deviceId: ''
    })
    const [userId, setUserId] = useState('')

    console.log('endData', endData)
    const getSingleDeviceAgvaMiniReducer = useSelector((state) => state.getSingleDeviceAgvaMiniReducer);
    const { loading, data, error } = getSingleDeviceAgvaMiniReducer;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const deviceId = urlParams.get("DeviceId");

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSingleDataAgvaMiniAction(deviceId))
    }, [])

    const goBack = () => {
        window.history.go(-1);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setEndData((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    }
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload
        if (!endData?.endDate) {
            alert('Enter end date')
        }
        else if (!endData?.remark) {
            alert('Enter remark')
        }
        else {
            dispatch(putDemoEndDateAction({
                endDate: endData?.endDate,
                remarks: endData?.remark,
                _id: userId,
                deviceId: endData?.deviceId
            }))
        }
    }
    const handleCloseModal = () => {
        setOpenModel(false)
    }
    return (
        <div>
            <Row className="rowSection">
                <Col
                    xl={10}
                    lg={10}
                    md={10}
                    sm={10}
                    className={Style.NavbarColumn}
                    style={{ width: "100%" }}
                >
                    <div className={Style.mainDiv}>
                        {/* Heading Section */}
                        <div className={Style.topHeading}>
                            <div className={Style.deviceSummary}>
                                <button onClick={goBack}>
                                    <img src={back} loading="lazy" className={Style.backImage} />
                                </button>
                                <h1 className="text-2xl font-extrabold">
                                    Track
                                    <small className="ml-2 font-semibold text-gray-500 dark:text-gray-400">
                                        History
                                    </small>
                                </h1>
                            </div>
                        </div>
                        {/* Events  */}
                        <div
                            className="relative overflow-x-auto shadow-md sm:rounded-lg"
                            style={{ borderRadius: "1.5rem" }}
                        >
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <td
                                            scope="col"
                                            className="px-6 py-3 text-left text-white font-semibold"
                                            style={{
                                                backgroundColor: "rgb(152, 0, 76)",
                                                fontSize: "0.8rem",
                                            }}
                                        >
                                            Device ID
                                        </td>
                                        <td
                                            scope="col"
                                            className="px-6 py-3 text-left text-white font-semibold"
                                            style={{
                                                backgroundColor: "rgb(152, 0, 76)",
                                                fontSize: "0.8rem",
                                            }}
                                        >
                                            Serial Number
                                        </td>
                                        <td
                                            scope="col"
                                            className="px-6 py-3 text-left text-white font-semibold"
                                            style={{
                                                backgroundColor: "rgb(152, 0, 76)",
                                                fontSize: "0.8rem",
                                            }}
                                        >
                                            State
                                        </td>
                                        <td
                                            scope="col"
                                            className="px-6 py-3 text-left text-white font-semibold"
                                            style={{
                                                backgroundColor: "rgb(152, 0, 76)",
                                                fontSize: "0.8rem",
                                            }}
                                        >
                                            City
                                        </td>
                                        <td
                                            scope="col"
                                            className="px-6 py-3 text-left text-white font-semibold"
                                            style={{
                                                backgroundColor: "rgb(152, 0, 76)",
                                                fontSize: "0.8rem",
                                            }}
                                        >
                                            Hospital Name
                                        </td>
                                        <td
                                            scope="col"
                                            className="px-6 py-3 text-left text-white font-semibold"
                                            style={{
                                                backgroundColor: "rgb(152, 0, 76)",
                                                fontSize: "0.8rem",
                                            }}
                                        >
                                            Purpose
                                        </td>
                                        <td
                                            scope="col"
                                            className="px-6 py-3 text-left text-white font-semibold"
                                            style={{
                                                backgroundColor: "rgb(152, 0, 76)",
                                                fontSize: "0.8rem",
                                            }}
                                        >
                                            ASM/RSM
                                        </td>
                                        <td
                                            scope="col"
                                            className="px-6 py-3 text-left text-white font-semibold"
                                            style={{
                                                backgroundColor: "rgb(152, 0, 76)",
                                                fontSize: "0.8rem",
                                            }}
                                        >
                                            Start Date
                                        </td>
                                        <td
                                            scope="col"
                                            className="px-6 py-3 text-left text-white font-semibold"
                                            style={{
                                                backgroundColor: "rgb(152, 0, 76)",
                                                fontSize: "0.8rem",
                                            }}
                                        >
                                            End Date
                                        </td>
                                        <td
                                            scope="col"
                                            className="px-6 py-3 text-left text-white font-semibold"
                                            style={{
                                                backgroundColor: "rgb(152, 0, 76)",
                                                fontSize: "0.8rem",
                                            }}
                                        >
                                            Total Days
                                        </td>
                                        <td
                                            scope="col"
                                            className="px-6 py-3 text-left text-white font-semibold"
                                            style={{
                                                backgroundColor: "rgb(152, 0, 76)",
                                                fontSize: "0.8rem",
                                            }}
                                        >
                                            Action
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.data?.length > 0 ?
                                        data?.data?.map((item1, index) => {
                                            const startDate = new Date(item1.startDate);
                                            const endDate = new Date(item1.endDate);
                                        
                                            // Calculate total days between startDate and endDate
                                            const totalDays = item1.startDate && item1.endDate
                                              ? Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
                                              : "NA";

                                            return (
                                                <tr className="bg-white border-b hover:bg-gray-50" key={index}>
                                                    <th className="px-6 py-4 text-left">
                                                        {item1.deviceId}
                                                    </th>
                                                    <td className="px-6 py-4 text-left">
                                                        {item1.serialNumber ? item1.serialNumber : "NA"}
                                                    </td>
                                                    <td className="px-6 py-4 text-left">
                                                        {item1.state ? item1.state : "NA"}
                                                    </td>
                                                    <td className="px-6 py-4 text-left">
                                                        {item1.city ? item1.city : "NA"}
                                                    </td>
                                                    <td className="px-6 py-4 text-left">
                                                        {item1.hospitalName ? item1.hospitalName : "NA"}
                                                    </td>
                                                    <td className="px-6 py-4 text-left">
                                                        {item1.purpose ? item1.purpose : "NA"}
                                                    </td>
                                                    <td className="px-6 py-4 text-left">
                                                        {item1.ASM_RSM ? item1.ASM_RSM : "NA"}
                                                    </td>
                                                    <td className="px-6 py-4 text-left">
                                                        {item1.startDate ? item1.startDate : "NA"}
                                                    </td>
                                                    <td className="px-6 py-4 text-left">
                                                        {item1.endDate ? item1.endDate : "NA"}
                                                    </td>
                                                    <td className="px-6 py-4 text-left">
                                                        {totalDays} day
                                                    </td>
                                                    <td className="px-6 py-4 text-left">
                                                        <button
                                                            style={{
                                                                width: "6rem",
                                                                backgroundColor: "rgb(152, 0, 76)",
                                                                padding: '8px',
                                                                color: 'white',
                                                                borderRadius: '8px',
                                                            }}
                                                            onClick={() => {
                                                                setOpenModel(true);
                                                                setEndData({ ...endData, deviceId: item1?.deviceId });
                                                                setUserId(item1?._id);
                                                            }}
                                                        >
                                                            End Demo
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        }) :
                                        <div
                                            style={{
                                                height: "500px",
                                                backgroundColor: "white",
                                                width: "100%",
                                                borderRadius: "20px",
                                                background: "#FFFFFF 0% 0% no-repeat padding-box",
                                            }}
                                        >
                                            {loading && (
                                                <span
                                                    style={{ position: "absolute", top: "50%", right: "50%" }}
                                                >
                                                    {" "}
                                                    <div role="status">
                                                        <svg
                                                            aria-hidden="true"
                                                            className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                                            viewBox="0 0 100 101"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                                fill="currentColor"
                                                            />
                                                            <path
                                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                                fill="currentFill"
                                                            />
                                                        </svg>
                                                    </div>
                                                </span>
                                            )}
                                            {error && (
                                                <div
                                                    style={{
                                                        width: "100%",
                                                        position: 'absolute',
                                                        top: '50%',
                                                        textAlign: 'center'
                                                    }}
                                                >
                                                    <h6>{error}</h6>
                                                </div>
                                            )}
                                        </div>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Col>
            </Row>

            {openModel && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-96 shadow-lg">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center px-4 py-2 border-b">
                            <h2 className="text-lg font-semibold">End Demo</h2>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-600 hover:text-gray-900"
                            >
                                &times;
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form className="p-4 space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="endDate" className="block text-sm font-medium">
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    id="endDate"
                                    value={endData.endDate}
                                    onChange={handleInputChange}
                                    className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="remark" className="block text-sm font-medium">
                                    Remark
                                </label>
                                <input
                                    type="text"
                                    id="remark"
                                    value={endData.remark}
                                    onChange={handleInputChange}
                                    className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}


        </div>
    )
}

export default AgvaMiniTrackHistory