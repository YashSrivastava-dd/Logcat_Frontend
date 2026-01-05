import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import L from 'leaflet';
import { FiRefreshCw } from "react-icons/fi";
// Fix for the default marker icon issue with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const StreetMap = ({ pincodes }) => {
  const [locations, setLocations] = useState([]);

  const handleClick = () => {
    const fetchCoordinates = async () => {
      const apiKey = '42ff317b0fe142c293a4701e3d1b229f';
      const promises = pincodes.map(pincode =>
        axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${pincode}&countrycode=IN&key=${apiKey}`)
      );
      const results = await Promise.all(promises);
      const newLocations = results.map((result, index) => ({
        pincode: pincodes[index],
        coordinates: result.data.results[0]?.geometry,
      })).filter(location => location.coordinates); // Filter out invalid responses
      setLocations(newLocations);
    };

    fetchCoordinates();
  }
  return (
    <div style={{ height: '350px', width: '100%' ,display:'flex',alignItems:'end',flexDirection:'column',position:'relative'}}>
      <button onClick={handleClick} style={{ padding: '8px', backgroundColor: 'black', color: 'white', margin: '2px', borderRadius: '8px',marginRight:'4px'}}>
        <FiRefreshCw />
      </button>
      <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100%', width: '100%',position:'sticky',zIndex:'22' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">DD Healthcare</a> contributors'
        />
        {locations.map(location => (
          <Marker key={location.pincode} position={[location.coordinates.lat, location.coordinates.lng]}>
            <Popup>Pincode: {location.pincode}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default StreetMap;
