import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addExpencesDataAction, getAllExpenceDataAction, postDeletDataOfExpences } from '../../../store/action/ServiceEngAction';
import { Toaster, toast } from 'react-hot-toast';
import ServiceModuleNavBar from './ServiceModuleNavBar';
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const ExpencesDetails = () => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [openModal, setOpenModal] = useState(false);
  const [openModalUpload, setOpenModalUpload] = useState(false);

  const [expencesData, setExpencesData] = useState({
    amount: '',
    description: '',
    time: '',
    bill: '',
  });

  const dispatch = useDispatch();

  const [loadinState, setLoadingState] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null);
  const [dhrSelect, setdhrSelect] = useState(false)
  const [userId, setUserId] = useState('');
  console.log('userId', userId)
  // upload file 
  const [pdfUrl, setPdfUrl] = useState('');
  const handleImageSelect = (event) => {
    setSelectedImage(event.target.files[0]);
  };
  console.log('selectedImage', selectedImage)
  const generateDhrFile = async (e) => {
    e.preventDefault();
    setdhrSelect(true);

    if (!selectedImage) {
      toast.error('Please upload bill');
      return;
    }
    const token = cookies.get('ddAdminToken');
    const formData = new FormData();
    formData.append('file', selectedImage);

    try {
      setLoadingState(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/marketing/expense/upload-exp-bill/${userId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoadingState(false);
      setPdfUrl(response.data.pdfUrl);
      toast.success('Uploaded Expense Bill');
      setTimeout(() => {
        setOpenModalUpload(true)
      }, 500);
    } catch (error) {
      console.error('Error uploading bill:', error);
      toast.error('Error uploading bill');
      setLoadingState(false);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!expencesData.amount) {
      toast.error('Enter amount');
      return;
    }
    if (!expencesData.description) {
      toast.error('Enter description');
      return;
    }
    if (!expencesData.bill) {
      toast.error('Enter bill');
      return;
    }

    dispatch(
      addExpencesDataAction({
        amount: expencesData.amount,
        description: expencesData.description,
        time: expencesData.time,
        isAvlBill: expencesData.bill
      })
    );
  };

  const getExpencesDataReducer = useSelector((state) => state.getExpencesDataReducer);
  const { loading, data, error } = getExpencesDataReducer;
  const getAllData = data?.data;
  useEffect(() => {
    dispatch(getAllExpenceDataAction());
  }, [dispatch]);


  return (
    <div>
      <Toaster />
      <div className="px-2 py-3"
      >
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg md:text-2xl">Expences Statement</span>
          <button
            onClick={() => setOpenModal(true)}
            style={{ padding: '10px', border: '1px solid rgb(152, 0, 76)', color: 'rgb(152, 0, 76)', borderRadius: '12px', width: '8rem' }}
          >
            Add Expences
          </button>
        </div>
        {/* Heading Section */}
        <div className='px-2' style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', marginBottom: '10px' }}>
          <div>
            <label className="block mb-1">Start Date</label>
            <input type="date" name="" id="" onChange={(e) => { return setStartDate(e.target.value) }} value={startDate} />
          </div>
          <div>
            <label className="block mb-1">End Date</label>
            <input type="date" name="" id="" onChange={(e) => { return setEndDate(e.target.value) }} value={endDate} />
          </div>
          <div>
            <label className="block mb-1 text-white">.</label>
            <button
              onClick={() => dispatch(getAllExpenceDataAction(startDate, endDate))} style={{ padding: '10px', border: '1px solid rgb(152, 0, 76)', color: 'rgb(152, 0, 76)', borderRadius: '12px', width: '100%' }}>Search</button>
          </div>
        </div>
        <div id="div1">
          {/* Events  */}
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg" style={{ borderRadius: '1.5rem' }}>
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                    Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                    i    Upload Bill
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {getAllData?.length > 0 ?
                  getAllData?.map((item) => (
                    <tr className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-center font-semibold text-gray-900">
                        {item.description}                        </td>
                      <td className="px-6 py-4 text-center ">
                        {item.time}                        </td>
                      <td className="px-6 py-4 text-center ">
                        {item.date}
                      </td>
                      <td className="px-6 py-4 text-center ">
                        {item.amount}
                      </td>
                      <td className="px-6 py-4 text-center ">
                        {item?.location?.length > 0 ?
                          <Link
                            style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", color: 'rgb(152, 0, 76)', padding: '12px', borderRadius: '8px' }}
                            to={item.location}>View Bill</Link>
                          :
                          <button
                            onClick={() => {
                              setOpenModalUpload(true)
                              setUserId(item?._id)
                            }}
                            style={{ backgroundColor: 'rgb(152, 0, 76)', color: 'white', padding: '10px', borderRadius: '8px' }}>Upload Bill</button>
                        }
                      </td>
                      <td className="px-6 py-4 text-center ">
                        <button
                          onClick={() => {
                            const id = item?._id
                            dispatch(postDeletDataOfExpences(id))
                          }}
                          style={{ backgroundColor: 'rgb(152, 0, 76)', color: 'white', padding: '10px', borderRadius: '8px' }}>Delete</button>
                      </td>
                    </tr>
                  )) :
                  <div
                    style={{ width: '100%', height: '200px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >{error}</div>
                }
                {loading && <div style={{ width: '100%', height: '200px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal show={openModal} onHide={() => setOpenModal(false)} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Expenses</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block mb-1">Enter Amount</label>
              <input
                type="number"
                value={expencesData.amount}
                onChange={(e) => setExpencesData({ ...expencesData, amount: e.target.value })}
                className="block w-full p-3 border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Enter Time</label>
              <input
                type="time"
                value={expencesData.time}
                onChange={(e) => setExpencesData({ ...expencesData, time: e.target.value })}
                className="block w-full p-3 border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Bill</label>
              <select
                value={expencesData.bill}
                onChange={(e) => setExpencesData({ ...expencesData, bill: e.target.value })}
                className="block w-full p-3 border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select bill</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Enter Description</label>
              <textarea
                value={expencesData.description}
                onChange={(e) => setExpencesData({ ...expencesData, description: e.target.value })}
                className="block w-full p-3 border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="flex justify-between py-4">
              <button type="submit" className="text-white rounded-lg w-40 py-2 px-3 bg-black">
                Submit
              </button>
              <button
                type="button"
                onClick={() => setOpenModal(false)}
                className="bg-white text-pink-600 border border-pink-600 rounded-lg w-40 py-2 px-3"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <Modal show={openModalUpload} onHide={() => setOpenModalUpload(false)} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title>Upload Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-4">
            <label className="block mb-1">Upload Bill</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input type="file"
                className="block w-full p-1 border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                onChange={handleImageSelect}
              />
              <button onClick={generateDhrFile} style={{ padding: '8px', borderRadius: '8px', backgroundColor: '#98004c', color: 'white' }}>upload</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ExpencesDetails;
