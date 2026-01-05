import React, { useEffect, useState } from 'react'
import Style from "../../css/Live.module.css"

function AlarmsDataTiles({ deviceId, socket }) {
    const [alarmData, setAlarmData] = useState()

    const [advancedText, setAdvancedText] = useState(false);
    useEffect(()=>{
        socket?.on('NodeToReactAlarm', data => {
            var value = data.split("^")[0];
            console.log('data2',data)
            if (value===deviceId) {
                const alarmData = data.split("^")[1]
                setAlarmData(alarmData)
            }
        })
    },[])
    const handleClickBasic = () => {
        setAdvancedText(false)
    }
    const handleClickAdvanced = () => {
        setAdvancedText(true)
    }
    return (
        <div className='mainAlertContainer' style={{ display: 'flex', width: '100%' }}>
            {/* {alarmData?.length>0? */}
            <div style={{ display: 'flex', gap: '6rem', flexWrap: 'wrap', backgroundColor: 'white', width: '85%', padding: '20px 40px', margin: '5px' }}>
                <div className='ContainerDiv' style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                    {/* upperdiv */}
                    <div>
                        <span style={{color:'black',fontSize:'1rem'}}>
                            PIP
                        </span>
                        <div>
                            <div style={{ width: '110px', height: '110px', backgroundColor: 'green', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '100px' }}>
                                <div style={{ width: '90px', height: '90px', backgroundColor: 'white', borderRadius: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <span style={{color:'black',fontSize:'1rem'}}>{alarmData?.split(",")[0]}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* center div */}
                    <div style={{ height: '120px', width: '10px', backgroundColor: '#808080' }}>
                    </div>
                    {/* bottom div */}
                    <div>

                        <div>
                            <div style={{ width: '110px', height: '110px', backgroundColor: 'green', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '100px' }}>
                                <div style={{ width: '90px', height: '90px', backgroundColor: 'white', borderRadius: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <span  style={{color:'black',fontSize:'1rem'}}>{alarmData?.split(",")[1]}</span>
                                </div>
                            </div>
                        </div>
                        <span  style={{color:'black',fontSize:'1rem'}}>
                            cmH2O
                        </span>
                    </div>
                </div>
                <div className='ContainerDiv' style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                    {/* upperdiv */}
                    <div>
                        <span style={{color:'black',fontSize:'1rem'}}>
                            VTe
                        </span>
                        <div>
                            <div style={{ width: '110px', height: '110px', backgroundColor: 'green', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '100px' }}>
                                <div style={{ width: '90px', height: '90px', backgroundColor: 'white', borderRadius: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <span style={{color:'black',fontSize:'1rem'}}>{alarmData?.split(',')[2]}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* center div */}
                    <div style={{ height: '120px', width: '10px', backgroundColor: '#808080' }}>

                    </div>

                    {/* bottom div */}
                    <div>

                        <div>
                            <div style={{ width: '110px', height: '110px', backgroundColor: 'green', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '100px' }}>
                                <div style={{ width: '90px', height: '90px', backgroundColor: 'white', borderRadius: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <span style={{color:'black',fontSize:'1rem'}}>{alarmData?.split(',')[3]}</span>
                                </div>
                            </div>
                        </div>
                        <span style={{color:'black',fontSize:'1rem'}}>
                            mL
                        </span>
                    </div>
                </div>
                <div className='ContainerDiv' style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                    {/* upperdiv */}
                    <div>
                        <span style={{color:'black',fontSize:'1rem'}}>
                            PEEP
                        </span>
                        <div>
                            <div style={{ width: '110px', height: '110px', backgroundColor: 'green', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '100px' }}>
                                <div style={{ width: '90px', height: '90px', backgroundColor: 'white', borderRadius: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <span style={{color:'black',fontSize:'1rem'}}>{alarmData?.split(',')[4]}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* center div */}
                    <div style={{ height: '120px', width: '10px', backgroundColor: '#808080' }}>

                    </div>

                    {/* bottom div */}
                    <div>

                        <div>
                            <div style={{ width: '110px', height: '110px', backgroundColor: 'green', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '100px' }}>
                                <div style={{ width: '90px', height: '90px', backgroundColor: 'white', borderRadius: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <span style={{color:'black',fontSize:'1rem'}}>{alarmData?.split(',')[5]}</span>
                                </div>
                            </div>
                        </div>
                        <span style={{color:'black',fontSize:'1rem'}}>
                            cmH2O
                        </span>
                    </div>
                </div>
                <div className='ContainerDiv' style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                    {/* upperdiv */}
                    <div>
                        <span style={{color:'black',fontSize:'1rem'}}>
                            RR
                        </span>
                        <div>
                            <div style={{ width: '110px', height: '110px', backgroundColor: 'green', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '100px' }}>
                                <div style={{ width: '90px', height: '90px', backgroundColor: 'white', borderRadius: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <span style={{color:'black',fontSize:'1rem'}}>{alarmData?.split(',')[6]}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* center div */}
                    <div style={{ height: '120px', width: '10px', backgroundColor: '#808080' }}>

                    </div>

                    {/* bottom div */}
                    <div>

                        <div>
                            <div style={{ width: '110px', height: '110px', backgroundColor: 'green', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '100px' }}>
                                <div style={{ width: '90px', height: '90px', backgroundColor: 'white', borderRadius: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <span style={{color:'black',fontSize:'1rem'}}>{alarmData?.split(',')[7]}</span>
                                </div>
                            </div>
                        </div>
                        <span style={{color:'black',fontSize:'1rem'}}>
                            bpm
                        </span>
                    </div>
                </div>
                <div className='ContainerDiv' style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                    {/* upperdiv */}
                    <div>
                        <span style={{color:'black',fontSize:'1rem'}}>
                            MVe
                        </span>
                        <div>
                            <div style={{ width: '110px', height: '110px', backgroundColor: 'green', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '100px' }}>
                                <div style={{ width: '90px', height: '90px', backgroundColor: 'white', borderRadius: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <span style={{color:'black',fontSize:'1rem'}}>{alarmData?.split(',')[8]}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* center div */}
                    <div style={{ height: '120px', width: '10px', backgroundColor: '#808080' }}>

                    </div>

                    {/* bottom div */}
                    <div>

                        <div>
                            <div style={{ width: '110px', height: '110px', backgroundColor: 'green', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '100px' }}>
                                <div style={{ width: '90px', height: '90px', backgroundColor: 'white', borderRadius: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <span style={{color:'black',fontSize:'1rem'}}>{alarmData?.split(',')[9]}</span>
                                </div>
                            </div>
                        </div>
                        <span style={{color:'black',fontSize:'1rem'}}>
                            litre
                        </span>
                    </div>
                </div>
            </div>
            {/* buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '5px' }}>
                <button className={advancedText===false ? Style.textColorBefore : Style.textColorAfter} onClick={handleClickBasic}>Basic</button>
                {/* <button className={advancedText===true ? Style.textColorBefore : Style.textColorAfter} onClick={handleClickAdvanced}>Advanced</button> */}
            </div>
        </div>
    )
}

export default AlarmsDataTiles