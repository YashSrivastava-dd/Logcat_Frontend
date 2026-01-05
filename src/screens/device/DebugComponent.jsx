import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';
var socket = null
// const serverUrl = `http://172.22.100.108:8000`

function DebugComponent(serverUrl) {
console.log('serverUrl',serverUrl)
    const [debugData, setDebugData] = useState('')
    const [ventiText, setVentiText] = useState('Start Venti Data')
    const [knobText, setKnobText] = useState('Stop Knob Data')

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const deviceId = urlParams.get('DeviceId')


    useEffect(() => {
        socket = io.connect(serverUrl?.serverUrl, () => {
        })
    }, [])

    useEffect(() => {
        // socket.on('ReactReceivingDebugCommand', (data) => {
        //     let deviceIdData = data?.split("^")[0]
        //     let valuesData = data?.split("^")[1]
        //     if (deviceId === deviceIdData) {
        //         setDebugData(valuesData)
        //         return;
        //     }
        // })

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

    }, [])
    console.log('debugData', debugData)
    return (
        <div className="min-h-screen bg-gray-100" style={{ width: '100%' }}>
            <div className='flex'>
                {ventiText === 'Start Venti Data' ?
                    <button onClick={() => { socket?.emit('ReactSendingDebugCommand', deviceId + '^Stop Venti Data') }} style={ventiText === 'Start Venti Data'?{width: '16rem',backgroundColor:'green',color:'white'}:{width: '16rem',backgroundColor:'gray',color:'black'}  } className=" py-3 m-4 rounded ">Start Venti Data</button>
                    :
                    <button onClick={() => { socket?.emit('ReactSendingDebugCommand', deviceId + '^Start Venti Data') }} style={{ width: '16rem' }} className=" py-3 m-4 bg-gray-300 rounded ">Start Venti Data</button>
                }
                {knobText === 'Start Knob Data' ?
                    <button onClick={() => { socket?.emit('ReactSendingDebugCommand', deviceId + '^Stop Knob Data') }} style={knobText === 'Start Knob Data'?{width: '16rem',backgroundColor:'green',color:'white'}:{width: '16rem',backgroundColor:'gray',color:'white'}  } className=" py-3 m-4  rounded ">Start Knob Data</button>
                    : <button onClick={() => { socket?.emit('ReactSendingDebugCommand', deviceId + '^Start Knob Data') }} style={{ width: '18rem' }} className=" py-3 m-4 bg-gray-300 rounded ">Start Knob Data</button>
                }
            </div>
            <div className="bg-black p-2 mx-4" style={{ height: '80%' }}>
                <h4 className='text-white p-2'>MAKJHJ:230</h4>
                <h4 className='text-white p-2'>MAKJHJ:230</h4>
                <h4 className='text-white p-2'>MAKJHJ:230</h4>
                <h4 className='text-white p-2'>MAKJHJ:230</h4>
                <h4 className='text-white p-2'>MAKJHJ:230</h4>
                <h4 className='text-white p-2'>MAKJHJ:230</h4>
                <h4 className='text-white p-2'>MAKJHJ:230</h4>
            </div>
        </div>
    )
}

export default DebugComponent