import React from 'react'
import Style from "../../../css/PaymentDashboard.module.css"

function PaymentAccountDetails() {
    return (
        <div className={Style.accountContainer}>
            <h1 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Account Details</h1>
            <div style={{ marginTop: '1rem', padding: '10px' }}>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <h1 style={{ width: '8rem' }}>
                            Name :
                        </h1>
                        <h4 style={{ width: '6rem' }}>
                            Rohan
                        </h4>
                    </div>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <h1 style={{ width: '8rem' }}>
                            Designation :
                        </h1>
                        <h4 style={{ width: '6rem' }}>
                            SDE
                        </h4>
                    </div>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <h1 style={{ width: '8rem' }}>
                            Role :
                        </h1>
                        <h4 style={{ width: '8rem' }}>
                            Frontend Dev
                        </h4>
                    </div>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <h1 style={{ width: '8rem' }}>
                            Department :
                        </h1>
                        <h4 style={{ width: '12rem' }}>
                            Software
                        </h4>
                    </div>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <h1 style={{ width: '8rem' }}>
                            Email :
                        </h1>
                        <h4 style={{ width: '8rem' }}>
                            rohan@agvahealthtech.com
                        </h4>
                    </div>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <h1 style={{ width: '8rem' }}>
                            Phon No. :
                        </h1>
                        <h4 style={{ width: '12rem' }}>
                            +91 9990832566
                        </h4>
                    </div>
                </ul>
            </div>
        </div>
    )
}

export default PaymentAccountDetails