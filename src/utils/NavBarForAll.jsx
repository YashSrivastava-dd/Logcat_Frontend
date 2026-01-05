import React, { useEffect, useState } from "react";
import { Navbar } from "./NavBar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Style from "../css/NavBarForAll.module.css";
import logo from "../assets/icons/logo.png";

function NavBarForAll() {
  const navigate = useNavigate();
  const { adminInfo } = useSelector((state) => state.adminLoginReducer) || {};
  const userRole = adminInfo?.data?.userType;

  // State to hold the live date and time
  const [currentDate, setCurrentDate] = useState("");
  useEffect(() => {
    // Function to update the current date and time
    const updateTime = () => {
      const now = new Date();
      setCurrentDate(now.toLocaleString()); // Includes date and time with seconds
    };

    // Set interval to update the time every second
    const timerId = setInterval(updateTime, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(timerId);
  }, []);

  return (
    <nav className={Style.navBar}>
      <div className={Style.container}>
        {/* Logo and Navigation */}
        <button
          onClick={() =>
            navigate(userRole === "Super-Admin" ? "/adminDashboard" : "/")
          }
          className={Style.logoButton}
        >
          <img src={logo} alt="Company Logo" className={Style.logo} />
        </button>

        {/* User Info and Live Timer */}
        <div className={Style.userInfo}>
          <h2 className={Style.userName}>{adminInfo?.data?.name}</h2>
          <h2 className={Style.userEmail}>{adminInfo?.data?.email}</h2>
        </div>

        {/* Additional Navbar Component */}
        <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
          <h2 className={Style.dateTime}>{currentDate}</h2>
          <Navbar />
        </div>
      </div>
    </nav>
  );
}
export default NavBarForAll;