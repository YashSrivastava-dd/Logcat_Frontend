import axios from "axios";
import Cookies from "universal-cookie";
import {
  DEVICE_FAIL,
  DEVICE_REQUEST,
  DEVICE_SUCCESS,
  REGISTER_NEW_DEVICE_REQUEST,
  REGISTER_NEW_DEVICE_SUCCESS,
  REGISTER_NEW_DEVICE_FAIL,
  GET_DEVICE_EVENTS_BY_ID_FAIL,
  GET_DEVICE_EVENTS_BY_ID_SUCCESS,
  GET_DEVICE_EVENTS_BY_ID_REQUEST,
  UPDATE_DEVICE_DETAILS_BY_ID_FAIL,
  UPDATE_DEVICE_DETAILS_BY_ID_SUCCESS,
  UPDATE_DEVICE_DETAILS_BY_ID_REQUEST,
  GET_REGISTERED_DEVICE_DETAILS_REQUEST,
  GET_REGISTERED_DEVICE_DETAILS_SUCCESS,
  GET_REGISTERED_DEVICE_DETAILS_FAIL,
  GET_DEVICE_ALARMS_BY_ID_FAIL,
  GET_DEVICE_ALARMS_BY_ID_REQUEST,
  GET_DEVICE_ALARMS_BY_ID_SUCCESS,
  GET_DEVICE_LOGS_BY_ID_FAIL,
  GET_DEVICE_LOGS_BY_ID_REQUEST,
  GET_DEVICE_LOGS_BY_ID_SUCCESS,
  GET_DEVICE_TRENDS_BY_ID_REQUEST,
  GET_DEVICE_TRENDS_BY_ID_SUCCESS,
  GET_DEVICE_TRENDS_BY_ID_FAIL,
  GET_LOG_MSG_OCCURENCE_FAIL,
  GET_LOG_MSG_OCCURENCE_REQUEST,
  GET_LOG_MSG_OCCURENCE_SUCCESS,
  GET_DEVICE_CRASH_ANALYTICS_DATA_FAIL,
  GET_DEVICE_CRASH_ANALYTICS_DATA_REQUEST,
  GET_DEVICE_CRASH_ANALYTICS_DATA_SUCCESS,
  GET_DEVICE_CALIBRATION_BY_ID_REQUEST,
  GET_DEVICE_CALIBRATION_BY_ID_SUCCESS,
  GET_DEVICE_CALIBRATION_BY_ID_FAIL,
  GET_ABOUT_SECTION_BY_ID_REQUEST,
  GET_ABOUT_SECTION_BY_ID_FAIL,
  GET_ABOUT_SECTION_BY_ID_SUCCESS,
  GET_SERVICE_RECORDS_DETAILS,
  GET_SERVICE_RECORDS_DETAILS_SUCCESS,
  GET_SERVICE_RECORDS_DETAILS_FAIL,
  GET_SINGLE_DEVICEID_REQUEST,
  GET_SINGLE_DEVICEID_SUCCESS,
  GET_SINGLE_DEVICEID_FAIL,
  GET_SINGLE_DEVICEIDBY_USERID_REQUEST,
  GET_SINGLE_DEVICEIDBY_USERID_FAIL,
  GET_SINGLE_DEVICEIDBY_USERID_SUCCESS,
  GET_SINGLE_UPLOAD_FILE_REQUEST,
  GET_SINGLE_UPLOAD_FILE_SUCCESS,
  GET_SINGLE_UPLOAD_FILE_FAIL,
  GET_SERIAL_NO_BY_DEVICE_ID_REQUEST,
  GET_SERIAL_NO_BY_DEVICE_ID_REQUEST_SUCCESS,
  GET_SERIAL_NO_BY_DEVICE_ID_REQUEST_FAIL,
  GET_PATIENT_DETAILS_REQUEST,
  GET_PATIENT_DETAILS_SUCCESS,
  GET_PATIENT_DETAILS_FAIL,
  GET_PATIENT_DETAILS_BY_UHID_REQUEST,
  GET_PATIENT_DETAILS_BY_UHID_SUCCESS,
  GET_PATIENT_DETAILS_BY_UHID_FAIL,
  PUT_PATIENT_DATA_REQUEST,
  PUT_PATIENT_DATA_SUCCESS,
  PUT_PATIENT_DATA_FAIL,
  ADD_PATIENT_DIAGNOSE_REQUEST,
  ADD_PATIENT_DIAGNOSE_SUCCESS,
  ADD_PATIENT_DIAGNOSE_FAIL,
  GET_PATIENT_DIAGNOSE_REQUEST,
  GET_PATIENT_DIAGNOSE_SUCCESS,
  GET_PATIENT_DIAGNOSE_FAIL,
  GET_UHIDS_LIST_REQUEST,
  GET_UHIDS_LIST_SUCCESS,
  GET_UHIDS_LIST_FAIL,
  GET_REQUEST_USER_DATA_REQUEST,
  GET_REQUEST_USER_DATA_SUCCESS,
  GET_REQUEST_USER_DATA_FAIL,
  GET_USER_DEVICE_REQUEST,
  GET_USER_DEVICE_SUCCESS,
  GET_USER_DEVICE_FAIL,
  GET_SINGLE_PRODUCTION_DATA_FAIL,
  GET_SINGLE_PRODUCTION_DATA_SUCCESS,
  GET_SINGLE_PRODUCTION_DATA_REQUEST,
  POST_EDIT_ACCOUNT_DETAILS_FAIL,
  POST_EDIT_ACCOUNT_DETAILS_SUCCESS,
  POST_EDIT_ACCOUNT_DETAILS_REQUEST,
  NEW_DEVICES_REQUEST,
  NEW_DEVICES_SUCCESS,
  NEW_DEVICES_FAIL,
  GET_NEW_DEVICES_EVENTS_BY_ID_REQUEST,
  GET_NEW_DEVICES_EVENTS_BY_ID_SUCCESS,
  GET_NEW_DEVICES_EVENTS_BY_ID_FAIL,
  GET_NEW_DEVICES_ALARMS_BY_ID_REQUEST,
  GET_NEW_DEVICES_ALARMS_BY_ID_SUCCESS,
  GET_NEW_DEVICES_ALARMS_BY_ID_FAIL,
  GET_NEW_DEVICES_LOGS_BY_ID_REQUEST,
  GET_NEW_DEVICES_LOGS_BY_ID_SUCCESS,
  GET_NEW_DEVICES_LOGS_BY_ID_FAIL,
  GET_NEW_DEVICES_OF_TRENDS_BY_ID_REQUEST,
  GET_NEW_DEVICES_OF_TRENDS_BY_ID_SUCCESS,
  GET_NEW_DEVICES_OF_TRENDS_BY_ID_FAIL,
  GET_PATIENT_DETAILS_OF_NEW_DEVICES_BY_UHID_REQUEST,
  GET_PATIENT_DETAILS_OF_NEW_DEVICES_BY_UHID_SUCCESS,
  GET_PATIENT_DETAILS_OF_NEW_DEVICES_BY_UHID_FAIL,
  GET_PATIENT_DISCHARGE_REQUEST,
  GET_PATIENT_DISCHARGE_SUCCESS,
  GET_PATIENT_DISCHARGE_FAIL,
  POST_DEVICE_ID_FROM_LOCK_REQUEST,
  POST_DEVICE_ID_FROM_LOCK_SUCCESS,
  POST_DEVICE_ID_FROM_LOCK_FAIL,
  UPDATE_PAYMENT_LOCK_STATUS_REQUEST,
  UPDATE_PAYMENT_LOCK_STATUS_SUCCESS,
  UPDATE_PAYMENT_LOCK_STATUS_FAIL,
  GET_ALL_USER_COUNT_DATA_FAIL,
  GET_ALL_USER_COUNT_DATA_SUCCESS,
  GET_ALL_USER_COUNT_DATA_REQUEST,
  GET_INDIAN_MEDIDINE_FAIL,
  GET_INDIAN_MEDIDINE_SUCCESS,
  GET_INDIAN_MEDIDINE_ACTION,
  PUT_ADD_ILLNESS_MEDICINE_FAIL,
  PUT_ADD_ILLNESS_MEDICINE_SUCCESS,
  PUT_ADD_ILLNESS_MEDICINE_REQUEST,
  PUT_MEDICINE_AND_ILLNESS_FAIL,
  PUT_MEDICINE_AND_ILLNESS_SUCCESS,
  PUT_MEDICINE_AND_ILLNESS_REQUEST,
  PUT_END_DATE_FAIL,
  PUT_END_DATE_SUCCESS,
  PUT_END_DATE_REQUEST,
  GET_GRAPH_OF_TREND_MEDICINE_FAIL,
  GET_GRAPH_OF_TREND_MEDICINE_SUCCESS,
  GET_GRAPH_OF_TREND_MEDICINE_REQUEST,
  GET_DEVELOPER_OPTIONS_DATA_REQUEST,
  GET_DEVELOPER_OPTIONS_DATA_SUCCESS,
  GET_DEVELOPER_OPTIONS_DATA_FAIL,
  POST_TRACK_HISTORY_DATA_FAIL,
  POST_TRACK_HISTORY_DATA_SUCCESS,
  POST_TRACK_HISTORY_DATA_REQUEST,
  ALL_DEVICE_DATA_AGVA_MINI_FAIL,
  ALL_DEVICE_DATA_AGVA_MINI_SUCCESS,
  ALL_DEVICE_DATA_AGVA_MINI_REQUEST,
  GET_SINGLE_DATA_AGVA_MINI_FAIL,
  GET_SINGLE_DATA_AGVA_MINI_SUCCESS,
  GET_SINGLE_DATA_AGVA_MINI_REQUEST,
  PUT_DEMO_END_DATE_FAIL,
  PUT_DEMO_END_DATE_SUCCESS,
  PUT_DEMO_END_DATE_REQUEST,
} from "../types/DeviceConstant";
import { toast } from "react-hot-toast";
const cookies = new Cookies();

