import React, { useEffect, useState } from 'react'
import {getAll, deleteUser} from '../api_calls/webUsersApi'
import AddWebUserForm from '../components/webUsers/addWebUserForm'
import EditWebUser from '../components/webUsers/editWebUsersForm'

const WebUsers = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
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

    const handleAddUser = () => {
        setShowModal(true);
    };

    return (
        <div className='webUsers'>
            <div>
                <div className='header'>
                    <h1>Users List</h1>
                    <button onClick={handleAddUser} className='AddUser'>Add User</button>
                </div>
                <hr />
                <table className='userTable'>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Mobile Number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.mobileNumber}</td>
                                <td>
                                    <button className='actionButton' onClick={() => handleEditUser(user)}>Edit</button>
                                    <button className='actionButton' onClick={() => handleDeleteUser(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> 
            {showModal && (
                <div className="addUserModal">
                    <AddWebUserForm setShowModal= {setShowModal}/>
                </div>
            )}
            {showEditModal && (
                <div className="editUserModal">
                    <EditWebUser user={selectedUser} setShowEditModal={setShowEditModal} />
                </div>
            )} 
        </div>
    )
}

export default WebUsers