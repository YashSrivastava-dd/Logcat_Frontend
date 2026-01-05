import axios from "axios";
import Cookies from "universal-cookie";
import {
  STORE_SYSTEM_REQUEST,
  STORE_SYSTEM_SUCCESS,
  STORE_SYSTEM_FAIL,
  ALL_HOSPITAL_DATA_SUCCESS,
  ALL_HOSPITAL_DATA_REQUEST,
  ALL_HOSPITAL_DATA_FAIL,
  PUT_ALL_STORE_DATA_REQUEST,
  PUT_ALL_STORE_DATA_SUCCESS,
  PUT_ALL_STORE_DATA_FAIL,
  GET_NEW_HOSPITAL_DATA_REQUEST,
  GET_NEW_HOSPITAL_DATA_REQUEST_SUCCESS,
  GET_NEW_HOSPITAL_DATA_REQUEST_FAIL,
  ALL_TICKETS_DATA_BY_EMAIL_REQUEST_FAIL,
  ALL_TICKETS_DATA_BY_EMAIL_REQUEST_SUCCESS,
  ALL_TICKETS_DATA_BY_EMAIL_REQUEST,
  FEEDBACK_DATA_REQUEST,
  FEEDBACK_DATA_SUCCESS,
  FEEDBACK_DATA_FAIL,
  GET_CONCERNED_PERSONDETAILS_BY_NUYMBER_SUCCESS,
  GET_CONCERNED_PERSONDETAILS_BY_NUYMBER_FAIL,
  GET_CONCERNED_PERSONDETAILS_BY_NUYMBER_REQUEST,
  GET_HOSPITAL_REGISTER_DATA_REQUEST,
  GET_HOSPITAL_REGISTER_DATA_SUCCESS,
  GET_HOSPITAL_REGISTER_DATA_FAIL,
  GET_HOSPITAL_LIST_BY_PINCODE_REQUEST,
  GET_HOSPITAL_LIST_BY_PINCODE_SUCCESS,
  GET_HOSPITAL_LIST_BY_PINCODE_FAIL,
  GET_ILLNESS_DATA_FAIL,
  GET_ILLNESS_DATA_SUCCESS,
  GET_ILLNESS_DATA_REQUEST,
  GET_TICKETS_COUNT_FAIL,
  GET_TICKETS_COUNT_SUCCESS,
  GET_TICKETS_COUNT_REQUEST,
  POST_TICKET_SERVICE_DATA_FAIL,
  POST_TICKET_SERVICE_DATA_SUCCESS,
  POST_TICKET_SERVICE_DATA_REQUEST,
  GET_GRAPH_DATA_COUNT_SUCCESS,
  GET_GRAPH_DATA_COUNT_REQUEST,
  GET_GRAPH_DATA_COUNT_FAIL,
  POST_SERIALNO_FROM_TICKET_DETAILS_FAIL,
  POST_SERIALNO_FROM_TICKET_DETAILS_SUCCESS,
  POST_SERIALNO_FROM_TICKET_DETAILS_REQUEST,
  GET_WEEKLY_ACTION_COUNT_REQUEST,
  GET_WEEKLY_ACTION_COUNT_SUCCESS,
  GET_WEEKLY_ACTION_COUNT_FAIL,
} from "../types/StoreConstant";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
const cookies = new Cookies();

