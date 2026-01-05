import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllLeadAction, postUpdateDemoDevices } from "../../../store/action/ProjectAction";

export default function UpdateDemoLead({ leadId, salesLeadData }) {
    const [deviceType, setDeviceType] = useState("");
    const [demoDate, setDemoDate] = useState(null);
    const dispatch = useDispatch();
    // const { data: leadData } = useSelector((state) => state.getSingleSaleLeadReducer);
    const leadData = salesLeadData
    console.log('leadId',leadId)
    useEffect(() => {
        dispatch(getAllLeadAction());
    }, [dispatch]);

    const handelUpdate = (e) => {
        e.preventDefault()
        dispatch(postUpdateDemoDevices({
            deviceType: deviceType,
            contactPerson: leadData?.concernPersonName,
            demoDate: demoDate,
            leadId: leadId
        }))
    }

    return (
        <div className="w-lg mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">UPDATE - DEMO</h2>
            <div className="grid gap-6 mb-6 md:grid-cols-1">
                <div>
                    <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Select device</label>
                    <select id="countries" value={deviceType} onChange={(e) => setDeviceType(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option selected>Choose a Device</option>
                        <option value="AgVa Pro-ATP">AgVa Pro-ATP</option>
                        <option value="AgVa Pro-ATN">AgVa Pro-ATN</option>
                        <option value="Suction Pump">Suction Pump</option>

                    </select>
                </div>
                <div>
                    <label for="concerned_person_name" className="block mb-2 text-sm font-medium text-gray-900">Concern Person Name</label>
                    <input type="text" value={leadData?.concernPersonName} disabled id="concerned_person_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Name" />
                </div>
                <div>
                    <label for="concerned_person_name" className="block mb-2 text-sm font-medium text-gray-900">Demo Date</label>
                    <input type="date" placeholder="Enter Count" onChange={(e) => setDemoDate(e.target.value)} value={demoDate} id="concerned_person_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>
                <button type="button" onClick={handelUpdate} className="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2">Submit</button>
            </div>
        </div>
    );
}
