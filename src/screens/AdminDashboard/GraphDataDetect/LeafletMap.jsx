import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MapComponent from './MapComponent';
import "./Map.css";
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardGraphDataAction } from '../../../store/action/AdminDashboard';

function LeafletMap() {
  const [locations, setLocations] = useState([]);
  const [pincode, setPincode] = useState('');
  const [error, setError] = useState('');

const dispatch=useDispatch();


const getDashboardGraphDataReducer = useSelector((state) => state.getDashboardGraphDataReducer);
const { loading, data } = getDashboardGraphDataReducer;

  useEffect(()=>{
    dispatch(getDashboardGraphDataAction())
  },[])
const pincodeData=data?.data?.map((item)=>item?.pincode)
console.log('1',pincodeData)
useEffect(()=>{
  const pincodeData = data?.data?.map((item) => item?.pincode) || [];

  // No need to split as pincodeData is already an array
  const pincodeArray = pincodeData?.map(pin => pin.trim());
  setPincode(pincodeArray)
},[])
console.log('pincode',pincode)

const handleSearch = async () => {
  setError('');
  
  // Retrieve and map the pincode data
  const pincodeData = data?.data?.map((item) => item?.pincode) || [];

  // No need to split as pincodeData is already an array
  const pincodeArray = pincode?.map(pin => pin.trim());

  console.log('2', pincodeArray);

  const newLocations = await Promise.all(pincodeArray?.map(async (pin) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          postalcode: pin,
          format: 'json',
          addressdetails: 1,
        }
      });
      if (response.data.length > 0) {
        const result = response.data[0];
        return {
          latitude: parseFloat(result.lat),
          longitude: parseFloat(result.lon),
          pincode: pin,
          name: `${result.display_name}`
        };
      } else {
        setError(prevError => `${prevError} No results found for pincode: ${pin}. `);
        return null;
      }
    } catch (error) {
      setError(prevError => `${prevError} An error occurred for pincode: ${pin}. `);
      return null;
    }
  }));

  setLocations([...locations, ...newLocations.filter(location => location !== null)]);
};


  return (
    <div className="App">
      <input 
        type="text" 
        value={pincode} 
        onChange={(e) => setPincode(e.target.value)} 
        placeholder="Enter pincodes, separated by commas" 
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <MapComponent locations={locations} />
    </div>
  );
}
export default LeafletMap;
