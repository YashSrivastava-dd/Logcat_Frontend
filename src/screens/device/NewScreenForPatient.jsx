import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import back from "../../assets/images/back.png";
import { useDispatch, useSelector } from 'react-redux';
import { getGraphOfTrendMedicineAction, getPatientDetails, getPatientDiagnoseData, postEndDateAction } from '../../store/action/DeviceAction';
import ChartComponent from './GraphChart';

function NewScreenForPatient() {
    const [endDateMedicine, setEndDateMedicine] = useState('')
    const [endDateIllness, setEndDateIllness] = useState('')
    const getPatientDetailsReducer = useSelector(
        (state) => state.getPatientDetailsReducer
    );
    const { loading, data, error } = getPatientDetailsReducer;
    const getAllTicket = data;
    const getPatientDiagnose = useSelector((state) => state.getPatientDiagnose);
    const { loading: disanoseloading, data: diagnioseData, error: diagnoseerror } = getPatientDiagnose;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const UHID = urlParams.get("uhid");
    const deviceId = urlParams.get("deviceId");

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPatientDetails({ searchData: '', page: "1", limit: "100" }));
    }, []);


    // graph data api 
    const getGraphOfTrendsReducer = useSelector(
        (state) => state.getGraphOfTrendsReducer
    );
    const { data: dataa } = getGraphOfTrendsReducer;
    useEffect(() => {
        dispatch(getGraphOfTrendMedicineAction(deviceId, UHID));
        dispatch(getPatientDiagnoseData(UHID))
    }, []);

    const medicineName = dataa?.map((item) => item?.fio2)
    const tilesData = dataa?.map((item) => item?.fio2)
    const spo2Data = dataa?.map((item) => item?.sPo2)
    const peepData = dataa?.map((item) => item?.peep)
    const vtiData =dataa?.map((item) => item?.vti)
    const mviData=dataa?.map((item) => item?.mvi)

    const yaxis = dataa?.map((item) => item?.time)

    const [selectIndexOfMedicine, setSelectIndexOfMedicine] = useState();
    const handleSelect = (e) => {
        setSelectIndexOfMedicine(e.target.value)
    }

    console.log('diagnioseData',diagnioseData)
    return (
        <div>
            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', }}>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <Link to='/nurse_module'>
                                <img src={back} style={{ width: "3rem" }} />
                            </Link>
                            <h1 className="flex items-center text-3xl font-extrabold" style={{ justifyContent: 'center' }}>Patient<span className="bg-rgb(152, 0, 76)-100 text-rgb(152, 0, 76)-800 text-2xl font-semibold mr-2 px-0 py-0.5 rounded ml-2">Data</span></h1>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '2rem', width: '100%', padding: '10px' }}>
                        <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Patient Details</h5>
                            <div style={{ padding: '1rem', display: 'flex', gap: '100px' }}>
                                <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                                    <div style={{ gap: '10px', display: 'flex', textAlign: 'center' }}>
                                        <p className='text-black'>UHID</p>
                                        <span>: {getAllTicket?.[0]?.UHID}</span>
                                    </div>
                                    <div style={{ gap: '10px', display: 'flex' }}>
                                        <p className='text-black'>Name</p>
                                        <span>: {getAllTicket?.[0]?.patientName ? getAllTicket?.[0]?.patientName : '--'}</span>
                                    </div>
                                    <div style={{ gap: '10px', display: 'flex' }}>
                                        <p className='text-black'>Age</p>
                                        <span>: {getAllTicket?.[0]?.age}</span>
                                    </div>
                                    <div style={{ gap: '10px', display: 'flex' }}>
                                        <label>Height</label>
                                        <span>: {getAllTicket?.[0]?.height} cm</span>
                                    </div>
                                </div>
                                <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                                    <div style={{ gap: '10px', display: 'flex' }}>
                                        <label>Weight</label>
                                        <span>: {getAllTicket?.[0]?.weight} Kg</span>
                                    </div>
                                    <div style={{ gap: '10px', display: 'flex' }}>
                                        <label>Ward No.</label>
                                        <span>: {getAllTicket?.[0]?.ward_no}</span>
                                    </div>
                                    <div style={{ gap: '10px', display: 'flex' }}>
                                        <label>Bed No.</label>
                                        <span>: {getAllTicket?.[0]?.bed_no ? getAllTicket?.[0]?.bed_no : '--'}</span>
                                    </div>
                                    <div style={{ gap: '10px', display: 'flex' }}>
                                        <label>BMI</label>
                                        <span>: {getAllTicket?.[0]?.bmi ? getAllTicket?.[0]?.bmi : '--'}</span>
                                    </div>
                                </div>
                                <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                                    <div style={{ gap: '10px', display: 'flex' }}>
                                        <label>Device Id</label>
                                        <span>: {getAllTicket?.[0]?.deviceId}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Diagnosed Details</h5>
                            {diagnioseData?.length > 0 ?
                                <div style={{ padding: '1rem' }}>
                                    {diagnioseData?.map((item) => {
                                        return (
                                            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column' }}>
                                                <div style={{ gap: '10px', display: 'flex', justifyContent: 'space-between' }}>
                                                    <div>
                                                        <label>Medication</label>
                                                        <span>: {item?.medication}</span>
                                                    </div>
                                                    <div>
                                                        <label>Report</label>
                                                        <Link to={item?.report}><span>: Report View</span></Link>
                                                    </div>
                                                </div>
                                                <div style={{ gap: '10px', display: 'flex' }}>
                                                    <div>
                                                        <label>Date & Time</label>
                                                        <span>: {item?.dateTime.split(" ")[0]} / {item?.dateTime.split(" ")[1]}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                :
                                <div style={{ textAlign: 'center' }}>
                                    <span>{diagnoseerror}</span>
                                </div>
                            }
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '2rem', width: '100%', padding: '10px' }}>
                        <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Illness Details</h5>
                            <div className="relative overflow-x-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Illness name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Start Date
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                End Date
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                End Illness
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getAllTicket?.[0]?.illnessData?.map((item, index) => {
                                            return (
                                                <tr key={index} className="bg-white border-b dark:bg-gray-800">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 ">
                                                        {item?.name}
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {item?.startDate.split(" ")[0]}
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        {item?.endDate.length > 0 ? item?.endDate.split("T")[0] :
                                                            <input value={endDateIllness} onChange={(e) => setEndDateIllness(e.target.value)} aria-label="Date and time" type="datetime-local" style={{ width: "150px" }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" />
                                                        }</td>
                                                    <td className="px-6 py-4">
                                                        {!item?.endDate.length > 0 ?
                                                            <button type="button" onClick={() => {
                                                                let illnessId = item?._id;
                                                                let endDate = endDateIllness
                                                                dispatch(postEndDateAction({ illnessId, UHID, endDate }))
                                                            }} className="text-white bg-black hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">End</button>
                                                            :
                                                            <button type="button" style={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', cursor: 'not-allowed' }} disabled className="text-black hover:bg-grey-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Ended</button>
                                                        }</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                    {loading && <span>loading...</span>}
                                </table>
                            </div>
                        </div>
                        <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Medicine Details</h5>
                            <div className="relative overflow-x-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Medicine Name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Start Date
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                End Date
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                End Medicine
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getAllTicket?.[0]?.medicineData?.map((item, index) => {
                                            return (
                                                <tr key={index} className="bg-white border-b">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap" >
                                                        {item?.name}
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {item?.startDate.split(" ")[0]}
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        {item?.endDate.length > 0 ? item?.endDate.split("T")[0] :
                                                            <input value={endDateMedicine} aria-label="Date and time" onChange={(e) => { setEndDateMedicine(e.target.value) }} type="datetime-local" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5" style={{ width: '150px' }} />
                                                        } </td>
                                                    <td className="px-6 py-4">
                                                        {!item?.endDate.length > 0 ?
                                                            <button
                                                                onClick={() => {
                                                                    let medicineId = item?._id;
                                                                    let endDate = endDateMedicine
                                                                    dispatch(postEndDateAction({ medicineId, UHID, endDate }))
                                                                }}
                                                                type="button" className="text-white bg-black hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">End</button>
                                                            : <button type="button" style={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', cursor: 'not-allowed' }} disabled className="text-black hover:bg-grey-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Ended</button>
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
                <div style={{ marginLeft: '1rem', display: 'flex', alignItems: 'center', marginTop: '2rem', }}>
                    <h4>Data of medicine : </h4>
                    <select onChange={handleSelect} name="" id="" style={{ padding: '5px', width: '150px', borderRadius: '5px' }}>
                        <option value="">Select Medicine</option>
                        {dataa?.map((item, index) => {
                            return (
                                <option value={index} key={index}>{item?.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>
                    {/* <input type="date" name="" id="" /> */}
                    <div style={{ marginBottom: '10rem', width: '840px', padding: '10px', height: '200px', display: 'flex', gap: '3rem' }}>
                    <ChartComponent title={'Fio2 and Sop2'} dataa={tilesData} tilesDatas={spo2Data?.[0]} yaxis={yaxis} label={'FIO2'} newlable={'SPO2'} medicineLable={'Start Day'} />
                        <ChartComponent title={'PEEP'} newlable={'PEEP'} tilesDatas={peepData?.[0]} yaxis={yaxis} medicineLable={'Start Day'} />
                    </div>
                    <div style={{ marginBottom: '5rem', width: '840px', padding: '10px', height: '200px', display: 'flex', gap: '3rem' }}>
                        <ChartComponent title={'Vti'} newlable={'Vti'} tilesDatas={vtiData?.[0]} yaxis={yaxis} medicineLable={'Start Day'} labels={dataa} />
                        <ChartComponent title={'Mvi'} newlable={'Mvi'} tilesDatas={mviData?.[0]} yaxis={yaxis} medicineLable={'Start Day'} labels={dataa} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewScreenForPatient