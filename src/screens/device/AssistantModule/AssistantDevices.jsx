import React, { useEffect, useState } from 'react'

/* eslint-disable */
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Style from "../../../css/DevicePage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { deviceAction } from '../../../store/action/DeviceAction';

function AssistantDevices() {
    const deviceReducer = useSelector((state) => state.deviceReducer);
    const { loading, data, error } = deviceReducer;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log('data', data)
    const deviceData = data?.data?.data
    useEffect(() => {
        dispatch(deviceAction());
    }, []);
    let projectName = 'AgVa Pro';
    let code = '001';
    const [searchData, setSearchData] = useState('')
    const limit = 10;
    const handleSearch = (e) => {
        setSearchData(e.target.value ? e.target.value : '')
        const searchData = e.target.value;
        let pageN = searchData.length > 0 ? page = 1 : page = '';
        var page = pageN;
        if (e.keyCode === 13) {
            return dispatch(
                deviceAction(page, limit, searchData)
            );
        }
    }

    return (
        <>
            <Row className="rowSection">
                <Col
                    xl={10}
                    lg={10}
                    md={10}
                    sm={10}
                    className={Style.NavbarColumn}
                    style={{ width: "100%" }}
                >
                    <div
                        className=""
                        style={{
                            position: "relative",
                            top: "4.5rem",
                            marginLeft: "1rem",
                            width: "98%",
                        }}
                    >
                        {/* Heading Section */}
                        <div
                            className="topHeading"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                marginTop: "40px",
                                marginBottom:'10px'
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    textAlign: "center",
                                }}
                            >
                                <div
                                    className="deviceSummary"
                                    style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                                >
                                    <Link to="/assiatant_dashboard">
                                        <IoIosArrowDropleftCircle color="rgb(152, 0, 76)" size={40} />
                                    </Link>
                                    <h4 className={Style.Header}>Assistant Devices</h4>
                                </div>
                            </div>
                        </div>
                        <div className={Style.Container}>
                            {/* Events  */}
                            <Row className="mt-0">
                                <Col>
                                    <div className={Style.tableCard} borderRadius="20px">
                                        <>
                                            <section className={Style.OuterTable}>
                                                {/* TABLE HERE */}
                                                <div id="div1" className={Style.Container}>
                                                    {/* Events  */}
                                                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg" style={{ borderRadius: '1.5rem' }}>
                                                        <table className="w-full text-sm text-left text-gray-500 ">
                                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                                                <tr>
                                                                    <th scope="col" className="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                                                                        Device Id
                                                                    </th>
                                                                    <th scope="col" className="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                                                                        Status
                                                                    </th>
                                                                    <th scope="col" className="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                                                                        Serial Number
                                                                    </th>
                                                                    <th scope="col" className="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                                                                        Hospital Name
                                                                    </th>
                                                                    <th scope="col" className="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                                                                        Doctor
                                                                    </th>
                                                                    <th scope="col" className="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                                                                        Action
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {deviceData?.length > 0 ?
                                                                    deviceData && deviceData.map((item) => {
                                                                        return (
                                                                            <tr className="bg-white border-b hover:bg-gray-50">
                                                                                <td className="px-6 py-4 text-center font-semibold text-gray-900">
                                                                                    {item.deviceId}
                                                                                </td>
                                                                                <td className="px-6 py-4 text-center " style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                                                                    {item.message==="ACTIVE" ? (
                                                                                            <div style={{ backgroundColor: 'green', borderRadius: '100px', width: '15px', height: '15px' }}></div>
                                                                                    ) : item.message==="INACTIVE" ? (
                                                                                        <div style={{ backgroundColor: '#FFCB2E', borderRadius: '100px', width: '15px', height: '15px' }}></div>
                                                                                    ) : (
                                                                                        "--"
                                                                                    )}
                                                                                </td>
                                                                                <td className="px-6 py-4 text-center ">
                                                                                    {item?.serialNumber ? item?.serialNumber : '--'}
                                                                                </td>
                                                                                <td className="px-6 py-4 text-center ">
                                                                                    {item?.deviceInfo?.length > 0
                                                                                        ? item &&
                                                                                        item.deviceInfo[0] &&
                                                                                        item.deviceInfo[0].Hospital_Name
                                                                                        : "--"}
                                                                                </td>
                                                                                <td className="px-6 py-4 text-center ">
                                                                                    {item?.doctor ? item?.doctor : '--'}
                                                                                </td>
                                                                                <td className="px-6 py-4 text-center ">
                                                                                    <button
                                                                                        onClick={() =>
                                                                                            navigate(
                                                                                                `/deviceOverview?code=${code}&projectName=${projectName}&DeviceId=${item.deviceId}`
                                                                                            )
                                                                                        }
                                                                                        style={{ backgroundColor: 'rgb(152, 0, 76)', color: 'white', padding: '10px', borderRadius: '8px' }}>More</button>
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    }) : <div
                                                                        style={{
                                                                            
                                                                            backgroundColor: "white",
                                                                            width: "100%",
                                                                            borderRadius: "20px",
                                                                            background: "#FFFFFF 0% 0% no-repeat padding-box",
                                                                        }}
                                                                    >
                                                                        {loading && (
                                                                            <span
                                                                                style={{ position: "fixed", top: "50%", right: "50%" }}
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
                                                                    </div>}
                                                            </tbody>

                                                        </table>
                                                    </div>
                                                </div>
                                            </section>
                                        </>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default AssistantDevices