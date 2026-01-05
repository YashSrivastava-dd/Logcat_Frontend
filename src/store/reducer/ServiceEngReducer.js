import {
  GET_ALL_USER_COUNT_DATA_FAIL,
  GET_ALL_USER_COUNT_DATA_REQUEST,
  GET_ALL_USER_COUNT_DATA_SUCCESS,
} from "../types/DeviceConstant";
import {
  GET_ALL_TICKETS_DATA_REQUEST,
  GET_ALL_TICKETS_DATA_SUCCESS,
  GET_ALL_TICKETS_DATA_FAIL,
  GET_TICKET_DETAILS_BY_ID_REQUEST,
  GET_TICKET_DETAILS_BY_ID_SUCCESS,
  GET_TICKET_DETAILS_BY_ID_FAIL,
  GET_TICKET_DETAILS_BY_TICKET_NO_SUCCESS,
  GET_TICKET_DETAILS_BY_TICKET_NO_FAIL,
  GET_TICKET_DETAILS_BY_TICKET_NO_REQUEST,
  GET_SERVICE_ENGINNER_DATA_REQUEST,
  GET_SERVICE_ENGINNER_DATA_SUCCESS,
  GET_SERVICE_ENGINNER_DATA_FAIL,
  GET_ALL_SERVICES_REQUEST,
  GET_ALL_SERVICES_SUCCESS,
  GET_ALL_SERVICES_FAIL,
  GET_SINGLE_SERVICES_REQUEST,
  GET_SINGLE_SERVICES_SUCCESS,
  GET_SINGLE_SERVICES_FAIL,
  GET_ALL_EXPENCE_DATA_REQUEST,
  GET_ALL_EXPENCE_DATA_SUCCESS,
  GET_ALL_EXPENCE_DATA_FAIL,
  GET_DEMO_DATA_REQUEST,
  GET_DEMO_DATA_SUCCESS,
  GET_DEMO_DATA_FAIL,
  GET_MILESTONE_COUNT_REQUEST,
  GET_MILESTONE_COUNT_SUCCESS,
  GET_MILESTONE_COUNT_FAIL,
  GET_MARKETING_USER_REQUEST,
  GET_MARKETING_USER_SUCCESS,
  GET_MARKETING_USER_FAIL,
  GET_TOTAL_DATA_COUNT_REQUEST,
  GET_TOTAL_DATA_COUNT_SUCCESS,
  GET_TOTAL_DATA_COUNT_FAIL,
  GET_SALES_DATA_REQUEST,
  GET_SALES_DATA_SUCCESS,
  GET_SALES_DATA_FAIL,
  GET_ALL_DEVICES_DATA_IN_MARKET_REQUEST,
  GET_ALL_DEVICES_DATA_IN_MARKET_SUCCESS,
  GET_ALL_DEVICES_DATA_IN_MARKET_FAIL,
  POST_TICKET_STATUS_DATA_SUCCESS,
  POST_TICKET_STATUS_DATA_REQUEST,
  POST_TICKET_STATUS_DATA_FAIL,
  GET_SUPPORT_MAP_DATA_REQUEST,
  GET_SUPPORT_MAP_DATA_SUCCESS,
  GET_SUPPORT_MAP_DATA_FAIL,
  POST_SERVICES_TICKET_STATUS_REQUEST,
  POST_SERVICES_TICKET_STATUS_SUCCESS,
  POST_SERVICES_TICKET_STATUS_FAIL,
  GET_VERIFY_OTP_SERIVES_REQUEST,
  GET_VERIFY_OTP_SERIVES_SUCCESS,
  GET_VERIFY_OTP_SERIVES_FAIL,
} from "../types/ServiceEngType";
export const getAllTicketsDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_TICKETS_DATA_REQUEST:
      return { loading: true };

    case GET_ALL_TICKETS_DATA_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_ALL_TICKETS_DATA_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getAllTicketsByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TICKET_DETAILS_BY_ID_REQUEST:
      return { loading: true };

    case GET_TICKET_DETAILS_BY_ID_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_TICKET_DETAILS_BY_ID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getTicketDetailsByNumberReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TICKET_DETAILS_BY_TICKET_NO_REQUEST:
      return { loading: true };

    case GET_TICKET_DETAILS_BY_TICKET_NO_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_TICKET_DETAILS_BY_TICKET_NO_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getServiceEngDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SERVICE_ENGINNER_DATA_REQUEST:
      return { loading: true };

    case GET_SERVICE_ENGINNER_DATA_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_SERVICE_ENGINNER_DATA_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getAllServicesDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_SERVICES_REQUEST:
      return { loading: true };

    case GET_ALL_SERVICES_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_ALL_SERVICES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getSingleServicesDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_SERVICES_REQUEST:
      return { loading: true };

    case GET_SINGLE_SERVICES_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_SINGLE_SERVICES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getExpencesDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_EXPENCE_DATA_REQUEST:
      return { loading: true };

    case GET_ALL_EXPENCE_DATA_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_ALL_EXPENCE_DATA_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getDemoDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DEMO_DATA_REQUEST:
      return { loading: true };

    case GET_DEMO_DATA_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_DEMO_DATA_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getMileStoneCountReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_MILESTONE_COUNT_REQUEST:
      return { loading: true };

    case GET_MILESTONE_COUNT_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_MILESTONE_COUNT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getMarketingUserReduser = (state = {}, action) => {
  switch (action.type) {
    case GET_MARKETING_USER_REQUEST:
      return { loading: true };

    case GET_MARKETING_USER_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_MARKETING_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getTotalCountReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TOTAL_DATA_COUNT_REQUEST:
      return { loading: true };

    case GET_TOTAL_DATA_COUNT_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_TOTAL_DATA_COUNT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getSalesDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SALES_DATA_REQUEST:
      return { loading: true };

    case GET_SALES_DATA_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_SALES_DATA_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getAllUserCountReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_USER_COUNT_DATA_REQUEST:
      return { loading: true };

    case GET_ALL_USER_COUNT_DATA_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_ALL_USER_COUNT_DATA_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getAllDeviceDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_DEVICES_DATA_IN_MARKET_REQUEST:
      return { loading: true };

    case GET_ALL_DEVICES_DATA_IN_MARKET_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_ALL_DEVICES_DATA_IN_MARKET_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const postTicketStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_TICKET_STATUS_DATA_REQUEST:
      return { loading: true };

    case POST_TICKET_STATUS_DATA_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case POST_TICKET_STATUS_DATA_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getSupportMapDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SUPPORT_MAP_DATA_REQUEST:
      return { loading: true };

    case GET_SUPPORT_MAP_DATA_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_SUPPORT_MAP_DATA_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const postServiceEngTicketStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_SERVICES_TICKET_STATUS_REQUEST:
      return { loading: true };

    case POST_SERVICES_TICKET_STATUS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case POST_SERVICES_TICKET_STATUS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getVerifyOtpServicesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_VERIFY_OTP_SERIVES_REQUEST:
      return { loading: true };

    case GET_VERIFY_OTP_SERIVES_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_VERIFY_OTP_SERIVES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
