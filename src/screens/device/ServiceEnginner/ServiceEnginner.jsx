import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { getAllExpenceDataAction, getAllTicketsDataAction, getMileStoneCountAction, getSalesDataAction, getServiceEngData, getServiceEngStatus, putStatusDataAction } from '../../../store/action/ServiceEngAction';
import DatePicker from "react-horizontal-datepicker";
function ServiceEnginner() {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    // userProfileData

    const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
    const { adminInfo } = adminLoginReducer;
    const email = adminInfo && adminInfo.data && adminInfo.data.email

    const getMileStoneCountReducer = useSelector((state) => state.getMileStoneCountReducer);
    const { data } = getMileStoneCountReducer;

    useEffect(() => {
        dispatch(getSalesDataAction())
        dispatch(getServiceEngData(email))
        dispatch(getMileStoneCountAction())
        dispatch(getAllExpenceDataAction())
    }, [])

    const getSalesDataReducer = useSelector((state) => state.getSalesDataReducer);
    const { data: dataaa, loading: loadingg, error } = getSalesDataReducer;
    const newSaleData = dataaa?.data;

    useEffect(() => {
        return (() => {
            dispatch(getAllTicketsDataAction({ page: '1', limit: '100' }))
        })
    }, [])

    const selectedDay = (val) => {
        console.log(val)
    };

    const handelView = () => {
        return navigate('/demo_details')
    }

    const getExpencesDataReducer = useSelector((state) => state.getExpencesDataReducer);
    const { loading, data: expencedata } = getExpencesDataReducer;
    const getExpenceAllData = expencedata?.data;

    return (
        <div>
            <div className="px-4">
                <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', justifyContent: 'start', flexDirection: 'column', gap: '0.6rem' }}>
                        <p style={{ color: 'black' }}>{adminInfo?.data?.name}</p>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ color: 'black', fontSize: '0.8rem', fontWeight: 'lighter' }}>{adminInfo?.data?.email}</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '1rem' }}>
                            <p style={{ color: 'black' }}>Demo</p>
                            <span style={{ color: 'black', fontWeight: '400' }}>{data?.data?.[0]?.targetDemo ? data?.data?.[0]?.targetDemo : '--'}/{data?.data?.[0]?.targetDemoDone ? data?.data?.[0]?.targetDemoDone : '--'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '1rem' }}>
                            <p style={{ color: 'black' }}>Sales</p>
                            <span style={{ color: 'black', fontWeight: '400' }}>{data?.data?.[0]?.targetSales ? data?.data?.[0]?.targetSales : '--'}/{data?.data?.[0]?.targetSales ? data?.data?.[0]?.targetSalesDone : '--'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '1rem' }}>
                            <p style={{ color: 'black' }}>Expenses</p>
                            <span style={{ color: 'black', fontWeight: '400' }}>{data?.data2?.[0]?.totalExpenses ? data?.data2?.[0]?.totalExpenses : '--'}</span>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '1rem' }}>
                        <p style={{ color: 'black' }}>Start Date</p>
                        <span style={{ color: 'black', fontWeight: '400' }}>{data?.data?.[0]?.startDate ? data?.data?.[0]?.startDate : '--'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '1rem' }}>
                        <p style={{ color: 'black' }}>End Date</p>
                        <span style={{ color: 'black', fontWeight: '400' }}>{data?.data?.[0]?.endDate ? data?.data?.[0]?.endDate : '--'}</span>
                    </div>
                </div>
            </div>
            <hr />
            <div className="px-4 py-2">
                <DatePicker getSelectedDay={selectedDay}
                    endDate={100}
                    selectDate={new Date("2020-04-30")}
                    labelFormat={"MMMM"}
                    color={"rgb(152, 0, 76)"}
                />
            </div>
            <div className="px-4 py-3">
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h2 style={{ fontWeight: '400' }}>Demo & Sales</h2>
                        <Link to='/sales_details'>
                            <h6>View More</h6>
                        </Link>
                    </div>
                    {newSaleData?.length > 0 ?
                        newSaleData?.map((item, index) => {
                            if (index === 0) {
                                return (<div className='py-2' key={index}>
                                    <div className="p-4 w-full flex flex-wrap justify-between items-center shadow-lg rounded-lg">
                                        <div className="w-1/3 md:w-1/4 text-center">
                                            <h6 className="text-lg md:text-xl">Serial Number</h6>
                                            <p className="text-sm md:text-base">{item.serialNo}</p>
                                        </div>
                                        <div className="w-1/3 md:w-1/4 text-center">
                                            <h6 className="text-lg md:text-xl">Hospital Name</h6>
                                            <p className="text-sm md:text-base">{item.hospitalName}</p>
                                        </div>
                                        <div className="w-1/3 md:w-1/4 text-center">
                                            <h6 className="text-lg md:text-xl">Contact Number</h6>
                                            <p className="text-sm md:text-base">{item.contactNo}</p>
                                        </div>
                                        <div className="w-1/3 md:w-1/4 text-center">
                                            <h6 className="text-lg md:text-xl">Amount</h6>
                                            <p className="text-sm md:text-base">{item.amount}</p>
                                        </div>
                                    </div>
                                </div>)
                            }
                            else {
                                return null;
                            }
                        }) :
                        <div style={{ width: '100%', height: '200px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{error}</div>
                    }
                    {loadingg && <span style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>loading...</span>}
                </div>
            </div>
            <div className="px-4 py-3">
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h2 style={{ fontWeight: '400' }}>Today's Expenses</h2>
                        <Link to='/expences_details'>
                            <h6 >View More</h6>
                        </Link>
                    </div>
                    {getExpenceAllData?.map((item, index) => {
                        if (index === 0) {
                            return (
                                <div className='py-2'>
                                    <div className='p-4 rounded-lg shadow d-flex justify-between'>
                                        <div>
                                            <h5>Description</h5>
                                            <p>{item?.description ? item?.description : '--'}</p>
                                        </div>
                                        <div>
                                            <h5>Time</h5>
                                            <p>{item?.time ? item?.time : '--'}</p>
                                        </div>
                                        <div>
                                            <h5>Date</h5>
                                            <p>{item?.date ? item?.date : '--'}</p>
                                        </div>
                                        <div>
                                            <h5>Amount</h5>
                                            <p>{item?.amount ? item?.amount : '--'}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        else {
                            return null;
                        }
                    })}
                    {loading && <span className='p-4 rounded-lg shadow d-flex justify-center h-20'>loading...</span>}
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', backgroundColor: 'white', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', padding: '12px', position: 'fixed', width: '100%', bottom: '30px', height: '70px', margin: "0px 10px", borderRadius: '10px' }}>
                <button style={{ padding: '10px', backgroundColor: '#ffbf00', color: 'white', borderRadius: '10px' }} onClick={handelView}>View Demo</button>
                <button style={{ padding: '10px', backgroundColor: 'green', color: 'white', borderRadius: '10px' }} onClick={() => navigate('/sales_details')}>View Sales</button>
                <button style={{ padding: '10px', backgroundColor: 'rgb(152, 0, 76)', color: 'white', borderRadius: '10px' }} onClick={() => navigate('/expences_details')}>View Expenses</button>
            </div>
        </div>
    )
}

export default ServiceEnginner