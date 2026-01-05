// * eslint-disable */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Style from "../../css/DevicePage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllDevicesDataAgvaMiniAction,
    getRegisteredDetailsById,
    getRequestUserDataAction,
    getSingleDeviceIdDetails,
    newDeviceAction,
    trackHistorydataAction,
} from "../../store/action/DeviceAction";
import EditDetailsModal from "./model/EditDetailsModal";
import UpdateDetailsModal from "./model/UpdateDetailsModal";
import back from "../../assets/images/back.png";

export default function AgVaMiniDevices() {
    const [query, setQuery] = useState("");
    const [sendDataToEdit, setSendDataToEdit] = useState();
    const [deviceIDToEdit, setDeviceIdToEdit] = useState();
    const [searchData, setSearchData] = useState('')

    const [formData, setFormData] = useState({
        deviceId: '',
        state: '',
        city: '',
        ASM_RSM: '',
        hospitalName: '',
        purpose: '',
        serialNumber: '',
        date: ''
    });
    const getAllAgvaMiniReducer = useSelector((state) => state.getAllAgvaMiniReducer);
    const { loading, data, error } = getAllAgvaMiniReducer;
    const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
    const { adminInfo } = adminLoginReducer;
    const adminProfile = adminInfo && adminInfo.data && adminInfo.data.userType;

    const incPage = parseInt(data && data.currentPage);
    const totalPage = parseInt(data && data.totalPages);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 6;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records =
        data?.data?.slice(firstIndex, lastIndex);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [modalShow, setModalShow] = useState(false);
    const [modalShow1, setModalShow1] = useState(false);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get("projectCode");
    const pageCnt = urlParams.get("page");
    const projectName = urlParams.get("name");
    const [newPageCurrent, setNewPageCurrent] = useState(pageCnt ? pageCnt : 1)

    useEffect(() => {
        dispatch(getAllDevicesDataAgvaMiniAction());
        dispatch(getRegisteredDetailsById(code));
    }, []);

    const handleClickSearch = () => {
        if (query && query.length > 0) {
            dispatch(
                getAllDevicesDataAgvaMiniAction({ page: 1, limit: recordsPerPage, searchData: query })
            );
        } else {
        }
    };

    const handleSearch = (e) => {
        const searchData = e.target.value;
        if (e.keyCode === 13) {
            return dispatch(
                getAllDevicesDataAgvaMiniAction({ page: 1, limit: recordsPerPage, searchData })
            );
        }
    }

    // Handle input change
    const handleInputChange2 = (e) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload
        dispatch(trackHistorydataAction({
            deviceId: formData?.deviceId,
            state: formData?.state,
            city: formData?.city,
            ASM_RSM: formData?.ASM_RSM,
            hospitalName: formData?.hospitalName,
            purpose: formData?.purpose,
            serialNumber: formData?.serialNumber,
            startDate: formData?.date
        }))
    };

    const handelFilter = (e) => {
        dispatch(getAllDevicesDataAgvaMiniAction({ filter: e.target.value }))
    }

    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const handleOpenModal = () => setShowModal(true);
    const [formData2, setFormData2] = useState({
        deviceId: "",
        purpose: "",
        serialNumber: "",
        state: "",
        hospitalName: "",
        city: "",
        ASM_RSM: "",
    });
    // Open Modal and Prefill Data
    const handleOpenModal2 = (item) => {
        setFormData2({
            deviceId: item?.deviceId,
            purpose: item?.purpose || "",
            serialNumber: item?.serialNumber || "",
            state: item?.state || "",
            hospitalName: item?.hospitalName || "",
            city: item?.city || "",
            ASM_RSM: item?.ASM_RSM || "",
        });
        setShowModal2(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Close Modal 2
    const handleCloseModal2 = () => {
        setShowModal2(false);
    };

    // Handle Input Change
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData2((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    // Handle Submit
    const handleSubmit2 = (e) => {
        e.preventDefault();
        dispatch(trackHistorydataAction({
            deviceId: formData2?.deviceId,
            state: formData2?.state,
            city: formData2?.city,
            ASM_RSM: formData2?.ASM_RSM,
            hospitalName: formData2?.hospitalName,
            purpose: formData2?.purpose,
            serialNumber: formData2?.serialNumber,
            startDate: formData2?.date
        }))
        setTimeout(() => {
            setShowModal2(false);
        }, 1000);
    };

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
                    <div
                        className=""
                        style={{
                            position: "relative",
                            top: "1rem",
                            width: "100%",
                        }}
                    >
                        {/* Heading Section */}
                        {/* <div
                            className="topHeading"
                            style={{
                                display: "flex",
                                flexDirection: "column",
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
                                    <Link to="/adminDashboard">
                                        <img src={back} style={{ width: "3rem" }} />
                                    </Link>
                                    <h4 className={Style.Header}>Device Summary</h4>
                                </div>
                                <div>
                                    <h5 className={Style.heading}>Device: {projectName}</h5>
                                </div>
                            </div>
                        </div> */}
                        <div className={Style.Container}>
                            {/* Events  */}
                            <Row className="mt-0">
                                <Col>
                                    <div className={Style.tableCard} borderRadius="20px">
                                        <>
                                            <section className={Style.OuterTable}>
                                                <div className={Style.insideOuterTable}>
                                                    <div
                                                        className="search_section"
                                                        style={{ display: "flex", gap: "3rem" }}
                                                    >
                                                        <div
                                                            className="input_section"
                                                            style={{
                                                                display: "flex",
                                                                backgroundColor: "white",
                                                                borderRadius: "10px",
                                                                width: "90%",
                                                                alignItems: "center",
                                                            }}
                                                        >
                                                            <input
                                                                className="search_input"
                                                                type="text"
                                                                placeholder="Enter Device ID"
                                                                onChange={(e) => {
                                                                    if (e.target.value === '') {
                                                                        const limit = recordsPerPage;
                                                                        const page = 1;
                                                                        const searchData = '';
                                                                        dispatch(
                                                                            getAllDevicesDataAgvaMiniAction({ page, limit, searchData })
                                                                        );
                                                                    }
                                                                }}
                                                                onKeyUp={handleSearch}
                                                                style={{
                                                                    padding: "0.8rem",
                                                                    border: "0px",
                                                                    width: "100%",
                                                                }}
                                                            />
                                                            <button
                                                                className={Style.searchBtn}
                                                                onClick={handleClickSearch}
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={faMagnifyingGlass}
                                                                    style={{
                                                                        color: "#ffff",
                                                                        padding: "0px 8px",
                                                                    }}
                                                                />
                                                            </button>
                                                        </div>
                                                        <div>
                                                            <select onChange={handelFilter} style={{ padding: "0.8rem", width: '6rem', borderRadius: '8px' }}>
                                                                <option value="All">All</option>
                                                                <option value="Demo">Demo</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className={Style.deviceDataText}>
                                                        <div>
                                                            <span className={Style.deviceTextData}>
                                                                Device ID
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <span className={Style.deviceTextData}>
                                                                Status
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <span className={Style.deviceTextData}>
                                                                Serial Number
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <span className={Style.deviceTextData}>
                                                                Last Active
                                                            </span>
                                                        </div>
                                                        {projectName==='Agva Pro ATP' ? <div>
                                                            <span className={Style.deviceTextData}>
                                                                State
                                                            </span>
                                                        </div> :
                                                            <div>
                                                                <span className={Style.deviceTextData}>
                                                                    Alias Name
                                                                </span>
                                                            </div>}
                                                        {projectName==='Agva Pro ATP' ? <div>
                                                            <span className={Style.deviceTextData}>
                                                                City
                                                            </span>
                                                        </div> :
                                                            <div>
                                                                <span className={Style.deviceTextData}>
                                                                    Department
                                                                </span>
                                                            </div>}

                                                        <div>
                                                            <span className={Style.deviceTextData}>
                                                                Hospital Name
                                                            </span>
                                                        </div>
                                                        {projectName==='Agva Pro ATP' ? <div>
                                                            <span className={Style.deviceTextData}>
                                                                Start Date
                                                            </span>
                                                        </div> :
                                                            <div>
                                                                <span className={Style.deviceTextData}>
                                                                    Ward No.
                                                                </span>
                                                            </div>}
                                                        {projectName==='Agva Pro ATP' ? <div>
                                                            <span className={Style.deviceTextData}>
                                                                ASM/RSM
                                                            </span>
                                                        </div> :
                                                            <div>
                                                                <span className={Style.deviceTextData}>
                                                                    Doctor
                                                                </span>
                                                            </div>}
                                                        {projectName==='Agva Pro ATP' ? ""
                                                            :
                                                            <div>
                                                                <span className={Style.deviceTextData}>
                                                                    Bio-Med
                                                                </span>
                                                            </div>}
                                                        <div>
                                                            <span className={Style.deviceTextData}>
                                                                Actions
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* TABLE HERE */}
                                                {records && records.length > 0 ?
                                                    <section className={Style.alertTable}>
                                                        <div>
                                                            {records &&
                                                                records
                                                                    .filter(
                                                                        (item1, index) =>
                                                                            records.findIndex(
                                                                                (obj) => obj.deviceId === item1.deviceId
                                                                            ) === index
                                                                    )
                                                                    .map((item, _id) => {
                                                                        const givenDate = new Date(item?.lastActive); // Parse the given date-time
                                                                        const currentDate = new Date(); // Get the current date-time

                                                                        // Calculate the difference in milliseconds
                                                                        const differenceInMilliseconds = currentDate - givenDate;

                                                                        // Convert to hours
                                                                        const totalHours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));

                                                                        // Check the condition and print accordingly

                                                                        // Log the hours and minutes (for reference)
                                                                        const remainingMinutes = Math.floor(
                                                                            (differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
                                                                        );

                                                                        // return totalHours.toFixed(2);
                                                                        return (
                                                                            <React.Fragment key={_id}>
                                                                                <section className={Style.tableBody}>
                                                                                    <section
                                                                                        className={Style.insideTextData}
                                                                                    >
                                                                                        {item.deviceId}
                                                                                    </section>
                                                                                    <section
                                                                                        className={Style.insideTextData}
                                                                                    >
                                                                                        {
                                                                                            item.message==="ACTIVE" ? (
                                                                                                <>
                                                                                                    <svg
                                                                                                        width="40px"
                                                                                                        height="35px"
                                                                                                        viewBox="0 0 24 24"
                                                                                                        fill="none"
                                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                                        stroke="#11ac14"
                                                                                                    >
                                                                                                        <g id="SVGRepo_iconCarrier">
                                                                                                            <path
                                                                                                                d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z"
                                                                                                                fill="#11ac14"
                                                                                                            ></path>
                                                                                                        </g>
                                                                                                    </svg>
                                                                                                </>
                                                                                            ) : totalHours >= 36 ?
                                                                                                <svg
                                                                                                    width="40px"
                                                                                                    height="40px"
                                                                                                    viewBox="0 0 24 24"
                                                                                                    fill="none"
                                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                                    stroke="red"
                                                                                                >
                                                                                                    <g
                                                                                                        id="SVGRepo_bgCarrier"
                                                                                                        stroke-width="0"
                                                                                                    ></g>
                                                                                                    <g
                                                                                                        id="SVGRepo_tracerCarrier"
                                                                                                        stroke-linecap="round"
                                                                                                        stroke-linejoin="round"
                                                                                                    ></g>
                                                                                                    <g id="SVGRepo_iconCarrier">
                                                                                                        {" "}
                                                                                                        <path
                                                                                                            d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z"
                                                                                                            fill="red"
                                                                                                        ></path>{" "}
                                                                                                    </g>
                                                                                                </svg>
                                                                                                :
                                                                                                item.message==="INACTIVE" ? (
                                                                                                    <>
                                                                                                        <svg
                                                                                                            width="40px"
                                                                                                            height="40px"
                                                                                                            viewBox="0 0 24 24"
                                                                                                            fill="none"
                                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                                            stroke="#ffbf00"
                                                                                                        >
                                                                                                            <g
                                                                                                                id="SVGRepo_bgCarrier"
                                                                                                                stroke-width="0"
                                                                                                            ></g>
                                                                                                            <g
                                                                                                                id="SVGRepo_tracerCarrier"
                                                                                                                stroke-linecap="round"
                                                                                                                stroke-linejoin="round"
                                                                                                            ></g>
                                                                                                            <g id="SVGRepo_iconCarrier">
                                                                                                                {" "}
                                                                                                                <path
                                                                                                                    d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z"
                                                                                                                    fill="#ffbf00"
                                                                                                                ></path>{" "}
                                                                                                            </g>
                                                                                                        </svg>
                                                                                                    </>
                                                                                                ) :
                                                                                                    (
                                                                                                        ""
                                                                                                    )}
                                                                                    </section>
                                                                                    <section className={Style.insideTextData}>
                                                                                        {item?.trackSalesData?.serialNumber ? item?.trackSalesData?.serialNumber : '---'}
                                                                                    </section>
                                                                                    <section className={Style.insideTextData}>
                                                                                        {item.message==="ACTIVE" ? '---' :
                                                                                            item?.lastActive ? item?.lastActive.split(' ')[0] : '---'}
                                                                                    </section>
                                                                                    <section
                                                                                        className={Style.insideTextData}
                                                                                    >
                                                                                        {projectName==='Agva Pro ATP' ? (item?.trackSalesData?.state ? item?.trackSalesData?.state : '---') :
                                                                                            item &&
                                                                                                item.deviceInfo &&
                                                                                                item.deviceInfo[0] &&
                                                                                                item.deviceInfo[0].Alias_Name
                                                                                                    .length > 0
                                                                                                ? item &&
                                                                                                item.deviceInfo[0] &&
                                                                                                item.deviceInfo[0].Alias_Name
                                                                                                :
                                                                                                "--"}
                                                                                    </section>
                                                                                    <section
                                                                                        className={Style.insideTextData}
                                                                                    >
                                                                                        {projectName==='Agva Pro ATP' ? (item?.trackSalesData?.city ? item?.trackSalesData?.city : '---') :
                                                                                            item &&
                                                                                                item.deviceInfo &&
                                                                                                item.deviceInfo.length > 0
                                                                                                ? item &&
                                                                                                item.deviceInfo[0] &&
                                                                                                item.deviceInfo[0]
                                                                                                    .Department_Name
                                                                                                : "--"}
                                                                                    </section>
                                                                                    {/*  */}
                                                                                    <section
                                                                                        className={Style.insideTextData}
                                                                                    >
                                                                                        {projectName==='Agva Pro ATP' ? (item?.trackSalesData?.hospitalName ? item?.trackSalesData?.hospitalName : '---') :
                                                                                            item &&
                                                                                                item.deviceInfo &&
                                                                                                item.deviceInfo.length > 0
                                                                                                ? item &&
                                                                                                item.deviceInfo[0] &&
                                                                                                item.deviceInfo[0].Hospital_Name
                                                                                                : "--"}
                                                                                    </section>
                                                                                    <section
                                                                                        className={Style.insideTextData}
                                                                                    >
                                                                                        {projectName==='Agva Pro ATP' ? (item?.trackSalesData?.startDate ? item?.trackSalesData?.startDate : '---') :
                                                                                            item &&
                                                                                                item.deviceInfo &&
                                                                                                item.deviceInfo.length > 0
                                                                                                ? item &&
                                                                                                item.deviceInfo[0] &&
                                                                                                item.deviceInfo[0].Ward_No
                                                                                                : "--"}
                                                                                    </section>
                                                                                    <section
                                                                                        className={Style.insideTextData}
                                                                                    >
                                                                                        {projectName==='Agva Pro ATP' ? (item?.trackSalesData?.ASM_RSM ? item?.trackSalesData?.ASM_RSM : '---') :
                                                                                            item &&
                                                                                                item.deviceInfo &&
                                                                                                item.deviceInfo.length > 0
                                                                                                ? item &&
                                                                                                item.deviceInfo[0] &&
                                                                                                item.deviceInfo[0].Doctor_Name
                                                                                                : "--"}
                                                                                    </section>
                                                                                    {projectName==='Agva Pro ATP' ? '' :
                                                                                        <section
                                                                                            className={Style.insideTextData}
                                                                                        >
                                                                                            {item &&
                                                                                                item.deviceInfo &&
                                                                                                item.deviceInfo.length > 0
                                                                                                ? item &&
                                                                                                item.deviceInfo[0] &&
                                                                                                item.deviceInfo[0].Bio_Med
                                                                                                : "--"}
                                                                                        </section>
                                                                                    }
                                                                                    <section className={Style.insideTextData}>
                                                                                        <select
                                                                                            style={{
                                                                                                width: "6rem",
                                                                                                backgroundColor: "rgb(152, 0, 76)",
                                                                                                padding: '8px',
                                                                                                color: 'white',
                                                                                                borderRadius: '8px'
                                                                                            }}
                                                                                            onChange={(e) => {
                                                                                                const selectedValue = e.target.value;
                                                                                                if (selectedValue === "register") {
                                                                                                    handleOpenModal();
                                                                                                    setFormData({ ...formData, deviceId: item.deviceId });
                                                                                                } else if (selectedValue === "more") {
                                                                                                    navigate(`/deviceOverview?projectCode=${code}&projectName=${projectName}&DeviceId=${item.deviceId}`);
                                                                                                } else if (selectedValue === "edit") {
                                                                                                    handleOpenModal2(item?.trackSalesData);
                                                                                                }
                                                                                            }}
                                                                                        >
                                                                                            <option disabled selected>Select</option>

                                                                                            {!item?.trackSalesData?.serialNumber ? (
                                                                                                <option value="register">Register</option>
                                                                                            ) : (
                                                                                                <>
                                                                                                    <option value="more">More</option>
                                                                                                    <option value="edit">Edit</option>
                                                                                                </>
                                                                                            )}
                                                                                        </select>
                                                                                    </section>

                                                                                </section>
                                                                            </React.Fragment>
                                                                        );
                                                                    })}
                                                        </div>
                                                    </section> :
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
                                            </section>
                                            {showModal && (
                                                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                                                    <div className="bg-white rounded-lg w-96 shadow-lg">
                                                        {/* Modal Header */}
                                                        <div className="flex justify-between items-center px-4 py-2 border-b">
                                                            <h2 className="text-lg font-semibold">Add History</h2>
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
                                                                <label htmlFor="purpose" className="block text-sm font-medium">
                                                                    Purpose
                                                                </label>
                                                                <select className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                                    required id="purpose" value={formData.purpose}
                                                                    onChange={handleInputChange2}>
                                                                    <option>Select purpose</option>
                                                                    <option value="Demo">Demo</option>
                                                                    <option value="Sold">Sold</option>
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <label htmlFor="serialNumber" className="block text-sm font-medium">
                                                                    Serial Number
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    id="serialNumber"
                                                                    value={formData.serialNumber}
                                                                    onChange={handleInputChange2}
                                                                    className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                                    required
                                                                />
                                                            </div>
                                                            <div>
                                                                <label htmlFor="state" className="block text-sm font-medium">
                                                                    State
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    id="state"
                                                                    value={formData.state}
                                                                    onChange={handleInputChange2}
                                                                    className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                                    required
                                                                />
                                                            </div>

                                                            <div>
                                                                <label htmlFor="hospitalName" className="block text-sm font-medium">
                                                                    Hospital Name
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    id="hospitalName"
                                                                    value={formData.hospitalName}
                                                                    onChange={handleInputChange2}
                                                                    className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                                    required
                                                                />
                                                            </div>
                                                            <div>
                                                                <label htmlFor="city" className="block text-sm font-medium">
                                                                    City Name
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    id="city"
                                                                    value={formData.city}
                                                                    onChange={handleInputChange2}
                                                                    className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                                    required
                                                                />
                                                            </div>

                                                            <div>
                                                                <label htmlFor="ASM_RSM" className="block text-sm font-medium">
                                                                    ASM / RSM
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    id="ASM_RSM"
                                                                    value={formData.ASM_RSM}
                                                                    onChange={handleInputChange2}
                                                                    className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                                    required
                                                                />
                                                            </div>
                                                            <div>
                                                                <label htmlFor="date" className="block text-sm font-medium">
                                                                    Start Date
                                                                </label>
                                                                <input
                                                                    type="date"
                                                                    id="date"
                                                                    value={formData.date}
                                                                    onChange={handleInputChange2}
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

                                            {showModal2 && (
                                                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                                                    <div className="bg-white rounded-lg w-96 shadow-lg">
                                                        {/* Modal Header */}
                                                        <div className="flex justify-between items-center px-4 py-2 border-b">
                                                            <h2 className="text-lg font-semibold">Edit Device</h2>
                                                            <button
                                                                onClick={handleCloseModal2}
                                                                className="text-gray-600 hover:text-gray-900"
                                                            >
                                                                &times;
                                                            </button>
                                                        </div>

                                                        {/* Modal Form */}
                                                        <form className="p-4 space-y-4" onSubmit={handleSubmit2}>
                                                            <div>
                                                                <label htmlFor="purpose" className="block text-sm font-medium">
                                                                    Purpose
                                                                </label>
                                                                <select
                                                                    id="purpose"
                                                                    value={formData2.purpose}
                                                                    onChange={handleInputChange}
                                                                    className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                                >
                                                                    <option>Select purpose</option>
                                                                    <option value="Demo">Demo</option>
                                                                    <option value="Sold">Sold</option>
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <label
                                                                    htmlFor="serialNumber"
                                                                    className="block text-sm font-medium"
                                                                >
                                                                    Serial Number
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    id="serialNumber"
                                                                    value={formData2.serialNumber}
                                                                    onChange={handleInputChange}
                                                                    className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                                    readOnly
                                                                />
                                                            </div>

                                                            <div>
                                                                <label htmlFor="state" className="block text-sm font-medium">
                                                                    State
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    id="state"
                                                                    value={formData2.state}
                                                                    onChange={handleInputChange}
                                                                    className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                                    required
                                                                />
                                                            </div>

                                                            <div>
                                                                <label
                                                                    htmlFor="hospitalName"
                                                                    className="block text-sm font-medium"
                                                                >
                                                                    Hospital Name
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    id="hospitalName"
                                                                    value={formData2.hospitalName}
                                                                    onChange={handleInputChange}
                                                                    className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                                    required
                                                                />
                                                            </div>
                                                            <div>
                                                                <label htmlFor="city" className="block text-sm font-medium">
                                                                    City Name
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    id="city"
                                                                    value={formData2.city}
                                                                    onChange={handleInputChange}
                                                                    className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                                    required
                                                                />
                                                            </div>

                                                            <div>
                                                                <label htmlFor="ASM_RSM" className="block text-sm font-medium">
                                                                    ASM / RSM
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    id="ASM_RSM"
                                                                    value={formData2.ASM_RSM}
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

                                            <UpdateDetailsModal
                                                show={modalShow1}
                                                onHide={() => setModalShow1(false)}
                                                {...sendDataToEdit}
                                                devicdId={deviceIDToEdit}
                                            />
                                            <EditDetailsModal
                                                show={modalShow}
                                                projectName={projectName}
                                                onHide={() => setModalShow(false)}
                                                {...sendDataToEdit}
                                                item={JSON.parse(localStorage.getItem("DeviceId"))}
                                            />
                                        </>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>
            <div
                className="left_arrow"
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    margin: "4rem 4rem 0rem 0rem",
                }}
            >
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-end" style={{ display: "flex", alignItems: 'center' }}>
                        {incPage > 1 ?
                            <button onClick={prePage} style={{ border: "0px", backgroundColor: "white" }}>
                                <img src={back} style={{ width: "3rem" }} />
                            </button>
                            : " "}
                        {incPage !== totalPage ?
                            <button onClick={nextPage} style={{ border: "0px", backgroundColor: "white" }}>
                                <img src={back} style={{ width: "3rem", transform: "rotate(180deg)" }} />
                            </button>
                            : " "}
                    </ul>
                </nav>
            </div>
        </div>
    );
    function prePage() {
        const page = incPage - 1;
        const limit = recordsPerPage;
        setNewPageCurrent(page)
        dispatch(getAllDevicesDataAgvaMiniAction({ page:incPage - 1, limit, searchData }));
    }
    function nextPage() {
        const page = incPage + 1
        console.log('page', page)
        const limit = recordsPerPage;
        setNewPageCurrent(page)
        dispatch(getAllDevicesDataAgvaMiniAction({ page:incPage + 1, limit, searchData }));
    }

}