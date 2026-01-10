/* eslint-disable */

import React from "react";
import { ThemeContext } from "../../utils/ThemeContext";
import agvaVenti from "../../assets/images/AgVaCrop.png";
import agvamini from "../../assets/icons/AgVaMini.png";
import { useSelector } from "react-redux";

const AgVaDevices = (props) => {
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const { adminInfo } = adminLoginReducer;
  const userType = adminInfo && adminInfo.data && adminInfo.data.userType;
  const { theme } = React.useContext(ThemeContext);
  let newDate = props.data.createdAt.split("T")[0];
  let year = newDate.split("-")[0];
  let month = newDate.split("-")[1];
  let day = newDate.split("-")[2];
  newDate = `${day}-${month}-${year}`;

  const handleAgVaProClick = (e) => {
    e.preventDefault();
    if (props.onDeviceClick) {
      props.onDeviceClick("agvaPro");
    }
  };

  const handleAgVaMiniClick = (e) => {
    e.preventDefault();
    if (props.onDeviceClick) {
      props.onDeviceClick("agvaMini");
    }
  };

  return (
    <>
      <ThemeContext.Consumer>
        {() => (
          <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',marginLeft:'40px', gap: '2.5rem'}}>
            {userType === 'User' ? (
              <div
                onClick={handleAgVaProClick}
                style={{ cursor: "pointer", textDecoration: "none" }}
              >
                <div
                  className="project-cart"
                  style={{
                    backgroundColor: "white",
                    padding: "1rem",
                    borderRadius: "15px",
                    width: "25rem",
                    height: "100%",
                    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 0px 50px',
                    background: '0% 0% no-repeat padding-box padding-box rgb(255, 255, 255)'
                  }}
                >
                  <div className="d-flex" style={{ gap: "5rem" }}>
                    <img
                      src={agvaVenti}
                      style={{ height: "12rem" }}
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
                        <h6 style={{ color: "#707070", fontSize: "2.5rem" }}>
                          AgVa Pro
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{display:'flex' ,gap:'2.5rem',flexWrap:'wrap'}}>
                {/* AgVa Pro */}
                <div
                  onClick={handleAgVaProClick}
                  style={{ cursor: "pointer", textDecoration: "none" }}
                >
                  <div
                    className="project-cart"
                    style={{
                      backgroundColor: "white",
                      padding: "1rem",
                      borderRadius: "15px",
                      width: "25rem",
                      height: "100%",
                      boxShadow: 'rgba(0, 0, 0, 0.16) 0px 0px 50px',
                      background: '0% 0% no-repeat padding-box padding-box rgb(255, 255, 255)'
                    }}
                  >
                    <div className="d-flex" style={{ gap: "5rem" }}>
                      <img
                        src={agvaVenti}
                        style={{ height: "12rem" }}
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
                          <h6 style={{ color: "#707070", fontSize: "2.5rem" }}>
                            AgVa Pro
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AgVa Mini */}
                <div
                  onClick={handleAgVaMiniClick}
                  style={{ cursor: "pointer", textDecoration: "none" }}
                >
                  <div
                    className="project-cart"
                    style={{
                      backgroundColor: "white",
                      padding: "1rem",
                      borderRadius: "15px",
                      width: "25rem",
                      height: "100%",
                      boxShadow: 'rgba(0, 0, 0, 0.16) 0px 0px 50px',
                      background: '0% 0% no-repeat padding-box padding-box rgb(255, 255, 255)',
                      display:'flex',
                      alignItems:'center'
                    }}
                  >
                    <div className="d-flex" style={{ gap: "3rem" }}>
                      <img
                        src={agvamini}
                        style={{ height: "15rem" }}
                        alt="AgVaMini"
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
                          <h6 style={{ color: "#707070", fontSize: "2.5rem" }}>
                            AgVa Mini
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </ThemeContext.Consumer>
    </>
  );
};

export default AgVaDevices;

