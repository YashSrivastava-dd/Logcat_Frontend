import React, { useState, useEffect, lazy, Suspense } from "react";
import "./App.module.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/Theme.css"
import { useSelector } from "react-redux";
import PatientDevices from "./screens/device/AssistantModule/PatientDevices";
import AddSalesDetails from "./screens/device/ServiceEnginner/AddSalesDetails";
import ddLoader from "../src/assets/images/ddLoader.gif";
import AllDataInOneMarketing from "./screens/device/ServiceEnginner/AllDataInOneMarketing";
import PaymentDashboard from "./screens/AdminDashboard/PaymrntDashboard/PaymentDashboard";
import SupportEngDashboard from "./screens/device/SupportEnginner/SupportEngDashboard";
import ServiceEngUserModule from "./screens/device/ServiceEnginner/ServiceEngUserModule";
import AssignedTicketToServiceEng from "./screens/device/ServiceEnginner/AssignedTicketToServiceEng";
import EditTicketDetails from "./screens/device/SupportEnginner/EditTicketDetails";
import ProfileComponent from "./screens/user/ProfileComponent";
import AgVaMiniDevices from "./screens/device/AgVaMiniDevices";
import AgvaMiniTrackHistory from "./screens/device/AgvaMiniTrackHistory";
import DiagnosticCheck from "./screens/device/DiagnosticCheck";
import SalesSideBar from "./screens/AdminDashboard/SalesModule/SalesSideBar";
const NewScreenForPatient = lazy(() => import("./screens/device/NewScreenForPatient"));
const LogTable = lazy(() => import("./screens/logs/LogTable"));
const Analytics = lazy(() => import("./screens/analytics/Analytics"));
const NotFound = lazy(() => import("./screens/NotFound"));
const Login = lazy(() => import("./screens/auth/Login"));
const LoginSkeleton = lazy(() => import("./screens/auth/LoginSkeleton"));
const ResetPassword = lazy(() => import("./screens/auth/ResetPassword"));
const ForgetPassword = lazy(() => import("./screens/auth/ForgetPassword"));
const Protected = lazy(() => import("./utils/Protected"));
const UpdateProfile = lazy(() => import("./screens/user/UpdateProfile"));
const Register = lazy(() => import("./screens/auth/Register"));
const AlarmNew = lazy(() => import("./screens/alerts/AlertsNew"));
const Event = lazy(() => import("./screens/events/Event"));
const Device = lazy(() => import("./screens/device/Device"))
const DeviceLogs = lazy(() => import("./screens/device/DeviceLogs"));
const Alarms = lazy(() => import("./screens/device/components/table/Alarms"));
const DeviceAnalytics = lazy(() => import("./screens/deviceAnalytics/DeviceAnalytics"));
const AllDashComponent = lazy(() => import("../src/screens/dashboard/AllDashComponent"))
const DeviceOverview = lazy(() => import("./screens/device/DeviceOverview"));
const About = lazy(() => import("./screens/device/About"));
const Services = lazy(() => import("./screens/device/Services"));
const PrivacyPolicy = lazy(() => import("./utils/PrivacyPolicy"));
const TermsOfServices = lazy(() => import("./utils/TermsOfServices"));
const { Navbar } = lazy(() => import("./utils/NavBar"));
const AdminDashboard = lazy(() => import("./screens/AdminDashboard/AdminDashboard"));
const Live = lazy(() => import("./screens/device/Live"));
const TermsAndCondition = lazy(() => import("./screens/auth/TermsAndCondition"));
const ChangePassword = lazy(() => import("../src/screens/auth/ChangePassword"));
const DeviceAssign = lazy(() => import("./screens/AdminDashboard/DeviceAssign"));
const Dispatch = lazy(() => import("./screens/AdminDashboard/DispatchDetails/Dispatch"));
const DispatchDataModule = lazy(() => import("./screens/AdminDashboard/DispatchDetails/DispatchDataModule"));
const DispatchModel = lazy(() => import("./screens/AdminDashboard/DispatchDetails/DispatchModel"));
const History = lazy(() => import("./utils/History"));
const Production = lazy(() => import("./screens/device/Production/Production"));
const ProductionModel = lazy(() => import("./screens/device/Production/ProductionModel"));
const ProductionDataModule = lazy(() => import("./screens/device/Production/ProductionDataModel"));
const Support = lazy(() => import("./screens/device/SupportEnginner/Support"));
const SupportEngForm = lazy(() => import("./screens/device/SupportEnginner/SupportEngForm"))
const ServiceEnginner = lazy(() => import("./screens/device/ServiceEnginner/ServiceEnginner"));
const ServiceModuleData = lazy(() => import("./screens/device/ServiceEnginner/ServiceModuleData"));
const SupportEngDataModule = lazy(() => import("./screens/device/SupportEnginner/SupportEngDataModule.jsx"));
const AddRegisterUser = lazy(() => import("./screens/AdminDashboard/AddRegisterUser"));
const InstallationRecords = lazy(() => import("./screens/device/ServiceEnginner/InstallationRecords"));
const AddHospital = lazy(() => import("./screens/device/SupportEnginner/AddHospital"));
const FeedbackForm = lazy(() => import("./screens/device/ServiceEnginner/FeedbackForm"));
const TicketDetails = lazy(() => import("./screens/device/SupportEnginner/TicketDetails"));
const PatientDetails = lazy(() => import("./screens/device/components/table/PatientDetails"));
const AddDiagnose = lazy(() => import("./screens/device/components/table/AddDiagnose"));
const NurseModule = lazy(() => import("./screens/device/NurseModule"));
const AssistantDevices = lazy(() => import("./screens/device/AssistantModule/AssistantDevices"));
const AssistantDashboard = lazy(() => import("./screens/device/AssistantModule/AssistantDashboard"));
const NurseModuleData = lazy(() => import("./screens/device/NurseModuleData"));
const NurseAddDiagnose = lazy(() => import("./screens/device/NurseAddDiagnose"));
const NurseAddDiagnoseData = lazy(() => import("./screens/device/NurseAddDiagnoseData"));
const AddNewPatientDetails = lazy(() => import("./screens/device/AddNewPatientDetails"));
const DispatchEditDetailsForm = lazy(() => import("./screens/AdminDashboard/DispatchDetails/DispatchEditDetailsForm"));
const SingleDispatchDataModule = lazy(() => import("./screens/AdminDashboard/DispatchDetails/SingleDispatchDataModule"));
const Notification = lazy(() => import("./utils/Notification"));
const SingleServicesData = lazy(() => import("./utils/SingleServicesData"));
const Model = lazy(() => import("./screens/AdminDashboard/Model"));
const HospitalAdminUser = lazy(() => import("./screens/HospitalAdminDasboard/HospitalAdminUser"));
const DeviceAssignToUserModel = lazy(() => import("./screens/device/DeviceAssignToUser/DeviceAssignToUserModel"));
const AssignedUsers = lazy(() => import("./screens/device/DeviceAssignToUser/AssignedUsers"));
const AddUser = lazy(() => import("./screens/device/DeviceAssignToUser/AddUser"));
const HospitalAdminUserRequest = lazy(() => import("./utils/HospitalAdminNotify/HospitalAdminUserRequest"));
const ReportDatForProduction = lazy(() => import("./screens/device/Production/ReportDatForProduction"));
const ManageAdminUserModel = lazy(() => import("./screens/AdminDashboard/ManageUserModule/ManageAdminUserModel"));
const UserDevice = lazy(() => import("./screens/device/UserDevice"));
const UpdateProfiileWithExperience = lazy(() => import("./screens/user/UpdateProfiileWithExperience"));
const NavBarForAll = lazy(() => import("./utils/NavBarForAll"));
const AccountDashboard = lazy(() => import("./screens/AdminDashboard/AccountModule/AccountDashboard"));
const AccountAllDataModule = lazy(() => import("./screens/AdminDashboard/AccountModule/AccountAllDataModule"));
const AccountFormDataModule = lazy(() => import("./screens/AdminDashboard/AccountModule/AccountFormDataModule"));
const DispatchDashboardModule = lazy(() => import("./screens/AdminDashboard/DispatchDetails/DispatchDashboardModule"));
const ShipmentDetails = lazy(() => import("./screens/AdminDashboard/DispatchDetails/ShipmentDetails"));
const SingleProductionDataWithEdit = lazy(() => import("./screens/device/Production/SingleProductionDataWithEdit"));
const EditProductionData = lazy(() => import("./screens/device/Production/EditProductionData"));
const SingleAccountDataModel = lazy(() => import("./screens/AdminDashboard/AccountModule/SingleAccountDataModel"));
const ReturnFormModule = lazy(() => import("./screens/AdminDashboard/DispatchDetails/ReturnFormModule"));
const PreviousHistoryData = lazy(() => import("./screens/AdminDashboard/DispatchDetails/PreviousHistoryData"));
const HospitalAdminScreen = lazy(() => import('./screens/HospitalAdminDasboard/HospitalAdminScreen'))
const AllAccessDeviceToDoctor = lazy(() => import('./screens/HospitalAdminDasboard/HospitalAdminScreen'))
const SingleUserDataCount = lazy(() => import('./screens/device/ServiceEnginner/SingleUserDataCount'))
const AssignUserInMarketing = lazy(() => import('./screens/device/ServiceEnginner/AssignUserInMarketing'))
const MarketingHeadScreen = lazy(() => import('./screens/device/ServiceEnginner/MarketingHeadScreen'))
const MainDemoDetails = lazy(() => import('./screens/device/ServiceEnginner/MainDemoDetails'))
const SalesDetails = lazy(() => import('./screens/device/ServiceEnginner/SalesDetails'))
const ExpencesDetails = lazy(() => import('./screens/device/ServiceEnginner/ExpencesDetails'))
const DemoDetails = lazy(() => import('./screens/device/ServiceEnginner/DemoDetails'))
const MarketingModel = lazy(() => import('./screens/device/MarketingModel/MarketingModel'))
const DeviceLogsNew = lazy(() => import('./screens/device/DeviceLogsNew'))
const DeviceNew = lazy(() => import('./screens/device/DeviceNew'))
const HospitalAdminRemoveDoctors = lazy(() => import('./utils/HospitalAdminNotify/HospitalAdminRemoveDoctors'))
const AssociationRequestModule = lazy(() => import('./utils/AssociationReqest/AssociationRequestModule'))
const AccountEditDetails = lazy(() => import('./screens/AdminDashboard/AccountModule/AccountEditDetails'))
const AddMedicineIllness = lazy(() => import('./screens/device/AddMedicineAndIllness'))
const PreviousHistoryModalData = lazy(() => import('./screens/AdminDashboard/DispatchDetails/PreviousHistoryModalData'))
function App() {
  const [splash, setSplash] = useState(true);
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const { adminInfo } = adminLoginReducer;

  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 300);
  }, [splash]);
  return (
    <>
      {splash ? (
        <div
          style={{
            display: "flex",
            height: "100vh",
            width: "100vw",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{ width: "300px", height: "300px", alignContent: "center" }}
            src={ddLoader}
            loading="lazy"
            alt="loading..."
          />
        </div>
      ) : (
        <BrowserRouter>
          <Suspense fallback={<div
            style={{
              display: "flex",
              height: "100vh",
              width: "100vw",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{ width: "300px", height: "300px", alignContent: "center" }}
              src={ddLoader}
              loading="lazy"
              alt="loading..."
            />
          </div>}>
            {localStorage.getItem('ddAdminToken') ? <NavBarForAll /> :
              null
            }
            <Routes>
              <Route exact path="/" element={<Login />} />
              {/* <Route exact path="/register" element={<Register />} /> */}
              <Route exact path="/resetpassword" element={<ResetPassword />} />
              <Route exact path="/forgetPassword" element={<ForgetPassword />} />
              <Route exact path="/changePassword" element={<ChangePassword />} />
              <Route exact path="/tersAndCondition" element={<TermsAndCondition />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/live" element={<Live />} />
              <Route exact path="/diagnosticCheck" element={<DiagnosticCheck />} />

              {/* Protected Route */}
              <Route element={<Protected />}>
                <Route exact path="/home" element={<AllDashComponent />} />
                {/* Hospital Admin */}

                <Route exact path="/hospitalAdminScreen" element={<HospitalAdminScreen />} />
                <Route exact path="/deviceAssignToUserModel" element={<DeviceAssignToUserModel />} />
                <Route exact path="/hospitalAdminUserRequest" element={<HospitalAdminUserRequest />} />
                <Route exact path="/hospitalAdmoinRemoveDoctor" element={<HospitalAdminRemoveDoctors />} />
                <Route exact path="/allAccessDeviceToUser" element={<AllAccessDeviceToDoctor />} />


                <Route exact path="/addUser" element={<AddUser />} />
                <Route exact path="/AssignedUser" element={<AssignedUsers />} />

                <Route exact path="/hospitalAdminUser" element={<HospitalAdminUser />} />

                {/* Account Details */}
                <Route exact path="/accountDasboard" element={<AccountDashboard />} />
                <Route exact path="/accountFormModule" element={<AccountFormDataModule />} />
                <Route exact path="/accountAllDataModule" element={<AccountAllDataModule />} />
                <Route exact path="/singleAccountData" element={<SingleAccountDataModel />} />
                <Route exact path="/AccountEditDetails" element={<AccountEditDetails />} />

{/* Account Details */}
<Route exact path="/salesSideBar" element={<SalesSideBar />} />

                {/* Payment Dashboard */}
                <Route exact path="/paymentDashboard" element={<PaymentDashboard/>}/>
                {/* Production */}
                <Route exact path="/production" element={<Production />} />
                <Route exact path="/editProductionData" element={<EditProductionData />} />

                <Route exact path="/singleProductionDataWithEdit" element={<SingleProductionDataWithEdit />} />
                <Route exact path="/productionDataModel" element={<ProductionDataModule />} />
                <Route exact path="/reportDataForProduction" element={<ReportDatForProduction />} />

                {/* Support */}
                <Route exact path="/support" element={<Support />} />
                <Route exact path="/assignDeviceToUserModel" element={<Model />} />
                <Route exact path="/supportForm" element={<SupportEngForm />} />
                <Route exact path="/singleServicesData" element={<SingleServicesData />} />
                <Route exact path="/add_hospital" element={<AddHospital />} />
                <Route exact path="/Support_eng_data_module" element={<SupportEngDataModule />} />
                <Route exact path="/Support_eng_dashboard" element={<SupportEngDashboard />} />

                <Route exact path="/Ticket_details" element={<TicketDetails />} />
                <Route exact path="/edit_Ticket_Details" element={<EditTicketDetails />} />

                {/* service-Eng */}
                <Route exact path="/service_eng" element={<ServiceEnginner />} />
                <Route exact path="/assignedTicketToServiceEng" element={<AssignedTicketToServiceEng />} />

                <Route exact path="/service_eng_user_module" element={<ServiceEngUserModule />} />

                <Route exact path="/demo_details" element={<MainDemoDetails />} />
                <Route exact path="/single_user_count" element={<SingleUserDataCount />} />
                <Route exact path="/main_demo_details" element={<DemoDetails />} />
                <Route exact path="/add_sales_details" element={<AddSalesDetails />} />
                <Route exact path="/expences_details" element={<ExpencesDetails />} />
                <Route exact path="/marketing_head_screen" element={<MarketingHeadScreen />} />
                <Route exact path="/assign_user_marketing" element={<AssignUserInMarketing />} />

                <Route exact path="/sales_details" element={<SalesDetails />} />
                <Route exact path="/service_feedback" element={<FeedbackForm />} />
                <Route exact path="/service_eng_module" element={<ServiceModuleData />} />
                <Route exact path="/service_eng_installation" element={<InstallationRecords />} />

                {/* marketing data */}
                <Route exact path="/marketing_model" element={<MarketingModel />} />
                <Route exact path="/allDataInMarketing" element={<AllDataInOneMarketing />} />

                {/* Nurse */}
                <Route exact path="/nurse_module" element={<NurseModule />} />
                <Route exact path="/new_screen_patient" element={<NewScreenForPatient />} />
                <Route exact path="/assiatant_dashboard" element={<AssistantDashboard />} />
                <Route exact path="/assiatant_devices" element={<AssistantDevices />} />
                <Route exact path="/patient_devices" element={<PatientDevices />} />
                <Route exact path="/add_medicine_illness" element={<AddMedicineIllness />} />
                <Route exact path="/association_request_module" element={<AssociationRequestModule />} />
                <Route exact path="/nurse_module_data" element={<NurseModuleData />} />
                <Route exact path="/nurse_add_diagnose" element={<NurseAddDiagnose />} />
                <Route exact path="/add_diagnose_data" element={<NurseAddDiagnoseData />} />
                <Route exact path="/add_new_patient_details" element={<AddNewPatientDetails />} />
                {/* Register User */}
                <Route exact path="/log_table" element={<LogTable />} />
                <Route exact path="/user_device" element={<UserDevice />} />
                <Route exact path="/add_register_user" element={<AddRegisterUser />} />
                <Route exact path="/notificationHandle" element={<Notification />} />
                <Route exact path="/analytics" element={<Analytics />} />
                <Route exact path="/update" element={<UpdateProfile />} />
                <Route exact path="/profileComponent" element={<ProfileComponent/>} />

                <Route exact path="/update_profile_details" element={<UpdateProfiileWithExperience />} />
                {/* <Route exact path="/update_profile_with_experience" element={<UserProfileDataWithExp />} /> */}
                <Route exact path="/alarm" element={<AlarmNew />} />
                <Route exact path="/events" element={<Event />} />
                <Route exact path="/device" element={<Device />} />
                <Route exact path="/newDevice" element={<DeviceNew />} />
                <Route exact path="/agvaMinidevice" element={<AgVaMiniDevices />} />
                <Route exact path="/agvaMiniTrack" element={<AgvaMiniTrackHistory />} />
                <Route exact path="/deviceOverview" element={<DeviceOverview />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/service" element={<Services />} />
                <Route exact path="/deviceEvents" element={<DeviceLogs />} />
                <Route exact path="/newDeviceEvents" element={<DeviceLogsNew />} />
                <Route exact path="/deviceAlerts" element={<Alarms />} />
                <Route exact path="/deviceAnalytics" element={<DeviceAnalytics />} />
                <Route exact path="/privacyPolicy" element={<PrivacyPolicy />} />
                <Route exact path="/termsOfServices" element={<TermsOfServices />} />
                <Route exact path="/navBar" element={<Navbar />} />
                {/* <Route exact path="/live" element={<Live />} /> */}
                <Route exact path="/deviceAssign" element={<DeviceAssign />} />
                {/* <Route exact path="/deleteAssignDevice" element={<DeleteAssignDevice />} /> */}

                {/* dispatch */}
                <Route exact path="/dispatchDashboardModule" element={<DispatchDashboardModule />} />
                <Route exact path="/dispatchEditDetailsForm" element={<DispatchEditDetailsForm />} />
                <Route exact path="/singleDispatchDataModule" element={<SingleDispatchDataModule />} />
                <Route exact path="/dispatchDevice" element={<Dispatch />} />
                <Route exact path="/previousHistoryModalData" element={<PreviousHistoryModalData />} />
                <Route exact path="/previousHistoryData" element={<PreviousHistoryData />} />
                <Route exact path="/returnFormModule" element={<ReturnFormModule />} />
                <Route exact path="/shipment-details" element={<ShipmentDetails />} />
                <Route exact path="/allDispatchDeviceData" element={<DispatchDataModule />} />
                <Route exact path="/dispatchModel" element={<DispatchModel />} />

                {/*  */}
                <Route exact path="/history" element={<History />} />
                <Route exact path="/patientDetails" element={<PatientDetails />} />
                <Route exact path="/add_diagnose" element={<AddDiagnose />} />
                <Route exact path="/productionModel" element={<ProductionModel />} />
                {adminInfo?.data?.userType === "Super-Admin" || adminInfo?.data?.userType === "Marketing-Admin" ? (
                  <>
                    <Route exact path="/adminDashboard" element={<AdminDashboard />} />
                    <Route exact path="/manageUsers" element={<ManageAdminUserModel />} />
                    {/* <Route exact path="/manageUsers" element={<ManageUsers />} /> */}

                  </>
                ) : ""}
              </Route>
              <Route exact path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      )}
    </>
  );
}
export default App;