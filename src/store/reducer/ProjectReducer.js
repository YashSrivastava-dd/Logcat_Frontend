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
  GET_LOG_COUNT_REQUEST,
  GET_LOG_COUNT_SUCCESS,
  GET_LOG_COUNT_FAIL,
  GET_LOG_COUNT_BY_DATE_REQUEST,
  GET_LOG_COUNT_BY_DATE_SUCCESS,
  GET_LOG_COUNT_BY_DATE_FAIL,
  GET_ERROR_WRT_OS_REQUEST,
  GET_ERROR_WRT_OS_REQUEST_SUCCESS,
  GET_ERROR_WRT_OS_REQUEST_FAIL,
  GET_ERROR_COUNT_BY_VERSION_REQUEST,
  GET_ERROR_COUNT_BY_VERSION_REQUEST_SUCCESS,
  GET_ERROR_COUNT_BY_VERSION_REQUEST_FAIL,
  GET_DEVICE_INFO_REQUEST,
  GET_DEVICE_INFO_REQUEST_SUCCESS,
  GET_DEVICE_INFO_REQUEST_FAIL,
  GET_LOG_MSG_OCCURRENCE_COUNT_WRT_DATE_REQUEST,
  GET_LOG_MSG_OCCURRENCE_COUNT_WRT_DATE_REQUEST_SUCCESS,
  GET_LOG_MSG_OCCURRENCE_COUNT_WRT_DATE_REQUEST_FAIL,
  GET_CRASH_FREE_USERS_REQUEST,
  GET_CRASH_FREE_USERS_REQUEST_SUCCESS,
  GET_CRASH_FREE_USERS_REQUEST_FAIL,
  GET_CRASH_ANALYTICS_DATA_REQUEST,
  GET_CRASH_ANALYTICS_DATA_REQUEST_SUCCESS,
  GET_CRASH_ANALYTICS_DATA_REQUEST_FAIL,
  GET_CRASH_FREE_USERS_DATA_REQUEST,
  GET_CRASH_FREE_USERS_DATA_REQUEST_SUCCESS,
  GET_CRASH_FREE_USERS_DATA_REQUEST_FAIL,
  GET_MODEL_CODE_REQUEST,
  GET_MODEL_CODE_SUCCESS,
  GET_MODEL_CODE_FAIL,
  ADD_CRASH_EMAIL_REQUEST,
  ADD_CRASH_EMAIL_REQUEST_SUCCESS,
  ADD_CRASH_EMAIL_REQUEST_FAIL,
  GET_PROJECT_BY_CODE_REQUEST,
  GET_PROJECT_BY_CODE_REQUEST_SUCCESS,
  GET_PROJECT_BY_CODE_REQUEST_FAIL,
  GET_DEVICE_DETAILS_REQUEST,
  GET_DEVICE_DETAILS_SUCCESS,
  GET_DEVICE_DETAILS_FAIL,
  GET_SALES_DEMO_DEVICE_COUNT_REQUEST,
  GET_SALES_DEMO_DEVICE_COUNT_SUCCESS,
  GET_SALES_DEMO_DEVICE_COUNT_FAIL,
  GET_DEMO_DEVICE_COUNT_REQUEST,
  GET_DEMO_DEVICE_COUNT_SUCCESS,
  GET_DEMO_DEVICE_COUNT_FAIL,
  UPLOAD_SALES_LEAD_REQUEST,
  UPLOAD_SALES_LEAD_SUCCESS,
  UPLOAD_SALES_LEAD_FAIL,
  GET_ALL_SALES_LEADS_FAIL,
  GET_ALL_SALES_LEADS_SUCCESS,
  GET_ALL_SALES_LEADS_REQUEST,
  GET_SINGLE_SALE_LEAD_REQUEST,
  GET_SINGLE_SALE_LEAD_SUCCESS,
  GET_SINGLE_SALE_LEAD_FAIL,
  GET_DEMO_LEAD_COUNT_REQUEST,
  GET_DEMO_LEAD_COUNT_SUCCESS,
  GET_DEMO_LEAD_COUNT_FAIL,
  GET_DEMO_DEVICE_GRAPH_COUNT_REQUEST,
  GET_DEMO_DEVICE_GRAPH_COUNT_SUCCESS,
  GET_DEMO_DEVICE_GRAPH_COUNT_FAIL,
  GET_DEMO_DEVICE_YEAR_MONTH_WISE_REQUEST,
  GET_DEMO_DEVICE_YEAR_MONTH_WISE_SUCCESS,
  GET_DEMO_DEVICE_YEAR_MONTH_WISE_FAIL,
  GET_TOTAL_DEVICE_COUNT_DETAILS_REQUEST,
  GET_TOTAL_DEVICE_COUNT_DETAILS_SUCCESS,
  GET_TOTAL_DEVICE_COUNT_DETAILS_FAIL,
  GET_DEVICE_SUMARRY_REQUEST,
  GET_DEVICE_SUMARRY_SUCCESS,
  GET_DEVICE_SUMARRY_FAIL,
  GET_DEVICE_GRAPH_COUNT_REQUEST,
  GET_DEVICE_GRAPH_COUNT_SUCCESS,
  GET_DEVICE_GRAPH_COUNT_FAIL,
  GET_WEEKLY_DISPATCH_DATA_REQUEST,
  GET_WEEKLY_DISPATCH_DATA_SUCCESS,
  GET_WEEKLY_DISPATCH_DATA_FAIL,
  GET_MONTHLY_DISPATCH_DATA_REQUEST,
  GET_MONTHLY_DISPATCH_DATA_SUCCESS,
  GET_MONTHLY_DISPATCH_DATA_FAIL,
  GET_DISPATCH_DEVICE_CHART_DATA_REQUEST,
  GET_DISPATCH_DEVICE_CHART_DATA_SUCCESS,
  GET_DISPATCH_DEVICE_CHART_DATA_FAIL,
} from "../types/ProjectConstants";

