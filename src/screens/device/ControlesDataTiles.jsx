import React, { useEffect, useState } from 'react'
import Style from "../../css/Live.module.css"
import { FaWindowClose } from "react-icons/fa";
function ControlesDataTiles({ deviceId, handleDataBtn, socket }) {
    const [advancedData, setAdvancedData] = useState()
    const [apneaData, setApneaData] = useState()
    const [basicsData, setBasicData] = useState()
    const [activeApnia, setActiveApnia] = useState()
    const [activeAdvance, setActiveAdvance] = useState()
    const [advancedText, setAdvancedText] = useState(1);

    useEffect(() => {
        socket?.emit('ReactToNodeBasic', deviceId)
        setAdvancedText(1)
    }, [])

    // apnea socket data receive
    socket?.on('NodeToReactBackup', data => {
        var value = data.split("^")[0];
        if (value===deviceId) {
            const backupData = data.split("^")[2]
            const activeApniaData = data.split("^")[1]
            setApneaData(backupData)
            setActiveApnia(activeApniaData)
        }
    })
    // basic socket data receive
    socket?.on('NodeToReactBasic', data => {
        var value = data.split("^")[0];
        if (value===deviceId) {
            const basicDataa = data.split("^")[1]
            setBasicData(basicDataa)
        }
    })

    // advanced socket data receive
    socket?.on('NodeToReactAdvanced', data => {
        var value = data.split("^")[0];
        if (value===deviceId) {
            const advancedData = data.split("^")[2]
            const activeAdvancedData = data.split("^")[1]
            setAdvancedData(advancedData ? advancedData : data)
            setActiveAdvance(activeAdvancedData)
        }
    })

    // alarm limits
    const handleClickAdvance = () => {
        socket?.emit('ReactToNodeAdvanced', deviceId)
        setAdvancedText(2)
    }
    const handleClickApnea = () => {
        socket?.emit('ReactToNodeBackup', deviceId)
        setAdvancedText(3)
    }
    const handleClickBasic = () => {
        socket?.emit('ReactToNodeBasic', deviceId)
        setAdvancedText(1)
    }
    return (
        <div style={{ display: 'flex', width: '100%' }}>
            {/* lest section */}
            {advancedText===2 ?
                <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap', backgroundColor: 'white', width: '85%', padding: '20px 40px', margin: '5px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <span style={{ color: 'black', fontWeight: '600' }}>INVERSE I:E</span>
                        <div style={{ width: '120px', height: '120px', backgroundColor: 'black', borderRadius: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={activeAdvance === 'false' ? { backgroundColor: 'grey', width: '100px', height: '100px', borderRadius: '90px', display: 'flex', justifyContent: 'center', alignItems: 'center' } : { backgroundColor: 'green', width: '100px', height: '100px', borderRadius: '90px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <span style={{ color: 'white' }}>{activeAdvance === 'false' ? 'INACTIVE' : 'ACTIVE'}</span></div>
                        </div>
                    </div>

                    {advancedData?.split(',')?.map((item, index) => {
                        return (
                            <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <span style={{ color: 'black', fontWeight: '600' }}>{item?.split('~')[0]}</span>
                                <div style={{ width: '120px', height: '120px', backgroundColor: 'black', borderRadius: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div style={{ width: '100px', height: '100px', backgroundColor: 'white', borderRadius: '90px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <span style={{ color: 'black' }}>{item?.split('~')[1]}</span></div>
                                </div>
                                <span style={{ color: 'black', fontWeight: '600' }}>{item?.split('~')[2]}</span>
                            </div>
                        )
                    })
                    }
                    {!advancedData && <h3>Loading...</h3>}
                </div>
                :
                advancedText===3 ?
                    <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap', backgroundColor: 'white', width: '85%', padding: '20px 40px', margin: '5px' }}>
                        {apneaData ?
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <span style={{ color: 'black', fontWeight: '600' }}>BACKUP</span>
                                <div style={{ width: '120px', height: '120px', backgroundColor: 'black', borderRadius: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div style={activeApnia === 'false' ? { backgroundColor: 'grey', width: '100px', height: '100px', borderRadius: '90px', display: 'flex', justifyContent: 'center', alignItems: 'center' } : { backgroundColor: 'green', width: '100px', height: '100px', borderRadius: '90px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <span style={{ color: 'white' }}>{activeApnia === 'false' ? 'INACTIVE' : 'ACTIVE'}</span></div>
                                </div>
                            </div>
                            : ''}
                        {apneaData ?
                            apneaData?.split(',')?.map((item, index) => {
                                return (
                                    <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <span style={{ color: 'black', fontWeight: '600' }}>{item?.split('~')[0]}</span>
                                        <div style={{ width: '120px', height: '120px', backgroundColor: 'black', borderRadius: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <div style={{ width: '100px', height: '100px', backgroundColor: 'white', borderRadius: '90px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <span style={{ color: 'black' }}>{item?.split('~')[1]}</span></div>
                                        </div>
                                        <span style={{ color: 'black', fontWeight: '600' }}>{item?.split('~')[2]}</span>
                                    </div>
                                )
                            })
                            : ''
                        }
                        {!apneaData && <h3>Loading...</h3>}
                    </div>
                    :
                    <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap', backgroundColor: 'white', width: '85%', padding: '20px 40px', margin: '5px' }}>
                        {basicsData?.split(',')?.map((item, index) => {
                            return (
                                <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <span style={{ color: 'black', fontWeight: '600' }}>{item?.split('~')[0]}</span>
                                    <div style={{ width: '120px', height: '120px', backgroundColor: 'black', borderRadius: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <div style={{ width: '100px', height: '100px', backgroundColor: 'white', borderRadius: '90px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <span style={{ color: 'black' }}>{item?.split('~')[1]}</span></div>
                                    </div>
                                    <span style={{ color: 'black', fontWeight: '600' }}>{item?.split('~')[2]}</span>
                                </div>
                            )
                        })
                        }
                        {!basicsData && <h3>Loading...</h3>}
                    </div>
            }
            {/* right section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '5px', alignItems: 'end' }}>
                <FaWindowClose size={25} color='grey' onClick={handleDataBtn} />
                <button className={advancedText===1 ? Style.textColorBefore : Style.textColorAfter} onClick={handleClickBasic}>Basic</button>
                <button className={advancedText===2 ? Style.textColorBefore : Style.textColorAfter} onClick={handleClickAdvance}>Advanced</button>
                <button className={advancedText===3 ? Style.textColorBefore : Style.textColorAfter} onClick={handleClickApnea}>Apnea</button>
            </div>
        </div>
    )
}

export default ControlesDataTiles