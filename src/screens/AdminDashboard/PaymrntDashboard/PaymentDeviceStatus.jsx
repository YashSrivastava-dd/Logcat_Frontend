import React from 'react'
import { GoDotFill } from "react-icons/go";
import { IoLockClosed } from "react-icons/io5";
function PaymentDeviceStatus() {
    return (
        <div style={{ width: '750px', height: '350px', padding: '1rem', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', borderRadius: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h1 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Device Status</h1>
                <button style={{ color: 'grey' }}>see more</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', padding: '10px', justifyContent: 'space-between', margin: '0px 10px' }}>
                <h1 style={{ width: '6rem' }}>Status</h1>
                <h2 style={{ width: '6rem' }}>Device</h2>
                <h4 style={{ width: '6rem' }}>Date</h4>
                <h4 style={{ width: '6rem' }}>Status</h4>
            </div>
            <hr/>
            <div style={{ display: 'flex', alignItems: 'center', padding: '10px', justifyContent: 'space-between', margin: '0px 10px'  }}>
                <div style={{ width: '6rem' }}>
                    <GoDotFill color='green' />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '6rem' }}>
                    <div style={{ display: 'flex' }}>
                        <h2>AGVA Pro </h2>
                        <IoLockClosed />
                    </div>
                    <h5 style={{ fontSize: '12px', color: 'grey' }}>5479987hh2997e7</h5>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '6rem' }}>
                    <h4>24 Jun 2024</h4>
                    <h4 style={{ fontSize: '12px', color: 'grey' }}>03:55</h4>
                </div>
                <h4 style={{ fontSize: '15px', color: 'green', width: '6rem' }}>Active</h4>
            </div>
        </div>
    )
}

export default PaymentDeviceStatus