export const getStoreSystem = () => async (dispatch) => {
  try {
    dispatch({
      type: STORE_SYSTEM_REQUEST,
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
      `${process.env.REACT_APP_BASE_URL}/api/logger/service-eng-list`,
      config
    );
    dispatch({
      type: STORE_SYSTEM_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: STORE_SYSTEM_FAIL,
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

export const getAllHospitalData = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_HOSPITAL_DATA_REQUEST,
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
      `${process.env.REACT_APP_BASE_URL}/hospital/hospital-list`,
      config
    );
    dispatch({
      type: ALL_HOSPITAL_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ALL_HOSPITAL_DATA_FAIL,
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

export const putallStoreDataAction =
  ({
    serialNumber,
    deviceId,
    service_engineer,
    details,
    concerned_p_contact,
    issues,
    priority,
    pincode,
    dept_name,
    concerned_p_name,
    concerned_p_email,
    waranty_status,
    tag,
    address,
    ticket_number,
    date,
    message,
    hospitalName,
    wardNo,
    department,
    remark,
    location,
    contactNo,
    toolsProvided,
    productName
  }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: PUT_ALL_STORE_DATA_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/logger/logs/services/add-service-and-ticket-details/SBXMH`,
        {
          serialNumber,
          deviceId,
          service_engineer,
          details,
          concerned_p_contact,
          issues,
          priority,
          pincode,
          dept_name,
          concerned_p_name,
          concerned_p_email,
          waranty_status,
          tag,
          address,
          ticket_number,
          date,
          message,
          hospitalName,
          wardNo,
          department,
          remark,
          location,
          contactNo,
          toolsProvided,
          productName
        },
        config
      );
      dispatch({
        type: PUT_ALL_STORE_DATA_SUCCESS,
        payload: data,
      });
      if (data.statusCode===201) {
        alert("Ticket Created");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      dispatch({
        type: PUT_ALL_STORE_DATA_FAIL,
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
// export const getNewHospitalData = ({ Hospital_Name, Hospital_Address, Country, State,City,Pincode,District }) => async (dispatch) => {
//   try {
//     dispatch({
//       type: GET_NEW_HOSPITAL_DATA_REQUEST,
//     });
//     const token = cookies.get('ddAdminToken');
//     const history=useNavigate();
//     alert('1')
//     const config = {
//       headers: {
//         "Content-type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     const { data } = await axios.post(
//       `${process.env.REACT_APP_BASE_URL}/hospital/register-hospital`,
//       {
//         Hospital_Name,
//         Hospital_Address,
//         Country,
//         State,
//         City,
//         Pincode,
//         District
//       },
//       config
//     );
//     dispatch({
//       type: GET_NEW_HOSPITAL_DATA_REQUEST_SUCCESS,
//       payload: data,
//     });
//     if (data.statusCode===201) {
//       setTimeout(() => {
//         // window.location.reload();
//         toast.success('Hospital Add Success')
//         // history('/dispatchDevice')
//       }, 1000);
// //     }
//   } catch (error) {
//     dispatch({
//       type: GET_NEW_HOSPITAL_DATA_REQUEST_FAIL,
//       payload:
//         error &&
//         error.response &&
//         error.response.data &&
//         error.response.data.data &&
//         error.response.data.data.err &&
//         error.response.data.data.err.msg,
//     });
//   }
// };

export const getNewHospitalData =
  ({
    Hospital_Name,
    Hospital_Address,
    Country,
    State,
    City,
    Pincode,
    District,
  }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_NEW_HOSPITAL_DATA_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/hospital/register-hospital`,
        {
          Hospital_Name,
          Hospital_Address,
          Country,
          State,
          City,
          Pincode,
          District,
        },
        config
      );
      dispatch({
        type: GET_NEW_HOSPITAL_DATA_REQUEST_SUCCESS,
        payload: data,
      });
      console.log("data", data);
      if (data.statusCode===201) {
        // setTimeout(() => {
        window.location.reload();
        // toast.success('Hospital Add Success')
        // history('/dispatchDevice')
        // }, 1000);
      }
    } catch (error) {
      dispatch({
        type: GET_NEW_HOSPITAL_DATA_REQUEST_FAIL,
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

export const getHospitalDataFromAdding = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_HOSPITAL_REGISTER_DATA_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/hospital/hospital-list`,
      config
    );
    dispatch({
      type: GET_HOSPITAL_REGISTER_DATA_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_HOSPITAL_REGISTER_DATA_FAIL,
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

export const feedbackDataAction =
  ({ name, email, ticket_number, message, ratings, concerned_p_contact }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: FEEDBACK_DATA_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/support/add-feedback`,
        {
          name,
          email,
          ticket_number,
          message,
          ratings,
          concerned_p_contact,
        },
        config
      );
      dispatch({
        type: FEEDBACK_DATA_SUCCESS,
        payload: data,
      });
      console.log("00", name, email, ticket_number, message, ratings);
      // if (data.statusCode===201) {
      //   setTimeout(() => {
      //     window.location.reload();
      //   }, 500);
      // }
    } catch (error) {
      dispatch({
        type: FEEDBACK_DATA_FAIL,
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

export const getTicketNumberByEmail = (email) => async (dispatch) => {
  try {
    dispatch({
      type: ALL_TICKETS_DATA_BY_EMAIL_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/support/get-individual-ticket/${email}`,
      config
    );
    dispatch({
      type: ALL_TICKETS_DATA_BY_EMAIL_REQUEST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: ALL_TICKETS_DATA_BY_EMAIL_REQUEST_FAIL,
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

export const getCPersonDetailsByNumber =
  ({ phone }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_CONCERNED_PERSONDETAILS_BY_NUYMBER_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/get-concerned-person/${phone}`,
        config
      );
      dispatch({
        type: GET_CONCERNED_PERSONDETAILS_BY_NUYMBER_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: GET_CONCERNED_PERSONDETAILS_BY_NUYMBER_FAIL,
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

export const getHospitalListFromPinCode = (pincode) => async (dispatch) => {
  try {
    dispatch({
      type: GET_HOSPITAL_LIST_BY_PINCODE_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/hospital/get-bypincode/${pincode}`,
      config
    );
    dispatch({
      type: GET_HOSPITAL_LIST_BY_PINCODE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_HOSPITAL_LIST_BY_PINCODE_FAIL,
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

export const getIllnessDataAction =
  (page, limit, search) => async (dispatch) => {
    try {
      dispatch({
        type: GET_ILLNESS_DATA_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/allMedicine/icd10-diagnosis-data?page=${page}&limit=${limit}&search=${search}`,
        config
      );
      dispatch({
        type: GET_ILLNESS_DATA_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: GET_ILLNESS_DATA_FAIL,
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

export const getTicketCountAction = (filter) => async (dispatch) => {
  try {
    dispatch({
      type: GET_TICKETS_COUNT_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/services/get-ticket-counts?filter=${filter}`,
      config
    );
    dispatch({
      type: GET_TICKETS_COUNT_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_TICKETS_COUNT_FAIL,
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

export const getWeeklyActionCount = (selectedOption) => async (dispatch) => {
  try {
    dispatch({
      type: GET_WEEKLY_ACTION_COUNT_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/services/get-ticket-weekly-data-count?filter=${selectedOption}`,
      config
    );
    dispatch({
      type: GET_WEEKLY_ACTION_COUNT_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_WEEKLY_ACTION_COUNT_FAIL,
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

export const postTicketServiceDataAction =
  ({
    ticket_number,
    serialNumber,
    pincode,
    service_engineer,
    tag,
    dept_name,
    waranty_status,
    concerned_p_name,
    concerned_p_email,
    concerned_p_contact,
    priority,
    details,
    deviceId,
    location,
  }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: POST_TICKET_SERVICE_DATA_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/logger/logs/services/add-ticket-details/${ticket_number}`,
        {
          serialNumber,
          pincode,
          service_engineer,
          tag,
          dept_name,
          waranty_status,
          concerned_p_name,
          concerned_p_email,
          concerned_p_contact,
          priority,
          details,
          deviceId,
          location,
        },
        config
      );
      dispatch({
        type: POST_TICKET_SERVICE_DATA_SUCCESS,
        payload: data.data,
      });
      if (data.statusCode===201) {
        alert("Ticket Created");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      dispatch({
        type: POST_TICKET_SERVICE_DATA_FAIL,
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

export const getGraphDataCountAction = (filter) => async (dispatch) => {
  try {
    dispatch({
      type: GET_GRAPH_DATA_COUNT_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/services/get-ticket-graph-data-counts?filter=${filter}`,
      config
    );
    dispatch({
      type: GET_GRAPH_DATA_COUNT_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_GRAPH_DATA_COUNT_FAIL,
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
export const postSerialNoFromTicketDetailsAction =
  ({
    ticket,
    serialNumber,
    pincode,
    hospitalName,
    department,
    service_engineer,
    tag,
    concerned_p_name,
    concerned_p_email,
    concerned_p_contact,
    priority,
    wardNo,
    serviceRaisedFrom,
    remark,
    toolsProvided,
    message,
    waranty_status,
  }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: POST_SERIALNO_FROM_TICKET_DETAILS_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/logger/logs/services/update-service-and-ticket-details/${ticket}`,
        {
          serialNumber,
          pincode,
          hospitalName,
          department,
          service_engineer,
          tag,
          concerned_p_name,
          concerned_p_email,
          concerned_p_contact,
          priority,
          wardNo,
          serviceRaisedFrom,
          remark,
          toolsProvided,
          message,
          waranty_status
        },
        config
      );
      dispatch({
        type: POST_SERIALNO_FROM_TICKET_DETAILS_SUCCESS,
        payload: data.data,
      });
      if (data.statusCode===200) {
        alert("Ticket Updated");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      dispatch({
        type: POST_SERIALNO_FROM_TICKET_DETAILS_FAIL,
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
