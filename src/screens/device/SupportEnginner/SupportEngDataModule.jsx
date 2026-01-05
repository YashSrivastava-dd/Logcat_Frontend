import { Link, useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Style from "../../../css/Support.module.css";
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'flowbite-react';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import back from "../../../assets/images/back.png";
import { useDispatch, useSelector } from 'react-redux';
import { changeTicketStatusAction, getAllTicketsDataAction, getServicesDataAction, postReAssignList } from '../../../store/action/ServiceEngAction';
import { getStoreSystem } from '../../../store/action/StoreSystem';
import { Toaster, toast } from 'react-hot-toast';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoMdAdd } from "react-icons/io";

function SupportEngDatamODULE() {
    const [openModal, setOpenModal] = useState();
    const [assignDetails, setAssignDetails] = useState()
    const [query, setQuery] = useState("");
    const [checkboxEmail, setCheckBoxEmail] = useState({ service_engineer: '', id: '' })
    const props = { openModal, setOpenModal };


    // Service Data
    const getAllServicesDataReducer = useSelector((state) => state.getAllServicesDataReducer);
    const { data, loading, error } = getAllServicesDataReducer;
    const getAllTicket = data && data.data;

    const dispatch = useDispatch();
    const history = useNavigate();
    useEffect(() => {
        let filter = "All"
        let search = ""
        dispatch(getServicesDataAction(search, filter))
    }, [])


    const getTicketDetailsByNumberReducer = useSelector((state) => state.getTicketDetailsByNumberReducer);
    const { data: ticketData } = getTicketDetailsByNumberReducer;

    const incPage = parseInt(data && data.currentPage)
    const totalPage = parseInt(data && data.totalPages)
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 50;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = getAllTicket && getAllTicket.slice(firstIndex, lastIndex);

    useEffect(() => {
        dispatch(getStoreSystem())
    }, [dispatch])

    const storeSystemReducer = useSelector((state) => state.storeSystemReducer);
    const { data: serviceEngData } = storeSystemReducer;
    const serviceEngDataa = serviceEngData && serviceEngData.data;

    const assignBtn = (e) => {
        e.preventDefault()
        if (checkboxEmail && checkboxEmail.service_engineer === '') {
            toast.error("Select Email");
        } else {
            const service_engineer = checkboxEmail.service_engineer;
            const ticket_number = checkboxEmail.id;
            dispatch(postReAssignList(service_engineer, ticket_number));
            toast.success("Success");
            props.setOpenModal(undefined)
            history('/Support_eng_dashboard')
        }
    };

    const handleClickSearch = (e) => {
        e.preventDefault();
        if (query && query.length > 0) {
            const searchData = query
            const filter = ''
            dispatch(getServicesDataAction(filter, searchData))
        }
        else {
            const searchData = query
            const filter = ''
            dispatch(getServicesDataAction(filter, searchData))
        }
    }
    const handleSearchChange = (e) => {
        const searchData = e.target.value;
        if (e.keyCode === 13) {
            const page = 1;
            const limit = recordsPerPage;
            return dispatch(
                getServicesDataAction(page, limit, searchData)
            );
        }
    }
    return (
        <>
            <Toaster />
            <Row className="rowSection">
                <Col
                    xl={10}
                    lg={10}
                    md={10}
                    sm={10}
                    className={Style.NavbarColumn}
                    style={{ width: "100%", height: '100vh' }}
                >
                    <div
                        className={Style.mainDiv}
                    >
                        {/* Heading Section */}
                        <div style={{ position: 'fixed', right: '3rem', bottom: '3rem', zIndex: '2' }}>
                            <button onClick={() => { history('/supportForm') }} style={{ backgroundColor: 'rgb(152, 0, 76)', color: 'white', padding: '20px', borderRadius: '50px' }}>
                                <Link
                                    to="/supportForm"
                                    style={{ textDecoration: "none", color: 'white', justifyContent: 'space-around', alignItems: 'center', display: 'flex' }}
                                >
                                    <IoMdAdd size={30} />
                                </Link>
                            </button>
                        </div>
                        {/* Events  */}
                        <>
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg" style={{ borderRadius: '1.5rem' }}>
                                <div style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                                    <form>
                                        <div className="relative" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                                            <div
                                                className="input_section"
                                                style={{
                                                    display: "flex",
                                                    backgroundColor: "white",
                                                    borderRadius: "10px",
                                                    width: "30%",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <input
                                                    onChange={(e) => {
                                                        const searchData = e.target.value;
                                                        if (searchData === '') {
                                                            const searchData = '';
                                                            dispatch(
                                                                getServicesDataAction(searchData)
                                                            );
                                                        }
                                                        else {
                                                            dispatch(
                                                                getServicesDataAction(searchData)
                                                            );
                                                        }
                                                    }}

                                                    onKeyUp={handleSearchChange}
                                                    type="search" id="default-search" className="block w-full p-3 pl-10 text-sm text-gray-900 border border-white rounded-lg bg-gray-10 focus:ring-blue-500 focus:border-blue-500 " placeholder='Search By:Ticket No.,email..' required />
                                                <button className={Style.searchBtn} onClick={handleClickSearch}>
                                                    <FontAwesomeIcon
                                                        icon={faMagnifyingGlass}
                                                        style={{
                                                            color: "#ffff",
                                                            padding: "0px 8px",
                                                        }}
                                                    />
                                                </button>
                                            </div>
                                            <select onChange={(e) => {
                                                const filter = e.target.value
                                                const searchData = ''
                                                dispatch(getServicesDataAction(searchData, filter))
                                            }} style={{ border: '0.1px solid black', borderRadius: '10px', margin: '1px', padding: '5px', width: '12rem' }}>
                                                <option value='All'><span>All Tickets</span></option>
                                                <option value='Open'><span>Open Tickets</span></option>
                                                <option value='Hold'>On Hold</option>
                                            </select>
                                        </div>
                                    </form>
                                </div>
                                <div className="relative overflow-x-auto">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="text-center text-white text-3xl font-medium" style={{ width: '6rem', backgroundColor: 'rgb(152, 0, 76)' }}>
                                                    Status
                                                </th>
                                                <th scope="col" className="text-center text-white text-3xl font-medium" style={{ width: '8rem', backgroundColor: 'rgb(152, 0, 76)' }}>
                                                    Ticket Id
                                                </th>
                                                <th scope="col" className="text-center text-white text-3xl font-medium" style={{ width: '20rem', backgroundColor: 'rgb(152, 0, 76)' }}>
                                                    Hospital Name
                                                </th>
                                                <th scope="col" className="text-center text-white text-3xl font-medium" style={{ width: '10rem', backgroundColor: 'rgb(152, 0, 76)' }}>
                                                    Engineer Name
                                                </th>
                                                <th scope="col" className="text-center text-white text-3xl font-medium" style={{ width: '10rem', backgroundColor: 'rgb(152, 0, 76)' }}>
                                                    Created
                                                </th>
                                                <th scope="col" className="text-center text-white text-3xl font-medium" style={{ width: '10rem', backgroundColor: 'rgb(152, 0, 76)' }}>
                                                    Add Ticket
                                                </th>
                                                <th scope="col" className="text-center text-white text-3xl font-medium" style={{ width: '10rem', backgroundColor: 'rgb(152, 0, 76)' }}>
                                                    Closed
                                                </th>
                                                <th scope="col" className="text-center text-white text-3xl font-medium" style={{ width: '10rem', backgroundColor: 'rgb(152, 0, 76)' }}>
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        {records?.length > 0 ?
                                            <tbody>
                                                {records && records.map((item1, index) => {
                                                    return (
                                                        <tr key={index} className="bg-white border-b">
                                                            <td className="px-6 py-4" style={{ width: '4rem' }}>
                                                                <p className="w-sm" style={item1.ticketStatus === 'Open' ? { width: '15px', height: '15px', borderRadius: '100px', backgroundColor: 'red' } : item1.ticketStatus === 'Closed' ? { width: '15px', height: '15px', borderRadius: '100px', backgroundColor: 'green' } : { width: '15px', height: '15px', borderRadius: '100px', backgroundColor: '#FDDA0D' }}></p>
                                                            </td>
                                                            <td className="px-6 py-4" style={{ fontWeight: 'bolder', width: '8rem' }}>
                                                                {item1.ticket_number ? item1.ticket_number : 'NA'}
                                                            </td>
                                                            <td className="px-6 py-4" style={{ fontWeight: 'bolder', width: '20rem', textAlign: 'center' }}>
                                                                {item1?.hospitalName ? item1?.hospitalName : '---'}
                                                            </td>
                                                            <td className="px-6 py-4 " style={{ textAlign: 'center' }}>
                                                                {item1.firstName ? item1.firstName: 'NA'} {item1.lastName ? item1.lastName: 'NA'}
                                                            </td>
                                                            <td className="px-6 py-4 " style={{ textAlign: 'center' }}>
                                                                {item1.date ? item1.date?.split(" ")[0] : 'NA'}
                                                            </td>
                                                            {item1?.ticketInfo ? <td className="px-6 py-4 text-center justify-center">
                                                                Assigned
                                                            </td> :
                                                                <td className="px-6 py-4 text-center justify-center">
                                                                    <button onClick={() => { localStorage.setItem('data', item1) }} style={{ backgroundColor: 'white', color: '#98004c', padding: '14px', borderRadius: '8px' }}>
                                                                        <Link
                                                                            to={`/supportForm?ticketNo=${item1?.ticket_number}`}
                                                                        >
                                                                            Add Ticket
                                                                        </Link>
                                                                    </button>
                                                                </td>
                                                            }
                                                            <td className="px-6 py-4 " style={{ textAlign: 'center' }}>
                                                                {item1.date ? item1.closedOn?.split(" ")[0] : 'NA'}
                                                            </td>
                                                            <td className="px-6 py-4 text-center" style={{ cursor: 'pointer', fontWeight: 'bolder' }}>
                                                                <select onChange={(e) => {
                                                                    e.target.value === 'View' ? history(`/Ticket_details?ticket=${item1 && item1.ticket_number}`) : history(`/edit_Ticket_Details?ticketDetails=${item1 && item1.ticket_number}`)
                                                                }} style={{ padding: '8px', width: '5rem', borderRadius: '8px' }}>
                                                                    <option>Action</option>
                                                                    <option value="View">View</option>
                                                                    <option value="Edit">Edit</option>
                                                                </select>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                                }
                                            </tbody>
                                            :
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
                                    </table>
                                </div>
                            </div>
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
                        </>
                    </div>
                </Col>
            </Row>
        </>
    )
    function prePage() {
        dispatch(getAllTicketsDataAction({ page: incPage - 1, limit: recordsPerPage }))
    }
    function nextPage() {
        dispatch(getAllTicketsDataAction({ page: incPage + 1, limit: recordsPerPage }))
    }
}

export default SupportEngDatamODULE