import React, { useEffect } from 'react'
import ServiceModuleNavBar from './ServiceModuleNavBar'
import { Link } from 'react-router-dom'
import { getAllUserCountDataAction } from '../../../store/action/ServiceEngAction'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CSVLink } from 'react-csv'
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";

function SingleUserDataCount() {
    const dispatch = useDispatch();

    const getAllUserCountReducer = useSelector((state) => state.getAllUserCountReducer);
    const { data } = getAllUserCountReducer;
    console.log('data11', data)
    useEffect(() => {
        dispatch(getAllUserCountDataAction())
    }, [])
    return (
        <div>
            <div className='p-3' style={{ marginTop: '1rem' }}>
                <h5 >User Data</h5>
                <div style={{ marginTop: "1rem", display: 'flex', gap: '10px',height:'50px'}}>
                    <input type="text" placeholder='Search user...' className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" />
                    <button className='px-2' style={{ height:'100%',backgroundColor: 'rgb(152, 0, 76)', color: 'white', borderRadius: '10px' }}>
                        Search
                    </button>
                    <CSVLink data={data ? data : ''} style={{padding:'8px'}}>
                        <FontAwesomeIcon icon={faFileArrowDown} style={{ color: "rgb(152, 0, 76)", height:"35px" }} />
                    </CSVLink>
                </div>
                <div className='mt-3'>
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 :bg-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    User Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Demo Done
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Sold Done
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Expense Recived
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Expense Pending
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Expense Decline
                                </th>
                            </tr>
                        </thead>
                        {data?.map((item) => {
                            return (
                                <tbody>
                                    <tr className="bg-white border-b :bg-gray-800">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item?.firstName ? item?.firstName : '--'}
                                        </th>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            <br />
                                            {item?.targetDemoDone ? item?.targetDemoDone : '--'}
                                        </td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item?.targetSoldDone ? item?.targetSoldDone : '--'}
                                        </td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item?.expenseAmount?.Received}
                                        </td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item?.expenseAmount?.Pending}
                                        </td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item?.expenseAmount?.Declined}
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        })}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default SingleUserDataCount