import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "react-hot-toast";
import { postDemoAddDataAction } from "../../../store/action/ServiceEngAction";
import { deviceAction } from "../../../store/action/DeviceAction";
import { getAllHospitalData } from "../../../store/action/StoreSystem";

const DemoDetails = () => {
  const [demoData, setDemoData] = useState({
    deviceId: "",
    contactNo: "",
    hospitalName: "",
    demoDuration: "",
    priority: "",
    description: "",
    serialNo:''
  });

  const dispatch = useDispatch();
  const priorityPlaceholder = "Select priority";

  const deviceReducer = useSelector((state) => state.deviceReducer);
  const { data: deviceData } = deviceReducer;
  const deviceIdData = useMemo(() => deviceData?.data?.data || [], [deviceData]);
  const allHospitalDataReducer = useSelector((state) => state.allHospitalDataReducer);
  const { data: hospitalData } = allHospitalDataReducer;
  const hospitalList = useMemo(() => hospitalData?.data || [], [hospitalData]);

  useEffect(() => {
   const page=1;
   const limit=99000;
   const searchData=''
    dispatch(deviceAction( page, limit, searchData ));
    dispatch(getAllHospitalData());
  }, [dispatch]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const { deviceId,serialNo, contactNo, hospitalName, demoDuration, priority, description } = demoData;

    // if (!deviceId) return toast.error("Enter Device ID");
    if (!contactNo) return toast.error("Enter contact number");
    if (!hospitalName) return toast.error("Enter hospital name");
    if (!demoDuration) return toast.error("Enter demo duration");
    if (!priority || priority === priorityPlaceholder) return toast.error("Select priority");
    if (!description) return toast.error("Enter description");

    dispatch(postDemoAddDataAction({ deviceId,serialNo, contactNo, hospitalName, demoDuration, priority, description }));
  }, [demoData, dispatch]);

  return (
    <div>
      <Toaster />
      <div style={{marginTop:'2rem'}}>
      <form className="px-4 flex flex-col gap-4" onSubmit={handleSubmit}>
          <h5>Demo Data</h5>
        <div className="flex flex-col gap-2">
          <label htmlFor="deviceId" className="text-sm md:text-base">Device Id</label>
          <input
            list="deviceIds"
            id="deviceId"
            value={demoData.deviceId}
            onChange={(e) => setDemoData({ ...demoData, deviceId: e.target.value })}
            className="block w-full p-3 pl-10 text-sm md:text-base border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Device Id"
            required
          />
          <datalist id="deviceIds">
            {deviceIdData.map((item) => (
              <option key={item.deviceId} value={item.deviceId}>{item.deviceId}</option>
            ))}
          </datalist>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="serialNo" className="text-sm md:text-base">Serial No</label>
          <input
            list="serialNo"
            id="serialno"
            value={demoData.serialNo}
            onChange={(e) => setDemoData({ ...demoData, serialNo: e.target.value })}
            className="block w-full p-3 pl-10 text-sm md:text-base border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Serial No"
            required
          />
          <datalist id="serialNo">
            {deviceIdData.map((item) => (
              <option key={item.serialNo} value={item.serialNo}>{item.serialNo}</option>
            ))}
          </datalist>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contactNo" className="text-sm md:text-base">Contact Number</label>
          <input
            id="contactNo"
            value={demoData.contactNo}
            onChange={(e) => setDemoData({ ...demoData, contactNo: e.target.value })}
            type="number"
            className="block w-full p-3 pl-10 text-sm md:text-base border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter contact no."
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="hospitalName" className="text-sm md:text-base">Hospital Name</label>
          <input
            list="hospitalNames"
            id="hospitalName"
            value={demoData.hospitalName}
            onChange={(e) => setDemoData({ ...demoData, hospitalName: e.target.value })}
            className="block w-full p-3 pl-10 text-sm md:text-base border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Hospital Name"
            required
          />
          <datalist id="hospitalNames">
            {hospitalList.map((item, index) => (
              <option key={index} value={item.Hospital_Name}>{item.Hospital_Name}</option>
            ))}
          </datalist>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="demoDuration" className="text-sm md:text-base">Demo Duration (days)</label>
          <input
            id="demoDuration"
            value={demoData.demoDuration}
            onChange={(e) => setDemoData({ ...demoData, demoDuration: e.target.value })}
            type="number"
            className="block w-full p-3 pl-10 text-sm md:text-base border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter duration in days"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="priority" className="text-sm md:text-base">Priority</label>
          <select
            id="priority"
            value={demoData.priority}
            onChange={(e) => setDemoData({ ...demoData, priority: e.target.value })}
            className="block w-full p-3 pl-10 text-sm md:text-base border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option>{priorityPlaceholder}</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-sm md:text-base">Client Requirements</label>
          <textarea
            id="description"
            value={demoData.description}
            onChange={(e) => setDemoData({ ...demoData, description: e.target.value })}
            className="block w-full p-3 pl-10 text-sm md:text-base border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter requirements"
            required
          />
        </div>
        <div className="py-4 flex justify-center">
          <button
            type="submit"
            className="px-4 py-2 text-white rounded-lg w-full md:w-1/2" style={{backgroundColor:'rgb(152, 0, 76)'}}
          >
            Submit
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};
export default DemoDetails