export const deviceAction = (page, limit, searchData) => async (dispatch) => {
  try {
    dispatch({
      type: DEVICE_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const search = searchData ? searchData : "";
    const npage = page===null ? "" : page;
    const nlimit = limit ? limit : "";
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let response;
    response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/AllEvents/Events?search=${search}&page=${npage}&limit=${nlimit}`,
      config
    );
    dispatch({
      type: DEVICE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: DEVICE_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const newDeviceAction =
  ({ page, limit, searchData, projectCode }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: NEW_DEVICES_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const searchDataa = searchData ? searchData : "";
      const projectCodee = "008";
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      let response;
      response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/logger/logs/v2/AllEvents/Events/${projectCodee}?search=${searchDataa}&page=${page}&limit=${limit}`,
        config
      );
      dispatch({
        type: NEW_DEVICES_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: NEW_DEVICES_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

export const getUserDeviceAction =
  ({ page, limit, searchData }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_USER_DEVICE_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const search = searchData ? searchData : "";
      const npage = page===null ? "" : page;
      const nlimit = limit ? limit : "";

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      let response;
      response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/logger/logs/AllEvents/Events?search=${search}&page=${npage}&limit=${nlimit}`,
        config
      );
      dispatch({
        type: GET_USER_DEVICE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_USER_DEVICE_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

//Register API Used in EditDetailsModal
export const registerNewDevice =
  ({
    DeviceId,
    DepartmentName,
    HospitalName,
    DoctorName,
    Wardno,
    IMEINumber,
    VentiOperator,
    AliasName,
    deviceType,
  }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: REGISTER_NEW_DEVICE_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/devices/register/`,
        {
          DeviceId,
          Department_Name: DepartmentName,
          Hospital_Name: HospitalName,
          Doctor_Name: DoctorName,
          Ward_No: Wardno,
          IMEI_NO: IMEINumber,
          Bio_Med: VentiOperator,
          Alias_Name: AliasName,
          deviceType: deviceType,
        },
        config
      );
      dispatch({
        type: REGISTER_NEW_DEVICE_SUCCESS,
        payload: data,
      });
      if (data.statusCode === 200) {
        alert("Register Success");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      dispatch({
        type: REGISTER_NEW_DEVICE_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

export const getRegisteredDetailsById =
  (
    DeviceID,
    DoctorName,
    HospitalName,
    Alias,
    IMEINumber,
    VentiOperator,
    Wardno
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_REGISTERED_DEVICE_DETAILS_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/devices/`,
        {
          DeviceId: DeviceID,
          Doctor_Name: DoctorName,
          hospitalName: HospitalName,
          departmentName: Alias,
          IMEI_NO: IMEINumber,
          Bio_Med: VentiOperator,
          Ward_No: Wardno,
        },
        config
      );

      dispatch({
        type: GET_REGISTERED_DEVICE_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_REGISTERED_DEVICE_DETAILS_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

// If yopu saw an error regarding deviceId,  _ref kind of so just do {deviceId} to deviceId
export const getSingleDeviceIdDetails =
  (DeviceId, code) => async (dispatch) => {
    try {
      dispatch({
        type: GET_SINGLE_DEVICEID_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      let { data } = await axios.get(
        code
          ? `${process.env.REACT_APP_BASE_URL}/devices/getdevice/v2/${DeviceId}`
          : `${process.env.REACT_APP_BASE_URL}/devices/getdevice/${DeviceId}`,
        config
      );
      dispatch({
        type: GET_SINGLE_DEVICEID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_DEVICEID_FAIL,
        payload:
          error &&
          error.response &&
          error.response.data &&
          error.response.data.data &&
          error.response.data.data.err &&
          error.response.data.data.msg,
      });
    }
  };
export const getSingleDeviceIdByUser = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SINGLE_DEVICEIDBY_USERID_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/getAssignedDeviceByUserId/${userId}`,
      config
    );
    dispatch({
      type: GET_SINGLE_DEVICEIDBY_USERID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_DEVICEIDBY_USERID_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.msg,
    });
  }
};
export const updateDetailsById =
  ({
    DeviceId,
    departmentName,
    hospitalName,
    Doctor_Name,
    Ward_No,
    IMEI_NO,
    Bio_Med,
    Alias_Name,
  }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_DEVICE_DETAILS_BY_ID_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      let { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/devices/update/${DeviceId}`,
        {
          Department_Name: departmentName,
          Hospital_Name: hospitalName,
          Doctor_Name,
          Ward_No,
          IMEI_NO,
          Bio_Med,
          Alias_Name,
        },
        config
      );
      dispatch({
        type: UPDATE_DEVICE_DETAILS_BY_ID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_DEVICE_DETAILS_BY_ID_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };
export const getAboutSectionById = (did) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ABOUT_SECTION_BY_ID_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const DeviceId121 = did;
    let response;

    response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/about/${DeviceId121}`,
      config
    );
    dispatch({
      type: GET_ABOUT_SECTION_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ABOUT_SECTION_BY_ID_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const getDeveloperOptionData =
  ({ page, limit, did }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_DEVELOPER_OPTIONS_DATA_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      let response;
      response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/logger/logs/get-debug-events/${did}`,
        config
      );
      dispatch({
        type: GET_DEVELOPER_OPTIONS_DATA_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_DEVELOPER_OPTIONS_DATA_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

export const getDeviceEventsById =
  ({ page, limit, startDate, endDate, search }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_DEVICE_EVENTS_BY_ID_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      let startDatee = startDate===undefined ? "" : startDate;
      let endDatee = endDate===undefined ? "" : endDate;
      let searchh = search===undefined ? "" : search;

      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const projectCode = urlParams.get("code");
      const DeviceId12 = urlParams.get("DeviceId");

      let response;

      response = await axios.get(
        projectCode
          ? `${process.env.REACT_APP_BASE_URL}/api/logger/logs/v2/deviceEvents/${DeviceId12}?page=${page}&limit=${limit}&startDate=${startDatee}&endDate=${endDatee}&search=${searchh}`
          : `${process.env.REACT_APP_BASE_URL}/api/logger/logs/deviceEvents/${DeviceId12}?page=${page}&limit=${limit}&startDate=${startDatee}&endDate=${endDatee}&search=${searchh}`,
        config
      );
      dispatch({
        type: GET_DEVICE_EVENTS_BY_ID_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_DEVICE_EVENTS_BY_ID_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

export const getNewDevicesEventsById =
  ({ page, limit }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_NEW_DEVICES_EVENTS_BY_ID_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const DeviceId12 = urlParams.get("DeviceId");
      let response;
      response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/logger/logs/v2/deviceEvents/${DeviceId12}?page=${page}&limit=${limit}`,
        config
      );
      dispatch({
        type: GET_NEW_DEVICES_EVENTS_BY_ID_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_NEW_DEVICES_EVENTS_BY_ID_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };
export const getCalibrationById =
  ({ page, limit }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_DEVICE_CALIBRATION_BY_ID_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const DeviceId12 = urlParams.get("DeviceId");
      const projectCode = urlParams.get("projectCode");
      let response;

      response = await axios.get(
        projectCode
          ? `${process.env.REACT_APP_BASE_URL}/api/logger/logs/v2/calibration/${DeviceId12}?page=${page}&limit=${limit}`
          : `${process.env.REACT_APP_BASE_URL}/api/logger/logs/calibration/${DeviceId12}?page=${page}&limit=${limit}`,
        config
      );
      dispatch({
        type: GET_DEVICE_CALIBRATION_BY_ID_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_DEVICE_CALIBRATION_BY_ID_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };
export const getDeviceAlarmsById =
  ({ page, limit, startDate, endDate, search }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_DEVICE_ALARMS_BY_ID_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const startDatee =
        startDate===undefined
          ? ""
          : startDate==="NaN-NaN-NaN"
          ? ""
          : startDate;
      const endDatee =
        endDate===undefined ? "" : endDate==="NaN-NaN-NaN" ? "" : endDate;
      let searchh = search===undefined ? "" : search;

      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const DeviceId121 = urlParams.get("DeviceId");
      const projectCode = urlParams.get("code");
      let response;
      response = await axios.get(
        projectCode
          ? `${process.env.REACT_APP_BASE_URL}/api/logger/logs/v2/deviceAlerts/${DeviceId121}?page=${page}&limit=${limit}&startDate=${startDatee}&endDate=${endDatee}&search=${searchh}`
          : `${process.env.REACT_APP_BASE_URL}/api/logger/logs/deviceAlerts/${DeviceId121}?page=${page}&limit=${limit}&startDate=${startDatee}&endDate=${endDatee}&search=${searchh}`,
        config
      );
      dispatch({
        type: GET_DEVICE_ALARMS_BY_ID_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_DEVICE_ALARMS_BY_ID_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

export const getNewDevicesAlarmsById =
  ({ page, limit }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_NEW_DEVICES_ALARMS_BY_ID_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const DeviceId121 = urlParams.get("DeviceId");
      let response;

      response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/logger/logs/v2/deviceAlerts/${DeviceId121}?page=${page}&limit=${limit}`,
        config
      );
      dispatch({
        type: GET_NEW_DEVICES_ALARMS_BY_ID_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_NEW_DEVICES_ALARMS_BY_ID_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

export const getDeviceLogsById =
  ({ page, limit }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_DEVICE_LOGS_BY_ID_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const DeviceId121 = localStorage.getItem("deviceid");
      const projectCode = urlParams.get("code");

      let response;

      response = await axios.get(
        projectCode
          ? `${process.env.REACT_APP_BASE_URL}/api/logger/logs/v2/deviceLogs/${DeviceId121}?page=${page}&limit=${limit}`
          : `${process.env.REACT_APP_BASE_URL}/api/logger/logs/deviceLogs/${DeviceId121}?page=${page}&limit=${limit}`,
        config
      );
      dispatch({
        type: GET_DEVICE_LOGS_BY_ID_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_DEVICE_LOGS_BY_ID_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

export const getNewDeviceLogsById =
  ({ page, limit }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_NEW_DEVICES_LOGS_BY_ID_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const DeviceId121 = localStorage.getItem("deviceid");
      let response;

      response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/logger/logs/v2/deviceLogs/${DeviceId121}?page=${page}&limit=${limit}`,
        config
      );
      dispatch({
        type: GET_NEW_DEVICES_LOGS_BY_ID_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_NEW_DEVICES_LOGS_BY_ID_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

// trends data
export const getDeviceTrendsById =
  ({ startDatee, endDatee }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_DEVICE_TRENDS_BY_ID_REQUEST,
      });
      const token = cookies.get("ddAdminToken");

      let startDate = startDatee===undefined ? "" : startDatee;
      let endDate = endDatee===undefined ? "" : endDatee;

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const DeviceId12 = localStorage.getItem("deviceid");
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const projectCode = urlParams.get("code");

      let response;

      response = await axios.get(
        projectCode
          ? `${process.env.REACT_APP_BASE_URL}/api/logger/logs/v2/deviceTrends/${DeviceId12}?startDate=${startDate}&endDate=${endDate}`
          : `${process.env.REACT_APP_BASE_URL}/api/logger/logs/deviceTrends/${DeviceId12}?startDate=${startDate}&endDate=${endDate}`,

        config
      );
      dispatch({
        type: GET_DEVICE_TRENDS_BY_ID_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_DEVICE_TRENDS_BY_ID_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

// THIS IS A API OF TREND WHERE WE GETING DATA WITH USE OF PROJECT CODE
export const getNewDevicesOfTrendsById = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_NEW_DEVICES_OF_TRENDS_BY_ID_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const DeviceId12 = localStorage.getItem("deviceid");
    let response;

    response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/v2/deviceTrends/${DeviceId12}`,

      config
    );
    dispatch({
      type: GET_NEW_DEVICES_OF_TRENDS_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_NEW_DEVICES_OF_TRENDS_BY_ID_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const getLogMsgOccurence = (did, logMsg) => async (dispatch) => {
  try {
    dispatch({
      type: GET_LOG_MSG_OCCURENCE_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/logMsgOccurence2/${did}?logMsg=${logMsg}`,
      config
    );
    dispatch({
      type: GET_LOG_MSG_OCCURENCE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_LOG_MSG_OCCURENCE_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};
export const getDeviceCrashAnalytics = (did, logMsg) => async (dispatch) => {
  try {
    dispatch({
      type: GET_DEVICE_CRASH_ANALYTICS_DATA_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/get-crashlytics-data2/${did}?&logMsg=${logMsg}`,
      config
    );
    dispatch({
      type: GET_DEVICE_CRASH_ANALYTICS_DATA_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_DEVICE_CRASH_ANALYTICS_DATA_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};
export const getServiceRecordsById =
  ({ did, page, limit }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_SERVICE_RECORDS_DETAILS,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/logger/logs/services/get-by-deviceId?deviceId=${did}&SBXMH`,
        config
      );
      dispatch({
        type: GET_SERVICE_RECORDS_DETAILS_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: GET_SERVICE_RECORDS_DETAILS_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

export const getSingleUploadFile = (deviceId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SINGLE_UPLOAD_FILE_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/s3/get-uploaded-files/${deviceId}`,
      config
    );
    dispatch({
      type: GET_SINGLE_UPLOAD_FILE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_UPLOAD_FILE_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};
export const getDeviceIdBySerialNumber =
  (seerialNumber) => async (dispatch) => {
    try {
      dispatch({
        type: GET_SERIAL_NO_BY_DEVICE_ID_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/production/get-by-serialNumber/${seerialNumber}`,
        config
      );
      dispatch({
        type: GET_SERIAL_NO_BY_DEVICE_ID_REQUEST_SUCCESS,
        payload: data.data,
      });
      if (data.statusCode === 400) {
        alert("Already Use");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message === "Internal server error"
      ) {
        return null;
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message === undefined
      ) {
        return null;
      } else {
        toast.error(
          error.response && error.response.data && error.response.data.message
        );
      }
      dispatch({
        type: GET_SERIAL_NO_BY_DEVICE_ID_REQUEST_FAIL,
        payload:
          error &&
          error.response &&
          error.response.data &&
          error.response.data.data &&
          error.response.data.data.err &&
          error.response.data.data.err.msg,
      });
    }
  };

export const getPatientDetails = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_PATIENT_DETAILS_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/patient/get-allUhid`,
      config
    );
    dispatch({
      type: GET_PATIENT_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PATIENT_DETAILS_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const getPatientDetailsByUhid = (uhid) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PATIENT_DETAILS_BY_UHID_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/patient/get-patient-details/${uhid}`,
      config
    );
    dispatch({
      type: GET_PATIENT_DETAILS_BY_UHID_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PATIENT_DETAILS_BY_UHID_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const getPatientDetailsOfNewDevicesByUhid =
  (deviceid) => async (dispatch) => {
    try {
      dispatch({
        type: GET_PATIENT_DETAILS_OF_NEW_DEVICES_BY_UHID_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/patient/get-patient-list/v2/${deviceid}`,
        config
      );
      dispatch({
        type: GET_PATIENT_DETAILS_OF_NEW_DEVICES_BY_UHID_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: GET_PATIENT_DETAILS_OF_NEW_DEVICES_BY_UHID_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

export const getPatientDischargeAction = (projectCode) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PATIENT_DISCHARGE_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/patient/get-all-patient-discharge-data/v2/${projectCode}`,
      config
    );
    dispatch({
      type: GET_PATIENT_DISCHARGE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PATIENT_DISCHARGE_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const postPatientDataAction =
  ({
    UHID,
    age,
    weight,
    height,
    patientName,
    deviceId,
    dosageProvided,
    ward_no,
    doctor_name,
    bmi,
    diagnoseData,
    serial_no,
    medicineData,
  }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: PUT_PATIENT_DATA_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/patient/update-patient`,
        {
          UHID,
          age,
          weight,
          height,
          deviceId,
          dosageProvided,
          patientName,
          ward_no,
          doctor_name,
          bmi,
          serial_no,
          diagnoseData,
          medicineData,
        },
        config
      );
      dispatch({
        type: PUT_PATIENT_DATA_SUCCESS,
        payload: data.data,
      });
      if (data.statusCode === 200) {
        alert("Data Success");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      dispatch({
        type: PUT_PATIENT_DATA_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

export const postPatientDiagnose =
  ({ uhid, medication, stats }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ADD_PATIENT_DIAGNOSE_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/patient/add-medical-diagnose/${uhid}`,
        {
          medication,
          stats,
        },
        config
      );
      dispatch({
        type: ADD_PATIENT_DIAGNOSE_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: ADD_PATIENT_DIAGNOSE_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

export const getPatientDiagnoseData = (uhid) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PATIENT_DIAGNOSE_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/patient/get-diagnose/${uhid}`,
      config
    );
    dispatch({
      type: GET_PATIENT_DIAGNOSE_SUCCESS,
      payload: data.data,
    });
    if (data.statusCode === 201) {
      window.location.reload();
    }
  } catch (error) {
    dispatch({
      type: GET_PATIENT_DIAGNOSE_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const getUhidListData = (uhid) => async (dispatch) => {
  try {
    dispatch({
      type: GET_UHIDS_LIST_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/patient/get-uhids`,
      config
    );
    dispatch({
      type: GET_UHIDS_LIST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_UHIDS_LIST_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const getRequestUserDataAction = (deviceId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_REQUEST_USER_DATA_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/logger/send-device-req`,
      { deviceId },
      config
    );
    dispatch({
      type: GET_REQUEST_USER_DATA_SUCCESS,
      payload: data.data,
    });
    if (data && data.statusCode === 200) {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  } catch (error) {
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.statusCode === 400
    ) {
      alert(
        error &&
          error.response &&
          error.response.data &&
          error.response.data.message
      );
    }
    dispatch({
      type: GET_REQUEST_USER_DATA_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const getSingleProductionDataAction =
  (serialNumber) => async (dispatch) => {
    try {
      dispatch({
        type: GET_SINGLE_PRODUCTION_DATA_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/logger/get-complete-device-details/${serialNumber}`,
        config
      );
      dispatch({
        type: GET_SINGLE_PRODUCTION_DATA_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_PRODUCTION_DATA_FAIL,
        payload:
          error &&
          error.response &&
          error.response.data &&
          error.response.data.data &&
          error.response.data.data.err &&
          error.response.data.data.err.msg,
      });
    }
  };

export const postEditAccountDetails =
  ({
    seriallNo,
    ackDate,
    ackNo,
    billedTo,
    consinee,
    consigneeAddress,
    document_ref_no,
    irn,
  }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: POST_EDIT_ACCOUNT_DETAILS_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/logger/accounts/update-data`,
        {
          seriallNo,
          ackDate,
          ackNo,
          billedTo,
          consinee,
          consigneeAddress,
          document_ref_no,
          irn,
        },
        config
      );
      dispatch({
        type: POST_EDIT_ACCOUNT_DETAILS_SUCCESS,
        payload: data.data,
      });
      if (data?.statusCode === 200) {
        alert(data?.message);
        window.location.reload();
      }
    } catch (error) {
      dispatch({
        type: POST_EDIT_ACCOUNT_DETAILS_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

export const postLockToDeviceIdAction =
  ({ DeviceId, isPaymentDone, isLocked, lockedStatus, email, socket }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: POST_DEVICE_ID_FROM_LOCK_REQUEST,
      });

      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // Build URL with lockedStatus if provided
      let url = `${process.env.REACT_APP_BASE_URL}/devices/payment-update-for-email?DeviceId=${DeviceId}&isPaymentDone=${isPaymentDone}&isLocked=${isLocked}`;
      if (lockedStatus) {
        url += `&lockedStatus=${encodeURIComponent(lockedStatus)}`;
      }

      const { data } = await axios.put(url, config);

      dispatch({
        type: POST_DEVICE_ID_FROM_LOCK_SUCCESS,
        payload: data.data,
      });

      if (data.statusCode === 200) {
        alert(data?.message);
        // ✅ Emit event using passed socket
        socket?.emit("DeviceRequestForPaymentStatus", DeviceId);

        // setTimeout(() => {
        //   window.location.reload();
        // }, 500);
      }
    } catch (error) {
      dispatch({
        type: POST_DEVICE_ID_FROM_LOCK_FAIL,
        payload:
          error?.response?.data?.data?.err?.msg || "Something went wrong",
      });
    }
  };

export const updatePaymentLockStatusAction =
  (DeviceId, paymentDoneInPercent, code = null) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_PAYMENT_LOCK_STATUS_REQUEST,
      });

      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/devices/update-payment-lock-status/${DeviceId}`,
        { paymentDoneInPercent: paymentDoneInPercent.toString() },
        config
      );

      dispatch({
        type: UPDATE_PAYMENT_LOCK_STATUS_SUCCESS,
        payload: data,
      });

      if (data.statusCode === 200) {
        toast.success(data?.message || "Payment status updated successfully!");
        // Refresh device details after update
        dispatch(getSingleDeviceIdDetails(DeviceId, code));
      }
    } catch (error) {
      dispatch({
        type: UPDATE_PAYMENT_LOCK_STATUS_FAIL,
        payload:
          error?.response?.data?.message || "Failed to update payment status",
      });
      toast.error(
        error?.response?.data?.message || "Failed to update payment status"
      );
    }
  };

export const getIndianMedicineAction = (search) => async (dispatch) => {
  try {
    dispatch({
      type: GET_INDIAN_MEDIDINE_ACTION,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/allMedicine/indianMedicineData?search=${search}`,
      config
    );
    dispatch({
      type: GET_INDIAN_MEDIDINE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_INDIAN_MEDIDINE_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.err.msg,
    });
  }
};

export const addMedicineIllnessAction =
  ({ UHID, diagnoseData, medicineData }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: PUT_ADD_ILLNESS_MEDICINE_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/patient/add-medicineData-and-illnessData/`,
        {
          UHID,
          diagnoseData,
          medicineData,
        },
        config
      );
      dispatch({
        type: PUT_ADD_ILLNESS_MEDICINE_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: PUT_ADD_ILLNESS_MEDICINE_FAIL,
        payload:
          error &&
          error.response &&
          error.response.data &&
          error.response.data.data &&
          error.response.data.data.err &&
          error.response.data.data.err.msg,
      });
    }
  };

export const postMedicineAndIllnessDataAction =
  (illnessId, UHID, endDate) => async (dispatch) => {
    try {
      dispatch({
        type: PUT_MEDICINE_AND_ILLNESS_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/patient/remove-medicineData-and-IllnessData`,
        {
          illnessId,
          UHID,
          endDate,
        },
        config
      );
      dispatch({
        type: PUT_MEDICINE_AND_ILLNESS_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: PUT_MEDICINE_AND_ILLNESS_FAIL,
        payload:
          error &&
          error.response &&
          error.response.data &&
          error.response.data.data &&
          error.response.data.data.err &&
          error.response.data.data.err.msg,
      });
    }
  };

export const postEndDateAction =
  ({ illnessId, UHID, endDate, medicineId }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: PUT_END_DATE_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/patient/update-illness-and-medicine-date`,
        {
          illnessId,
          UHID,
          endDate,
          medicineId,
        },
        config
      );
      dispatch({
        type: PUT_END_DATE_SUCCESS,
        payload: data.data,
      });
      if (data.statusCode === 200) {
        alert("Medicine End Successgully");
        window.location.reload();
      }
    } catch (error) {
      dispatch({
        type: PUT_END_DATE_FAIL,
        payload:
          error &&
          error.response &&
          error.response.data &&
          error.response.data.data &&
          error.response.data.data.err &&
          error.response.data.data.err.msg,
      });
    }
  };

export const getGraphOfTrendMedicineAction =
  (deviceId, UHID) => async (dispatch) => {
    try {
      dispatch({
        type: GET_GRAPH_OF_TREND_MEDICINE_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/patient/patient-graph`,
        {
          deviceId,
          UHID,
        },
        config
      );
      dispatch({
        type: GET_GRAPH_OF_TREND_MEDICINE_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: GET_GRAPH_OF_TREND_MEDICINE_FAIL,
        payload:
          error &&
          error.response &&
          error.response.data &&
          error.response.data.data &&
          error.response.data.data.err &&
          error.response.data.data.err.msg,
      });
    }
  };

export const trackHistorydataAction =
  ({
    deviceId,
    state,
    city,
    ASM_RSM,
    hospitalName,
    purpose,
    serialNumber,
    startDate,
    endDate,
  }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: POST_TRACK_HISTORY_DATA_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/marketing/sales/save-device-track-history`,
        {
          deviceId,
          state,
          city,
          ASM_RSM,
          hospitalName,
          purpose,
          serialNumber,
          startDate,
          endDate,
        },
        config
      );
      if (data?.statusCode === 201) {
        alert(data?.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      dispatch({
        type: POST_TRACK_HISTORY_DATA_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: POST_TRACK_HISTORY_DATA_FAIL,
        payload:
          error &&
          error.response &&
          error.response.data &&
          error.response.data.data &&
          error.response.data.data.err &&
          error.response.data.data.err.msg,
      });
    }
  };

export const getAllDevicesDataAgvaMiniAction =
  ({ page, limit, searchData, filter } = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_DEVICE_DATA_AGVA_MINI_REQUEST,
      });

      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const limits = limit ? limit : "";
      const pages = page ? page : "";
      const filterr = filter ? filter : "";
      const searchDataa = searchData ? searchData : "";
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/marketing/sales/get-all-device-track-history/007?page=${pages}&limit=${limits}&search=${searchDataa}&filter=${filterr}`,
        config
      );

      dispatch({
        type: ALL_DEVICE_DATA_AGVA_MINI_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ALL_DEVICE_DATA_AGVA_MINI_FAIL,
        payload: error?.response?.data?.message || "An error occurred",
      });
    }
  };

export const getSingleDataAgvaMiniAction = (deviceId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SINGLE_DATA_AGVA_MINI_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let response;
    response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/marketing/sales/get-device-track-history/${deviceId}`,
      config
    );
    dispatch({
      type: GET_SINGLE_DATA_AGVA_MINI_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_DATA_AGVA_MINI_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const putDemoEndDateAction =
  ({ endDate, remarks, deviceId, _id }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: PUT_DEMO_END_DATE_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/marketing/sales/update-device-track-history/${_id}`,
        {
          endDate,
          remarks,
          deviceId,
        },
        config
      );
      if (data?.statusCode === 200) {
        alert(data?.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      dispatch({
        type: PUT_DEMO_END_DATE_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: PUT_DEMO_END_DATE_FAIL,
        payload:
          error &&
          error.response &&
          error.response.data &&
          error.response.data.data &&
          error.response.data.data.err &&
          error.response.data.data.err.msg,
      });
    }
  };
