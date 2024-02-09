import React, { useEffect, useState } from 'react'
import {getAll, deleteUser} from '../api_calls/mobileUsersApi'
import EditMobileUser from '../components/mobileUsers/editMobileUserForm';

const MobileUsers = () => {
  const [users, setUsers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [users]);

  const fetchUsers = async () => {
    var response = await getAll();
    setUsers(response.data);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
};

const handleDeleteUser = async (userId) => {
    var response = await deleteUser(userId);
    console.log(response);
};

  return (
    <div className='mobileUsers'>
      <div>
        <div className='header'>
          <h1>Mobile users list</h1>
        </div>
        <hr />
        <table className='userTable'>
        < thead>
              <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Mobile Number</th>
                  <th>Gothram</th>
                  <th>Address</th>
                  <th>Actions</th>
              </tr>
          </thead>
          <tbody>
              {users.map(user => (
                  <tr key={user._id}>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.mobileNumber}</td>
                      <td>{user.gothram}</td>
                      <td>{user.address}</td>
                      <td>
                          <button className='actionButton' onClick={() => handleEditUser(user)}>Edit</button>
                          <button className='actionButton' onClick={() => handleDeleteUser(user._id)}>Delete</button>
                      </td>
                  </tr>
              ))}
          </tbody>
        </table>
      </div>
      {showEditModal && (
        <div className="editUserModal">
          <EditMobileUser user={selectedUser} setShowEditModal={setShowEditModal}/>
        </div>
      )}
    </div>
  )
}

export default MobileUsers