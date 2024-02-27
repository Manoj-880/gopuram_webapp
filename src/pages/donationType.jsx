import React, { useEffect, useState } from 'react'
import { getAll } from '../api_calls/donationApi';
import AddDonationTypeForm from '../components/donationTypes/addDonationTypeForm';
import EditDonationTypeForm from '../components/donationTypes/editDonationTypeForm';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

const DonationType = () => {
  const [donationTypes, setDonationTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDonationType, setSelectedDonationType] = useState(null);

  useEffect(() => {
    fetchDonationTypes();
  }, []);

  const fetchDonationTypes = async () => {
    var response = await getAll();
    setDonationTypes(response.data);
  };

  const handleAddDonationType = () => {
    setShowModal(true);
  };

  const handleEditDonationType = async (donationType) => {
    setSelectedDonationType(donationType);
    setShowEditModal(true);
  }

  return (
    <div className='donationTypes'>
      <div>
        <div className='web-header'>
          <h1>Donation Types</h1>
          <button onClick={handleAddDonationType} className='AddUser'><ControlPointIcon/> <p>Add Type</p></button>
        </div>
        <hr />
        <table className='userTable'>
          <thead>
              <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Actions</th>
              </tr>
          </thead>
          <tbody>
              {donationTypes.map(donationType => (
                  <tr key={donationType._id}>
                      <td>{donationType.title}</td>
                      <td>{donationType.description}</td>
                      <td>{donationType.amount}</td>
                      <td>
                          <button className='actionButton' onClick={() => handleEditDonationType(donationType)}>Edit</button>
                      </td>
                  </tr>
              ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className='addUserModal'>
          <AddDonationTypeForm setShowModal={setShowModal}/>
        </div>
      )}
      {showEditModal && (
        <div className="editUserModal">
          <EditDonationTypeForm donationType={selectedDonationType} setShowEditModal={setShowEditModal} />
        </div>
      )}
    </div>
  )
}

export default DonationType