
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast';
import back from "../../assets/images/back.png"
import axios from 'axios';
import Style from "../../css/SearchBar.module.css";
import { getHospitalDataFromAdding } from '../../store/action/StoreSystem';
import { deviceAction, getIndianMedicineAction, postPatientDataAction } from '../../store/action/DeviceAction';
import NurseGoverDataGlobal from './NurseGoverDataGlobal';
function NurseAddDiagnose() {

    const getIndianMedicineReducer = useSelector((state) => state.getIndianMedicineReducer);
    const { loading, data: medicineData } = getIndianMedicineReducer;

    const AllDataOfMedicine = medicineData;
    const [dateTime, setDateTime] = useState();
    const [patientData, setPatientData] = useState({
        dosageProvided: '',
        age: '',
        height: '',
        deviceId: '',
        weight: '',
        wardNumber: '',
        doctorName: '',
        uhid: '',
        name: '',
        dateTime: '',
        bedNo: '',
        serialNumber: ''
    })
    // console.log('patientData',patientData)
    const dispatch = useDispatch()
    const deviceReducer = useSelector((state) => state.deviceReducer);
    const { data: deviceData } = deviceReducer;
    const deviceIdData = useMemo(() => deviceData?.data?.data || [], [deviceData]);
    const [dhrSelect, setdhrSelect] = useState(false)
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const deviceId = urlParams.get("deviceId");
    const handleImageSelect = (event) => {
        setSelectedImage(event.target.files[0]);
    };
    const [loadinState, setLoadingState] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);
    const [pdfUrl, setPdfUrl] = useState('');
    const [updateDiagnose, setUpdateDiagnose] = useState()
    const generatePdfAndUploadToS3 = async (e) => {
        e.preventDefault()
        setdhrSelect(true)
        if (!selectedImage) {
            // toast.error('Please select a (JPG) file');
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedImage);
        try {
            setLoadingState(true);
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/patient/upload-patient-file/${patientData?.uhid}`, formData,
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
    const handleSubmitData = (e) => {
        e.preventDefault()
        if (!patientData.uhid) {
            toast.error('Enter UHID')
        }
        else if (!patientData?.wardNumber) {
            toast.error('Enter Ward Number')
        }
        else if (!patientData?.bedNo) {
            toast.error('Enter Bed number')
        }
        else if (!dateTime) {
            toast.error('Enter date and time')
        }
        else if (!patientData?.name) {
            toast.error('Enter Patient Name')
        }
        else if (patientData.wardNumber && dateTime && patientData.bedNo && patientData.name && patientData.uhid) {
            dispatch(postPatientDataAction({
                UHID: patientData.uhid,
                age: patientData.age,
                weight: patientData.weight,
                height: patientData.height,
                deviceId: deviceId,
                serial_no: patientData.serialNumber,
                patientName: patientData.name,
                dosageProvided: patientData.dosageProvided,
                ward_no: patientData.wardNumber,
                doctor_name: patientData.doctorName,
                bmi: Math.round(patientData?.weight / (patientData?.height / 100) ** 2),
                startDateTime: dateTime,
                bedNumber: patientData.bedNo,
                diagnoseData: updateDiagnose,
                medicineData: selectedItems
            }))
        }
    }
    const goBack = () => {
        window.history.go(-1)
    }

    const [medicineSingle, setmedicineSingle] = useState('')
    const [medicineDataCollect, setmedicineDataCollect] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        const page = 1;
        const limit = 99000;
        const searchData = ''
        dispatch(deviceAction(page, limit, searchData));
        dispatch(getHospitalDataFromAdding())
    }, [dispatch])

    const [inputText, setInputText] = useState('')
    const handleChange = (event) => {
        const search = event.target.value;
        setInputText(event.target.value)
        if (!search) {
            return setmedicineDataCollect([]); // Clear results if input is empty
        }
        else {
            const search = event.target.value;
            dispatch(getIndianMedicineAction(search))
            setmedicineSingle(event.target.value);
        }
    }

    const handleKeyPress = (event) => {
        const selectedValue = event.target.textContent;
        const selectedItem = AllDataOfMedicine?.find(result => result.name === selectedValue);
        if (selectedItem) {
            setSelectedItems(prevSelectedItems => [...prevSelectedItems, selectedItem.name]);
            setInputText('')
            setmedicineSingle(''); // Assuming this clears the input field
            setmedicineDataCollect([]); // Assuming this clears the results
        }
    };
    const handleChildData = (dataFromChild) => {
        // Handle the data received from child component
        setUpdateDiagnose(dataFromChild)
    };

    return (
        <div>
            <Toaster />
            <div style={{ marginTop: '2rem' }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", }}>
                    <Link onClick={goBack}>
                        <img src={back} style={{ width: "3rem" }} />
                    </Link>
                    <h1 className="flex items-center text-3xl font-extrabold" style={{ justifyContent: 'center' }}>Patient<span className="bg-rgb(152, 0, 76)-100 text-rgb(152, 0, 76)-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded   ml-2">Details</span></h1>
                </div>
            </div>
            <form className="p-3">
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <NurseGoverDataGlobal onData={handleChildData} />
                    <div>
                        <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Medicine Data</label>
                        <input
                            list='newdata'
                            value={inputText}
                            onChange={handleChange}
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Medicine Data" required />

                        {inputText?.length > 0 && AllDataOfMedicine?.length > 0 ?
                            <section className={Style.search_section}>
                                <div className={Style.search_result}>
                                    {AllDataOfMedicine?.map((item, index) => (
                                        <span id="clickable-span" onClick={handleKeyPress} data-value="your-value" key={index} target='_blank' className={Style.search_suggestion_line}>
                                            {item?.name}
                                        </span>
                                    ))}
                                    {loading === true && <span className={Style.search_suggestion_line}>
                                        Loading...
                                    </span>}
                                </div>
                            </section>
                            : ''
                        }
                        {selectedItems?.length > 0 ?
                            <ul style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                                {selectedItems?.map((item, index) => (
                                    <li key={index}><span>*</span>{item}</li>
                                ))}
                            </ul>
                            : ''}
                    </div>
                    <div>
                        <label for="uhid" className="block mb-2 text-sm font-medium text-gray-900 :text-white">UHID<span>*</span></label>
                        <input
                            onChange={(e) => {
                                setPatientData({ ...patientData, uhid: e.target.value })
                            }}
                            value={patientData.uhid}
                            type="text" id="uhid" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter UHID" required />
                        {/* } */}
                    </div>
                    <div>
                        <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Device Id / Serial No.</label>
                        <input
                            list="serialNo"
                            id="deviceId"
                            value={patientData.serialNumber}
                            onChange={(e) => setPatientData({ ...patientData, serialNumber: e.target.value })}
                            type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Device Id" required />
                        <datalist id="serialNo">
                            {deviceIdData.map((item) => (
                                <option key={item.serialNumber} value={item.serialNumber}>{item.serialNumber}</option>
                            ))}
                        </datalist>
                    </div>
                    <div>
                        <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Patient Name<span>*</span></label>
                        <input type="text"
                            onChange={(e) => {
                                setPatientData({ ...patientData, name: e.target.value })
                            }}
                            value={patientData.name}
                            id="phone"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Enter Patient Name" required />
                    </div>
                    <div>
                        <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Patient Age</label>
                        <input type="number"
                            onChange={(e) => {
                                setPatientData({ ...patientData, age: e.target.value })
                            }}
                            value={patientData.age} id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Patient Age" required />
                    </div>
                    <div>
                        <label for="height" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Patient Height (in Cm)</label>
                        <input type="number"
                            onChange={(e) => setPatientData({ ...patientData, height: e.target.value })} value={patientData.height}
                            id="website" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Patient Height" required />
                    </div>
                    <div>
                        <label for="weight" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Patient Weight (in Kg)</label>
                        <input type="test"
                            onChange={(e) => setPatientData({ ...patientData, weight: e.target.value })} defaultValue={patientData.weight}
                            id="website" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Patient Weight" required />
                    </div>
                    <div>
                        <label for="address" className="block mb-2 text-sm font-medium text-gray-900 :text-white">BMI</label>
                        <input type="number"
                            value={Math.round(patientData?.weight / (patientData?.height / 100) ** 2)}
                            id="website" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="BMI Calculation..." readOnly />
                    </div>
                    <div>
                        <label for="doctorName" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Doctor Name</label>
                        <input type="text"
                            onChange={(e) => setPatientData({ ...patientData, doctorName: e.target.value })} defaultValue={patientData.doctorName}
                            id="website" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Doctor Name" required />
                    </div>
                    <div>
                        <label for="wardNumber" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Ward Number<span>*</span></label>
                        <input type="text"
                            onChange={(e) => setPatientData({ ...patientData, wardNumber: e.target.value })} defaultValue={patientData.wardNumber}
                            id="website" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Ward Number" required />

                    </div>
                    <div>
                        <label for="bedNumber" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Bed Number<span>*</span></label>
                        <input type="text"
                            onChange={(e) => setPatientData({ ...patientData, bedNo: e.target.value })} defaultValue={patientData.bedNo}
                            id="website" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Bed Number" required />

                    </div>
                    <div>
                        <label for="doctorName" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Admission Date & Time</label>
                        <input onChange={(e) => setDateTime(e.target.value)} aria-label="Date and time" type="datetime-local" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    </div>
                </div>
                <div className="mb-6">
                    <label for="file" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Patient File</label>
                    <div className="flex gap-2 mb-6 md:grid-cols-2" style={{ alignItems: 'center' }}>
                        <input type="file"
                            onChange={handleImageSelect}
                            id="file" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1" required />
                        <button style={{ width: '20%', height: '3rem' }}
                            onClick={generatePdfAndUploadToS3}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">
                            {loadinState && <h6 style={{ fontSize: '0.9rem' }}>Uploading...</h6>}
                            {!loadinState && <h6>Upload</h6>}
                        </button>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button style={{ backgroundColor: 'rgb(152, 0, 76)', width: '30%' }}
                        onClick={handleSubmitData}
                        className="text-white bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center ">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default NurseAddDiagnose