export const getAllProjectReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PROJECT_REQUEST:
      return {
        loading: true,
      };
    case GET_PROJECT_REQUEST_SUCCESS:
      return {
        loading: false,
        allProjectData: action.payload,
      };
    case GET_PROJECT_REQUEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getAllLogByCodeReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_LOG_BY_CODE_REQUEST:
      return {
        loading: true,
      };
    case GET_ALL_LOG_BY_CODE_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_ALL_LOG_BY_CODE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const createNewProjectReducer = (state = {}, action) => {
  switch (action.type) {
    case UPLOAD_NEW_PROJECT_REQUEST:
      return { loading: true };

    case UPLOAD_NEW_PROJECT_REQUEST_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case UPLOAD_NEW_PROJECT_REQUEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case UPLOAD_NEW_PROJECT_REQUEST_RESET:
      return {
        loading: false,
        data: action.payload,
      };
    default:
      return state;
  }
};

export const getLogCountsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LOG_COUNT_REQUEST:
      return { loading: true };

    case GET_LOG_COUNT_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_LOG_COUNT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getLogCountsByDateReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LOG_COUNT_BY_DATE_REQUEST:
      return { loading: true };

    case GET_LOG_COUNT_BY_DATE_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_LOG_COUNT_BY_DATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getErrorWRTOSReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ERROR_WRT_OS_REQUEST:
      return { loading: true };

    case GET_ERROR_WRT_OS_REQUEST_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_ERROR_WRT_OS_REQUEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getErrorWRTVersionReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ERROR_COUNT_BY_VERSION_REQUEST:
      return { loading: true };

    case GET_ERROR_COUNT_BY_VERSION_REQUEST_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_ERROR_COUNT_BY_VERSION_REQUEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getDeviceInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DEVICE_INFO_REQUEST:
      return { loading: true };

    case GET_DEVICE_INFO_REQUEST_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_DEVICE_INFO_REQUEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getLogMsgOccurenceWRTDateReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LOG_MSG_OCCURRENCE_COUNT_WRT_DATE_REQUEST:
      return { loading: true };

    case GET_LOG_MSG_OCCURRENCE_COUNT_WRT_DATE_REQUEST_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_LOG_MSG_OCCURRENCE_COUNT_WRT_DATE_REQUEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getCrashFreeUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CRASH_FREE_USERS_REQUEST:
      return { loading: true };

    case GET_CRASH_FREE_USERS_REQUEST_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_CRASH_FREE_USERS_REQUEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getCrashAnalyticsDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CRASH_ANALYTICS_DATA_REQUEST:
      return { loading: true };

    case GET_CRASH_ANALYTICS_DATA_REQUEST_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_CRASH_ANALYTICS_DATA_REQUEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getCrashFreeUsersDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CRASH_FREE_USERS_DATA_REQUEST:
      return { loading: true };

    case GET_CRASH_FREE_USERS_DATA_REQUEST_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_CRASH_FREE_USERS_DATA_REQUEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getModelCodeReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_MODEL_CODE_REQUEST:
      return { loading: true };

    case GET_MODEL_CODE_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_MODEL_CODE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const addCrashEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CRASH_EMAIL_REQUEST:
      return { loading: true };

    case ADD_CRASH_EMAIL_REQUEST_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case ADD_CRASH_EMAIL_REQUEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getProjectByCodeSettingReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PROJECT_BY_CODE_REQUEST:
      return { loading: true };

    case GET_PROJECT_BY_CODE_REQUEST_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_PROJECT_BY_CODE_REQUEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getAllDeviceLogsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DEVICE_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case GET_DEVICE_DETAILS_SUCCESS:
      return {
        loading: false,
        allDeviceData: action.payload,
      };
    case GET_DEVICE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getSalesDemoDeviceCountReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DEMO_DEVICE_COUNT_REQUEST:
      return {
        loading: true,
      };
    case GET_DEMO_DEVICE_COUNT_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_DEMO_DEVICE_COUNT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const postSalesLeadReducer = (state = {}, action) => {
  switch (action.type) {
    case UPLOAD_SALES_LEAD_REQUEST:
      return {
        loading: true,
      };
    case UPLOAD_SALES_LEAD_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case UPLOAD_SALES_LEAD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getAllSalesLeadReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_SALES_LEADS_REQUEST:
      return {
        loading: true,
      };
    case GET_ALL_SALES_LEADS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_ALL_SALES_LEADS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getSingleSaleLeadReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_SALE_LEAD_REQUEST:
      return {
        loading: true,
      };
    case GET_SINGLE_SALE_LEAD_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_SINGLE_SALE_LEAD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getDemoCountReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DEMO_LEAD_COUNT_REQUEST:
      return {
        loading: true,
      };
    case GET_DEMO_LEAD_COUNT_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_DEMO_LEAD_COUNT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getDemoDeviceGraphCountReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DEMO_DEVICE_GRAPH_COUNT_REQUEST:
      return {
        loading: true,
      };
    case GET_DEMO_DEVICE_GRAPH_COUNT_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_DEMO_DEVICE_GRAPH_COUNT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const getDemoDeviceYearMonthReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DEMO_DEVICE_YEAR_MONTH_WISE_REQUEST:
      return {
        loading: true,
      };
    case GET_DEMO_DEVICE_YEAR_MONTH_WISE_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_DEMO_DEVICE_YEAR_MONTH_WISE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getTotalDeviceCountReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TOTAL_DEVICE_COUNT_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case GET_TOTAL_DEVICE_COUNT_DETAILS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_TOTAL_DEVICE_COUNT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getDeviceSumarryReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DEVICE_SUMARRY_REQUEST:
      return {
        loading: true,
      };
    case GET_DEVICE_SUMARRY_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_DEVICE_SUMARRY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getDeviceGraphCountReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DEVICE_GRAPH_COUNT_REQUEST:
      return {
        loading: true,
      };
    case GET_DEVICE_GRAPH_COUNT_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_DEVICE_GRAPH_COUNT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getWeeklyDispatchReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_WEEKLY_DISPATCH_DATA_REQUEST:
      return {
        loading: true,
      };
    case GET_WEEKLY_DISPATCH_DATA_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_WEEKLY_DISPATCH_DATA_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getMonthlyDispatchDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_MONTHLY_DISPATCH_DATA_REQUEST:
      return {
        loading: true,
      };
    case GET_MONTHLY_DISPATCH_DATA_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_MONTHLY_DISPATCH_DATA_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getDispatchDeviceDataChartReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DISPATCH_DEVICE_CHART_DATA_REQUEST:
      return {
        loading: true,
      };
    case GET_DISPATCH_DEVICE_CHART_DATA_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_DISPATCH_DEVICE_CHART_DATA_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};