import React, { useEffect, useState } from 'react';
import back from "../../assets/images/back.png";
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router';

const serverUrl = `${process.env.REACT_APP_BASE_URL}/`

var socket = null
function DiagnosticCheck() {
    const navigate = useNavigate();
    const [conditionText, setConditionText] = useState('Start Diagnostic')
    const [oxygenText, setOxygenText] = useState('Start Oxygen')
    const [turbineTextCond, setTurbineTextCond] = useState('Start Turbine')
    const [exhaleText, setExhaleText] = useState('Start Exhale')
    const [nebulizerTextCond, setNebulizerTextCond] = useState('Start Nebulizer')
    const [purgeTextCond, setPurgeTextCond] = useState('Start Purge')
    const [ledTextCondition, setLedTextCondition] = useState('Start Red LED')
    const [ledTextConditionA, setLedTextConditionA] = useState('Start Amber LED')
    const [debugText, setDebugText] = useState('Start Debug')
    const [debugData, setDebugData] = useState('')
    const [ventiText, setVentiText] = useState('Start Venti Data')
    const [knobText, setKnobText] = useState('Stop Knob Data')
    const [rangeData, setRangeData] = useState(null);
    const [disgnosticData, setDiagnosticData] = useState('')
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const deviceId = urlParams.get('DeviceId')
    const projectName = urlParams.get('projectName')
    const projectCode = urlParams.get('projectCode')


    const [debugstate, setDebugState] = useState(false);
    // Fix: Convert string to number
    let [range1, setRange1] = useState(0);
    let [range2, setRange2] = useState(0);
    let [range3, setRange3] = useState(0);

    useEffect(() => {
        if (rangeData) {
            const values = rangeData.split(",").map(Number); // Convert values to numbers
            setRange1(values[0] || 0);
            setRange2(values[1] || 0);
            setRange3(values[2] || 0);
        }
    }, [rangeData]); // Run effect whenever rangeData changes

    // Handle increment
    const handleIncrement = (name) => {
        if (name === "range1") setRange1((prev) => (prev < 100 ? prev + 1 : prev));
        else if (name === "range2") setRange2((prev) => (prev < 100 ? prev + 1 : prev));
        else if (name === "range3") setRange3((prev) => (prev < 100 ? prev + 1 : prev));
    };

    // Handle decrement
    const handleDecrement = (name) => {
        if (name === "range1") setRange1((prev) => (prev > 0 ? prev - 1 : 0));
        else if (name === "range2") setRange2((prev) => (prev > 0 ? prev - 1 : 0));
        else if (name === "range3") setRange3((prev) => (prev > 0 ? prev - 1 : 0));
    };

    const handleChange = (e, setter) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) { // Only allow numbers
            const numericValue = Math.min(Number(value), 100); // Ensure max 100
            setter(numericValue);
        }
    };
    useEffect(() => {
        socket = io.connect(serverUrl, () => {
        })
    }, [])

    useEffect(() => {
        const connectToServer = async () => {
            try {
                await io.connect();
                console.log('Connected to server');
                // checkServerStatus();
            } catch (error) {
                console.error('Error connecting to server:', error);
            }
        };
        connectToServer()
        socket?.emit('ReactStartUp', deviceId)
        socket?.on('disconnect', () => {
            console.log('Disconnected from server');
        });
        socket?.on('DataReceivingReactDiagnostic', data => {
            let newData = data.split("^")[1]
            var deviceIdValue = data.split("^")[0];
            if (deviceIdValue===deviceId) {
                setDiagnosticData(newData)
                return;
            }
        })
        socket?.on('ReactReceivingRange', data => {
            let socketDeviceId = data?.split("^")[0];
            let rangeValue = data?.split('^')[1];
            if (deviceId === socketDeviceId) {
                setRangeData(rangeValue)
                return;
            }
        })

        socket?.on('ReactReceivingDebugCommand', data => {
            var value = data.split("^")[0];
            var newTextValue = data.split("^")[1];
            console.log('data', data)
            if (value===deviceId) {
                switch (newTextValue) {
                    case 'Start Venti Data':
                        setVentiText(newTextValue)
                        break;
                    case 'Stop Venti Data':
                        setVentiText(newTextValue)
                        break;
                    case 'Start Knob Data':
                        setKnobText(newTextValue)
                        break;
                    case 'Stop Knob Data':
                        setKnobText(newTextValue)
                        break;
                    default:
                        break;
                }
            }
        })

        socket.on('DataReceivingReactDebug', (data) => {
            let deviceIdData = data?.split("^")[0]
            let valuesData = data?.split("^")[1]
            if (deviceId === deviceIdData) {
                setDebugData(valuesData)
                return;
            }
        })

        socket?.on('ReactReceivingDebugCommand', data => {
            var value = data.split("^")[0];
            var newTextValue = data.split("^")[1];
            if (value===deviceId) {
                switch (newTextValue) {
                    case 'Start Debug':
                        setDebugText(newTextValue)
                        break;
                    case 'Stop Debug':
                        setDebugText(newTextValue)
                        break;
                    default:
                        break;
                }
            }
        })

        socket?.on('ReactReceiveCommand', data => {
            var value = data.split("^")[0];
            var newTextValue = data.split("^")[1];
            if (value===deviceId) {
                switch (newTextValue) {
                    case 'Loading Diagnostic':
                        setConditionText(newTextValue)
                        break;
                    case 'Start Diagnostic':
                        setConditionText(newTextValue)
                        break;
                    case 'Stop Diagnostic':
                        setConditionText(newTextValue)
                        break;
                    case 'Start Turbine':
                        setTurbineTextCond(newTextValue)
                        break;
                    case 'Stop Turbine':
                        setTurbineTextCond(newTextValue)
                        break;
                    case 'Start Oxygen':
                        setOxygenText(newTextValue)
                        break;
                    case 'Stop Oxygen':
                        setOxygenText(newTextValue)
                        break;
                    case 'Start Exhale':
                        setExhaleText(newTextValue)
                        break;
                    case 'Stop Exhale':
                        setExhaleText(newTextValue)
                        break;
                    case 'Start Nebulizer':
                        setNebulizerTextCond(newTextValue)
                        break;
                    case 'Stop Nebulizer':
                        setNebulizerTextCond(newTextValue)
                        break;
                    case 'Start Purge':
                        setPurgeTextCond(newTextValue)
                        break;
                    case 'Stop Purge':
                        setPurgeTextCond(newTextValue)
                        break;
                    case 'Start Red LED':
                        setLedTextCondition(newTextValue)
                        break;
                    case 'Stop Red LED':
                        setLedTextCondition(newTextValue)
                        break;
                    case 'Start Amber LED':
                        setLedTextConditionA(newTextValue)
                        break;
                    case 'Stop Amber LED':
                        setLedTextConditionA(newTextValue)
                        break;
                    default:
                        break;
                }
            }
        })

        socket?.on('ReceiverVentilatorDisconnected', data => {
            var value = data.split(",")[0];
            // setRohan("No Data Found")
            if (value===deviceId) {
                setTimeout(() => {
                    window.history.go(-1)
                }, 1000);
            }
        })
    }, [])


    const handelClick = () => {
        socket?.emit('ReactNodeStop', deviceId)
        navigate(`/deviceOverview?code=SBXMH&projectName=${projectName}&DeviceId=${deviceId}&projectCode=${projectCode}`)
    }

    const handelSendValue = (e) => {
        e.preventDefault();
        socket.emit('ReactSendingRange', deviceId + "^" + `${range1},${range2},${range3}`)
    }
    return (
        <>
            <div className='flex'>
                <button
                    onClick={handelClick}
                    style={{ border: "0px", backgroundColor: "white" }}
                >
                    <img src={back} style={{ width: "3rem" }} />
                </button>
                <h1 className="text-3xl font-bold text-gray-700 mb-6 p-4">Diagnostic Tool Check</h1>
            </div>
            <div className="flex min-h-screen bg-gray-100 justify-between">
                {debugText === 'Stop Debug' ?
                    <div className="min-h-screen bg-gray-100" style={{ width: '100%' }}>
                        <div className='flex'>
                            {ventiText === 'Start Venti Data' ?
                                <button onClick={() => { socket?.emit('ReactSendingDebugCommand', deviceId + '^Stop Venti Data') }} style={ventiText === 'Start Venti Data' ? { width: '16rem', backgroundColor: 'green', color: 'white' } : { width: '16rem', backgroundColor: 'gray', color: 'black' }} className=" py-3 m-4 rounded ">Start Venti Data</button>
                                :
                                <button onClick={() => { socket?.emit('ReactSendingDebugCommand', deviceId + '^Start Venti Data') }} style={{ width: '16rem' }} className=" py-3 m-4 bg-gray-300 rounded ">Start Venti Data</button>
                            }
                            {knobText === 'Start Knob Data' ?
                                <button onClick={() => { socket?.emit('ReactSendingDebugCommand', deviceId + '^Stop Knob Data') }} style={knobText === 'Start Knob Data' ? { width: '16rem', backgroundColor: 'green', color: 'white' } : { width: '16rem', backgroundColor: 'gray', color: 'white' }} className=" py-3 m-4  rounded ">Start Knob Data</button>
                                : <button onClick={() => { socket?.emit('ReactSendingDebugCommand', deviceId + '^Start Knob Data') }} style={{ width: '18rem' }} className=" py-3 m-4 bg-gray-300 rounded ">Start Knob Data</button>
                            }
                        </div>
                        <div className="bg-black p-2 mx-4" style={{ height: '85%' }}>
                            {debugData?.split('|')?.map((item, index) => {
                                return (
                                    <h4 className='text-white p-2' key={index}>{item}</h4>
                                )
                            })}
                        </div>
                    </div>
                    :
                    conditionText === 'Start Diagnostic' ?
                        <div className="flex min-h-screen bg-gray-100 justify-center text-center items-center" style={{ width: '100%' }}>
                            <span>Start Diagnos for data </span>
                        </div> :
                        conditionText === 'Loading Diagnostic' ?
                            <div className="flex min-h-screen bg-gray-100 justify-center text-center items-center" style={{ width: '100%' }}>
                                <span>Loading data...</span>
                            </div>
                            :
                            <div className="flex min-h-screen bg-gray-100" style={{ width: '100%' }}>
                                <div className="flex flex-col w-2/3 bg-white p-8  rounded-lg mt-4 ml-4" style={{ width: '55%' }}>
                                    <div className="grid grid-cols-1 gap-6">
                                        <div className="flex justify-between border-b pb-2">
                                            <span className='text-black'>INSP Pressure Raw</span>
                                            <span className='text-black'>{disgnosticData.split(',')[0]}</span>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className='text-black'>INSP Pressure</span>
                                            <span className='text-black'>{disgnosticData.split(',')[1]}</span>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className='text-black'>INSP Flow</span>
                                            <span className='text-black'>{disgnosticData.split(',')[2]}</span>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className='text-black'>INSP Flow Voltage</span>
                                            <span className='text-black'>{disgnosticData.split(',')[3]}</span>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className='text-black'>EXP Pressure Raw</span>
                                            <span className='text-black'>{disgnosticData.split(',')[4]}</span>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className='text-black'>EXP Pressure</span>
                                            <span className='text-black'>{disgnosticData.split(',')[5]}</span>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className='text-black'>EXP Flow</span>
                                            <span className='text-black'>{disgnosticData.split(',')[6]}</span>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className='text-black'>EXP DP Raw</span>
                                            <span className='text-black'>{disgnosticData.split(',')[7]}</span>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className='text-black'>OXY Pressure Raw</span>
                                            <span className='text-black'>{disgnosticData.split(',')[8]}</span>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className='text-black'>OXY Pressure</span>
                                            <span className='text-black'>{disgnosticData.split(',')[9]}</span>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className='text-black'>OXY Sensor Voltage</span>
                                            <span className='text-black'>{disgnosticData.split(',')[10]}</span>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className='text-black'>Battery Current</span>
                                            <span className='text-black'>{disgnosticData.split(',')[11]}</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b pb-2">
                                            <span className='text-black'>Battery Voltage</span>
                                            <span className='text-black'>{disgnosticData.split(',')[12]}</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b pb-2">
                                            <span className='text-black'>Battery SOC</span>
                                            <span className='text-black'>{disgnosticData.split(',')[13]}</span>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className='text-black'>Battery Remaining Time</span>
                                            <span className='text-black'>{disgnosticData.split(',')[14]}</span>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className='text-black'>Battery Charging Status</span>
                                            <span className='text-black'>{disgnosticData.split(',')[15]}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col w-2/3 bg-white p-8  rounded-lg mt-4" style={{ width: '55%' }}>
                                    <div className="grid grid-cols-1 gap-6">
                                        <div className="flex justify-between border-b pb-2">
                                            <span className='text-black'>Power Connection</span>
                                            <span className='text-black'>{disgnosticData.split(',')[16]}</span>
                                        </div>

                                        <div className="flex justify-between border-b pb-2">
                                            <span className='text-black'>Mains Switch</span>
                                            <span className='text-black'>{disgnosticData.split(',')[17]}</span>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className='text-black'>Spo2 Connection</span>
                                            <span className='text-black'>{disgnosticData.split(',')[18]}</span>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className='text-black'>Heart Rate</span>
                                            <span className='text-black'>{disgnosticData.split(',')[19]}</span>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className='text-black'>SpO2</span>
                                            <span className='text-black'>{disgnosticData.split(',')[20]}</span>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className='text-black'>Pi Temp</span>
                                            <span className='text-black'>{disgnosticData.split(',')[21]}</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b pb-2">
                                            <span className='text-black'>Screen CPU Temp</span>
                                            <span className='text-black'>{disgnosticData.split(',')[22]}</span>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className='text-black'>Pi CPU Load</span>
                                            <span className='text-black'>{disgnosticData.split(',')[23]}</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b pb-2">
                                            <span className='text-black'>Knob PCB Type</span>
                                            <span className='text-black'>{disgnosticData.split(',')[24]}</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b pb-2">
                                            <span className='text-black'>Knob PCB Version</span>
                                            <span className='text-black'>{disgnosticData.split(',')[25]}</span>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className='text-black'>Hardware Version</span>
                                            <span className='text-black'>{disgnosticData.split(',')[26]}</span>
                                        </div>
                                        {/* Turbine PWM */}
                                        <div className="flex justify-between">
                                            <span className="text-black">Turbine PWM</span>
                                            <div className="flex items-center space-x-2">
                                                <button onClick={() => handleDecrement("range1")} className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400">-</button>
                                                <input
                                                    type="text"
                                                    value={range1}
                                                    onChange={(e) => handleChange(e, setRange1)}
                                                    className="w-16 text-center border rounded"
                                                />
                                                <button onClick={() => handleIncrement("range1")} className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400">+</button>
                                                <button onClick={handelSendValue} className='bg-black text-white px-2 py-1 rounded hover:bg-gray-400'>Submit</button>
                                            </div>
                                        </div>

                                        {/* Exhale Valve PWM */}
                                        <div className="flex justify-between">
                                            <span className="text-black">Exhale Valve PWM</span>
                                            <div className="flex items-center space-x-2">
                                                <button onClick={() => handleDecrement("range2")} className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400">-</button>
                                                <input
                                                    type="text"
                                                    value={range2}
                                                    onChange={(e) => handleChange(e, setRange2)}
                                                    className="w-16 text-center border rounded"
                                                />
                                                <button onClick={() => handleIncrement("range2")} className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400">+</button>
                                                <button onClick={handelSendValue} className='bg-black text-white px-2 py-1 rounded'>Submit</button>
                                            </div>
                                        </div>

                                        {/* Oxygen Valve PWM */}
                                        <div className="flex justify-between">
                                            <span className="text-black">Oxygen Valve PWM</span>
                                            <div className="flex items-center space-x-2">
                                                <button onClick={() => handleDecrement("range3")} className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400">-</button>
                                                <input
                                                    type="text"
                                                    value={range3}
                                                    onChange={(e) => handleChange(e, setRange3)}
                                                    className="w-16 text-center border rounded"
                                                />
                                                <button onClick={() => handleIncrement("range3")} className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400">+</button>
                                                <button onClick={handelSendValue} className='bg-black text-white px-2 py-1 rounded'>Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                }
                {/* Right Sidebar */}
                <div className="bg-white p-6 shadow-lg rounded-lg m-4" style={{ width: '15%' }}>
                    {conditionText === "Start Diagnostic" ?
                        <button onClick={() => {
                            socket?.emit('ReactSendingCommand', deviceId + '^Start Diagnostic')
                            setDebugState(false)
                        }} className="w-full py-3 mb-4 bg-gray-300 text-black rounded ">{conditionText}</button>
                        :
                        conditionText === 'Loading Diagnostic' ?
                            <button disabled style={conditionText === "Loading Diagnostic" ? { backgroundColor: 'red', color: 'white' } : { backgroundColor: 'grey', color: 'black' }} className="w-full py-3 mb-4 rounded ">{conditionText}</button>
                            :
                            <button onClick={() => {
                                socket?.emit('ReactSendingCommand', deviceId + '^Stop Diagnostic')
                            }} style={conditionText === "Stop Diagnostic" ? { backgroundColor: 'red', color: 'white' } : { backgroundColor: 'grey', color: 'black' }} className="w-full py-3 mb-4 rounded ">{conditionText}</button>
                    }
                    {/* turbine */}
                    {turbineTextCond === "Start Turbine" ?
                        <button onClick={() => { socket?.emit('ReactSendingCommand', deviceId + '^Start Turbine') }} className="w-full py-3 mb-4 bg-gray-300 text-black rounded ">{turbineTextCond}</button>
                        :
                        <button onClick={() => { socket?.emit('ReactSendingCommand', deviceId + '^Stop Turbine') }} style={turbineTextCond === 'Stop Turbine' ? { backgroundColor: 'red', color: 'white' } : { backgroundColor: 'grey', color: 'black' }} className="w-full py-3 mb-4 bg-gray-300 rounded ">{turbineTextCond}</button>
                    }
                    {/* oxygen */}
                    {oxygenText === "Start Oxygen" ?
                        <button onClick={() => { socket?.emit('ReactSendingCommand', deviceId + '^Start Oxygen') }} className="w-full py-3 mb-4 bg-gray-300 text-black rounded ">{oxygenText}</button>
                        :
                        <button onClick={() => { socket?.emit('ReactSendingCommand', deviceId + '^Stop Oxygen') }} style={oxygenText === 'Stop Oxygen' ? { backgroundColor: 'red', color: 'white' } : { backgroundColor: 'grey', color: 'black' }} className="w-full py-3 mb-4 bg-gray-300 rounded ">{oxygenText}</button>
                    }
                    {/* exhale valve */}
                    {exhaleText === "Start Exhale" ?
                        <button onClick={() => { socket?.emit('ReactSendingCommand', deviceId + '^Start Exhale') }} className="w-full py-3 mb-4 bg-gray-300 text-black rounded ">{exhaleText}</button>
                        :
                        <button onClick={() => { socket?.emit('ReactSendingCommand', deviceId + '^Stop Exhale') }} style={exhaleText === "Stop Exhale" ? { backgroundColor: 'red', color: 'white' } : { backgroundColor: 'grey', color: 'black' }} className="w-full py-3 mb-4 bg-gray-300 rounded ">{exhaleText}</button>
                    }
                    {/* nebullizer */}
                    {nebulizerTextCond === "Start Nebulizer" ?
                        <button onClick={() => { socket?.emit('ReactSendingCommand', deviceId + '^Start Nebulizer') }} className="w-full py-3 mb-4 bg-gray-300 text-black rounded ">{nebulizerTextCond}</button>
                        :
                        <button onClick={() => { socket?.emit('ReactSendingCommand', deviceId + '^Stop Nebulizer') }} style={nebulizerTextCond === "Stop Nebulizer" ? { backgroundColor: 'red', color: 'white' } : { backgroundColor: 'grey', color: 'black' }} className="w-full py-3 mb-4 bg-gray-300  rounded ">{nebulizerTextCond}</button>
                    }
                    {/* purge */}
                    {purgeTextCond === "Start Purge" ?
                        <button onClick={() => { socket?.emit('ReactSendingCommand', deviceId + '^Start Purge') }} className="w-full py-3 mb-4 bg-gray-300 text-black rounded ">{purgeTextCond}</button>
                        :
                        <button onClick={() => { socket?.emit('ReactSendingCommand', deviceId + '^Stop Purge') }} style={purgeTextCond === "Stop Purge" ? { backgroundColor: 'red', color: 'white' } : { backgroundColor: 'grey', color: 'black' }} className="w-full py-3 mb-4 bg-gray-300   rounded ">{purgeTextCond}</button>
                    }
                    {/* led */}
                    {ledTextCondition === "Start Red LED" ?
                        <button onClick={() => { socket?.emit('ReactSendingCommand', deviceId + '^Start Red LED') }} className="w-full py-3 mb-4 bg-gray-300 rounded ">{ledTextCondition}</button>
                        :
                        <button onClick={() => { socket?.emit('ReactSendingCommand', deviceId + '^Stop Red LED') }} style={ledTextCondition === "Stop Red LED" ? { backgroundColor: 'red', color: 'white' } : { backgroundColor: 'grey', color: 'black' }} className="w-full py-3 mb-4 bg-gray-300  rounded ">{ledTextCondition}</button>
                    }
                    {ledTextConditionA === "Start Amber LED" ?
                        <button onClick={() => { socket?.emit('ReactSendingCommand', deviceId + '^Start Amber LED') }} className="w-full py-3 mb-4 bg-gray-300 rounded ">{ledTextConditionA}</button>
                        :
                        <button onClick={() => { socket?.emit('ReactSendingCommand', deviceId + '^Stop Amber LED') }} style={ledTextConditionA === "Stop Amber LED" ? { backgroundColor: 'red', color: 'white' } : { backgroundColor: 'grey', color: 'black' }} className="w-full py-3 mb-4 bg-gray-300  rounded ">{ledTextConditionA}</button>
                    }
                    {debugText === "Start Debug" ?
                        <button onClick={() => { socket?.emit('ReactSendingDebugCommand', deviceId + '^Start Debug') }} className="w-full py-3 mb-4 bg-gray-300 rounded ">{debugText}</button>
                        :
                        <button onClick={() => { socket?.emit('ReactSendingDebugCommand', deviceId + '^Stop Debug') }} style={debugText === "Stop Debug" ? { backgroundColor: 'red', color: 'white' } : { backgroundColor: 'grey', color: 'black' }} className="w-full py-3 mb-4 bg-gray-300  rounded ">{debugText}</button>
                    }
                </div>
            </div>
        </>
    );
}
export default DiagnosticCheck;