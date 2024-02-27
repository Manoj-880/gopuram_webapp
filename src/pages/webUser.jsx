import React, { useEffect, useState } from 'react'
import {getAll, deleteUser} from '../api_calls/webUsersApi'
import AddWebUserForm from '../components/webUsers/addWebUserForm'
import EditWebUser from '../components/webUsers/editWebUsersForm'
import { message } from 'antd'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteIcon from '@mui/icons-material/Delete';

const WebUsers = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    
    useEffect(() => {
        fetchUsers();
    }, []);

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
        message.success(response.message);
        window.location.reload();
    };

    const handleAddUser = () => {
        setShowModal(true);
    };

    return (
        <div className='webUsers'>
            <div>
                <div className='web-header'>
                    <h1>Web users List</h1>
                    <button onClick={handleAddUser} className='AddUser'><ControlPointIcon/> <p>Add User</p></button>
                </div>
                <hr />
                <table className='webUser-table'>
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Mobile Number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.userName}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.mobileNumber}</td>
                                <td className='actionBtnColumn'>
                                    <button className='web-actionButton' onClick={() => handleEditUser(user)}><DriveFileRenameOutlineIcon/></button>
                                    <button className='web-actionButton' onClick={() => handleDeleteUser(user._id)}><DeleteIcon/></button>
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