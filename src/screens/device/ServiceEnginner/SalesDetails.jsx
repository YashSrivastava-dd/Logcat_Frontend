import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSalesDataAction } from '../../../store/action/ServiceEngAction';
import ServiceModuleNavBar from './ServiceModuleNavBar';

const SalesDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  
  const { data , loading , error } = useSelector((state) => state.getSalesDataReducer);
  
  useEffect(() => {
    dispatch(getSalesDataAction());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  const handleClickSearch = () => {
    dispatch(getSalesDataAction(query));
  };

  return (
    <div>
      <div className="p-4 mt-12">
          <div className="flex justify-between items-center">
            <span className="text-lg md:text-2xl">Sales Statement</span>
            <button
              onClick={() => navigate('/add_sales_details')}
              style={{ padding: '10px', border: '1px solid rgb(152, 0, 76)', color: 'rgb(152, 0, 76)', borderRadius: '12px', width: '8rem' }}
            >
              Add Sales
            </button>
          </div>
          <div className="mt-4 flex gap-2">
            <input
              onChange={handleSearchChange}
              style={{boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'}}
              type="text"
              placeholder="Search"
              className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleClickSearch}
              className="px-4 py-2"
              style={{ backgroundColor: 'rgb(152, 0, 76)', color: 'white', borderRadius: '10px' }}
            >
              Search
            </button>
          </div>
          {/* <hr className="my-4" /> */}
          {data?.data?.length>0?
          data?.data?.map((item) => (
            <div key={item.deviceId} className="py-3">
              <div className="p-4 w-full flex flex-wrap justify-between items-center shadow-lg rounded-lg">
                <div className="w-1/3 md:w-1/4">
                  <h6 className="text-lg md:text-xl">Device Id</h6>
                  <p className="text-sm md:text-base">{item.deviceId}</p>
                </div>
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
            </div>
          ))
        :
        <div style={{width:'100%',height:'200px',textAlign:'center',display:'flex',alignItems:'center',justifyContent:'center'}}>{error}</div>
        }
        {loading && <span style={{textAlign:'center',display:'flex',alignItems:'center',justifyContent:'center'}}>Loading...</span>}
      </div>
    </div>
  );
};

export default SalesDetails;
