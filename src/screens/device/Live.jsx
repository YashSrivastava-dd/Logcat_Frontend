// Live.js
import React from 'react';
import alarmUnMute from '../../assets/images/alarmumute-2.png';
import alarmMute from '../../assets/images/alarmMute.png';
import chargingConnect from '../../assets/images/plug.png';
import charging from '../../assets/images/Charging.png';
import discharging from '../../assets/images/discharge.png';
import Betteryfull from '../../assets/images/Betteryfull.png';
import Betterylow from '../../assets/images/Betterylow.png';
import Betterylowup from '../../assets/images/Betterylowup.png';
import Betterymedium from '../../assets/images/Betterymedium.png';
import { useNavigate } from 'react-router';
import lungs from '../../assets/icons/lungs.png';
import { IoExitOutline } from "react-icons/io5";
import DynamicGraphData from "./DynamicGraphData"
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Toaster } from 'react-hot-toast';
import Style from "../../css/Live.module.css"
import ControlesDataTiles from './ControlesDataTiles';
import AlarmsDataTiles from './AlarmsDataTiles';
// const serverUrl = 'http://192.168.2.1:8000/';
const serverUrl = `${process.env.REACT_APP_BASE_URL}/`

var socket = null
function Live() {
  const [dataArray, setDataArray] = useState([]);
  const [mode, setMode] = useState([])
  const [perameters, setParameters] = useState([])
  const [observer, setObserver] = useState([])
  const [spo2List, setSpo2List] = useState([])
  const [alertData, setAlertData] = useState([])
  const [batteryAlarmData, setBatteryData] = useState([])
  const [btnChange, setBtnChange] = useState('black')
  const [seconds, setSeconds] = useState(300);
  // let zoom = (( window.outerWidth - 10 ) / window.innerWidth) * 100;
  // 2 Minute timmer functionality

  useEffect(() => {
    socket = io.connect(serverUrl, () => {
    })
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(prevSeconds => prevSeconds - 1);
      }
    }, 1000);
    if (seconds <= 0) {
      socket?.emit('ReactNodeStop', deviceId)
      socket?.emit('ReactNodeStopGraph', deviceId)
      navigate(`/deviceOverview?code=${code}&projectName=${projectName}&DeviceId=${deviceId}`)
    }
    return () => {
      clearInterval(timer);
    };
  }, [seconds]);

  const formatTime = () => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return (`${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`)
  };
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const deviceId = urlParams.get('DeviceId')
  const projectName = urlParams.get('projectName');
  const code = urlParams.get('code');
  const navigate = useNavigate()
  const handleClose = () => {
    socket?.emit('ReactNodeStop', deviceId)
    socket?.emit('ReactNodeStopGraph', deviceId)
    navigate(`/deviceOverview?code=${code}&projectName=${projectName}&DeviceId=${deviceId}`)
  };

  const [rohan, setRohan] = useState("Loading...")


  const [graphSocketData, setGraphSocketData] = useState()
  const [usbCheck, setUsbCheck] = useState()


  useEffect(() => {
    const connectToServer = async () => {
      try {
        await io.connect();
        console.log('Connected to server');
        checkServerStatus();
      } catch (error) {
        console.error('Error connecting to server:', error);
      }
    };
    connectToServer()
    
    socket?.on('DataReceivingReact', data => {
      console.log('data', data)
      var value = data.split("^")[0];
      if (value===deviceId) {
        const modeData = data.split("^")[1] ? data.split("^")[1] : ''
        const observedData = data.split("^")[2].split(",") ? data.split("^")[2].split(",") : ''
        const setParameter = data.split("^")[3].split(",") ? data.split("^")[3].split(",") : ''
        const secondaryObserved = data.split("^")[4].split(",") ? data.split("^")[4].split(",") : ''
        const spo2List = data.split("^")[5].split(",") ? data.split("^")[5].split(",") : ''
        const alertData = data.split("^")[6] ? data.split("^")[6] : ''
        const batteryAlarmData = data.split("^")[7] ? data.split("^")[7] : '';
        let usbCheckData = 'true,true';
        try {
          usbCheckData = data?.split("^")[8] ? data?.split("^")[8] : '';

        } catch (error) {
          usbCheckData = 'true,true';
        }
        setDataArray(observedData)
        setMode(modeData)
        setParameters(setParameter)
        setObserver(secondaryObserved)
        setSpo2List(spo2List)
        setAlertData(alertData)
        setBatteryData(batteryAlarmData)
        setUsbCheck(usbCheckData)
      }
    })

    socket?.on('DataGraphReceivingReact', data => {
      var value = data.split("^")[0];
      if (value===deviceId) {
        const graphData = data.split("^")[1]
        setGraphSocketData(graphData)
      }
    })
    socket?.on('ReceiverVentilatorDisconnected', data => {
      var value = data.split(",")[0];
      setRohan("No Data Found")
      if (value===deviceId) {
        setTimeout(() => {
          navigate(`/deviceOverview?code=${code}&projectName=${projectName}&DeviceId=${deviceId}`)
        }, 1000);
      }
    })

    socket?.emit('ReactStartUp', deviceId)

    socket?.on('disconnect', () => {
      console.log('Disconnected from server');
      setDataArray([]);
    });

    var newDeviceId = deviceId
    var supernewDeviceid = JSON.stringify(newDeviceId)
    console.log("supernewDeviceid1", supernewDeviceid)
    socket?.on(supernewDeviceid, (data) => {
      console.log('Received data:', data);
      console.log("supernewDeviceid2", supernewDeviceid)
    });
    var newDeviceId = deviceId
    var supernewDeviceid = JSON.stringify(newDeviceId)
    const checkServerStatus = () => {
    };
  }, [])
  const detectHistory = () => {
    socket?.emit('ReactNodeStop', deviceId)
    socket?.emit('ReactNodeStopGraph', deviceId)
  }
  useEffect(() => {
    // Attach the event listener when the component mounts
    window.addEventListener("popstate", detectHistory);
  }, []); // Empty dependency array means this effect runs only on mount and unmount

  const [dataBtn, setDataBtn] = useState("btn text-black");
  const [graphDataBtn, setGraphDataBtn] = useState('');
  const [cntrlBtn, setCntrlBtn] = useState('');
  const [alrmBtnTxt, setAlrmBtnTxt] = useState('');
  const [graphBtn, setGraphBtn] = useState(0)
  const [cntrlAlrmBtn, setcntrlAlrmBtn] = useState(true)

  const handleDataBtn = () => {
    setAlrmBtnTxt('')
    setGraphBtn(0)
    setcntrlAlrmBtn(false)
    setDataBtn('btn text-black')
    setGraphDataBtn('')
    setCntrlBtn('')
    socket?.emit('ReactNodeStopGraph', deviceId)
  }
  const handleGraphBtn = () => {
    setGraphBtn(1)
    setcntrlAlrmBtn(false)
    setDataBtn('')
    setCntrlBtn('')
    setAlrmBtnTxt('')
    setGraphDataBtn('btn text-black')
    socket?.emit('ReactStartUpGraph', deviceId)
  }

  const handleCtrnBtn = () => {
    setcntrlAlrmBtn(true)
    setGraphBtn(3)
    setAlrmBtnTxt('')
    setDataBtn('')
    setGraphDataBtn('')
    setCntrlBtn('btn text-black')
    socket?.emit('ReactNodeStopGraph', deviceId)

  }
  const [alarmData, setAlarmData] = useState()
  const handleAlarmBtn = () => {
    setcntrlAlrmBtn(false)
    setGraphBtn(2)
    setDataBtn('')
    setGraphDataBtn('')
    setCntrlBtn('')
    setAlrmBtnTxt('btn text-black')
    socket?.emit('ReactToNodeAlarm', deviceId)
    socket?.emit('ReactNodeStopGraph', deviceId)
  }
  return (
    // <div className={dataArray.length > 0 ?Style.container:Style.containerTwo} id='container'>
    <div className={Style.container} id='container'>
      <Toaster />
      {dataArray.length > 0 ?
        <div className={Style.insideContainer}>
          <div className={Style.upperModel}>
            <div className={Style.liveHeading}>
              <h1 className={Style.model_heading}>{mode}</h1>
              <h5 style={{ color: 'white', width: '1rem' }}>{formatTime()}</h5>
              {batteryAlarmData?.split(",")[4]==="true" ? <img
                src={lungs}
                alt="lungs"
                className={Style.alarmmute_ing}
              />
                : ""
              }
              {batteryAlarmData?.split(',')[5] === 'true' ?
                <span style={{ color: 'white', fontSize: '2rem' }}>M</span>
                : ''}
              {/* </h5> */}
              <h5 style={{ width: "400px", backgroundColor: alertData?.split("~")[1] ? alertData?.split("~")[1] : '', color: alertData?.split("~")[2] ? alertData?.split("~")[2] : '', padding: '22px', fontSize: "1rem" }}>{alertData?.split("~")[0] ? alertData?.split("~")[0] : ""}</h5>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '5rem', width: '30%', alignItems: 'center' }}>
                  {batteryAlarmData?.split(",")[3]==="true" ?
                    <div style={{ backgroundColor: '#f4c430', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                      <img
                        src={alarmMute}
                        alt="alarmMute"
                        className={Style.alarmmute_ing}
                      />
                      <p style={{ color: 'black', fontSize: '10px', padding: '5px', fontWeight: 'bolder' }}>Audio Paused</p>
                    </div>
                    :
                    <img
                      src={alarmUnMute}
                      alt="alarmUnMute"
                      className={Style.alarm_ing}
                    />
                  }
                </div>
                {batteryAlarmData?.split(',')[1] === "charging" ?
                  <img
                    src={charging}
                    alt="battery"
                    className={Style.charging_ing}
                  /> :
                  batteryAlarmData?.split(',')[1] === "full" ?
                    <img
                      src={Betteryfull}
                      alt="battery"
                      className={Style.charging_ing}
                    /> :
                    batteryAlarmData?.split(',')[1] === "medium" ?
                      <img
                        src={Betterymedium}
                        alt="battery"
                        className={Style.charging_ing}
                      /> :
                      batteryAlarmData?.split(',')[1] === "half" ?
                        <img
                          src={Betterylowup}
                          alt="battery"
                          className={Style.charging_ing}
                        /> :
                        <img
                          src={Betterylow}
                          alt="battery"
                          className={Style.charging_ing}
                        />
                }
                {batteryAlarmData?.split(',')[2].length > 0 ? <h2 style={{ color: 'white' }}>{batteryAlarmData?.split(',')[2]}%</h2> : ''}
                {batteryAlarmData?.split(",")[0]==="true" ?
                  <img
                    src={discharging}
                    alt="discharging"
                    className={Style.charging_ing}
                  />
                  :
                  <img
                    src={chargingConnect}
                    alt="chargingConnect"
                    className={Style.discharging_ing}
                  />}
                <div style={{ display: 'flex', gap: '25px' }}>
                  {usbCheck.split(",")[1] === 'true' ?
                    <>
                      <span style={{ width: '15px', height: '15px', borderRadius: '50px', backgroundColor: 'green' }}> </span>
                      
                    </>
                    :
                    <>
                      <span style={{ width: '15px', height: '15px', borderRadius: '50px', backgroundColor: 'red' }}>
                      </span>
                    </>
                  }
                  {usbCheck.split(",")[0] === 'true' ?
                    <>
                      <span style={{ width: '15px', height: '15px', borderRadius: '50px', backgroundColor: 'green' }}> </span>
                      
                    </>
                    :
                    <>
                      <span style={{ width: '15px', height: '15px', borderRadius: '50px', backgroundColor: 'red' }}>
                      </span>
                    </>
                  }
                </div>
                <div
                  style={{
                    cursor: 'pointer',
                  }}
                  className={Style.exitBtn}
                  onClick={handleClose}
                >
                  <IoExitOutline className={Style.cross_ing} value={{ color: 'white' }} />
                </div>
                <div style={{ border: '1px solid #606060', display: 'flex', marginBottom: '-16px', height: '5.5rem' }}>
                  {spo2List?.map((item, index) => {
                    return (
                      <div key={index} style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", textAlign: 'center', color: '#787878', width: '7.5rem' }}>
                        <h6 style={{ color: 'white' }}>{item.split("~")[0]}</h6>
                        <h6 style={{ color: 'white' }}>{item.split("~")[1]}</h6>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className={graphBtn===false ? Style.formDataa : Style.formData}>
            <div className={Style.leftDataForm}>
              <h5>
                <button className={dataBtn} onClick={handleDataBtn} defaultChecked style={{ width: '12rem', height: '3.5rem', borderRadius: '0px', textAlign: 'left' }}>
                  DATA
                </button>
              </h5>
              <h5>
                <button className={alrmBtnTxt} onClick={handleAlarmBtn} defaultChecked style={{ width: '12rem', height: '3.5rem', borderRadius: '0px', textAlign: 'left' }}>
                  ALARMS
                </button>
              </h5>
              <h5>LOOPS</h5>
              <h5>
                <button className={graphDataBtn} onClick={handleGraphBtn} style={{ width: '12rem', height: '3.5rem', borderRadius: '0px', textAlign: 'left' }}>
                  GRAPHS
                </button>
              </h5>
              <h5>MODES</h5>
              <h5>
                <button className={cntrlBtn} onClick={handleCtrnBtn} style={{ width: '12rem', height: '3.5rem', borderRadius: '0px', textAlign: 'left' }}>
                  CONTROLS
                </button>
              </h5>
              <h5>SYSTEM</h5>
            </div>
            {/* GRAPH TILES DIV */}
            {graphBtn === 0 ?
              <div className={Style.mainData}>
                {dataArray?.map((label, index) => (
                  <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', gap: "1rem" }}>
                    <span style={{ color: "white", fontSize: 20 }}>{label.split("~")[0]}</span>
                    <span style={{ color: "white", fontSize: 15 }}>{label.split("~")[1] === "null" ? "-" : label.split("~")[1]}</span>
                  </div>
                ))}
              </div>
              :
              graphBtn === 1 ?
                <div className={Style.graphData} style={{ marginTop: "1rem", width: "85%", display: "flex", justifyContent: "space-between" }}>
                  <DynamicGraphData style={{ position: 'fixed' }} data={graphSocketData} />
                </div>
                : graphBtn === 2 ?
                  <div className={Style.graphData} style={{ marginTop: "1rem", width: "85%", display: "flex", justifyContent: "space-between" }}>
                    <AlarmsDataTiles style={{ position: 'fixed' }} deviceId={deviceId} alarmData={alarmData} socket={socket} />
                  </div> :
                  <div className={Style.graphData} style={{ marginTop: "1rem", width: "85%", display: "flex", justifyContent: "space-between" }}>
                    <ControlesDataTiles style={{ position: 'fixed' }} deviceId={deviceId} handleDataBtn={handleDataBtn} socket={socket} />
                  </div>
            }
            {/* CONTROLES TILES DIV */}
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '-16px' }}>
              {observer?.map((item, index) => {
                return (
                  <div key={index} style={{ textAlign: "start", color: '#787878', width: '15rem', border: '1px solid #606060', padding: '0.8rem', height: '8rem' }}>
                    <h6>{item.split("~")[0]}</h6>
                    <h1 style={{ textAlign: 'end', color: 'white', fontSize: '2rem' }}>{item.split("~")[1]}</h1>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='lower_model' style={{ marginTop: "1rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              {perameters?.map((item, index) => {
                return (
                  <div key={index} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", textAlign: 'center', color: '#787878', width: '12rem', height: '9rem', border: '1px solid #606060', padding: '1rem' }}>
                    <h6>{item.split("~")[0]}</h6>
                    <h1 style={{ color: 'white' }}>{item.split("~")[1]}</h1>
                    <h6>{item.split("~")[2]}</h6>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        :
        <div style={{ display: 'flex', position: 'relative', top: '50%', justifyContent: 'center', backgroundColor: "black", width: '100%' }}>
          <h5 style={{ color: "white" }}>{rohan}</h5>
        </div>
      }
    </div>
  );
}
export default Live;