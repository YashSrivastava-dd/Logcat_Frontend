import React from 'react'
import Style from "../../../css/ServiceEngUsrModule.module.css"
import { Link } from 'react-router-dom'
import { IoTicketOutline } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";
function ServiceEngUserModule() {
  return (
    <div style={{ display: 'flex', gap: '10px', margin: '2rem' }}>
      <div className={Style.parent}>
        <Link to={'/assignedTicketToServiceEng'} className={Style.card}>
          <IoTicketOutline size={25} color='#98004c' />
          <h2>Assigned Tickets</h2>
        </Link>
        <Link to={'/service_eng'} className={Style.card}>
          <MdSupportAgent size={25} color='#98004c' />
          <h2>Support Dashboard</h2>
        </Link>
      </div>
    </div>
  )
}

export default ServiceEngUserModule