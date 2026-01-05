import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfoAction } from "../../store/action/UpdateUserInfoAction";
import { getUserProfileDataAction } from "../../store/action/UserProfileAction";

function ProfileComponent() {

    const getUserProfileReducer = useSelector((state) => state.getUserProfileReducer);
    const { data } = getUserProfileReducer;
    const userData=data?.data
    const _id =  localStorage.getItem("_id")
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        department: "",
        designation: "",
        speciality: "",
    });
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getUserProfileDataAction(_id))
    },[_id])
    useEffect(() => {
        if (userData) {
            setFormData({
                firstName: userData?.firstName,
                lastName: userData?.lastName,
                email: userData?.email,
                phoneNumber: userData?.contactNumber,
                department: userData?.department,
                designation: userData?.designation,
                speciality: userData?.speciality
            })
        }
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        dispatch(updateUserInfoAction({
            userId:_id,
            firstName:formData?.firstName,
            lastName:formData?.lastName,
            email:formData?.email,
            contactNumber:formData?.phoneNumber,
            department:formData?.department,
            designation:formData?.designation,
            speciality:formData?.speciality
        }))
        alert("Form submitted successfully!");
    };

    return (
        <div className="p-5 flex flex-col gap-6">
            {/* Personal Details */}
            <div className="flex flex-col gap-6 mt-6">
                <h2 className="font-bold text-black" style={{fontSize:'1.3rem'}}>Personal Details :</h2>
                <div className="flex flex-wrap gap-6">
                    <InputField
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                    />
                    <InputField
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                    />
                    <InputField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <InputField
                        label="Phone Number"
                        name="phoneNumber"
                        type="number"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            {/* Professional Details */}
            <div className="flex flex-col gap-6 mt-8">
                <h2 className="font-bold text-black" style={{fontSize:'1.3rem'}}>Professional Details :</h2>
                <div className="flex flex-wrap gap-6">
                    <InputField
                        label="Department"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                    />
                    {/* <InputField
                        label="Select Role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                    /> */}
                    <InputField
                        label="Designation"
                        name="designation"
                        value={formData.designation}
                        onChange={handleInputChange}
                    />
                    <InputField
                        label="Specialization"
                        name="speciality"
                        value={formData.speciality}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-4">
                <button
                    onClick={handleSubmit}
                    className="bg-black text-white py-2 px-4 rounded-lg w-28"
                >
                    Update Profile
                </button>
            </div>
        </div>
    );
}

function InputField({ label, name, type = "text", value, onChange }) {
    return (
        <div className="flex flex-col gap-2" style={{ width: '30%' }}>
            <label htmlFor={name} className="font-medium text-gray-500">
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={`Enter ${label}`}
                className="p-3 border border-gray-300" style={{ width: '100%', borderRadius: '15px' }}
            />
        </div>
    );
}

export default ProfileComponent;
