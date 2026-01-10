/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postLockToDeviceIdAction } from "../../store/action/DeviceAction";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";
import axios from "axios";
import Cookies from "universal-cookie";
import { Row, Col } from "react-bootstrap";
import Style from "../../css/DevicePage.module.css";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { Toaster } from "react-hot-toast";

const cookies = new Cookies();

const AgVaDevicesTable = ({ projectCode, deviceName, onBack }) => {
  const dispatch = useDispatch();
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const { adminInfo } = adminLoginReducer;
  const adminProfile = adminInfo && adminInfo.data && adminInfo.data.userType;
  const email = adminInfo && adminInfo.data && adminInfo.data.email;

  const [searchData, setSearchData] = useState('');
  const [socket, setSocket] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lockFilter, setLockFilter] = useState('all'); // 'all', 'locked', 'unlocked'
  const recordsPerPage = 10;

  // Initialize socket connection
  useEffect(() => {
    const serverUrl = `${process.env.REACT_APP_BASE_URL}/`;
    const newSocket = io.connect(serverUrl);
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  // Fetch all pages when filtering
  const fetchAllDevicesForFilter = async (search, projectCode) => {
    const token = cookies.get("ddAdminToken");
    const searchDataa = search ? search : "";
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    
    let allRecords = [];
    let currentPageNum = 1;
    let hasMorePages = true;
    const pageLimit = 100; // Fetch 100 records per page
    let totalPagesFromAPI = null;
    
    while (hasMorePages) {
      try {
        const url = `${process.env.REACT_APP_BASE_URL}/api/logger/logs/v2/AllEvents/Events/${projectCode}?search=${searchDataa}&page=${currentPageNum}&limit=${pageLimit}`;
        const response = await axios.get(url, config);
        
        // Handle different response structures
        let pageRecords = [];
        if (response.data && response.data.data && response.data.data.data) {
          pageRecords = response.data.data.data;
          totalPagesFromAPI = response.data.data.totalPages || 
                              response.data.data.total_pages ||
                              response.data.totalPages || 
                              response.data.total_pages;
        } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
          pageRecords = response.data.data;
          totalPagesFromAPI = response.data.totalPages || 
                              response.data.total_pages;
        } else if (response.data && Array.isArray(response.data)) {
          pageRecords = response.data;
        }
        
        if (pageRecords.length > 0) {
          allRecords = [...allRecords, ...pageRecords];
          
          // Check if we've reached the last page
          if (totalPagesFromAPI) {
            if (currentPageNum >= totalPagesFromAPI) {
              hasMorePages = false;
            } else {
              currentPageNum++;
            }
          } else {
            // If no totalPages info, stop if we got fewer records than requested
            if (pageRecords.length < pageLimit) {
              hasMorePages = false;
            } else {
              currentPageNum++;
            }
          }
        } else {
          hasMorePages = false;
        }
      } catch (err) {
        console.error("Error fetching page:", currentPageNum, err);
        hasMorePages = false;
      }
    }
    
    // Return data in the same format as single page response
    return {
      data: {
        data: allRecords,
        totalPages: Math.ceil(allRecords.length / recordsPerPage),
        currentPage: 1
      }
    };
  };

  // Fetch devices directly
  const fetchDevices = async (page, limit, search, projectCode, lockStatus) => {
    setLoading(true);
    setError(null);
    try {
      const token = cookies.get("ddAdminToken");
      const searchDataa = search ? search : "";
      
      // Build URL with optional lock status filter
      let url = `${process.env.REACT_APP_BASE_URL}/api/logger/logs/v2/AllEvents/Events/${projectCode}?search=${searchDataa}&page=${page}&limit=${limit}`;
      
      // Add lock status filter if not "all"
      if (lockStatus && lockStatus !== 'all') {
        url += `&isLocked=${lockStatus === 'locked' ? 'true' : 'false'}`;
      }
      
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(url, config);
      
      // Log response structure for debugging
      console.log("API Response structure:", {
        hasData: !!response.data,
        hasDataData: !!(response.data && response.data.data),
        hasDataDataData: !!(response.data && response.data.data && response.data.data.data),
        rootTotalPages: response.data?.totalPages,
        nestedTotalPages: response.data?.data?.totalPages,
        totalDataCount: response.data?.totalDataCount,
        currentPage: response.data?.currentPage,
        recordsCount: response.data?.data?.data?.length || response.data?.data?.length
      });
      
      setTableData(response.data);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch devices");
      toast.error("Failed to fetch devices");
    } finally {
      setLoading(false);
    }
  };

  // Fetch devices on mount and when dependencies change
  useEffect(() => {
    if (projectCode) {
      fetchDevices(currentPage, recordsPerPage, searchData, projectCode, lockFilter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, projectCode, lockFilter]);

  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      setCurrentPage(1);
      // Fetch immediately when Enter is pressed
      fetchDevices(1, recordsPerPage, e.target.value, projectCode, lockFilter);
    }
  };

  const handleLockFilterChange = (filter) => {
    setLockFilter(filter);
    setCurrentPage(1);
    // Don't call fetchDevices here - let useEffect handle it
  };

  const handleLockUnlock = async (deviceId, isLocked) => {
    try {
      await dispatch(postLockToDeviceIdAction({ 
        DeviceId: deviceId, 
        isPaymentDone: isLocked ? "false" : "true", 
        isLocked: !isLocked, 
        email: email,
        socket: socket 
      }));
      
      // Refresh the device list after lock/unlock
      setTimeout(() => {
        fetchDevices(currentPage, recordsPerPage, searchData, projectCode, lockFilter);
      }, 1000);
    } catch (error) {
      toast.error("Failed to update lock status");
    }
  };

  // Handle different response structures
  let records = [];
  let totalPages = 1;
  let currentPageFromResponse = 1;
  
  if (tableData) {
    // API response structure: { data: { data: [...] }, totalPages: X, currentPage: Y, totalDataCount: Z }
    // Check root level first for totalPages (as per actual API response)
    if (tableData.data) {
      if (tableData.data.data && Array.isArray(tableData.data.data)) {
        // Structure: { data: { data: [...] }, totalPages: X, currentPage: Y }
        records = tableData.data.data;
        // Check root level FIRST (as API returns it there)
        totalPages = tableData.totalPages || 
                     tableData.total_pages ||
                     tableData.data.totalPages || 
                     tableData.data.total_pages || 
                     1;
        currentPageFromResponse = tableData.currentPage || 
                                  tableData.current_page ||
                                  tableData.data.currentPage || 
                                  tableData.data.current_page || 
                                  currentPage;
      } else if (Array.isArray(tableData.data)) {
        // Structure: { data: [...], totalPages: X }
        records = tableData.data;
        totalPages = tableData.totalPages || 
                     tableData.total_pages || 
                     1;
        currentPageFromResponse = tableData.currentPage || 
                                  tableData.current_page || 
                                  currentPage;
      }
    } else if (Array.isArray(tableData)) {
      // Structure: [...]
      records = tableData;
    }
    
    // Ensure totalPages is a valid number
    totalPages = parseInt(totalPages) || 1;
    currentPageFromResponse = parseInt(currentPageFromResponse) || currentPage;
    
    // If totalDataCount exists, calculate correct totalPages based on it
    // This handles cases where API returns incorrect totalPages (especially when filtering)
    if (tableData.totalDataCount) {
      const calculatedTotalPages = Math.ceil(tableData.totalDataCount / recordsPerPage);
      // Use calculated value if it's different from API's totalPages and makes sense
      if (calculatedTotalPages > 0 && calculatedTotalPages !== totalPages) {
        totalPages = calculatedTotalPages;
      }
    }
    
    // Debug log
    console.log("Parsed pagination:", {
      recordsCount: records.length,
      totalPages,
      currentPageFromResponse,
      totalDataCount: tableData.totalDataCount,
      rootTotalPages: tableData.totalPages,
      nestedTotalPages: tableData.data?.totalPages,
      calculatedTotalPages: tableData.totalDataCount ? Math.ceil(tableData.totalDataCount / recordsPerPage) : null
    });
  }
  
  // Note: The API seems to handle filtering server-side, so we use the data directly
  // No client-side filtering needed - API returns filtered results
  // The lock status filter should be passed to the API if it supports it
  // For now, we'll use the data as-is from the API response
  
  // The records and totalPages are already set from the API response above
  // No additional filtering needed since API handles it

  return (
    <div>
      <Toaster/>
      <Row className="rowSection">
        <Col
          xl={10}
          lg={10}
          md={10}
          sm={10}
          className={Style.NavbarColumn}
          style={{ width: "100%" }}
        >
          <div
            className=""
            style={{
              position: "relative",
              top: "1rem",
              marginLeft: "2rem",
              width: "97%",
            }}
          >
            {/* Heading Section */}
            <div
              className="topHeading"
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "2rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <div
                  className="deviceSummary"
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <div onClick={onBack} style={{ cursor: "pointer" }}>
                    <IoIosArrowDropleftCircle color="rgb(152, 0, 76)" size={40}/>
                  </div>
                  <h4 className={Style.Header}>Device Summary</h4>
                </div>
                <div>
                  <h5 className={Style.heading}>Device: {deviceName}</h5>
                </div>
              </div>
            </div>
            <div className={Style.Container}>
              {/* Events  */}
              <Row className="mt-0">
                <Col>
                  <div className={Style.tableCard} borderRadius="20px">
                    <>
                      <section className={Style.OuterTable}>
                        <div className={Style.insideOuterTable}>
                          <div
                            className="search_section"
                            style={{ display: "flex", gap: "3rem", alignItems: "center" }}
                          >
                            <div
                              className="input_section"
                              style={{
                                display: "flex",
                                backgroundColor: "white",
                                borderRadius: "10px",
                                width: "70%",
                                alignItems: "center",
                              }}
                            >
                              <input
                                className="search_input"
                                type="text"
                                placeholder="Enter Details"
                                value={searchData}
                                onChange={(e) => {
                                  setSearchData(e.target.value);
                                  if (e.target.value === '') {
                                    setCurrentPage(1);
                                    // Fetch when search is cleared
                                    fetchDevices(1, recordsPerPage, '', projectCode, lockFilter);
                                  }
                                }}
                                onKeyUp={handleSearch}
                                style={{
                                  padding: "0.8rem",
                                  border: "0px",
                                  width: "100%",
                                }}
                              />
                            </div>
                            {/* Lock Status Filter */}
                            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                              <span style={{ color: "white", fontSize: "0.9rem", marginRight: "0.5rem" }}>Filter:</span>
                              <button
                                onClick={() => handleLockFilterChange('all')}
                                style={{
                                  padding: "0.5rem 1rem",
                                  backgroundColor: lockFilter === 'all' ? "#98004c" : "rgba(255, 255, 255, 0.2)",
                                  color: "white",
                                  border: "1px solid white",
                                  borderRadius: "5px",
                                  cursor: "pointer",
                                  fontSize: "0.85rem"
                                }}
                              >
                                All
                              </button>
                              <button
                                onClick={() => handleLockFilterChange('locked')}
                                style={{
                                  padding: "0.5rem 1rem",
                                  backgroundColor: lockFilter === 'locked' ? "#98004c" : "rgba(255, 255, 255, 0.2)",
                                  color: "white",
                                  border: "1px solid white",
                                  borderRadius: "5px",
                                  cursor: "pointer",
                                  fontSize: "0.85rem"
                                }}
                              >
                                Locked
                              </button>
                              <button
                                onClick={() => handleLockFilterChange('unlocked')}
                                style={{
                                  padding: "0.5rem 1rem",
                                  backgroundColor: lockFilter === 'unlocked' ? "#98004c" : "rgba(255, 255, 255, 0.2)",
                                  color: "white",
                                  border: "1px solid white",
                                  borderRadius: "5px",
                                  cursor: "pointer",
                                  fontSize: "0.85rem"
                                }}
                              >
                                Unlocked
                              </button>
                            </div>
                          </div>
                          <div className={Style.deviceDataText}>
                            <div>
                              <span className={Style.deviceTextData}>
                                Device ID
                              </span>
                            </div>
                            <div>
                              <span className={Style.deviceTextData}>
                                Status
                              </span>
                            </div>
                            <div>
                              <span className={Style.deviceTextData}>
                                Serial Number
                              </span>
                            </div>
                            <div>
                              <span className={Style.deviceTextData}>
                                Lock Status
                              </span>
                            </div>
                            <div>
                              <span className={Style.deviceTextData}>
                                Actions
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* TABLE HERE */}
                        {loading ? (
                          <div style={{ padding: "2rem", textAlign: "center" }}>
                            <span>Loading...</span>
                          </div>
                        ) : error ? (
                          <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
                            <span>Error: {error}</span>
                          </div>
                        ) : records.length > 0 ? (
                          <section className={Style.alertTable}>
                            <div>
                              {records
                                .filter((item, index) =>
                                  records.findIndex(
                                    (obj) => obj.deviceId === item.deviceId
                                  ) === index
                                )
                                .map((item, _id) => {
                                  // Check multiple ways the lock status might be stored
                                  const isLocked = item.isLocked === true || 
                                                   item.isLocked === "true" || 
                                                   item.isLocked === 1 ||
                                                   item.lockedStatus === "Locked" ||
                                                   item.lockedStatus === "locked";
                                  const lockStatus = item.lockedStatus || (isLocked ? "Locked" : "Unlocked");
                                  
                                  return (
                                    <React.Fragment key={_id}>
                                      <section className={Style.tableBody}>
                                        <section className={Style.insideTextData}>
                                          {item.deviceId}
                                        </section>
                                        <section className={Style.insideTextData}>
                                          {item.message === "ACTIVE" ? (
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
                                          ) : item.message === "INACTIVE" ? (
                                            <svg
                                              width="40px"
                                              height="40px"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                              stroke="#ffbf00"
                                            >
                                              <g id="SVGRepo_iconCarrier">
                                                <path
                                                  d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z"
                                                  fill="#ffbf00"
                                                ></path>
                                              </g>
                                            </svg>
                                          ) : (
                                            "--"
                                          )}
                                        </section>
                                        <section className={Style.insideTextData}>
                                          {item?.serialNumber ? item.serialNumber : '--'}
                                        </section>
                                        <section className={Style.insideTextData}>
                                          <span style={{ 
                                            color: isLocked ? "#e53e3e" : "#11ac14",
                                            fontWeight: "bold"
                                          }}>
                                            {lockStatus}
                                          </span>
                                        </section>
                                        <section className="buttonDiv" style={{ display: "flex" }}>
                                          <div
                                            className="px-4 py-1"
                                            style={{
                                              padding: "1px",
                                              margin: "1px",
                                            }}
                                          >
                                            <button
                                              onClick={() => handleLockUnlock(item.deviceId, isLocked)}
                                              style={{
                                                width: "9rem",
                                                backgroundColor: isLocked ? "#11ac14" : "#e53e3e",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "5px",
                                                padding: "0.5rem 1rem",
                                                cursor: "pointer",
                                                fontSize: "0.9rem",
                                                fontWeight: "500"
                                              }}
                                              className="focus:outline-none hover:opacity-90"
                                            >
                                              {isLocked ? "Unlock" : "Lock"}
                                            </button>
                                          </div>
                                        </section>
                                      </section>
                                    </React.Fragment>
                                  );
                                })}
                            </div>
                          </section>
                        ) : (
                          <div style={{ padding: "2rem", textAlign: "center" }}>
                            <span>No devices found</span>
                          </div>
                        )}
                      </section>
                    </>
                  </div>
                </Col>
              </Row>
            </div>

            {/* Pagination */}
            {(totalPages > 1 || records.length > 0) && (
              <div style={{ 
                display: "flex", 
                justifyContent: "center", 
                gap: "1rem", 
                marginTop: "2rem",
                marginLeft: "2rem"
              }}>
                <button
                  onClick={() => {
                    const newPage = Math.max(currentPage - 1, 1);
                    setCurrentPage(newPage);
                  }}
                  disabled={currentPage === 1}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: currentPage === 1 ? "#ccc" : "#98004c",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer"
                  }}
                >
                  Previous
                </button>
                <span style={{ padding: "0.5rem", alignSelf: "center" }}>
                  Page {currentPage} of {totalPages} {records.length > 0 && `(${records.length} devices on this page)`}
                </span>
                <button
                  onClick={() => {
                    const newPage = Math.min(currentPage + 1, totalPages);
                    setCurrentPage(newPage);
                  }}
                  disabled={currentPage >= totalPages}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: currentPage >= totalPages ? "#ccc" : "#98004c",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: currentPage >= totalPages ? "not-allowed" : "pointer"
                  }}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AgVaDevicesTable;
