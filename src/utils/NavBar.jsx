import React, { useState, useEffect, useRef } from "react";
import CustomeDropDown from "../container/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { adminLogout } from "../store/action/AdminAction";
import Style from "../css/NavBar.module.css";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";

export function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux Selectors
  const { adminInfo } = useSelector((state) => state.adminLoginReducer);
  const { data } = useSelector((state) => state.getHospitalAdminUserRequestReducer) || {};

  // State
  const [userInfo, setUserInfo] = useState(false);

  // Refs
  const dropdownRef = useRef(null);

  const userRole = adminInfo?.data?.userType;

  // Handle Outside Click to Close Dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserInfo(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Navigation Handlers
  const handleLogout = () => {
    dispatch(adminLogout(navigate));
    localStorage.setItem("userrole", userRole);
    localStorage.setItem("checkNav", true);
    setUserInfo(false);
  };

  const handleManageAccount = () => {
    if (userRole === "User" || userRole === "Doctor") {
      navigate("/update_profile_details");
    } else {
      navigate("/profileComponent");
    }
    setUserInfo(false);
  };

  const handlePrivacy = () => {
    navigate("/privacyPolicy");
    setUserInfo(false);
  };

  const handleTermsOfServices = () => {
    navigate("/termsOfServices");
    setUserInfo(false);
  };

  const divRef = useRef(null);

  const handleClick = (event) => {
    if (divRef.current && divRef.current.contains(event.target)) {
      return
    } else {
      setUserInfo(false);
    }
  };
  useEffect(() => {
    // Attach the event listener to the whole document
    document.addEventListener("mousedown", handleClick);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  return (
    <>
      <section className={`${Style.NavbarOuter}`} ref={divRef}>
        <section className={Style.detailSection}>
          {userRole === "Support" ? (
            <button onClick={() => navigate("/notificationHandle")} type="button" className={Style.button}>
              <IoMdNotificationsOutline size={25} />
            </button>
          ) : userRole === "Hospital-Admin" ? (
            <button
              type="button"
              onClick={() => navigate("/hospitalAdminUserRequest")}
              style={{ backgroundColor: "white", borderRadius: "20px" }}
              className="inline-flex items-center px-2 py-2 text-sm font-medium text-center text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              <IoMdNotificationsOutline size={25} color="rgb(152, 0, 76)" />
              <span> {data?.data?.length} </span>
            </button>
          ) : null}
          <section className="Profileicon" onClick={() => setUserInfo(!userInfo)}>
            <FaUserCircle color="white" style={{ width: "2rem", height: "2rem" }} />
          </section>
        </section>
        {userInfo && (
          <CustomeDropDown
            position="fixed"
            right="0%"
            top="6%"
            width="400px"
            zIndex="10"
            marginRight="10px"
            ref={dropdownRef}
            
          >
            <section className={Style.AvatarSectionDropDown}>
              <FaUserCircle color="white" style={{ width: "3.5rem", height: "3.5rem" }} />
            </section>
            <p className={Style.UpdateNameText}>
              {userRole === "Super-Admin" ? `Dr. ${localStorage.getItem("name")}` : localStorage.getItem("name")}
            </p>
            <p className={Style.updateEmailText}>{localStorage.getItem("email")}</p>
            {userRole === "Doctor" && (
              <p className={Style.updateEmailText}>
                Profile KEY - <span>{adminInfo?.data?.securityCode}</span>
              </p>
            )}
            <span
              onClick={handleManageAccount}
              className={Style.manageAccount}
              style={{ border: "1px solid #fff" }}
            >
              Manage your account
            </span>
            <span
              onClick={handleLogout}
              className={Style.logoutAccount}
              style={{ border: "1px solid #fff", marginTop: "5px" }}
            >
              Logout
            </span>
            <section className={Style.privacyPolicy}>
              <button onClick={handlePrivacy} style={{ textDecoration: "none", color: "rgb(152, 0, 76)" }}>
                <h6 style={{ fontSize: "0.8rem" }}>Privacy policy</h6>
              </button>
              <button
                onClick={handleTermsOfServices}
                style={{ textDecoration: "none", color: "rgb(152, 0, 76)" }}
              >
                <h6 style={{ fontSize: "0.8rem" }}>Terms of service</h6>
              </button>
            </section>
          </CustomeDropDown>
        )}
      </section>
    </>
  );
}
