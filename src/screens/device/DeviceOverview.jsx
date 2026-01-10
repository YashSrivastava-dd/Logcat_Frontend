import React, { useEffect, useRef, useState } from "react";
import back from "../../assets/images/back.png";
import { Link, useNavigate } from "react-router-dom";
import arrowNext from "../../assets/images/NextArrow.png";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { FaLockOpen, FaLock } from "react-icons/fa";
import { Button, Modal } from "flowbite-react";
import shield from "../../assets/icons/shield.png";
import {
  getSingleDeviceIdDetails,
  postLockToDeviceIdAction,
  updatePaymentLockStatusAction,
} from "../../store/action/DeviceAction";
import { Card } from "flowbite-react";
import Otpinput from "../auth/OtpInput";
import { io } from "socket.io-client";
function DeviceOverview() {

  const serverUrl = `${process.env.REACT_APP_BASE_URL}/`;
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(serverUrl);

    return () => {
      // Cleanup on unmount
      socketRef.current?.disconnect();
    };
  }, [serverUrl]);

  const getAllSectionByDeviceId = useSelector(
    (state) => state.getAllSectionByDeviceId
  );
  const { loading, data } = getAllSectionByDeviceId;
  const overviewData = data && data.data;

  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const { adminInfo } = adminLoginReducer;
  const adminProfile = adminInfo && adminInfo.data && adminInfo.data.userType;
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const projectName = urlParams.get("projectName");
  const code = urlParams.get("projectCode");
  const projectCode = urlParams.get("code");

  const deviceid = urlParams.get("DeviceId");
  // const projectCode = urlParams.get("projectCode");
  const page = urlParams.get("page");


  const status = overviewData && overviewData.message;
  const lastHours = overviewData && overviewData.last_hours;
  const totalHours = overviewData && overviewData.total_hours;
  const health = overviewData && overviewData.health;
  const address = overviewData && overviewData.address;
  const isPaymentComplete = overviewData?.isPaymentDone;
  const isLocked = overviewData?.isLocked;
  const lockedStatus = overviewData?.lockedStatus;
  const paymentDoneInPercent = overviewData?.paymentDoneInPercent;

  // Optimistic UI state for lock/unlock
  const [optimisticLockStatus, setOptimisticLockStatus] = useState(null);
  const alertHandel = (e) => {
    e.preventDefault()
    toast.error("Device Inactive");
  };

  const navigate = useNavigate();
  const handleLive = (e) => {
    e.preventDefault()
    navigate(`/live?code=${code}&projectName=${projectName}&DeviceId=${deviceid}`)
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleDeviceIdDetails(deviceid, code));
  }, [dispatch, deviceid, code]);

  const handlePaymentStatusClick = () => {
    // If payment is 0, update it to 100
    if (paymentDoneInPercent === 0 || paymentDoneInPercent === "0") {
      dispatch(updatePaymentLockStatusAction(deviceid, "100", code));
    } else {
      // If already 100, just refresh the data
      dispatch(getSingleDeviceIdDetails(deviceid, code));
    }
  };


  const history = useNavigate();
  const handleBackBtn = () => {
    if (adminProfile==="User") {
      history(`/user_device?code=${code}&name=${projectName}&page=${page}`);
    } else if (adminProfile==="Assistant") {
      window.history.go(-1);
    } else if (
      code === "004" ||
      code === "003" ||
      code === "006" ||
      code === "007"
    ) {
      history(
        `/newDevice?code=${code}&name=${projectName}&projectCode=${code}&page=${page}`
      );
    }
    else if (code === "008") {
      history(
        `/agvaMinidevice?code=${code}&name=${projectName}&projectCode=${code}&page=${page}`
      );
    }
    else if (projectCode === "009") {
      history(
        `/salesSideBar?name=AgVa Pro ATP&projectCode=008`
      );
    }
    else {
      history(`/device?code=${code}&name=${projectName}&page=${page}`);
    }
  };
  // Resolve current lock state with priority: optimisticLockStatus || lockedStatus || (isLocked ? "Locked" : "Unlocked")
  const getCurrentStatus = () => {
    if (optimisticLockStatus) return optimisticLockStatus;
    if (lockedStatus) return lockedStatus;
    return isLocked ? "Locked" : "Unlocked";
  };

  // Clear optimistic state only when backend returns a final state (Locked/Unlocked)
  // Keep optimistic state if backend returns pending states
  useEffect(() => {
    if (lockedStatus && (lockedStatus === "Locked" || lockedStatus === "Unlocked")) {
      setOptimisticLockStatus(null);
    }
  }, [lockedStatus]);

  console.log('deviceID', deviceid)
  const handelLock = async () => {
    const socket = socketRef.current;
    const currentState = getCurrentStatus();
    let email = "masoom@agvahealthtech.com";
    let nextState = null;
    let isLockedValue = null;
    let isPaymentDoneValue = null;

    // State machine logic
    switch (currentState) {
      case "Locked":
        // Send UNLOCK request
        nextState = "Unlock Pending";
        isLockedValue = false;
        isPaymentDoneValue = "true";
        toast.success("Device unlock request has been sent successfully");
        break;
      
      case "Unlock Pending":
        // Send LOCK request
        nextState = "Lock Pending";
        isLockedValue = true;
        isPaymentDoneValue = "false";
        toast.success("Device lock request has been sent successfully");
        break;
      
      case "Unlocked":
        // Send LOCK request
        nextState = "Lock Pending";
        isLockedValue = true;
        isPaymentDoneValue = "false";
        toast.success("Device lock request has been sent successfully");
        break;
      
      case "Lock Pending":
        // Send UNLOCK request
        nextState = "Unlock Pending";
        isLockedValue = false;
        isPaymentDoneValue = "true";
        toast.success("Device unlock request has been sent successfully");
        break;
      
      default:
        // Fallback: determine from isLocked
        if (isLocked) {
          nextState = "Unlock Pending";
          isLockedValue = false;
          isPaymentDoneValue = "true";
          toast.success("Device unlock request has been sent successfully");
        } else {
          nextState = "Lock Pending";
          isLockedValue = true;
          isPaymentDoneValue = "false";
          toast.success("Device lock request has been sent successfully");
        }
    }

    // Optimistic UI update - immediately switch to pending state
    setOptimisticLockStatus(nextState);

    try {
      // Send request to backend with lockedStatus to persist the pending state
      await dispatch(
        postLockToDeviceIdAction({
          DeviceId: deviceid,
          isPaymentDone: isPaymentDoneValue,
          isLocked: isLockedValue,
          lockedStatus: nextState, // Persist the pending state to backend
          email,
          socket: socketRef.current
        })
      );

      // Refresh device data after backend response to get final state
      setTimeout(() => {
        dispatch(getSingleDeviceIdDetails(deviceid, code));
      }, 500);
    } catch (error) {
      // On error, clear optimistic state to revert to actual state
      setOptimisticLockStatus(null);
      toast.error("Failed to update device lock status");
      // Refresh device data to get actual state
      dispatch(getSingleDeviceIdDetails(deviceid, code));
    }
  };
  //  otp handel validation

  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };

  const [state, setState] = useState({
    otp: null,
  });


  const handleSubmitOtp = (e) => {
    e.preventDefault();
    const otp = state.otp;
    if (!otp) {
      toast.error("Enter OTP");
    } else {

    }
  };
  return (
    <div
      className="main-overview"
      style={{
        position: "absolute",
        top: "5rem",
        left: "1rem",
        width: "100vw",
      }}
    >
      <Toaster />
      <div
        className="inside-overview"
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        {/* Heading  */}
        <div
          className=""
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            color: "#707070",
          }}
        >
          <button onClick={handleBackBtn}>
            <img src={back} style={{ width: "3rem" }} />
          </button>
          <h4>Device Overview</h4>
        </div>
        {/* Details */}
        <div>
          <div style={{ width: "93%" }}>
            <Card>
              <form
                className="flex justify-between flex-wrap"
                style={{ gap: "2rem" }}
              >
                <div className="flex flex-col gap-4">
                  <section
                    style={{
                      width: "full",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span style={{ width: "10rem" }}>Device ID :</span>
                    <h5 style={{ width: "9rem", fontSize: "0.9rem" }}>
                      {overviewData && overviewData.DeviceId}
                    </h5>
                  </section>
                  <section
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span style={{ width: "10rem" }}>Running Status :</span>
                    <h5 style={{ width: "9rem", fontSize: "0.9rem" }}>
                      {status === "ACTIVE" ? (
                        <>
                          <svg
                            width="40px"
                            height="35px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            stroke="#11ac14"
                          >
                            <g id="SVGRepo_iconCarrier">
                              <path
                                d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z"
                                fill="#11ac14"
                              ></path>
                            </g>
                          </svg>
                        </>
                      ) : (
                        <svg
                          width="40px"
                          height="40px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          stroke="#ffbf00"
                        >
                          <g
                            id="SVGRepo_bgCarrier"
                            stroke-width="0"
                          ></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z"
                              fill="#ffbf00"
                            ></path>{" "}
                          </g>
                        </svg>
                      )}
                    </h5>
                  </section>
                  <section
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span style={{ width: "11rem" }}>Last Hours :</span>
                    <h5 style={{ width: "9rem", fontSize: "0.9rem" }}>
                      {status==="ACTIVE" ? "In Ventilation" : lastHours}
                    </h5>
                  </section>
                </div>
                <div className="flex flex-col gap-4">
                  <section
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span style={{ width: "11rem" }}>
                      Total Ventilation Hours :
                    </span>
                    <h5 style={{ width: "9rem", fontSize: "0.9rem" }}>
                      {!totalHours ? "- - -" : totalHours}
                    </h5>
                  </section>
                  <section
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span style={{ width: "11rem" }}>Health :</span>
                    <h5 style={{ width: "9rem", fontSize: "0.9rem" }}>
                      {!health ? "- - -" : health}
                    </h5>
                  </section>
                  <section
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span style={{ width: "11rem" }}>Address :</span>
                    <h5 style={{ width: "9rem", fontSize: "0.9rem" }}>
                      {!address ? "- - -" : address}
                    </h5>
                  </section>
                </div>
              </form>
            </Card>
          </div>
        </div>
        {/* device data */}
        <div
          className="container"
          style={{
            borderRadius: "15px",
            padding: "0.1rem",
            marginLeft: "0px",
            color: "#707070",
          }}
        >
          <h4>Device Data</h4>
          <div
            className="d-flex"
            style={{ gap: "2rem", textAlign: "center", flexWrap: "wrap" }}
          >
            {adminProfile === "Assistant" ? '' :
              <Link
                to={`/about?code=${code}&projectName=${projectName}&DeviceId=${deviceid}&page=${page}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    justifyContent: "space-around",
                    background: "#FFFFFF 0% 0% no-repeat padding-box",
                    boxShadow: "0px 0px 50px #00000029",
                    display: "flex",
                    padding: "15px",
                    width: "10rem",
                    borderRadius: "10px",
                    color: "#707070",
                  }}
                >
                  <h6>About</h6>
                  <img src={arrowNext} style={{ width: "1.3rem" }} />
                </div>
              </Link>
            }
            {code === "003" || code === "004" || code === "007" || code === "008" ? (
              <Link
                to={`/newDeviceEvents?code=${code}&projectName=${projectName}&DeviceId=${deviceid}&projectCode=${code}`}
                style={{ textDecoration: "none" }}
                onClick={() => localStorage.setItem("deviceid", deviceid)}
              >
                <div
                  style={{
                    alignItems: "center",
                    justifyContent: "space-around",
                    background: "#FFFFFF 0% 0% no-repeat padding-box",
                    boxShadow: "0px 0px 50px #00000029",
                    display: "flex",
                    padding: "15px",
                    width: "11rem",
                    borderRadius: "10px",
                    color: "#707070",
                  }}
                >
                  <h6>Monitor Data</h6>
                  <span
                    style={{
                      width: "0.8rem",
                      height: "0.8rem",
                      backgroundColor: "red",
                      borderRadius: "10px",
                    }}
                  ></span>
                </div>
              </Link>
            ) : (
              <Link
                to={`/deviceEvents?projectCode=009&projectName=${projectName}&DeviceId=${deviceid}`}
                style={{ textDecoration: "none" }}
                onClick={() => localStorage.setItem("deviceid", deviceid)}
              >
                <div
                  style={{
                    alignItems: "center",
                    justifyContent: "space-around",
                    background: "#FFFFFF 0% 0% no-repeat padding-box",
                    boxShadow: "0px 0px 50px #00000029",
                    display: "flex",
                    padding: "15px",
                    width: "11rem",
                    borderRadius: "10px",
                    color: "#707070",
                  }}
                >
                  <h6>Monitor Data</h6>
                  <span
                    style={{
                      width: "0.8rem",
                      height: "0.8rem",
                      backgroundColor: "red",
                      borderRadius: "10px",
                    }}
                  ></span>
                </div>
              </Link>
            )}
            {status==="ACTIVE" ? (
              <>
                <button onClick={handleLive}>
                  <div
                    style={{
                      justifyContent: "space-around",
                      background: "#FFFFFF 0% 0% no-repeat padding-box",
                      boxShadow: "0px 0px 50px #00000029",
                      display: "inline-block",
                      padding: "15px",
                      width: "10rem",
                      borderRadius: "10px",
                      color: "#707070",
                    }}
                  >
                    <h6>Live</h6>
                  </div>
                </button>
              </>
            ) : (
              <button
                onClick={alertHandel}
                style={{
                  justifyContent: "space-around",
                  background: "#FFFFFF 0% 0% no-repeat padding-box",
                  boxShadow: "0px 0px 50px #00000029",
                  display: "flex",
                  padding: "15px",
                  width: "11rem",
                  borderRadius: "10px",
                  color: "#707070",
                  border: "0px",
                }}
              >
                <h6>Live</h6>
              </button>
            )}
            {adminProfile==="Super-Admin" || adminProfile==="Marketing-Admin" ? (
              <Link
                to={`/service?code=${code}&projectName=${projectName}&DeviceId=${deviceid}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    justifyContent: "space-around",
                    background: "#FFFFFF 0% 0% no-repeat padding-box",
                    boxShadow: "0px 0px 50px #00000029",
                    display: "flex",
                    alignItems: "center",
                    padding: "15px",
                    width: "13rem",
                    borderRadius: "10px",
                    color: "#707070",
                    textAlign: "center",
                  }}
                >
                  <h6>Service Records</h6>
                  <span
                    style={{
                      backgroundColor: "red",
                      borderRadius: "10px",
                      height: "0.8rem",
                      width: "0.8rem",
                    }}
                  ></span>
                </div>
              </Link>
            ) : (
              ""
            )}
            {adminProfile==="Super-Admin" ? (
              <button
                style={(() => {
                  const status = getCurrentStatus();
                  
                  const buttonStyle = {
                    justifyContent: "space-around",
                    boxShadow: "0px 0px 50px #00000029",
                    display: "flex",
                    alignItems: "center",
                    padding: "15px",
                    width: "13rem",
                    borderRadius: "10px",
                    border: "0px",
                    cursor: "pointer",
                    textAlign: "center",
                  };

                  let finalStyle = {};

                  if (status === "Locked") {
                    finalStyle = {
                      ...buttonStyle,
                      background: "#ff0000",   // 🔴 Red
                      color: "#ffffff",
                    };
                  }
                  else if (status === "Unlocked") {
                    finalStyle = {
                      ...buttonStyle,
                      background: "#00a651",   // 🟢 Green
                      color: "#ffffff",
                    };
                  }
                  else if (status === "Lock Pending" || status === "Unlock Pending") {
                    finalStyle = {
                      ...buttonStyle,
                      background: "#FFBF00",   // 🟡 Amber
                      color: "#000000",        // Black text
                      fontWeight: "600",
                    };
                  }
                  else {
                    // Fallback style
                    finalStyle = {
                      ...buttonStyle,
                      background: "#fff",
                      color: "#707070",
                    };
                  }

                  return finalStyle;
                })()}
                onClick={handelLock}
              >
                {getCurrentStatus()}
              </button>
            ) : (
              ""
            )}
            {adminProfile==="Super-Admin" || adminProfile==="Marketing-Admin" ? (
              <Link
                to={`/agvaMiniTrack?code=${code}&projectName=${projectName}&DeviceId=${deviceid}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    justifyContent: "space-around",
                    background: "#FFFFFF 0% 0% no-repeat padding-box",
                    boxShadow: "0px 0px 50px #00000029",
                    display: "flex",
                    alignItems: "center",
                    padding: "15px",
                    width: "13rem",
                    borderRadius: "10px",
                    color: "#707070",
                    textAlign: "center",
                  }}
                >
                  <h6>Track History</h6>
                </div>
              </Link>
            ) : ("")}
            <button
              onClick={handlePaymentStatusClick}
              style={{
                justifyContent: "space-around",
                background: paymentDoneInPercent === 100 || paymentDoneInPercent === "100"
                  ? "green 0% 0% no-repeat padding-box" 
                  : paymentDoneInPercent === 0 || paymentDoneInPercent === "0"
                  ? "red 0% 0% no-repeat padding-box" 
                  : "#FFFFFF 0% 0% no-repeat padding-box",
                boxShadow: "0px 0px 50px #00000029",
                display: "flex",
                alignItems: "center",
                padding: "15px",
                width: "13rem",
                borderRadius: "10px",
                color: paymentDoneInPercent === 100 || paymentDoneInPercent === "100" || paymentDoneInPercent === 0 || paymentDoneInPercent === "0" ? "#fff" : "#707070",
                textAlign: "center",
                border: "0px",
                cursor: "pointer",
              }}
            >
              <h6>
                Payment Status: {paymentDoneInPercent !== undefined ? `${paymentDoneInPercent}%` : "N/A"}
              </h6>
            </button>
            {status!=='ACTIVE' ?
              adminProfile==="Super-Admin" || adminProfile==="Marketing-Admin" ? (
                <Link
                  to={`/diagnosticCheck?code=${code}&projectName=${projectName}&DeviceId=${deviceid}&projectCode=${code}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      justifyContent: "space-around",
                      background: "#FFFFFF 0% 0% no-repeat padding-box",
                      boxShadow: "0px 0px 50px #00000029",
                      display: "flex",
                      alignItems: "center",
                      padding: "15px",
                      width: "13rem",
                      borderRadius: "10px",
                      color: "#707070",
                      textAlign: "center",
                    }}
                  >
                    <h6>Diagnostic Check</h6>
                  </div>
                </Link>
              ) : ("") : ''}
            <Modal
              show={props.openModal === "pop-up"}
              size="md"
              popup
              onClose={() => props.setOpenModal(undefined)}
            >
              <Modal.Header />
              <Modal.Body>
                <div className="text-center">
                  <div className="mb-6">
                    <img
                      src={shield}
                      loading="lazy"
                      style={{
                        height: "3rem",
                        display: "block",
                        margin: "10px auto",
                      }}
                    />
                    <label
                      for="large-input"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Enter OTP Code
                    </label>
                    <div className="flex items-center" style={{ gap: "20px" }}>
                      <Otpinput setState={setState} state={state} />
                    </div>
                  </div>
                  <div className="flex justify-center gap-4">
                    <Button onClick={handleSubmitOtp} color="failure">
                      Verify OTP
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
            {adminProfile==="Doctor" ? (
              <Link
                to={`/deviceAssignToUserModel?code=${code}&projectName=${projectName}&DeviceId=${deviceid}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    justifyContent: "space-around",
                    background: "#FFFFFF 0% 0% no-repeat padding-box",
                    boxShadow: "0px 0px 50px #00000029",
                    display: "flex",
                    alignItems: "center",
                    padding: "15px",
                    width: "11rem",
                    borderRadius: "10px",
                    color: "#707070",
                    textAlign: "center",
                  }}
                >
                  <h6>Assign</h6>
                </div>
              </Link>
            ) : (
              ""
            )}

            {/* doctor remove by assistant */}
            {adminProfile==="Hospital-Admin" ? (
              <Link
                to={`/hospitalAdmoinRemoveDoctor?code=${code}&projectName=${projectName}&DeviceId=${deviceid}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    justifyContent: "space-around",
                    background: "#FFFFFF 0% 0% no-repeat padding-box",
                    boxShadow: "0px 0px 50px #00000029",
                    display: "flex",
                    alignItems: "center",
                    padding: "15px",
                    width: "11rem",
                    borderRadius: "10px",
                    color: "#707070",
                    textAlign: "center",
                  }}
                >
                  <h6>Assiged Owner</h6>
                </div>
              </Link>
            ) : (
              ""
            )}
            {/* assistant patient data */}
            {adminProfile==="Assistant" ? (
              <Link
                to={`/nurse_add_diagnose?deviceId=${deviceid}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    justifyContent: "space-around",
                    background: "#FFFFFF 0% 0% no-repeat padding-box",
                    boxShadow: "0px 0px 50px #00000029",
                    display: "flex",
                    alignItems: "center",
                    padding: "15px",
                    width: "11rem",
                    borderRadius: "10px",
                    color: "#707070",
                    textAlign: "center",
                  }}
                >
                  Add Patient
                </div>
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default DeviceOverview;
