
import React, { useState } from 'react'
import Style from "../../css/Production.module.css"
import { Link } from 'react-router-dom'
import back from "../../assets/images/back.png";
import { useDispatch } from 'react-redux'
import { Toaster, toast } from 'react-hot-toast'
import { postPatientDiagnose } from '../../store/action/DeviceAction';
import axios from 'axios';
import { Modal } from 'flowbite-react';
import { AiOutlineClose } from 'react-icons/ai';
function NurseAddDiagnoseData() {
  const [disgnoseData, setDisgnoseData] = useState({
    Addmedication: '',
    statesVital: '',
  })
  const dispatch = useDispatch()

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const uhid = urlParams.get("uhId");
  const goBack = () => {
    window.history.go(-1)
  }


  const handleImageSelect = (event) => {
    setSelectedImage(event.target.files[0]);
  };
  const [openModal, setOpenModal] = useState(false);
  const [loadinState, setLoadingState] = useState(false)
  const [dhrSelect, setdhrSelect] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null);
  const [pdfUrl, setPdfUrl] = useState('');
  const generatePdfAndUploadToS3 = async (e) => {
    e.preventDefault()
    setdhrSelect(true)
    if (!selectedImage) {
      toast.error('Please select a (JPG) file');
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedImage);
    try {
      setLoadingState(true);
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/patient/upload-patient-file/${uhid}`, formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      setTimeout(() => {
        setLoadingState(false)
      }, 500);
      setPdfUrl(response.data.pdfUrl);
      toast.success('Uploaded successful')
    } catch (error) {
      console.error('Error generating PDF:', error);
      console.error('Error Serial Number:', error);
    }
  };

  const [statsData, setStatsData] = useState();
  const [statsValue, setStatsValue] = useState();
  const [statsAllData, setStatsAllData] = useState([]);
  console.log('statsAllData', statsAllData)
  const handleAddData = () => {
    const newData = { statsData, statsValue };
    setStatsAllData([...statsAllData, newData]);
    toast.success('Stats Added')
    setTimeout(() => {
      setOpenModal(false)
    }, 200);
    setStatsData('');
    setStatsValue('');
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!disgnoseData.Addmedication) {
      toast.error('Please Enter Medicine')
    }
    else if (!statsAllData) {
      toast.error('Please select Stats')
    }
    else if (disgnoseData.Addmedication) {
      dispatch(postPatientDiagnose({
        medication: disgnoseData.Addmedication,
        stats: statsAllData,
        uhid: uhid,
      }))
      // toast.success('Diagnose Add Success')
    }
  }
  return (
    <div>
      <Toaster />
      <div className={Style.mainContainer}>
        <div className={Style.dispatchContainer}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", }}>
                <Link onClick={goBack}>
                  <img src={back} style={{ width: "3rem" }} />
                </Link>
                <h1 className="flex items-center text-5xl font-extrabold" style={{ justifyContent: 'center' }}>Patient<span className="bg-rgb(152, 0, 76)-100 text-rgb(152, 0, 76)-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded   ml-2">Diagnose</span></h1>
              </div>
            </div>
          </div>
          <form>
            <div className="grid gap-6 mb-6 md:grid-cols-2" style={{ textAlign: 'start' }}>
              <div className={Style.formItem}>
                <div>
                  <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 :text-white">UHID</label>
                  <input
                    defaultValue={uhid} disabled
                    type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" required />
                </div>
                <div>
                  <label for="state" style={{ textAlign: 'start' }} className="block mb-2 text-sm font-medium text-gray-900 :text-white">Stats</label>
                  <select
                    onChange={(e) => {
                      setDisgnoseData({ ...disgnoseData, statesVital: e.target.value })
                      setOpenModal(true)
                      setStatsData(e.target.value)
                    }
                    } value={disgnoseData.statesVital}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Other Details">
                    <option>Select Stats</option>
                    <option value="bp">BP</option>
                    <option value="spo2">SPO2</option>
                    <option value="po2">PO2</option>
                    <option value="pco2">PCO2</option>
                  </select>
                </div>
              </div>
              <div className={Style.formItem}>
                <div>
                  <label htmlFor="first_name" style={{ textAlign: 'start' }} className="block mb-2 text-sm font-medium text-gray-900 :text-white">Add Medication</label>
                  <input list="countryData" onChange={(e) => setDisgnoseData({ ...disgnoseData, Addmedication: e.target.value })} value={disgnoseData.Addmedication}
                    id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Medication" required />
                </div>
                <div>
                  <label for="file" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Add Report</label>
                  <div className="flex gap-2 mb-6 md:grid-cols-2" style={{ alignItems: 'center' }}>
                    <input type="file"
                      onChange={handleImageSelect}
                      id="file" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" required />
                    <button style={{ width: '20%', height: '3rem' }}
                      onClick={generatePdfAndUploadToS3}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">
                      {loadinState && <h6 style={{ fontSize: '0.9rem' }}>Uploading...</h6>}
                      {!loadinState && <h6>Upload</h6>}
                    </button>
                  </div>
                </div>
                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                  <Modal.Header
                    style={{ display: "flex", justifyContent: "end" }}
                  >
                    <span>Select Stats</span>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="text-center">
                      <div className="flex justify-center gap-4 align-items-center">
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                          <lable>Stats</lable>
                          <input type="text" value={statsData?.toUpperCase()} disabled />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                          <lable>Stats Value</lable>
                          <input type="text" value={statsValue} onChange={(e) => setStatsValue(e.target.value)} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <button
                            style={{
                              backgroundColor: "white",
                              border: "0.5px solid gray",
                              color: "black",
                              padding: "10px",
                              borderRadius: "8px",
                            }}
                            onClick={handleAddData}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
              {statsAllData?.length > 0 ?
                <div className={Style.formItem}>
                  <label for="district" style={{ textAlign: 'start' }} className="block mb-2 text-sm font-medium text-gray-900 :text-white">Stats List </label>
                  <ul>
                    {statsAllData?.map((item, index) => {
                      return <li key={index}>{item?.statsData.toUpperCase()} : {item?.statsValue.toUpperCase()} </li>
                    })}
                  </ul>
                </div>
                : ''}
            </div>
          </form>
          <div>
            <hr style={{ color: "#707070" }} />
            <div className={Style.buttonContainer} >
              <button onClick={handleSubmit} className={Style.continuebtn} >Submit</button>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default NurseAddDiagnoseData