import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatientDetails, postMedicineAndIllnessDataAction } from "../../store/action/DeviceAction";
import { useNavigate } from "react-router";
import Style from "../../css/NurseModule.module.css"
import { Modal } from 'flowbite-react';
import { AiOutlineClose } from "react-icons/ai";
function NurseModule() {
  const [query, setQuery] = useState("");
  const [userDiseases, setUserDiseases] = useState('')
  const [endDate, setEndDate] = useState('')
  const [arrayData, setArrayData] = useState([]);
  const [uhidName, setUhidName] = useState('')
  const [openModal, setOpenModal] = useState(false);
  const getPatientDetailsReducer = useSelector(
    (state) => state.getPatientDetailsReducer
  );
  const { loading, data, error } = getPatientDetailsReducer;
  const getAllTicket = data;
// console.log('getAllTicket',getAllTicket)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getPatientDetails({ searchData: query, page: "1", limit: "100" }));
  }, []);

  const handleSearchChange = (e) => {
    setQuery(e.target.value.toLowerCase());
    if (query && query.length > 0) {
      dispatch(
        getPatientDetails({ searchData: query, page: "1", limit: "100" })
      );
    }
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      // Add to arrayData if checked
      setArrayData([...arrayData, value]);
    } else {
      // Remove from arrayData if unchecked
      setArrayData(arrayData.filter(item => item !== value));
    }
  };

  return (
    <div
      className="allPatientDataList"
      style={{
        position: "relative",
        top: "2rem",
        width: "100%",
      }}>
      <form className="patientForm">
        <label
          for="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only "
        >
          Search
        </label>
        <div className="relative" style={{ padding: "1rem" }}>
          <input
            type="search"
            onChange={handleSearchChange}
            id="default-search"
            className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :focus:ring-blue-500 :focus:border-blue-500"
            placeholder="Search..."
            required
          />
        </div>
      </form>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 :text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 :bg-gray-700 :text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Device id
              </th>
              <th scope="col" className="px-6 py-3">
                UHID
              </th>
              <th scope="col" className="px-6 py-3">
                Age
              </th>
              <th scope="col" className="px-6 py-3">
                Height
              </th>
              <th scope="col" className="px-6 py-3">
                Weight
              </th>
              <th scope="col" className="px-6 py-3">
                Ward Number
              </th>
              <th scope="col" className="px-6 py-3">
                Bmi
              </th>
              <th scope="col" className="px-6 py-3">
                Medicines
              </th>
              <th scope="col" className="px-6 py-3">
                Dosage
              </th>
              <th scope="col" className="px-6 py-3">
                Illness
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
              <th scope="col" className="px-6 py-3">
                Patient Details
              </th>
            </tr>
          </thead>
          {getAllTicket && getAllTicket.length > 0 ? (
            getAllTicket &&
            getAllTicket
              .filter((item) => item.UHID.toLowerCase().includes(query))
              .map((item, index) => {
                return (
                  <tbody>
                    <tr
                      className="bg-white border-b :bg-gray-800 :border-gray-700"
                      key={index}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {item.deviceId}
                      </th>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {item.UHID}
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {item.age ? item.age : "---"}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {item.height ? item.height : "---"}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap" style={{ color: "rgb(152, 0, 76)" }}>
                        {item.weight ? item.weight : "---"}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap" style={{ color: "rgb(152, 0, 76)" }}>
                        {item.ward_no ? item.ward_no : "---"}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {item.bmi ? item.bmi : "---"}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        <button
                          className={Style.addPatienBtn}
                          type="button"
                          onClick={() => {
                            setOpenModal(true)
                            setUserDiseases(item)
                            setUhidName(item.UHID)
                          }}
                        >
                          View Medicines
                        </button>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap" style={{ color: "rgb(152, 0, 76)" }}>
                        {item?.UHID ?
                          <button
                            className={Style.addPatienBtn}
                            type="button"
                            onClick={() => {
                              navigate(`/nurse_module_data?uhid=${item.UHID}&deviceId=${item.deviceId}`);
                            }}
                          >
                            View Dosage
                          </button>
                          : ''}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap" style={{ color: "rgb(152, 0, 76)" }}>
                        <button
                          className={Style.addPatienBtn}
                          type="button"
                          onClick={() => {
                            navigate(`/add_medicine_illness?uhid=${item.UHID}&serialNo=${item.serial_no}`);
                          }}
                        >
                          Add Illness
                        </button>
                      </td>

                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/nurse_add_diagnose?uhId=${item.UHID}&deviceId=${item.deviceId}&_id=${item._id}`
                            )
                          }
                          className={Style.addPatienBtn}
                        >
                          {item?.UHID?.length > 0 ? 'Edit Patient' : 'Add Patient'}
                        </button>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/new_screen_patient?deviceId=${item.deviceId}&uhid=${item.UHID}`
                            )
                          }
                          className={Style.addPatienBtn}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })
          ) : (
            <div
              className="bg-white border-b :bg-gray-800 :border-gray-700"
              style={{ width: "350%", textAlign: "center" }}
            >
              {error && <div className="px-8 py-8">No Data Found</div>}
              {loading && (
                <div
                  role="status"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 mr-2 text-gray-200 animate-spin :text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </div>
          )}
        </table>

        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header
            style={{ display: "flex", justifyContent: "end" }}
          >
            <span>Medicine Data</span>
            <button
              style={{ height: "1rem" }}
              onClick={() => setOpenModal(false)}
            >
              <AiOutlineClose />
            </button>
            <div>
              <label for="doctorName" className="block mb-2 text-sm font-medium text-gray-900 :text-white">End Date</label>
              <input onChange={(e)=>{setEndDate(e.target.value)}} aria-label="Date and time" type="datetime-local" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <div className="flex  justify-center gap-4 align-items-center" style={{ flexDirection: 'column' }}>
                <div className="flex  justify-center gap-4 align-items-center">
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                    <lable className="mb-4">Illness</lable>
                    {userDiseases?.illnessData?.map((item, index) => (
                      <div key={index} className="flex items-center mb-4">
                        <input
                          id={`checkbox${index}`} // Use a unique id for each checkbox
                          type="checkbox"
                          value={item._id} // Use the item's name as the value
                          checked={arrayData.includes(item._id)} // Check if item's name is in arrayData
                          onChange={handleCheckboxChange}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                          <label htmlFor={`checkbox${index}`} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            {item.name}
                          </label>
                          <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            {item.startDate}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                    <label className="mb-4">Medicine</label>
                    {userDiseases?.medicineData?.map((item, index) => (
                      <div key={index} className="flex items-center mb-4">
                        <input
                          id={`checkbox${index}`} // Use a unique id for each checkbox
                          type="checkbox"
                          value={item._id} // Use the item's name as the value
                          checked={arrayData.includes(item._id)} // Check if item's name is in arrayData
                          onChange={handleCheckboxChange}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                          <label htmlFor={`checkbox${index}`} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            {item.name}
                          </label>
                          <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            {item.startDate}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  style={{ 
                    backgroundColor: "white",
                    border: "0.5px solid gray",
                    color: "black",
                    padding: "10px",
                    borderRadius: "8px",
                  }}
                  onClick={() => {
                    const illnessId = arrayData;
                    const UHID = uhidName;
                    dispatch(postMedicineAndIllnessDataAction(illnessId, UHID, endDate))
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>

      </div>
    </div>
  );
}

export default NurseModule;
