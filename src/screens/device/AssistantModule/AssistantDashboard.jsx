import React from 'react'

import AssistantProject from './AssistantProject'
import { Link } from 'react-router-dom'
import patient from "./../../../assets/images/patient.png"
import agvaPro from "./../../../assets/images/AgVaCrop.png"
function AssistantDashboard() {
    return (
            <div
                style={{
                    position: "relative",
                    top: "3rem",
                    marginLeft: "2rem",
                    width: "97%",
                    display: 'flex',
                    gap: '2rem'
                }}>
                <Link to='/home' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', boxShadow: '0px 0px 50px #00000029', width: '250px', height: '13rem', borderRadius: '10px', color: 'black' }}>
                    <img src={agvaPro}  style={{ width: '4rem', height: '8rem' }} />
                    <AssistantProject title='Devices' />
                </Link>
                <Link to='/nurse_module' style={{ display: 'flex', flexDirection:'row',alignItems: 'center', gap:'1rem',justifyContent: 'center', backgroundColor: 'white', boxShadow: '0px 0px 50px #00000029', width: '250px', height: '13rem', borderRadius: '10px', color: 'black' }}>
                    <img src={patient}  style={{ width: '4rem', height: '4rem' }} />
                    <AssistantProject title='Patient Details' />
                </Link>
                <Link to='/nurse_add_diagnose' style={{ display: 'flex', flexDirection:'row',alignItems: 'center', gap:'1rem',justifyContent: 'center', backgroundColor: 'white', boxShadow: '0px 0px 50px #00000029', width: '250px', height: '13rem', borderRadius: '10px', color: 'black' }}>
                    <img src={patient}  style={{ width: '4rem', height: '4rem' }} />
                    <AssistantProject title='Add Patinet' />
                </Link>
        </div>
    )
}

export default AssistantDashboard