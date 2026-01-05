import axios from "axios";
import Cookies from "universal-cookie";

import {
  GET_PROJECT_REQUEST,
  GET_PROJECT_REQUEST_SUCCESS,
  GET_PROJECT_REQUEST_FAIL,
  GET_ALL_LOG_BY_CODE_REQUEST,
  GET_ALL_LOG_BY_CODE_SUCCESS,
  GET_ALL_LOG_BY_CODE_FAIL,
  UPLOAD_NEW_PROJECT_REQUEST,
  UPLOAD_NEW_PROJECT_REQUEST_SUCCESS,
  UPLOAD_NEW_PROJECT_REQUEST_FAIL,
  UPLOAD_NEW_PROJECT_REQUEST_RESET,
  ADD_CRASH_EMAIL_REQUEST,
  ADD_CRASH_EMAIL_REQUEST_SUCCESS,
  ADD_CRASH_EMAIL_REQUEST_FAIL,
  GET_PROJECT_BY_CODE_REQUEST,
  GET_PROJECT_BY_CODE_REQUEST_SUCCESS,
  GET_PROJECT_BY_CODE_REQUEST_FAIL,
  UPLOAD_SALES_LEAD_REQUEST,
  UPLOAD_SALES_LEAD_SUCCESS,
  UPLOAD_SALES_LEAD_FAIL,
  GET_DEMO_DEVICE_COUNT_FAIL,
  GET_DEMO_DEVICE_COUNT_SUCCESS,
  GET_DEMO_DEVICE_COUNT_REQUEST,
  GET_ALL_SALES_LEADS_REQUEST,
  GET_ALL_SALES_LEADS_SUCCESS,
  GET_ALL_SALES_LEADS_FAIL,
  GET_SINGLE_SALE_LEAD_REQUEST,
  GET_SINGLE_SALE_LEAD_SUCCESS,
  GET_SINGLE_SALE_LEAD_FAIL,
  EDIT_SALES_LEAD_FAIL,
  EDIT_SALES_LEAD_SUCCESS,
  EDIT_SALES_LEAD_REQUEST,
  POST_UPDATE_DEMO_DEVICES_FAIL,
  POST_UPDATE_DEMO_DEVICES_SUCCESS,
  POST_UPDATE_DEMO_DEVICES_REQUEST,
  GET_DEMO_LEAD_COUNT_FAIL,
  GET_DEMO_LEAD_COUNT_SUCCESS,
  GET_DEMO_LEAD_COUNT_REQUEST,
  POST_UPDATE_PAYMENT_SALES_REQUEST,
  POST_UPDATE_PAYMENT_SALES_SUCCESS,
  POST_UPDATE_PAYMENT_SALES_FAIL,
  POST_UPDATE_DISPATCH_DEMO_FAIL,
  POST_UPDATE_DISPATCH_DEMO_SUCCESS,
  POST_UPDATE_DISPATCH_DEMO_REQUEST,
  POST_DEMO_COMPLETED_REQUEST,
  POST_DEMO_COMPLETED_SUCCESS,
  POST_DEMO_COMPLETED_FAIL,
  UPDATE_SALES__PAYMENT_FAIL,
  UPDATE_SALES__PAYMENT_SUCCESS,
  UPDATE_SALES__PAYMENT_REQUEST,
  UPDATE_SALES_CONFIRMED_FAIL,
  UPDATE_SALES_CONFIRMED_SUCCESS,
  UPDATE_SALES_CONFIRMED_REQUEST,
  UPDATE_DISPATCH_SALE_FAIL,
  UPDATE_DISPATCH_SALE_SUCCESS,
  UPDATE_DISPATCH_SALE_REQUEST,
  ADD_PAYMENT_UPDATE_FAIL,
  ADD_PAYMENT_UPDATE_SUCCESS,
  ADD_PAYMENT_UPDATE_REQUEST,
  GET_DEMO_DEVICE_GRAPH_COUNT_FAIL,
  GET_DEMO_DEVICE_GRAPH_COUNT_SUCCESS,
  GET_DEMO_DEVICE_GRAPH_COUNT_REQUEST,
  GET_DEMO_DEVICE_YEAR_MONTH_WISE_FAIL,
  GET_DEMO_DEVICE_YEAR_MONTH_WISE_SUCCESS,
  GET_DEMO_DEVICE_YEAR_MONTH_WISE_REQUEST,
  GET_TOTAL_DEVICE_COUNT_DETAILS_FAIL,
  GET_TOTAL_DEVICE_COUNT_DETAILS_SUCCESS,
  GET_TOTAL_DEVICE_COUNT_DETAILS_REQUEST,
  GET_DEVICE_SUMARRY_FAIL,
  GET_DEVICE_SUMARRY_SUCCESS,
  GET_DEVICE_SUMARRY_REQUEST,
  GET_DEVICE_GRAPH_COUNT_FAIL,
  GET_DEVICE_GRAPH_COUNT_SUCCESS,
  GET_DEVICE_GRAPH_COUNT_REQUEST,
  GET_WEEKLY_DISPATCH_DATA_FAIL,
  GET_WEEKLY_DISPATCH_DATA_SUCCESS,
  GET_WEEKLY_DISPATCH_DATA_REQUEST,
  GET_MONTHLY_DISPATCH_DATA_FAIL,
  GET_MONTHLY_DISPATCH_DATA_SUCCESS,
  GET_MONTHLY_DISPATCH_DATA_REQUEST,
  GET_DISPATCH_DEVICE_CHART_DATA_REQUEST,
  GET_DISPATCH_DEVICE_CHART_DATA_SUCCESS,
  GET_DISPATCH_DEVICE_CHART_DATA_FAIL,
} from "../types/ProjectConstants";

