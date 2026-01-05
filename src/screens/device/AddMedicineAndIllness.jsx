
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast';
import back from "../../assets/images/back.png"
import Style from "../../css/SearchBar.module.css";
import { getHospitalDataFromAdding } from '../../store/action/StoreSystem';
import { addMedicineIllnessAction, deviceAction, getIndianMedicineAction, postPatientDataAction } from '../../store/action/DeviceAction';
import NurseGoverDataGlobal from './NurseGoverDataGlobal';
function AddMedicineAndIllness() {

    const getIndianMedicineReducer = useSelector((state) => state.getIndianMedicineReducer);
    const { loading, data: medicineData } = getIndianMedicineReducer;
    const AllDataOfMedicine = medicineData;

    // console.log('patientData',patientData)
    const dispatch = useDispatch()
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const uhid = urlParams.get("uhid");
    const serialNo = urlParams.get("serialNo");
    const [updateDiagnose, setUpdateDiagnose] = useState()
    const handleSubmitData = (e) => {
        e.preventDefault()
        if (updateDiagnose && selectedItems) {
            dispatch(addMedicineIllnessAction({
                UHID: uhid,
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
                            defaultValue={uhid} readOnly
                            type="text" id="uhid" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter UHID" required />
                        {/* } */}
                    </div>
                    <div>
                        <label for="uhid" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Serial No</label>
                        <input
                            defaultValue={serialNo} readOnly
                            type="text" id="uhid" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        {/* } */}
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

export default AddMedicineAndIllness