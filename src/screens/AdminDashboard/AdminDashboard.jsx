import React, { Suspense, useEffect, useState, useCallback } from "react";
import CustomCard from "../../container/CustomCard";
import { Col } from "react-bootstrap";
import agvaVenti from "../../assets/images/AgVaCrop2.png";
import production from "../../assets/images/production.png";
import dispatchImg from "../../assets/images/delivery.png";
import accounting from "../../assets/images/accounting.png";
import {
  getActiveDemoDeviceAction,
  getActiveDeviceAction,
  getDashboardGraphDataAction,
  getDefaultDataForDashboard,
  getDemoDevices,
  getSoldDemoDataAction,
} from "../../store/action/AdminDashboard";
import { MdOutlinePayment } from "react-icons/md";
import { Link } from "react-router-dom";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LineChart from "./LineChart";
import "../../css/LineChart.css";
import { useDispatch, useSelector } from "react-redux";
import Doughnut from "./Doughnut";
import FooterMain from "../../utils/FooterMain";
import { CardShimmer, DoughnutShimmer } from "../../components/shimmer";

const DougnutSuctionData = React.lazy(() => import('./DougnutSuction'));

// API Loading States
const API_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
};

const AdminDashboard = () => {
  const dispatch = useDispatch();
  
  // Redux selectors
  const dashboardDataDefault = useSelector((state) => state.dashboardDataDefault);
  const { loading, data: getDataForDashboard, error: dashboardError } = dashboardDataDefault;

  const getDemoSoldDataReducer = useSelector((state) => state.getDemoSoldDataReducer);
  const { data: getDemoSoldData, error: demoSoldError } = getDemoSoldDataReducer;

  const getDemoDataCountReducer = useSelector((state) => state.getDemoDataCountReducer);
  const { loading: loading3, data: deviceDemo, error: demoDataError } = getDemoDataCountReducer;

  const getActiveDevicesReducer = useSelector((state) => state.getActiveDevicesReducer);
  const { loading: loading2, data: totalActiveDevice, error: activeDeviceError } = getActiveDevicesReducer;

  const getActiveDemoReducer = useSelector((state) => state.getActiveDemoReducer);
  const { loading: loading5, data: activeDemoDeviceData, error: activeDemoError } = getActiveDemoReducer;

  const getDashboardGraphDataReducer = useSelector((state) => state.getDashboardGraphDataReducer);
  const { data: newData, error: graphDataError } = getDashboardGraphDataReducer;

  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const { adminInfo } = adminLoginReducer;
  const adminProfile = adminInfo && adminInfo.data && adminInfo.data.userType;

  // Local state for filters
  const [durationData, setDurationData] = useState("today");
  const [totalDemoState, setTotalDemoState] = useState("today");
  const [activeDemoDevice, setActiveDemoDevice] = useState("today");
  const [activedevices, setActiveDevices] = useState("today");
  const [timmer, setTimmer] = useState(10);

  // API loading states
  const [apiStates, setApiStates] = useState({
    dashboard: API_STATES.IDLE,
    demoSold: API_STATES.IDLE,
    demoDevices: API_STATES.IDLE,
    activeDevices: API_STATES.IDLE,
    activeDemoDevices: API_STATES.IDLE,
    graphData: API_STATES.IDLE
  });

  // Error states
  const [apiErrors, setApiErrors] = useState({});

  // Update API state helper
  const updateApiState = useCallback((apiName, state, error = null) => {
    setApiStates(prev => ({ ...prev, [apiName]: state }));
    if (error) {
      setApiErrors(prev => ({ ...prev, [apiName]: error }));
    } else {
      setApiErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[apiName];
        return newErrors;
      });
    }
  }, []);

  // Sequential API call function
  const loadDashboardDataSequentially = useCallback(async (isRefresh = false) => {
    try {
      // 1. Load Default Dashboard Data
      updateApiState('dashboard', API_STATES.LOADING);
      try {
        await dispatch(getDefaultDataForDashboard(durationData));
        updateApiState('dashboard', API_STATES.SUCCESS);
        // Small delay to show the shimmer effect
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (error) {
        updateApiState('dashboard', API_STATES.ERROR, error.message);
        console.error('Dashboard data error:', error);
      }

      // 2. Load Demo Sold Data
      updateApiState('demoSold', API_STATES.LOADING);
      try {
        await dispatch(getSoldDemoDataAction());
        updateApiState('demoSold', API_STATES.SUCCESS);
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (error) {
        updateApiState('demoSold', API_STATES.ERROR, error.message);
        console.error('Demo sold data error:', error);
      }

      // 3. Load Demo Devices Data
      updateApiState('demoDevices', API_STATES.LOADING);
      try {
        await dispatch(getDemoDevices(totalDemoState));
        updateApiState('demoDevices', API_STATES.SUCCESS);
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (error) {
        updateApiState('demoDevices', API_STATES.ERROR, error.message);
        console.error('Demo devices data error:', error);
      }

      // 4. Load Active Devices Data
      updateApiState('activeDevices', API_STATES.LOADING);
      try {
        await dispatch(getActiveDeviceAction(activedevices));
        updateApiState('activeDevices', API_STATES.SUCCESS);
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (error) {
        updateApiState('activeDevices', API_STATES.ERROR, error.message);
        console.error('Active devices data error:', error);
      }

      // 5. Load Active Demo Devices Data
      updateApiState('activeDemoDevices', API_STATES.LOADING);
      try {
        await dispatch(getActiveDemoDeviceAction(activeDemoDevice));
        updateApiState('activeDemoDevices', API_STATES.SUCCESS);
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (error) {
        updateApiState('activeDemoDevices', API_STATES.ERROR, error.message);
        console.error('Active demo devices data error:', error);
      }

      // 6. Load Graph Data
      updateApiState('graphData', API_STATES.LOADING);
      try {
        await dispatch(getDashboardGraphDataAction());
        updateApiState('graphData', API_STATES.SUCCESS);
      } catch (error) {
        updateApiState('graphData', API_STATES.ERROR, error.message);
        console.error('Graph data error:', error);
      }

    } catch (error) {
      console.error('Sequential API loading error:', error);
    }
  }, [dispatch, durationData, totalDemoState, activedevices, activeDemoDevice, updateApiState]);

  // Initial data load
  useEffect(() => {
    loadDashboardDataSequentially();
  }, []);

  // Auto-refresh functionality
  useEffect(() => {
    const intervalId = setInterval(() => {
      loadDashboardDataSequentially(true);
    }, timmer * 60000); // Convert minutes to milliseconds

    return () => clearInterval(intervalId);
  }, [loadDashboardDataSequentially, timmer]);

  // Filter change handlers
  const statusOfDuration = useCallback(async (e) => {
    e.preventDefault();
    const newDuration = e.target.value;
    setDurationData(newDuration);
    
    updateApiState('dashboard', API_STATES.LOADING);
    try {
      await dispatch(getDefaultDataForDashboard(newDuration));
      updateApiState('dashboard', API_STATES.SUCCESS);
    } catch (error) {
      updateApiState('dashboard', API_STATES.ERROR, error.message);
    }
  }, [dispatch, updateApiState]);

  const totalDemoChange = useCallback(async (e) => {
    e.preventDefault();
    const newState = e.target.value;
    setTotalDemoState(newState);
    
    updateApiState('demoDevices', API_STATES.LOADING);
    try {
      await dispatch(getDemoDevices(newState));
      updateApiState('demoDevices', API_STATES.SUCCESS);
    } catch (error) {
      updateApiState('demoDevices', API_STATES.ERROR, error.message);
    }
  }, [dispatch, updateApiState]);

  const activeDemoDevicesDataClick = useCallback(async (e) => {
    e.preventDefault();
    const newState = e.target.value;
    setActiveDemoDevice(newState);
    
    updateApiState('activeDemoDevices', API_STATES.LOADING);
    try {
      await dispatch(getActiveDemoDeviceAction(newState));
      updateApiState('activeDemoDevices', API_STATES.SUCCESS);
    } catch (error) {
      updateApiState('activeDemoDevices', API_STATES.ERROR, error.message);
    }
  }, [dispatch, updateApiState]);

  const activeDevicesDataClick = useCallback(async (e) => {
    e.preventDefault();
    const newState = e.target.value;
    setActiveDevices(newState);
    
    updateApiState('activeDevices', API_STATES.LOADING);
    try {
      await dispatch(getActiveDeviceAction(newState));
      updateApiState('activeDevices', API_STATES.SUCCESS);
    } catch (error) {
      updateApiState('activeDevices', API_STATES.ERROR, error.message);
    }
  }, [dispatch, updateApiState]);

  // Data processing (same as original)
  const purposeDevices = getDemoSoldData?.data;
  
  var graphdatacount = durationData == "monthly" ? getDataForDashboard?.totalDevicesCountMonthly : durationData == "yearly" ? getDataForDashboard?.totalDevicesCountYearly : durationData == "weekly" ? getDataForDashboard?.totalDevicesCountWeekly : getDataForDashboard?.todayActiveDeviceCount;
  const values = graphdatacount && graphdatacount.map((item) => item.count);
  const yearname = graphdatacount && graphdatacount.map((item) => item.duration);
  
  const data = {
    labels: yearname,
    datasets: [
      {
        label: [""],
        data: values,
        fill: false,
        borderColor: "rgb(152, 0, 76)",
        tension: 0.3,
        xAxisID: "Month"
      },
    ],
  };

  const totalDevicesOption = {
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: getDataForDashboard?.maxCount + 20,
      }
    }
  };

  var rana = totalDemoState == "monthly"
    ? deviceDemo?.totalDevicesCountMonthly
    : totalDemoState == "yearly" ? deviceDemo?.totalDevicesCountYearly : totalDemoState === "weekly" ? deviceDemo?.weeklyDataCount : deviceDemo?.todayActiveDeviceCount;
  const demoValues = rana && rana.map((item) => item.count);
  const demoYearname = rana && rana.map((item) => item.duration);

  const demoData = {
    labels: demoYearname,
    datasets: [
      {
        label: [""],
        data: demoValues,
        fill: false,
        borderColor: "rgb(152, 0, 76)",
        tension: 0.3,
      },
    ],
  };

  const totalDemoDevicesOption = {
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: deviceDemo?.maxCount + 20
      }
    }
  };

  const totalActiveDeviceData = activedevices === "monthly" ? totalActiveDevice?.monthlyDataCount : activedevices === "weekly" ? totalActiveDevice?.weeklyDataCount : activedevices === "yearly" ? totalActiveDevice?.yearlyDataCount : totalActiveDevice?.todayActiveDeviceCount;

  const activeDeviceValues = totalActiveDeviceData?.map((item) => item.count);
  const activeDeviceName = totalActiveDeviceData?.map((item) => item.duration);
  const activeData = {
    labels: activeDeviceName,
    datasets: [
      {
        label: [""],
        data: activeDeviceValues,
        fill: false,
        borderColor: "rgb(152, 0, 76)",
        tension: 0.3,
      },
    ],
  };

  const totalActiveDeviceOption = {
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: totalActiveDevice?.maxCount + 20
      }
    }
  };

  const totalActiveDemoData = activeDemoDevice === 'weekly' ? activeDemoDeviceData?.weeklyDataCount : activeDemoDevice === 'monthly' ? activeDemoDeviceData?.monthlyDataCount : activeDemoDevice === 'yearly' ? activeDemoDeviceData?.yearlyDataCount : activeDemoDeviceData?.todayActiveDeviceCount;

  const activeDemoDeviceValues = totalActiveDemoData?.map((item) => item.count);
  const activeDemoDeviceName = totalActiveDemoData?.map((item) => item.duration);
  const demoOptionName = activeDemoDevice == "weekly" ? activeDemoDeviceName : activeDemoDevice == "monthly" ? activeDemoDeviceName : activeDemoDeviceName;
  const activeDemoData = {
    labels: demoOptionName,
    datasets: [
      {
        label: [""],
        data: activeDemoDeviceValues,
        fill: false,
        borderColor: "rgb(152, 0, 76)",
        tension: 0.3,
      },
    ],
  };

  const totalActiveDemoDevicesOption = {
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: activeDemoDeviceData?.maxCount + 20,
      },
    },
  };

  const agvaPro = getDemoSoldData?.agvaProData?.[0];
  const suction = getDemoSoldData?.suctionData?.[0];

  const data1 = {
    labels: ['Demo', 'Sold', 'Inhouse'],
    datasets: [
      {
        data: [agvaPro?.demoCount, agvaPro?.soldCount, agvaPro?.inHouseCount],
        backgroundColor: [
          "rgb(54, 162, 235)",
          "rgb(152, 0, 76)",
          "rgb(255, 99, 132)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const data2 = {
    labels: ['Demo', 'Sold', 'Inhouse'],
    datasets: [
      {
        data: [suction?.demoCount, suction?.soldCount, suction?.inHouseCount],
        backgroundColor: [
          "rgb(54, 162, 235)",
          "rgb(152, 0, 76)",
          "rgb(255, 99, 132)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const pincodeData = newData?.data?.map((item) => item?.pincode) || [];

  // Error display component
  const ErrorDisplay = ({ error, onRetry, apiName }) => (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center', 
      color: '#e53e3e',
      background: '#fed7d7',
      borderRadius: '8px',
      margin: '10px 0'
    }}>
      <p>Error loading {apiName}: {error}</p>
      <button 
        onClick={onRetry}
        style={{
          padding: '8px 16px',
          background: '#e53e3e',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Retry
      </button>
    </div>
  );

  return (
    <>
      {/* Navigation Cards */}
      <Col
        xl={4}
        lg={4}
        md={6}
        sm={6}
        style={{
          marginLeft: "2rem",
          paddingTop: "3rem",
          display: "flex",
          gap: "3rem",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        {/* Manage Users Card */}
        {adminProfile === 'Marketing-Admin' ? (
          <CustomCard
            padding="15px"
            height="200px"
            boxShadow="0px 0px 3px 1px rgba(192,192,192,0.90)"
            width="17%"
          >
            <Link to="/marketing_head_screen" style={{ textDecoration: "none" }}>
              <div
                className="project-cart"
                style={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  marginLeft: "2rem",
                  width: "16rem",
                  height: "7rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div className="d-flex" style={{ gap: "2rem" }}>
                  <FontAwesomeIcon
                    icon={faUsers}
                    style={{ color: "#cb2971", width: "12%", height: "30%" }}
                  />
                  <div
                    className="d-flex"
                    style={{
                      gap: "1rem",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <h6 style={{ color: "#707070", fontSize: "1.4rem" }}>
                        Marketing Data
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </CustomCard>
        ) : (
          <CustomCard
            padding="15px"
            height="200px"
            boxShadow="0px 0px 3px 1px rgba(192,192,192,0.90)"
            width="17%"
          >
            <Link to="/manageUsers" style={{ textDecoration: "none" }}>
              <div
                className="project-cart"
                style={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  marginLeft: "2rem",
                  width: "16rem",
                  height: "7rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div className="d-flex" style={{ gap: "2rem" }}>
                  <FontAwesomeIcon
                    icon={faUsers}
                    style={{ color: "#cb2971", width: "12%", height: "30%" }}
                  />
                  <div
                    className="d-flex"
                    style={{
                      gap: "1rem",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <h6 style={{ color: "#707070", fontSize: "1.4rem" }}>
                        Manage Users
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </CustomCard>
        )}

        {/* Other navigation cards */}
        <CustomCard
          padding="15px"
          height="200px"
          boxShadow="0px 0px 3px 1px rgba(192,192,192,0.90)"
          width="30%"
        >
          <div
            className="project-cart"
            style={{
              backgroundColor: "white",
              borderRadius: "5px",
              marginLeft: "2rem",
              width: "16rem",
              height: "7rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link to="/home" style={{ textDecoration: "none" }}>
              <div className="d-flex" style={{ gap: "2rem" }}>
                <img
                  src={agvaVenti}
                  style={{ height: "4rem" }}
                  alt="AgvaVenti"
                />
                <div
                  className="d-flex"
                  style={{
                    gap: "1rem",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h6 style={{ color: "#707070", fontSize: "1.4rem" }}>
                      Manage Device
                    </h6>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </CustomCard>

        {/* Production Card */}
        <CustomCard
          padding="15px"
          height="200px"
          boxShadow="0px 0px 3px 1px rgba(192,192,192,0.90)"
          width="30%"
        >
          <div
            className="project-cart"
            style={{
              backgroundColor: "white",
              borderRadius: "5px",
              marginLeft: "2rem",
              width: "16rem",
              height: "7rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link to="/productionModel" style={{ textDecoration: "none" }}>
              <div className="d-flex" style={{ gap: "2rem" }}>
                <img
                  src={production}
                  style={{ height: "4rem" }}
                  alt="Production"
                />
                <div
                  className="d-flex"
                  style={{
                    gap: "1rem",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h6 style={{ color: "#707070", fontSize: "1.4rem" }}>
                      Production
                    </h6>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </CustomCard>

        {/* Dispatch Card */}
        <CustomCard
          padding="15px"
          height="200px"
          boxShadow="0px 0px 3px 1px rgba(192,192,192,0.90)"
          width="30%"
        >
          <div
            className="project-cart"
            style={{
              backgroundColor: "white",
              borderRadius: "5px",
              marginLeft: "2rem",
              width: "16rem",
              height: "7rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link
              to="/dispatchDashboardModule"
              style={{ textDecoration: "none" }}
            >
              <div className="d-flex" style={{ gap: "2rem" }}>
                <img
                  src={dispatchImg}
                  style={{ height: "4rem" }}
                  alt="dispatch"
                />
                <div
                  className="d-flex"
                  style={{
                    gap: "1rem",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h6 style={{ color: "#707070", fontSize: "1.4rem" }}>
                      Dispatch
                    </h6>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </CustomCard>

        {/* Account Card */}
        <CustomCard
          padding="15px"
          height="200px"
          boxShadow="0px 0px 3px 1px rgba(192,192,192,0.90)"
          width="30%"
        >
          <div
            className="project-cart"
            style={{
              backgroundColor: "white",
              borderRadius: "5px",
              marginLeft: "2rem",
              width: "16rem",
              height: "7rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link to="/accountDasboard" style={{ textDecoration: "none" }}>
              <div className="d-flex" style={{ gap: "2rem" }}>
                <img
                  src={accounting}
                  style={{ height: "3rem" }}
                  alt="account"
                />
                <div
                  className="d-flex"
                  style={{
                    gap: "1rem",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h6 style={{ color: "#707070", fontSize: "1.4rem" }}>
                      Account
                    </h6>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </CustomCard>

        {/* Payment Gateway Card */}
        <CustomCard
          padding="15px"
          height="200px"
          boxShadow="0px 0px 3px 1px rgba(192,192,192,0.90)"
          width="30%"
        >
          <div
            className="project-cart"
            style={{
              backgroundColor: "white",
              borderRadius: "5px",
              marginLeft: "2rem",
              width: "16rem",
              height: "7rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link to="/paymentDashboard" style={{ textDecoration: "none" }}>
              <div className="d-flex" style={{ gap: "2rem" }}>
                <MdOutlinePayment size={50} color="#98004c" />
                <div
                  className="d-flex"
                  style={{
                    gap: "1rem",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h6 style={{ color: "#707070", fontSize: "1.4rem" }}>
                      Payment
                    </h6>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </CustomCard>

        {/* Support Card */}
        <CustomCard
          padding="15px"
          height="200px"
          boxShadow="0px 0px 3px 1px rgba(192,192,192,0.90)"
          width="30%"
        >
          <div
            className="project-cart"
            style={{
              backgroundColor: "white",
              borderRadius: "5px",
              marginLeft: "2rem",
              width: "16rem",
              height: "7rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link to="/Support_eng_dashboard" style={{ textDecoration: "none" }}>
              <div className="d-flex" style={{ gap: "2rem" }}>
                <img
                  src={accounting}
                  style={{ height: "3rem" }}
                  alt="account"
                />
                <div
                  className="d-flex"
                  style={{
                    gap: "1rem",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h6 style={{ color: "#707070", fontSize: "1.4rem" }}>
                      Support
                    </h6>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </CustomCard>

        {/* Sales Card */}
        <CustomCard
          padding="15px"
          height="200px"
          boxShadow="0px 0px 3px 1px rgba(192,192,192,0.90)"
          width="30%"
        >
          <div
            className="project-cart"
            style={{
              backgroundColor: "white",
              borderRadius: "5px",
              marginLeft: "2rem",
              width: "16rem",
              height: "7rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link to={`/salesSideBar?name=Agva Pro ATP&projectCode=008`} style={{ textDecoration: "none" }}>
              <div className="d-flex" style={{ gap: "2rem" }}>
                <img
                  src={accounting}
                  style={{ height: "3rem" }}
                  alt="account"
                />
                <div
                  className="d-flex"
                  style={{
                    gap: "1rem",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h6 style={{ color: "#707070", fontSize: "1.4rem" }}>
                      Sales
                    </h6>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </CustomCard>

        {/* Lock devices Card */}
        <CustomCard
          padding="15px"
          height="200px"
          boxShadow="0px 0px 3px 1px rgba(192,192,192,0.90)"
          width="30%"
        >
          <div
            className="project-cart"
            style={{
              backgroundColor: "white",
              borderRadius: "5px",
              marginLeft: "2rem",
              width: "16rem",
              height: "7rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link to={`/agvaMinidevice?name=Agva Pro ATP&projectCode=008`} style={{ textDecoration: "none" }}>
              <div className="d-flex" style={{ gap: "2rem" }}>
                <img
                  src={accounting}
                  style={{ height: "3rem" }}
                  alt="account"
                />
                <div
                  className="d-flex"
                  style={{
                    gap: "1rem",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h6 style={{ color: "#707070", fontSize: "1.4rem" }}>
                      Lock devices
                    </h6>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </CustomCard>
      </Col>

      {/* Charts Section */}
      <Col
        xl={4}
        lg={4}
        md={6}
        sm={6}
        style={{
          marginLeft: "2rem",
          paddingTop: "6rem",
          display: "flex",
          gap: "3rem",
          width: "100%",
        }}
      >
        {/* AgVa Pro Chart */}
        <div
          className="chart_container"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          <div className="doughnut_chart">
            {apiStates.demoSold === API_STATES.LOADING ? (
              <DoughnutShimmer />
            ) : apiStates.demoSold === API_STATES.ERROR ? (
              <ErrorDisplay 
                error={apiErrors.demoSold} 
                onRetry={() => loadDashboardDataSequentially()}
                apiName="AgVa Pro data"
              />
            ) : agvaPro ? (
              <>
                <div className="div_title">
                  <p className="title">AgVa Pro</p>
                  <span>Total Devices: {agvaPro?.totalCount}</span>
                </div>
                <div className="upper_div">
                  <div className="graph_heading">
                    <h6 style={{ color: "rgb(112, 112, 112)", fontSize: "0.9rem" }}>
                      Demo <span>{agvaPro?.demoCount}</span>
                    </h6>
                    <h6 style={{ color: "rgb(112, 112, 112)", fontSize: "0.9rem" }}>
                      Sold <span>{agvaPro?.soldCount}</span>
                    </h6>
                    <h6 style={{ color: "rgb(112, 112, 112)", fontSize: "0.9rem" }}>
                      Prod <span>{agvaPro?.inHouseCount}</span>
                    </h6>
                  </div>
                  <span>{purposeDevices?._id}</span>
                </div>
                <Doughnut chartData={data1} className="doughnut_data" />
              </>
            ) : (
              <DoughnutShimmer />
            )}
          </div>
        </div>

        {/* Suction Chart */}
        <div
          className="chart_container"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          <div className="doughnut_chart">
            {apiStates.demoSold === API_STATES.LOADING ? (
              <DoughnutShimmer />
            ) : apiStates.demoSold === API_STATES.ERROR ? (
              <ErrorDisplay 
                error={apiErrors.demoSold} 
                onRetry={() => loadDashboardDataSequentially()}
                apiName="Suction data"
              />
            ) : suction ? (
              <>
                <div className="div_title">
                  <p className="title">Suction</p>
                  <p>Total Devices: {suction?.totalCount}</p>
                </div>
                <div className="upper_div">
                  <div className="graph_heading">
                    <h6 style={{ color: "rgb(112, 112, 112)", fontSize: "0.9rem" }}>
                      Demo <span>{suction?.demoCount}</span>
                    </h6>
                    <h6 style={{ color: "rgb(112, 112, 112)", fontSize: "0.9rem" }}>
                      Sold <span>{suction?.soldCount}</span>
                    </h6>
                    <h6 style={{ color: "rgb(112, 112, 112)", fontSize: "0.9rem" }}>
                      Prod <span>{suction?.inHouseCount}</span>
                    </h6>
                  </div>
                  <span>{purposeDevices?._id}</span>
                </div>
                <Suspense fallback={<DoughnutShimmer />}>
                  <DougnutSuctionData chartData={data2} className="doughnut_data" />
                </Suspense>
              </>
            ) : (
              <DoughnutShimmer />
            )}
          </div>
        </div>
      </Col>

      {/* Timer Settings */}
      <Col
        xl={4}
        lg={4}
        md={6}
        sm={6}
        style={{
          marginLeft: "2rem",
          paddingTop: "6rem",
          display: "flex",
          gap: "3rem",
          width: "100%",
        }}
      >
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <h6>Select Time to refresh Graph </h6>
          <select className="select_details" onChange={(e) => setTimmer(e.target.value)}>
            <option>{timmer} min</option>
            <option value="1">1 min</option>
            <option value="2">2 min</option>
            <option value="5">5 min</option>
            <option value="10">10 min</option>
            <option value="15">15 min</option>
            <option value="30">30 min</option>
          </select>
        </div>
      </Col>

      {/* Line Charts Section */}
      <Col
        xl={4}
        lg={4}
        md={6}
        sm={6}
        style={{
          marginLeft: "2rem",
          paddingTop: "3rem",
          display: "flex",
          gap: "3rem",
          width: "100%",
        }}
      >
        <div
          className="chart_container"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {/* Total Devices Chart */}
          <div className="line_chart">
            <div className="upper_div">
              <div className="graph_heading">
                <h6 style={{ color: "rgb(112, 112, 112)", fontSize: "1.4rem" }}>
                  TOTAL DEVICES
                </h6>
                <select className="select_details" onChange={(e) => statusOfDuration(e)}>
                  <option>{durationData[0].toUpperCase() + durationData.slice(1)}</option>
                  {durationData == "yearly" ? "" : <option value="yearly">Yearly</option>}
                  {durationData == "monthly" ? "" : <option value="monthly">Monthly</option>}
                  {durationData == "weekly" ? "" : <option value="weekly">Weekly</option>}
                  {durationData == "today" ? "" : <option value="today">Today</option>}
                </select>
              </div>
            </div>
            {apiStates.dashboard === API_STATES.LOADING ? (
              <div style={{ position: 'relative', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span>Loading...</span>
              </div>
            ) : apiStates.dashboard === API_STATES.ERROR ? (
              <ErrorDisplay 
                error={apiErrors.dashboard} 
                onRetry={() => statusOfDuration({ target: { value: durationData } })}
                apiName="total devices data"
              />
            ) : (
              <>
                <LineChart _id='lineCharthai' chartData={data} className="lineChart_data" options={totalDevicesOption} />
                <h6 style={{ textAlign: 'center', paddingTop: '1rem' }}>{durationData?.toUpperCase()} DATA</h6>
              </>
            )}
          </div>

          {/* Total Active Devices Chart */}
          <div className="line_chart">
            <div className="upper_div">
              <div className="graph_heading">
                <h6 style={{ color: "rgb(112, 112, 112)", fontSize: "1.4rem" }}>
                  TOTAL ACTIVE DEVICES
                </h6>
                <select
                  className="select_details"
                  onChange={(e) => activeDevicesDataClick(e)}
                >
                  <option>{activedevices[0].toUpperCase() + activedevices.slice(1)}</option>
                  {activedevices == "yearly" ? "" : <option value="yearly">Yearly</option>}
                  {activedevices == "monthly" ? "" : <option value="monthly">Monthly</option>}
                  {activedevices == "weekly" ? "" : <option value="weekly">Weekly</option>}
                  {activedevices == "today" ? "" : <option value="today">Today</option>}
                </select>
              </div>
            </div>
            {apiStates.activeDevices === API_STATES.LOADING ? (
              <div style={{ position: 'relative', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span>Loading...</span>
              </div>
            ) : apiStates.activeDevices === API_STATES.ERROR ? (
              <ErrorDisplay 
                error={apiErrors.activeDevices} 
                onRetry={() => activeDevicesDataClick({ target: { value: activedevices } })}
                apiName="active devices data"
              />
            ) : (
              <>
                <LineChart chartData={activeData} className="lineChart_data" options={totalActiveDeviceOption} />
                <h6 style={{ textAlign: 'center', paddingTop: '1rem' }}>{activedevices?.toUpperCase()} DATA</h6>
              </>
            )}
          </div>
        </div>
      </Col>

      {/* Demo Devices Charts Section */}
      <Col
        xl={4}
        lg={4}
        md={6}
        sm={6}
        style={{
          marginLeft: "2rem",
          paddingTop: "6rem",
          display: "flex",
          gap: "3rem",
          width: "100%",
        }}
      >
        <div
          className="chart_container"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {/* Total Demo Devices Chart */}
          <div className="line_chart">
            <div className="upper_div">
              <div className="graph_heading">
                <h6 style={{ color: "rgb(112, 112, 112)", fontSize: "1.4rem" }}>
                  TOTAL DEMO DEVICES
                </h6>
                <select className="select_details" onChange={(e) => totalDemoChange(e)}>
                  <option>{totalDemoState[0].toUpperCase() + totalDemoState.slice(1)}</option>
                  {totalDemoState == "yearly" ? "" : <option value="yearly">Yearly</option>}
                  {totalDemoState == "monthly" ? "" : <option value="monthly">Monthly</option>}
                  {totalDemoState == "weekly" ? "" : <option value="weekly">Weekly</option>}
                  {totalDemoState == "today" ? "" : <option value="today">Today</option>}
                </select>
              </div>
            </div>
            {apiStates.demoDevices === API_STATES.LOADING ? (
              <div style={{ position: 'relative', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span>Loading...</span>
              </div>
            ) : apiStates.demoDevices === API_STATES.ERROR ? (
              <ErrorDisplay 
                error={apiErrors.demoDevices} 
                onRetry={() => totalDemoChange({ target: { value: totalDemoState } })}
                apiName="demo devices data"
              />
            ) : (
              <>
                <LineChart chartData={demoData} className="lineChart_data" options={totalDemoDevicesOption} />
                <h6 style={{ textAlign: 'center', paddingTop: '1rem' }}>{totalDemoState?.toUpperCase()} DATA</h6>
              </>
            )}
          </div>

          {/* Total Active Demo Devices Chart */}
          <div className="line_chart">
            <div className="upper_div">
              <div className="graph_heading">
                <h6 style={{ color: "rgb(112, 112, 112)", fontSize: "1.4rem" }}>
                  TOTAL ACTIVE DEMO DEVICES
                </h6>
                <select
                  className="select_details"
                  onChange={(e) => activeDemoDevicesDataClick(e)}
                >
                  <option>{activeDemoDevice[0].toUpperCase() + activeDemoDevice.slice(1)}</option>
                  {activeDemoDevice == "yearly" ? "" : <option value="yearly">Yearly</option>}
                  {activeDemoDevice == "monthly" ? "" : <option value="monthly">Monthly</option>}
                  {activeDemoDevice == "weekly" ? "" : <option value="weekly">Weekly</option>}
                  {activeDemoDevice == "today" ? "" : <option value="today">Today</option>}
                </select>
              </div>
            </div>
            {apiStates.activeDemoDevices === API_STATES.LOADING ? (
              <div style={{ position: 'relative', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span>Loading...</span>
              </div>
            ) : apiStates.activeDemoDevices === API_STATES.ERROR ? (
              <ErrorDisplay 
                error={apiErrors.activeDemoDevices} 
                onRetry={() => activeDemoDevicesDataClick({ target: { value: activeDemoDevice } })}
                apiName="active demo devices data"
              />
            ) : (
              <>
                <LineChart
                  chartData={activeDemoData}
                  className="lineChart_data"
                  options={totalActiveDemoDevicesOption}
                />
                <h6 style={{ textAlign: 'center', paddingTop: '1rem' }}>{activeDemoDevice?.toUpperCase()} DATA</h6>
              </>
            )}
          </div>
        </div>
      </Col>

      <FooterMain />
    </>
  );
};

export default AdminDashboard;
