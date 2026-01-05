import React, { useEffect, useState } from 'react'
import Style from "../../../css/Production.module.css"
import { Link, useNavigate } from 'react-router-dom'
import back from "../../../assets/images/back.png";
import { Country } from 'country-state-city';
import { useDispatch, useSelector } from 'react-redux'
import { allStateData } from '../../../store/action/AdminAction'
import { getNewHospitalData } from '../../../store/action/StoreSystem'
import { Toaster, toast } from 'react-hot-toast'
import { getPincodeData } from "../../../store/action/DispatchDetailsAction"

function AddHospital() {
    const [hospitalData, setHospitalData] = useState({
        countryName: '',
        pincode: '',
        hospitalName: '',
        address: '',
        state: '',
        district: '',
        city: '',  // Added city to hospital data
    })
    const dispatch = useDispatch()
    let getAllCountryData = Country.getAllCountries()

    // state reducer
    const getPiincodeDatReducer = useSelector((state) => state.getPiincodeDatReducer);
    const { data: pincodeData } = getPiincodeDatReducer;
    const getPincodeAllData = pincodeData && pincodeData.data && pincodeData.data[0]

    useEffect(() => {
        dispatch(getPincodeData())
    }, [])

    const goBack = () => {
        window.history.go(-1)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!hospitalData.countryName) {
            toast.error('Please Enter Country Name')
        }
        else if (!hospitalData.pincode) {
            toast.error('Please Enter PIN Code')
        }
        else if (!hospitalData.hospitalName) {
            toast.error('Please Enter Hospital Name')
        }
        else if (!hospitalData.address) {
            toast.error('Please Enter Address')
        }
        else if (hospitalData.countryName && hospitalData.pincode && hospitalData.hospitalName && hospitalData.address) {
            dispatch(getNewHospitalData({
                Hospital_Name: hospitalData.hospitalName.trim(),
                Hospital_Address: hospitalData.address,
                Country: hospitalData.countryName,
                Pincode: hospitalData.pincode,
                State: hospitalData.state || getPincodeAllData?.state,  // Use user input if state is missing
                District: hospitalData.district || getPincodeAllData?.district,  // Use user input if district is missing
                City: hospitalData.city || getPincodeAllData?.city,  // Use user input if city is missing
            }))
            setTimeout(() => {
                window.location.reload();
            }, 1000);
            toast.success('Hospital Added')
        }
    }

    return (
        <div>
            <Toaster />
            <div className={Style.mainContainer}>
                <div className={Style.dispatchContainer}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", }}>
                        <Link onClick={goBack} style={{ display: 'block' }}>
                            <img src={back} style={{ width: "3rem", }} />
                        </Link>
                        <h1 className="text-2xl font-extrabold">Add<small className="ml-2 font-semibold text-gray-500 dark:text-gray-400">Hospital</small></h1>
                        <hr style={{ color: "rgb(152, 0, 76)" }} />
                    </div>
                    <form>
                        <div className="grid gap-6 mb-6 md:grid-cols-2" style={{ textAlign: 'start' }}>
                            <div className={Style.formItem}>
                                <div>
                                    <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900">Country</label>
                                    <input list="countryData" onChange={(e) => setHospitalData({ ...hospitalData, countryName: e.target.value })} value={hospitalData.countryName}
                                        id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Enter Country Name" required />
                                    <datalist id='countryData'>
                                        {getAllCountryData && getAllCountryData.map((item) => (
                                            <option key={item.isoCode} value={item.name} />
                                        ))}
                                    </datalist>
                                </div>

                                <div>
                                    <label htmlFor="district" className="block mb-2 text-sm font-medium text-gray-900">District</label>
                                    {getPincodeAllData && getPincodeAllData.district ? (
                                        <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
                                            {getPincodeAllData.district}
                                        </div>
                                    ) : (
                                        <input type="text" onChange={(e) => setHospitalData({ ...hospitalData, district: e.target.value })} value={hospitalData.district}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Enter District" />
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900">State</label>
                                    {getPincodeAllData && getPincodeAllData.state ? (
                                        <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
                                            {getPincodeAllData.state}
                                        </div>
                                    ) : (
                                        <input type="text" onChange={(e) => setHospitalData({ ...hospitalData, state: e.target.value })} value={hospitalData.state}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Enter State" />
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">Address</label>
                                    <textarea onChange={(e) => setHospitalData({ ...hospitalData, address: e.target.value })} value={hospitalData.address}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Enter Address" required />
                                </div>
                            </div>

                            <div className={Style.formItem}>
                                <div>
                                    <label htmlFor="pincode" className="block mb-2 text-sm font-medium text-gray-900">PIN Code</label>
                                    <input type="number" onChange={(e) => {
                                        setHospitalData({ ...hospitalData, pincode: e.target.value })
                                        dispatch(getPincodeData(e.target.value))
                                    }} value={hospitalData.pincode}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Enter Pin Code" required />
                                </div>

                                <div>
                                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">City</label>
                                    {getPincodeAllData && getPincodeAllData.city ? (
                                        <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
                                            {getPincodeAllData.city}
                                        </div>
                                    ) : (
                                        <input type="text" onChange={(e) => setHospitalData({ ...hospitalData, city: e.target.value })} value={hospitalData.city}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Enter City" />
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="hospitalName" className="block mb-2 text-sm font-medium text-gray-900">Hospital Name / Consignee Name</label>
                                    <input onChange={(e) => setHospitalData({ ...hospitalData, hospitalName: e.target.value })} value={hospitalData.hospitalName}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Enter Hospital Name or Consignee Name" required />
                                </div>
                            </div>
                        </div>
                    </form>
                    <div>
                        <hr style={{ color: "#707070" }} />
                        <div className={Style.buttonContainer}>
                            <button onClick={handleSubmit} className={Style.continuebtn}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddHospital