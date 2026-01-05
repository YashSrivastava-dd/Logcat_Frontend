import React from "react";
import { MoveLeft, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const SingleViewData = ({ singleLeadsData, onGoBack }) => {
    console.log('singleLeadsData', singleLeadsData?.dispatchSalesDevice)
    const navigate = useNavigate();
    return (
        <div className="flex-1 p-6 gap-4 ">
            <button
                onClick={onGoBack} // Call the passed function to go back
                className=" top-2 right-2 text-white px-3 py-1 rounded-lg"
            >
                <MoveLeft size={28} color="black" />
            </button>
            {/* Lead Details */}
            <div className="bg-white p-4 rounded-lg shadow-md grid grid-cols-1 gap-4 text-sm">
                <h2 className="text-lg font-semibold">Lead Details</h2>
                <div className="bg-white grid grid-cols-2 gap-4 text-sm">
                    <div className="flex flex-column gap-2">
                        <p className="p-2"><strong className="text-black">Hospital Name:</strong> {singleLeadsData?.hospitalName}</p>
                        <p className="p-2"><strong className="text-black">Lead Stage:</strong> {singleLeadsData?.leadStatus}</p>
                        <p className="p-2"><strong className="text-black">City:</strong> {singleLeadsData?.city}</p>
                        <p className="p-2"><strong className="text-black">State:</strong> {singleLeadsData?.state}</p>
                        <p className="p-2"><strong className="text-black">Dealer Name:</strong> {singleLeadsData?.dealerName}</p>
                        <p className="p-2"><strong className="text-black">Dealer Address:</strong> {singleLeadsData?.address}</p>
                    </div>
                    <div className="flex flex-column gap-2">
                        <p className="p-2"><strong className="text-black">Total Sale:</strong> 5</p>
                        <p className="p-2"><strong className="text-black">Total Demo:</strong> 2</p>
                        <p className="p-2"><strong className="text-black">Total Amount:</strong> {singleLeadsData?.paymentUpdates?.[0]?.totalAmount}</p>
                        <p className="p-2"><strong className="text-black">Received Amount:</strong> {singleLeadsData?.paymentUpdates?.[0]?.totalAmount - singleLeadsData?.paymentUpdates?.[0]?.remainingAmount}</p>
                        <p className="p-2"><strong className="text-black">Pending Amount:</strong> {singleLeadsData?.paymentUpdates?.[0]?.totalAmount}</p>
                        <p className="p-2"><strong className="text-black">Next Payment Date:</strong> {singleLeadsData?.paymentUpdates?.[0]?.nextExpectedPaymentDate}</p>
                    </div>
                </div>
            </div>

            {/* Documents Section */}
            <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                <h2 className="text-lg font-semibold mb-4">Documents</h2>
                <div className="border rounded-lg overflow-hidden">
                    {[
                        { name: "PO DOC", date: "31-JAN-2025", value: '' },
                        { name: "VISITING CARD", date: "31-JAN-2025", value: singleLeadsData?.visitingCardImageUrl },
                        { name: "DELIVERY NOTE", date: "31-JAN-2025", value: '' },
                        { name: "INVOICE", date: "31-JAN-2025", value: '' },
                        { name: "CHEQUE 1", date: "31-JAN-2025", value: singleLeadsData?.paymentUpdates?.[0]?.paymentImageUrl }
                    ].map((doc, index) => (
                        <div key={index} className="flex justify-between items-center border-b last:border-b-0 p-3">
                            <span className="text-sm">{doc.name}</span>
                            <span className="text-sm">{doc.date}</span>
                            {doc?.value?.length > 0 ?
                                <Link to={doc?.value} className="bg-pink-700 text-white px-4 py-1 rounded-md text-sm">VIEW</Link>
                                : '---'}
                        </div>
                    ))}
                </div>
            </div>

            {/* Device Summary */}
            <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                <h2 className="text-lg font-semibold mb-4">Device Summary</h2>
                <table className="w-full border-collapse border text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">Device ID</th>
                            <th className="border p-2">Serial No</th>
                        </tr>
                    </thead>
                    <tbody>
                        {singleLeadsData?.dispatchSalesDevice ? (
                            singleLeadsData?.dispatchSalesDevice?.map((item, index) => {
                                console.log('item', item)
                                return (
                                    <tr key={index}>
                                        <td className="border p-2">{item?.deviceIds?.map((device, i) => device || '--').join(', ') || '--'}</td>
                                        <td className="border p-2">{item?.serialNumbers?.map((serial, i) => serial || '--').join(', ') || '--'}</td>
                                    </tr>
                                )
                            })
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">No Data Available</td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>

            {/* Payments Section */}
            <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                <h2 className="text-lg font-semibold mb-4">Payments</h2>
                <table className="w-full border-collapse border text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">Hospital Name</th>
                            <th className="border p-2">Dealer</th>
                            <th className="border p-2">Total Payment</th>
                            <th className="border p-2">Amount</th>
                            <th className="border p-2">Remaining</th>
                            <th className="border p-2">Date</th>
                            <th className="border p-2">Payment Mode</th>
                            <th className="border p-2">Payment Proof</th>
                        </tr>
                    </thead>
                    <tbody>
                        {singleLeadsData?.paymentUpdates?.map((item, index) => (
                            <tr key={index}>
                                <td className="border p-2">{singleLeadsData?.hospitalName}</td>
                                <td className="border p-2">{singleLeadsData?.dealerName}</td>
                                <td className="border p-2">{item?.totalAmount}</td>
                                <td className="border p-2">{item?.advanceAmount}</td>
                                <td className="border p-2">{item?.remainingAmount}</td>
                                <td className="border p-2">{item?.addedDate}</td>
                                <td className="border p-2">{item?.paymentMode}</td>
                                <td className="border p-2"><Link to={item?.paymentImageUrl} className="text-blue-600">View</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SingleViewData;
