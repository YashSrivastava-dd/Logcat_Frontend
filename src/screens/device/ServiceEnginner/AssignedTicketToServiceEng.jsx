import React, { useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import Style from '../../../css/AssignedTicketToServiceEng.module.css'; // Import the external CSS file
import { useDispatch, useSelector } from 'react-redux';
import { changeTicketStatusAction, getServicesDataAction } from '../../../store/action/ServiceEngAction';

const TicketTable = () => {
    const navigate = useNavigate(); // Get the navigate function
    const dispatch = useDispatch();
    // Service Data
    const getAllServicesDataReducer = useSelector((state) => state.getAllServicesDataReducer);
    const { data, loading } = getAllServicesDataReducer;
    const notifyData = data && data.data;
    console.log('notifyData', notifyData)
    useEffect(() => {
        let sortBy = '';
        let search = '';
        dispatch(getServicesDataAction(sortBy, search))
    }, [dispatch])

    return (
        <div className={Style.parent}>
            <div className={Style.insideDiv}>
                <FaArrowLeft
                    onClick={() => navigate(-1)} // Navigate back on click
                    style={{ marginRight: '8px', cursor: 'pointer' }}
                />
                <h1>
                    Ticket Data
                </h1>
            </div>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th style={{ width: '12rem' }} scope="col" className="px-6 text-center py-3">

                                Ticket Number

                            </th>
                            <th style={{ width: '12rem' }} scope="col" className="px-6 text-center py-3">
                                Device Id
                            </th>
                            <th style={{ width: '12rem' }} scope="col" className="px-6 text-center py-3">
                                Hospital Name
                            </th>
                            <th style={{ width: '12rem' }} scope="col" className="px-6 text-center py-3">
                                Service Engineer
                            </th>
                            <th style={{ width: '12rem' }} scope="col" className="px-6 text-center py-3">
                                Concerned Person Name
                            </th>
                            <th style={{ width: '12rem' }} scope="col" className="px-6 text-center py-3">
                                Priority
                            </th>
                            <th style={{ width: '12rem' }} scope="col" className="px-6 text-center py-3">
                                Ticket Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {notifyData?.map((item, index) => {
                            return (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th style={{ width: '12rem' }} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <Link to={`/Ticket_details?ticket=${item && item.ticket_number}`} style={{ textDecoration: "none", color: 'black' }}>
                                            {item?.ticket_number}
                                        </Link>
                                    </th>
                                    <td className="px-6 py-4 text-center" style={{ width: '11.5rem' }} >{item?.ticketInfo?.deviceId}</td>
                                    <td className="px-6 py-4 text-center" style={{ width: '11.5rem' }} >{item?.ticketInfo?.hospital_name}</td>
                                    <td className="px-6 py-4 text-center" style={{ width: '11.5rem' }} >{item?.ticketInfo?.service_engineer}</td>
                                    <td className="px-6 py-4 text-center" style={{ width: '11.5rem' }} >{item?.ticketInfo?.concerned_p_name}</td>
                                    <td className="px-6 py-4 text-center" style={{ width: '11.5rem' }} >{item?.priority}</td>
                                    <td className="px-6 py-4 text-center" style={{ width: '11.5rem' }}>
                                        <select onChange={(e) => {
                                            if (item?.ticket_number) {
                                                let ticket_number = item?.ticket_number
                                                let ticketStatus = e.target.value;
                                                dispatch(changeTicketStatusAction(ticket_number, ticketStatus))
                                            }
                                        }}
                                            style={item.ticketStatus === 'Closed' ? { border: '1px', width: '7rem', backgroundColor: '#A9A9A9', color: 'white', padding: '10px', borderRadius: '8px' } : item.ticketStatus === 'Open' ? { border: '1px', width: '7rem', backgroundColor: '#FFF0F1', color: '#FF4B4E', padding: '10px', borderRadius: '2px', borderRadius: '8px' } : { border: '1px', width: '7rem', backgroundColor: '#FFF4CC', color: 'black', padding: '10px', borderRadius: '2px', borderRadius: '8px' }}
                                            name="" id="">
                                            <option>{item?.ticketStatus}</option>
                                            {item?.ticketStatus === 'Open' ?
                                                <>
                                                    <option value="Closed">Close</option>
                                                    <option value="Hold">Hold</option>
                                                </>
                                                :
                                                item?.ticketStatus === 'Closed' ?
                                                    < >
                                                        <option value="Closed">Open</option>
                                                        <option value="Hold">Hold</option>
                                                    </>
                                                    :
                                                    < >
                                                        <option value="Closed">Open</option>
                                                        <option value="Hold">Hold</option>
                                                    </>
                                            }
                                        </select>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
                {loading && <div>loading...</div>}
            </div>
        </div>
    );
};

export default TicketTable;