const cookies = new Cookies();

// ALL PROJECT
export const getAllProject = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_PROJECT_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/projects/`,
      config
    );
    dispatch({
      type: GET_PROJECT_REQUEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.log("error", error);
    dispatch({
      type: GET_PROJECT_REQUEST_FAIL,
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

// ADD CRASH EMAIL
export const addCrashEmail = (code, email) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_CRASH_EMAIL_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/api/logger/projects/updateEmail/${code}`,
      {
        email,
      },
      config
    );
    dispatch({
      type: ADD_CRASH_EMAIL_REQUEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_CRASH_EMAIL_REQUEST_FAIL,
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

// PROJECT WITH CODE
export const getProjectByCode =
  (
    code,
    date = null,
    filters = null,
    page = null,
    record = 25,
    projectType = null,
    sort = null
  ) =>
  async (dispatch) => {
    // console.log("message", sort);

    try {
      dispatch({
        type: GET_ALL_LOG_BY_CODE_REQUEST,
      });
      console.log("filter", filters);
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      let response;
      let logString = "";
      if (filters) {
        for (const [key, value] of Object.entries(filters)) {
          if (value) {
            logString += `${key}-`;
            // console.log("logstring", logString);
          }
        }
      }
      response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/logger/logs/${code}?startDate=${
          date.start
        }&endDate=${
          date.end
        }&limit=${record}&page=${page}&logType=${logString.slice(
          0,
          -1
        )}&projectType=${projectType}&sort=${sort}`,
        config
      );

      dispatch({
        type: GET_ALL_LOG_BY_CODE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_LOG_BY_CODE_FAIL,
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

// UPLOAD PROJECT
export const uploadNewProject =
  ({ project_name, project_description, provide_device_type }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: UPLOAD_NEW_PROJECT_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/projects/addNewProject`,
        {
          project_name,
          project_description,
          provide_device_type,
        },
        config
      );
      dispatch({
        type: UPLOAD_NEW_PROJECT_REQUEST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPLOAD_NEW_PROJECT_REQUEST_FAIL,
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

// CLEAR PROJECT DATA FROM STATE
export const clearProjectData = () => (dispatch) => {
  dispatch({
    type: UPLOAD_NEW_PROJECT_REQUEST_RESET,
    payload: {},
  });
};

// GET PROJECT WITH CODE FOR SETTING
export const getProjectByCodeSetting = (code) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PROJECT_BY_CODE_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/projects/${code}`,
      config
    );
    dispatch({
      type: GET_PROJECT_BY_CODE_REQUEST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PROJECT_BY_CODE_REQUEST_FAIL,
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

export const getDemoDeviceCountAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_DEMO_DEVICE_COUNT_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/devices/demo-device-count-details/007`,
      config
    );
    dispatch({
      type: GET_DEMO_DEVICE_COUNT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_DEMO_DEVICE_COUNT_FAIL,
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

export const postSalesLeadAction =
  ({
    hospitalName,
    email,
    contact,
    leadSource,
    dealerName,
    address,
    state,
    city,
    concernPersonName,
    concernPersonContact,
    pincode,
    leadType,
    visitingCardImageUrl,
    type,
  }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: UPLOAD_SALES_LEAD_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/devices/add-lead-data`,
        {
          hospitalName,
          email,
          contact,
          leadSource,
          dealerName,
          address,
          state,
          city,
          concernPersonName,
          concernPersonContact,
          pincode,
          leadType,
          visitingCardImageUrl,
          type,
        },
        config
      );
      dispatch({
        type: UPLOAD_SALES_LEAD_SUCCESS,
        payload: data,
      });
      if (data?.statusCode === 201) {
        alert(data?.message);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      dispatch({
        type: UPLOAD_SALES_LEAD_FAIL,
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

export const getAllLeadAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_SALES_LEADS_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/devices/get-all-leads`,
      config
    );
    dispatch({
      type: GET_ALL_SALES_LEADS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_SALES_LEADS_FAIL,
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

export const getSingleSalesLeadAction =
  ({ leadId }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_SINGLE_SALE_LEAD_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/devices/get-single-lead/${leadId}`,
        config
      );
      dispatch({
        type: GET_SINGLE_SALE_LEAD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_SALE_LEAD_FAIL,
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

export const editSalesLeadAction =
  ({
    leadId,
    hospitalName,
    email,
    leadSource,
    dealerName,
    address,
    state,
    city,
    concernPersonName,
    concernPersonContact,
    pincode,
    leadType,
    type,
    contact,
  }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: EDIT_SALES_LEAD_REQUEST,
      });
      console.log("leadId", leadId);
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/devices/update-lead-data/${leadId}`,
        {
          hospitalName,
          email,
          leadSource,
          dealerName,
          address,
          state,
          city,
          concernPersonName,
          concernPersonContact,
          pincode,
          leadType,
          type,
          contact,
        },
        config
      );
      dispatch({
        type: EDIT_SALES_LEAD_SUCCESS,
        payload: data,
      });
      if (data?.statusCode === 200) {
        alert(data?.message);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      dispatch({
        type: EDIT_SALES_LEAD_FAIL,
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

export const postUpdateDemoDevices =
  ({ deviceType, contactPerson, demoDate, leadId }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: POST_UPDATE_DEMO_DEVICES_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/devices/add-schedule-demo/${leadId}`,
        { deviceType, contactPerson, demoDate },
        config
      );
      dispatch({
        type: POST_UPDATE_DEMO_DEVICES_SUCCESS,
        payload: data,
      });
      if (data?.statusCode === 200) {
        alert(data?.message);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      dispatch({
        type: POST_UPDATE_DEMO_DEVICES_FAIL,
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

export const getDemoLeadCountAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_DEMO_LEAD_COUNT_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/devices/get-leads-count`,
      config
    );
    dispatch({
      type: GET_DEMO_LEAD_COUNT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_DEMO_LEAD_COUNT_FAIL,
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

export const postUpdatePaymentSalesAction =
  ({}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: POST_UPDATE_PAYMENT_SALES_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/`,
        {},
        config
      );
      dispatch({
        type: POST_UPDATE_PAYMENT_SALES_SUCCESS,
        payload: data,
      });
      if (data?.statusCode === 201) {
        alert(data?.message);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      dispatch({
        type: POST_UPDATE_PAYMENT_SALES_FAIL,
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

export const updateDispatchDemoAction =
  ({
    dispatchedFrom,
    serialNumbers,
    deviceIds,
    docketNo,
    expectedDeliveryDate,
    deliveringVia,
    leadId,
    deliveryNoteImageUrl,
  }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: POST_UPDATE_DISPATCH_DEMO_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/devices/add-dispatch-demo/${leadId}`,
        {
          dispatchedFrom,
          serialNumbers,
          deviceIds,
          docketNo,
          expectedDeliveryDate,
          deliveringVia,
          deliveryNoteImageUrl,
        },
        config
      );
      dispatch({
        type: POST_UPDATE_DISPATCH_DEMO_SUCCESS,
        payload: data,
      });
      if (data?.statusCode === 200) {
        alert(data?.message);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      if (error) {
        alert(error?.response?.data?.message);
      }
      dispatch({
        type: POST_UPDATE_DISPATCH_DEMO_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

export const updateDemoCompleteAction =
  ({
    feedBack,
    expectedSalesDate,
    amountQuoted,
    expectedClosingAmount,
    leadId,
    feedBackReportImageUrl,
  }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: POST_DEMO_COMPLETED_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/devices/add-demo-complete-data/${leadId}`,
        {
          feedBack,
          expectedSalesDate,
          amountQuoted,
          expectedClosingAmount,
          feedBackReportImageUrl,
        },
        config
      );
      dispatch({
        type: POST_DEMO_COMPLETED_SUCCESS,
        payload: data,
      });
      if (data?.statusCode === 200) {
        alert(data?.message);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      dispatch({
        type: POST_DEMO_COMPLETED_FAIL,
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

export const updateSalesPaymentAction =
  ({
    totalAmount,
    expectedDeliveryDate,
    accessories,
    paymentTerms,
    remark,
    warrantyDuration,
    paymentType,
    leadId,
    poImageUrl,
  }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_SALES__PAYMENT_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/devices/add-for-sales/${leadId}`,
        {
          totalAmount,
          expectedDeliveryDate,
          accessories,
          paymentTerms,
          remark,
          warrantyDuration,
          paymentType,
          poImageUrl,
        },
        config
      );
      dispatch({
        type: UPDATE_SALES__PAYMENT_SUCCESS,
        payload: data,
      });
      if (data?.statusCode === 200) {
        alert(data?.message);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      dispatch({
        type: UPDATE_SALES__PAYMENT_FAIL,
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

export const updateSalesConfirmedAction =
  ({
    advanceAmount,
    paymentProof,
    commitedDeliveryDate,
    scheduleOfPayment,
    leadId,
  }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_SALES_CONFIRMED_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/devices/add-for-sales-confirmed/${leadId}`,
        {
          advanceAmount,
          paymentProof,
          commitedDeliveryDate,
          scheduleOfPayment,
        },
        config
      );
      dispatch({
        type: UPDATE_SALES_CONFIRMED_SUCCESS,
        payload: data,
      });
      if (data?.statusCode === 200) {
        alert(data?.message);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      dispatch({
        type: UPDATE_SALES_CONFIRMED_FAIL,
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

export const updateDispatchSaleAction =
  ({
    serialNumbers,
    deviceIds,
    deliveringVia,
    docketNo,
    expectedDeliveryDate,
    invoiceNumber,
    leadId,
  }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_DISPATCH_SALE_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/devices/add-dispatch-for-sales/${leadId}`,
        {
          serialNumbers,
          deviceIds,
          deliveringVia,
          docketNo,
          expectedDeliveryDate,
          invoiceNumber,
        },
        config
      );
      dispatch({
        type: UPDATE_DISPATCH_SALE_SUCCESS,
        payload: data,
      });
      if (data?.statusCode === 200) {
        alert(data?.message);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      if (error) {
        alert(error?.response?.data?.message);
      }
      dispatch({
        type: UPDATE_DISPATCH_SALE_FAIL,
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

export const addPaymentUpdatesAction =
  ({
    paymentReceived,
    paymentMode,
    nextPaymentDate,
    paymentTerms,
    leadId,
    paymentImageUrl,
  }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ADD_PAYMENT_UPDATE_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/devices/add-payment-updates/${leadId}`,
        {
          paymentReceived,
          paymentMode,
          nextPaymentDate,
          paymentTerms,
          paymentImageUrl,
        },
        config
      );
      dispatch({
        type: ADD_PAYMENT_UPDATE_SUCCESS,
        payload: data,
      });
      if (data?.statusCode === 200) {
        alert(data?.message);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      dispatch({
        type: ADD_PAYMENT_UPDATE_FAIL,
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

export const getDemoDeviceGraphCount = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_DEMO_DEVICE_GRAPH_COUNT_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/devices/demo-device-count-details-for-graph/007`,
      config
    );
    dispatch({
      type: GET_DEMO_DEVICE_GRAPH_COUNT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_DEMO_DEVICE_GRAPH_COUNT_FAIL,
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

export const getDemoDeviceYearMonthWiseAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_DEMO_DEVICE_YEAR_MONTH_WISE_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/devices/get-year-month-wise-data-count/007?filter=monthly`,
      config
    );
    dispatch({
      type: GET_DEMO_DEVICE_YEAR_MONTH_WISE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_DEMO_DEVICE_YEAR_MONTH_WISE_FAIL,
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

export const getTotalDeviceCountDetailsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_TOTAL_DEVICE_COUNT_DETAILS_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/devices/total-device-count-details/007`,
      config
    );
    dispatch({
      type: GET_TOTAL_DEVICE_COUNT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_TOTAL_DEVICE_COUNT_DETAILS_FAIL,
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

export const getDeviceSumarryAction = (page, limit) => async (dispatch) => {
  try {
    dispatch({
      type: GET_DEVICE_SUMARRY_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const npage = page ? page : "";
    const nlimit = limit ? limit : "";
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/devices/device-summay-list/008?page=${npage}&limit=${nlimit}`,
      config
    );
    dispatch({
      type: GET_DEVICE_SUMARRY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_DEVICE_SUMARRY_FAIL,
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

export const getDeviceGraphCountAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_DEVICE_GRAPH_COUNT_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/devices/get-year-month-wise-data-count-for-devices/007`,
      config
    );
    dispatch({
      type: GET_DEVICE_GRAPH_COUNT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_DEVICE_GRAPH_COUNT_FAIL,
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

export const getWeeklyDispatchDataAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_WEEKLY_DISPATCH_DATA_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/devices/get-weekly-dispatch-device-count/007`,
      config
    );
    dispatch({
      type: GET_WEEKLY_DISPATCH_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_WEEKLY_DISPATCH_DATA_FAIL,
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

export const getMonthlyDispatchDataAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_MONTHLY_DISPATCH_DATA_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/devices/get-monthly-dispatch-device-count/007`,
      config
    );
    dispatch({
      type: GET_MONTHLY_DISPATCH_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_MONTHLY_DISPATCH_DATA_FAIL,
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

export const getDispatchDeviceChartDataAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_DISPATCH_DEVICE_CHART_DATA_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/devices/get-dispatch-device-chart-data/007`,
      config
    );
    dispatch({
      type: GET_DISPATCH_DEVICE_CHART_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_DISPATCH_DEVICE_CHART_DATA_FAIL,
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
