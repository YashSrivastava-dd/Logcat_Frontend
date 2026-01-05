import React from 'react'
import { Link } from 'react-router-dom'
import back from "../../../assets/images/back.png";
import Style from "../../../css/PaymentDashboard.module.css"
import PaymentAccountDetails from './PaymentAccountDetails';
import PaymentDetailsMyCard from './PaymentDetailsMyCard';
import PaymentDeviceStatus from './PaymentDeviceStatus';
import PaymentTransactionHistory from './PaymentTransactionHistory';

function PaymentDashboard() {

    const goBack = () => {
        window.history.go(-1)
    }

    return (
        <div className={Style.mainContainer}>
            <div className={Style.dispatchContainer} >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", }}>
                    <Link onClick={goBack} style={{ display: 'block' }}>
                        <img src={back} loading='lazy' style={{ width: "3rem" }} />
                    </Link>
                    <h1 className="text-2xl font-extrabold">Payment Overview</h1>
                </div>
                <div className={Style.container}>
                    <PaymentAccountDetails />
                    <PaymentDetailsMyCard />
                </div>
                <div className={Style.container}>
                    <PaymentDeviceStatus />
                    <PaymentTransactionHistory />
                </div>
            </div>
        </div>
    )
}

export default PaymentDashboard