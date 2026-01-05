import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Style from '../../css/device.module.css';
import { useDispatch, useSelector } from 'react-redux';
import TableCard1 from '../../container/TableCard1';
import Events from './components/table/Events';
import Logs from './components/table/Logs';
import Alarms from './components/table/Alarms';
import Trends from './components/table/Trends';
import Calibration from "../device/components/table/Calibration";
import DeveloperOptionData from './components/table/DeveloperOptionData';
import { Link } from 'react-router-dom';
import { getDeviceAlarmsById, getDeviceEventsById, getDeviceTrendsById } from '../../store/action/DeviceAction';
import DatePicker from "react-multi-date-picker";
import { CiCalendarDate } from "react-icons/ci";
import back from "../../assets/images/back.png";
import 'rsuite/DateRangePicker/styles/index.css';

export default function DeviceLogs() {
  const dispatch = useDispatch();

  // Redux selectors
  const { data: deviceLogsData } = useSelector((state) => state.getAllSectionByDeviceId) || {};
  const adminProfile = useSelector((state) => state.adminLoginReducer?.adminInfo?.data?.userType);
  console.log('dataNew',deviceLogsData)
  // State variables
  const [activeTab, setActiveTab] = useState(0);
  const [dateRange, setDateRange] = useState([null, null]);
  const [searchData, setSearchData] = useState('');
  const [startdate, setStartdate] = useState();
  const [enddate, setEnddate] = useState();

  // Constants
  const tabs = [
    { label: 'Events', component: <Events />, isAdmin: false },
    { label: 'Alarms', component: <Alarms />, isAdmin: false },
    { label: 'Crash Logs', component: <Logs />, isAdmin: true },
    { label: 'Trends', component: <Trends startdate={startdate} enddate={enddate} />, isAdmin: false },
    { label: 'Calibration', component: <Calibration />, isAdmin: false },
    { label: 'Developers', component: <DeveloperOptionData />, isAdmin: true },
  ];

  // Handlers
  const handleChange = (range) => {
    if (range?.length === 2) {
      const [start, end] = range;
      const formattedStart = start?.format("YYYY-MM-DD") || '';
      const formattedEnd = end?.format("YYYY-MM-DD") || '';
      setStartdate(formattedStart);
      setEnddate(formattedEnd);

      const fetchData = {
        page: 1,
        limit: activeTab === 3 ? 50 : 8,
        startDate: formattedStart,
        endDate: formattedEnd,
      };

      if (activeTab === 0) dispatch(getDeviceEventsById(fetchData));
      if (activeTab === 1) dispatch(getDeviceAlarmsById(fetchData));
      if (activeTab === 3) dispatch(getDeviceTrendsById({ ...fetchData, startDatee: formattedStart, endDatee: formattedEnd }));
      setDateRange(range);
    }
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchData(searchValue);
    if (e.keyCode === 13 && searchValue) {
      const fetchData = { page: 1, limit: 100, startDate: '', endDate: '', search: searchValue };
      if (activeTab === 0) dispatch(getDeviceEventsById(fetchData));
      if (activeTab === 1) dispatch(getDeviceAlarmsById(fetchData));
    }
  };

  const handleTabClick = (index) => setActiveTab(index);

  const goBack = () => window.history.go(-1);

  // JSX
  return (
    <div className={Style.rotate}>
      <Row className="rowSection">
        <div xl={10} lg={10} md={10} sm={10} className={`${Style.NavbarColumn} colSection`}>
          <div className={Style.container}>
            <div className="d-flex align-items-center mb-3">
              <Link onClick={goBack}>
                <img src={back} alt="Go back" style={{ width: "3rem" }} />
              </Link>
              <h1 style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Device Logs Data</h1>
            </div>
            <div className="d-flex" style={{ gap: '10px' }}>
              {[
                { label: "Status", value: deviceLogsData?.data?.message },
                { label: "Alias Name", value: deviceLogsData?.data?.Alias_Name || '- - -' },
                { label: "Department", value: deviceLogsData?.data?.Department_Name },
                { label: "Hospital Name", value: deviceLogsData?.data?.Hospital_Name },
                { label: "Doctor", value: deviceLogsData?.data?.Doctor_Name },
                { label: "Ward Number", value: deviceLogsData?.data?.Ward_No },
                { label: "Bio-Med", value: deviceLogsData?.data?.Bio_Med },
              ].map(({ label, value }, idx) => (
                <div key={idx} className={`${Style.detialsOfDid} shadow`}>
                  <div className="card-header" style={{ fontSize: '0.9rem' }}>
                    {label}
                  </div>
                  <span style={{ padding: '0.8rem 0 0' }}>{value}</span>
                </div>
              ))}
            </div>
            <Row className="mt-3">
              <TableCard1 borderRadius="20px 20px 20px 20px">
                <>
                  <div className={Style.Tabs}>
                    {tabs.map((tab, idx) =>
                      (!tab.isAdmin || adminProfile === 'Super-Admin') && (
                        <button
                          key={idx}
                          className={activeTab === idx ? 'btn text-black' : 'btn-light'}
                          onClick={() => handleTabClick(idx)}
                          style={{ padding: '10px', fontSize: '0.9rem', width: "7rem",color:'white' }}
                        >
                          {tab.label}
                        </button>
                      )
                    )}
                    {(activeTab === 0 || activeTab === 1 || activeTab === 3) && (
                      <div className="d-flex align-items-center gap-2">
                        <input
                          type="text"
                          placeholder="Search..."
                          onKeyUp={handleSearch}
                          onChange={(e) => e.target.value === '' && handleSearch(e)}
                          style={{ padding: '10px', width: '100%' }}
                        />
                        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff', borderRadius: '8px', padding: '8px', width: '250px' }}>
                          <DatePicker
                          style={{border:'0px'}}
                            startDate={dateRange}
                            placeholder="Select Date Range"
                            format="DD-MM-YYYY"
                            range
                            onChange={handleChange}
                          />
                          <CiCalendarDate size={25} />
                        </div>
                      </div>
                    )}
                  </div>
                  <section className={Style.tableHeader}>
                    {tabs[activeTab]?.component}
                  </section>
                </>
              </TableCard1>
            </Row>
          </div>
        </div>
      </Row>
    </div>
  );
}