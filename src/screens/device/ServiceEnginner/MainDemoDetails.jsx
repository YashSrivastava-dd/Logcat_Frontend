import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getDemoDataAction, postStatusDataAction } from '../../../store/action/ServiceEngAction';
import { Toaster, toast } from 'react-hot-toast';

function MainDemoDetails() {

    const getDemoDataReducer = useSelector((state) => state.getDemoDataReducer);
    const { loading, data, error } = getDemoDataReducer;
    console.log('data', data, error)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getDemoDataAction())
    }, [])

    const [query, setQuery] = useState("");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const handleSearchChange = (e) => {
        setQuery(e.target.value.toLowerCase());
    };


    const handleClickSearch = () => {
        dispatch(
            getDemoDataAction(
                query,
            )
        );
    };
    return (
        <div>
            <Toaster />
            <div className="p-4">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ padding: '4px' }}>Demo Statement</span>
                        <button
                            style={{ padding: '10px', border: '1px solid rgb(152, 0, 76)', color: 'rgb(152, 0, 76)', borderRadius: '12px', width: '8rem' }}
                            onClick={() => navigate('/main_demo_details')}
                        >Add Demo</button>
                    </div>
                    <div style={{ marginTop: "1rem", display: 'flex', gap: '10px' }}>
                        <input
                            style={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}
                            onChange={handleSearchChange} type="text" placeholder='Search hospital...' className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" />
                        <button
                            onClick={handleClickSearch}
                            className='px-2'
                            style={{ backgroundColor: 'rgb(152, 0, 76)', color: 'white', borderRadius: '10px' }}
                        >
                            Search
                        </button>
                    </div>
                    {data?.data?.length > 0 ?
                        data?.data?.map((item, index) => {
                            console.log('index', index)
                            return (
                                <div className="py-2 my-2">
                                    <div className="p-4 flex justify-between" style={{boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',borderRadius:'10px'}}>
                                        <div>
                                            <h5 className="text-lg md:text-2xl lg:text-3xl">Device Id</h5>
                                            <p className="text-md md:text-lg">{item?.deviceId}</p>
                                        </div>
                                        <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'start'}}>
                                            <h5 className="">Demo Duration</h5>
                                            <p className="text-md md:text-lg">{item?.demoDuration}</p>
                                        </div>
                                        <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'start'}}>
                                            <h5 className="">Description</h5>
                                            <p className="text-md md:text-lg">{item?.description}</p>
                                        </div>
                                        <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'start'}}>
                                            <h5 className="">Priority</h5>
                                            <p className="text-md md:text-lg">{item?.priority}</p>
                                        </div>
                                        <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'start'}}>
                                            <h5 className="">Hospital Name</h5>
                                            <p className="text-md md:text-lg">{item?.hospitalName}</p>
                                        </div>
                                    </div>
                                </div>

                            )
                        }) :
                        <div style={{ width: '100%', height: '200px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span>{error}</span>
                        </div>
                    }
                    {loading && <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</span>}
            </div>
        </div>
    )
}

export default MainDemoDetails