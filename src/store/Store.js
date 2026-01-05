
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { ADMIN_LOGOUT } from "./types/AdminConstants";
import { liveDataReducer } from "./reducer/LiveDataReducer"
import {
  adminLoginReducer,
  adminRegisterReducer,
  forgetPasswordReducer,
  resetPasswordReducer,
  getOtpOnNumberReducer,
  getUserDataReducer,
  getHospitalListByAssistantReducer,
  getDeviceCountReducer,
  VerifySMSOtpNumberReducer,
  getDemoDataCountReducer,
  getActiveDevicesReducer,
  getActiveDemoReducer,
} from "./reducer/AdminReducer";
import { allhospitalNameReducer, allCountryStateReducer,getallHospitalNameReducer, allStateReducer } from "./reducer/HospitalNameReducer";
import {
  getAllProjectReducer, getAllLogByCodeReducer, createNewProjectReducer, getLogCountsReducer, getLogCountsByDateReducer, getErrorWRTOSReducer, getErrorWRTVersionReducer, getDeviceInfoReducer,
  getLogMsgOccurenceWRTDateReducer, getCrashFreeUsersReducer, getCrashAnalyticsDataReducer, getCrashFreeUsersDataReducer, getModelCodeReducer, addCrashEmailReducer, getProjectByCodeSettingReducer,
} from "./reducer/ProjectReducer";
import { passwordChangeReducer, userInfoReducer, getHistoryDataReducer , getUserProfileReducer,getSingleExperienceOfUserReducer} from "./reducer/UserProfileReducer";
import { deviceReducer, deviceAssignDataByUserId, getAllAboutByDeviceIdReducer, getAllEventsByDeviceIdReducer,getAllEventsByNewDeviceIdReducer, getRegisteredDetailsReducer,getAllAlarmsByNewDeviceIdReducer, getAllAlarmsByDeviceIdReducer, getAllTrendsByDeviceIdReducer,getAllTrendsByNewDevicesIdReducer, getCalibrationByDeviceIdReducer,getAllLogsByNewDeviceIdReducer, getAllLogsByDeviceIdReducer, getLogMsgOccurenceReducer, getDeviceCrashAnalyticsDataReducer, getDeviceLogMsgOccurenceWRTDateReducer, getAllServiceRecordsDetails, getAllSectionByDeviceId , getSingleUploadFileReducer, getDeviceIdBySerialNumberReducer,getPatientDetailsReducer,postDeviceIdFormLockReducer,getSingleDeviceAgvaMiniReducer,getAllAgvaMiniReducer,getDeveloperOptionDataReducer,getGraphOfTrendsReducer,getPatientDetailsByUhidReducer,getIndianMedicineReducer,getPatientNewDetailsOfDevicesByUhidReducer,getPatientDischargeReducer,getSingleProductionDataReducer , getPatientDiagnose,getUhidsListReducer,newDeviceReducer} from "./reducer/deviceReducer";
import { alarmReducer } from "./reducer/AlarmReducer";
import {storeSystemReducer,allTicketDataReducer,allHospitalDataReducer,getHospitalFromAdding,getIllnessDataReducer,getWeeklyActionCountReducer,getGraphDataCountReducer,getTicketCountReducer, getHospitalListByPincodeReducer} from "./reducer/StoreSystemReducer"
import { dispatchAllDetailsReducer, dispatchAllDetailsByIdReducer, productionAllDetailsReducer , productionAllDetailsByUserIdReducer ,getdhrqualityFileReducer,getPiincodeDatReducer,getDeviceIdProductionReducer,getHospitalDetailsReducer,getSingleSerialNoTrackReducer,getAccountDataReducer,getDispatchPendingDataReducer,getShipmentAwatingReducer,getAccountDataBySerialNumberReducer,getCompleteDispatchedReducer,getReturnDataToAccountReducer,getEditListDataReducer,getEditProductionDataReducer,getReadyForDispatchDataReducer,getSerialNumberListReducer} from "./reducer/DispatchDevices"
import { updateUserInfoReducer } from "./reducer/UpdateUserInfoReducer"
import {getSalesDemoDeviceCountReducer,postSalesLeadReducer ,getAllSalesLeadReducer,getSingleSaleLeadReducer,getDemoCountReducer,getTotalDeviceCountReducer,getWeeklyDispatchReducer,getMonthlyDispatchDataReducer,getDispatchDeviceDataChartReducer,getDeviceGraphCountReducer,getDeviceSumarryReducer,getDemoDeviceYearMonthReducer,getDemoDeviceGraphCountReducer} from "./reducer/ProjectReducer"
import { eventReducer } from "./reducer/EventReducer";
import { getAllTicketsDataReducer , getAllTicketsByIdReducer,getTicketDetailsByNumberReducer,getServiceEngDataReducer,getAllServicesDataReducer,getVerifyOtpServicesReducer,postServiceEngTicketStatusReducer,getSupportMapDataReducer,postTicketStatusReducer,getAllDeviceDataReducer,getSalesDataReducer,getAllUserCountReducer,getTotalCountReducer,getMarketingUserReduser,getMileStoneCountReducer,getDemoDataReducer,getExpencesDataReducer,getSingleServicesDataReducer} from "./reducer/ServiceEngReducer"
import { allUsersDetailsReducer, updateAllUsersDetailReducer, dashboardDataDefault, deviceActionReducer, deviceDeleteReducer , activeUsersReducer,pendingUsersReducer,pendingRequestReducer,getHospitalAdminUserRequestReducer,getUserDataByDeviceIdReducer,getUserAccessDataReducer,getAccessReviewDataReducer,getActiveAdminReducer,getEmployeeListReducer,getInacticeUserReducer,getAllAccessDeviceToiUser,getDoctorAccessListReducer,getDashboardGraphDataReducer,getAssistantRequestReducer,getDemoSoldDataReducer} from "./reducer/AdminDashboardReducer"
import { verifyOtpReducer,verifyEmailReducer , deviceIdByHospitalNameReducer} from "./reducer/VerifyEmailsReducer"
const appReducer = combineReducers({
  adminLoginReducer,
  adminRegisterReducer,
  allhospitalNameReducer,
  allCountryStateReducer,
  allStateReducer,
  getallHospitalNameReducer,
  forgetPasswordReducer,
  resetPasswordReducer,
  getOtpOnNumberReducer,
  VerifySMSOtpNumberReducer,
  getUserDataReducer,
  getHospitalListByAssistantReducer,
  getDeviceCountReducer,
  getDemoDataCountReducer,
  getActiveDevicesReducer,
  getActiveDemoReducer,
  liveDataReducer,
  getAllProjectReducer,
  getSingleExperienceOfUserReducer,
  getUserProfileReducer,
  getAllLogByCodeReducer,
  createNewProjectReducer,
  getDeviceSumarryReducer,
  getDeviceGraphCountReducer,
  getWeeklyDispatchReducer,
  getMonthlyDispatchDataReducer,
  getDispatchDeviceDataChartReducer,
  getLogCountsReducer,
  getLogCountsByDateReducer,
  getModelCodeReducer,
  getDeviceIdBySerialNumberReducer,
  getPatientDetailsReducer,
  getSingleProductionDataReducer,
  getPatientDischargeReducer,
  getPatientDetailsByUhidReducer,
  getIndianMedicineReducer,
  getGraphOfTrendsReducer,
  getDeveloperOptionDataReducer,
  getAllAgvaMiniReducer,
  getSingleDeviceAgvaMiniReducer,
  postDeviceIdFormLockReducer,
  getSalesDemoDeviceCountReducer,
  postSalesLeadReducer,
  getAllSalesLeadReducer,
  getPatientNewDetailsOfDevicesByUhidReducer,
  getPatientDiagnose,
  getUhidsListReducer,
  getErrorWRTOSReducer,
  getErrorWRTVersionReducer,
  getDeviceInfoReducer,
  getEditProductionDataReducer,
  getLogMsgOccurenceWRTDateReducer,
  getEditListDataReducer,
  getReturnDataToAccountReducer,
  getCrashFreeUsersReducer,
  getCrashAnalyticsDataReducer,
  getCrashFreeUsersDataReducer,
  verifyOtpReducer,
  verifyEmailReducer,
  getSingleSaleLeadReducer,
  deviceIdByHospitalNameReducer,
  getDemoCountReducer,
  passwordChangeReducer,
  getDemoDeviceGraphCountReducer,
  updateAllUsersDetailReducer,
  getDemoDeviceYearMonthReducer,
  getTotalDeviceCountReducer,
  dashboardDataDefault,
  deviceActionReducer,
  activeUsersReducer,
  pendingRequestReducer,
  pendingUsersReducer,
  getHospitalAdminUserRequestReducer,
  getUserDataByDeviceIdReducer,
  getUserAccessDataReducer,
  getAccessReviewDataReducer,
  getActiveAdminReducer,
  getDemoSoldDataReducer,
  getAssistantRequestReducer,
  getInacticeUserReducer,
  getDoctorAccessListReducer,
  getAllAccessDeviceToiUser,
  getEmployeeListReducer,
  getDashboardGraphDataReducer,
  deviceDeleteReducer,
  getAllAboutByDeviceIdReducer,
  addCrashEmailReducer,
  getProjectByCodeSettingReducer,
  alarmReducer,
  deviceReducer,
  newDeviceReducer,
  storeSystemReducer,
  allHospitalDataReducer,
  allTicketDataReducer,
  getHospitalFromAdding,
  getHospitalListByPincodeReducer,
  getIllnessDataReducer,
  getTicketCountReducer,
  getSupportMapDataReducer,
  postServiceEngTicketStatusReducer,
  getVerifyOtpServicesReducer,
  getGraphDataCountReducer,
  getWeeklyActionCountReducer,
  deviceAssignDataByUserId,
  userInfoReducer,
  getHistoryDataReducer,
  updateUserInfoReducer,
  allUsersDetailsReducer,
  eventReducer,
  getAllEventsByDeviceIdReducer,
  getAllEventsByNewDeviceIdReducer,
  getAllAlarmsByDeviceIdReducer,
  getAllTrendsByDeviceIdReducer,
  getAllTrendsByNewDevicesIdReducer,
  getAllAlarmsByNewDeviceIdReducer,
  getCalibrationByDeviceIdReducer,
  getAllLogsByDeviceIdReducer,
  getRegisteredDetailsReducer,
  getAllLogsByNewDeviceIdReducer,
  getLogMsgOccurenceReducer,
  getDeviceCrashAnalyticsDataReducer,
  getDeviceLogMsgOccurenceWRTDateReducer,
  getAllServiceRecordsDetails,
  getAllSectionByDeviceId,
  getSingleUploadFileReducer,
  dispatchAllDetailsReducer,
  productionAllDetailsReducer,
  productionAllDetailsByUserIdReducer,
  getdhrqualityFileReducer,
  getPiincodeDatReducer,
  getDeviceIdProductionReducer,
  getSerialNumberListReducer,
  getHospitalDetailsReducer,
  getSingleSerialNoTrackReducer,
  getAccountDataReducer,
  getDispatchPendingDataReducer,
  dispatchAllDetailsByIdReducer,
  getShipmentAwatingReducer,
  getAccountDataBySerialNumberReducer,
  getAllTicketsDataReducer,
  getReadyForDispatchDataReducer,
  getCompleteDispatchedReducer,
  getAllTicketsByIdReducer,
  getTicketDetailsByNumberReducer,
  getServiceEngDataReducer,
  getAllServicesDataReducer,
  getSingleServicesDataReducer,
  getExpencesDataReducer,
  getDemoDataReducer,
  getMileStoneCountReducer,
  getMarketingUserReduser,
  getTotalCountReducer,
  getSalesDataReducer,
  getAllUserCountReducer,
  getAllDeviceDataReducer,
  postTicketStatusReducer
});
const persistConf = {
  key: "root",
  storage,
};
const rootReducer = (state, action) => {
  if (action.type === ADMIN_LOGOUT) {
    // for all keys defined in your persistConfig(s)
    storage.removeItem("persist:root");
    // storage.removeItem('persist:otherKey')
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};
const persistedReducer = persistReducer(persistConf, rootReducer);
const middleware = [thunk];
const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
export const persistor = persistStore(store);
export default store;