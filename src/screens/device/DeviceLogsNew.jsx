import React, { useEffect, useState, useMemo } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Style from '../../css/device.module.css';
import TableCard1 from '../../container/TableCard1';
import { getDeviceEventsById, getNewDevicesEventsById } from '../../store/action/DeviceAction';
import back from '../../assets/images/back.png';
import EventsOfNewDevices from './components/table/EventsOfNewDevices';
import AlarmsOfNewDevices from './components/table/AlarmsOfNewDevices';
import LogsOfNewDevices from './components/table/LogsOfNewDevices';
import TrendsOfNewData from './components/table/TrendsOfNewData';
import PatientDetailsOfNewData from './components/table/PatientDetailsOfNewData';
import PatientDischarge from './components/table/PatientDischarge';
import Trends from './components/table/Trends';
import DeveloperOptionData from './components/table/DeveloperOptionData';

export default function DeviceLogsNew() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get('code');
  const projectCode = urlParams.get('projectCode');

  const dispatch = useDispatch();
  const { data } = useSelector(state => state.getAllSectionByDeviceId) || {};
  const deviceLogsData = data?.data
  const { adminInfo } = useSelector(state => state.adminLoginReducer) || {};
  const adminProfile = adminInfo?.data?.userType;

  useEffect(() => {
    if (code) dispatch(getDeviceEventsById(code));
  }, [code, dispatch]);

  const [activeTab, setActiveTab] = useState(0);

  const tabComponents = useMemo(() => [
    { label: 'Events', component: <EventsOfNewDevices /> },
    { label: 'Alarms', component: <AlarmsOfNewDevices /> },
    { label: 'Crash Logs', component: <LogsOfNewDevices /> },
    { label: 'Trends', component: projectCode === "004" ? <TrendsOfNewData /> : <Trends /> },
    ...(adminProfile === 'Super-Admin' || adminProfile === 'Nurse'
      ? [{ label: 'Patient Details', component: <PatientDetailsOfNewData /> }]
      : []),
    ...(projectCode !== "007"
      ? [{ label: 'Patient Discharge', component: <PatientDischarge /> }]
      : []),
    ...(adminProfile === 'Super-Admin'
      ? [{ label: 'Developers', component: <DeveloperOptionData /> }]
      : []),
  ], [adminProfile, projectCode]);

  const goBack = () => {
    window.history.back();
  };
  return (
    <div className={Style.rotate}>
      <Row className="rowSection flex justify-center">
        <div className="d-flex rohan justify-content-center">
          <div className={Style.container}>
            <div style={{ width: "100%", display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <Link onClick={goBack}>
                <img src={back} style={{ width: "3rem" }} />
              </Link>
              <h1 style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Device Logs Data</h1>
            </div>
            <div className="d-flex" style={{ gap: '10px' }}>
              {[
                { label: 'Status', value: deviceLogsData?.message },
                { label: 'Alias Name', value: deviceLogsData?.Alias_Name || '- - -' },
                { label: 'Department', value: deviceLogsData?.Department_Name },
                { label: 'Hospital Name', value: deviceLogsData?.Hospital_Name },
                { label: 'Doctor', value: deviceLogsData?.Doctor_Name },
                { label: 'Ward Number', value: deviceLogsData?.Ward_No },
                { label: 'Bio-Med', value: deviceLogsData?.Bio_Med },
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
              <div className={Style.overflowdiv}>
                <TableCard1 borderRadius="20px">
                  <>
                    <div className={Style.Tabs}>
                      {tabComponents.map((tab, idx) => (
                        <button
                          key={idx}
                          className={activeTab === idx ? 'btn text-black' : 'btn-light'}
                          onClick={() => setActiveTab(idx)}
                          style={{
                            width: 'auto',
                            border: 'none',
                            padding: '6px',
                            color: '#fff',
                            fontSize: '0.9rem',
                          }}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                    <section className={Style.tableHeader}>
                      {tabComponents[activeTab]?.component}
                    </section>
                  </>
                </TableCard1>
              </div>
            </Row>
          </div>
        </div>
      </Row>
    </div>
  );
}