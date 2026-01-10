import React, { useState, useEffect, Fragment } from "react";
import Cookies from 'universal-cookie';
import Style from "../../css/CreateProject.module.css";
import CustomCard from "../../container/CustomCard";
import { Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import AgVaDevicesCard from "./AgVaDevices";
import AgVaDevicesTable from "./AgVaDevicesTable";
import {
  clearProjectData,
  getAllProject,
} from "../../store/action/ProjectAction";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Spinner from "../../container/Spinner";
import { Row } from "react-bootstrap";

const cookies = new Cookies();

function AgVaDevicesPage() {
  const Dispatch = useDispatch();
  const getAllProjectReducer = useSelector(
    (state) => state.getAllProjectReducer
  );
  const { allProjectData: ProjectData, allProjectData } = getAllProjectReducer;

  // GETTING USER NAME
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const { adminInfo } = adminLoginReducer;

  const avatar = useState(
    adminInfo && adminInfo.image && adminInfo.image
  )[0];

  const createNewProjectReducer = useSelector(
    (state) => state.createNewProjectReducer
  );
  const { data } = createNewProjectReducer;
  if (data && data.data) {
    toast.success("Project Created Successfully");
    Dispatch(clearProjectData());
  }
  const navigate = useNavigate();

  // State to track which device type is selected
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    if (!cookies.get('ddAdminToken')) {
      navigate("/");
    }
    if (localStorage.getItem("project_type")) {
      localStorage.removeItem("project_type");
    }
    if (localStorage.getItem("selected_date")) {
      localStorage.removeItem("selected_date");
    }
    Dispatch(getAllProject());
  }, []);

  // @@ REMOVING PROJECT TYPE FROM LOCALHOST ----
  useEffect(() => {
    localStorage.removeItem("project_type");
    localStorage.removeItem("page_no");
  }, []);

  return (
    <>
      {/*Logout functionality */}
      {ProjectData && ProjectData.data && ProjectData.data.data ? (
        <>
          <div className={Style.MainContantainer}>
            {/*maps project data - only showing AgVa Pro and AgVa Mini */}
            {!selectedDevice && allProjectData &&
              allProjectData.data.data.length &&
              allProjectData.data.data.map((data, i) => (
                <Fragment key={i}>
                  <AgVaDevicesCard 
                    data={data} 
                    onDeviceClick={(deviceType) => setSelectedDevice(deviceType)}
                  />
                </Fragment>
              ))}
          </div>

          {/* Device Tables Section - Show only selected device */}
          {selectedDevice && (
            <div style={{ marginTop: "2rem", width: "100%" }}>
              {selectedDevice === "agvaPro" && (
                <AgVaDevicesTable 
                  projectCode="008" 
                  deviceName="AgVa Pro"
                  onBack={() => setSelectedDevice(null)}
                />
              )}
              {selectedDevice === "agvaMini" && (
                <AgVaDevicesTable 
                  projectCode="007" 
                  deviceName="AgVa Mini"
                  onBack={() => setSelectedDevice(null)}
                />
              )}
            </div>
          )}
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default AgVaDevicesPage;

