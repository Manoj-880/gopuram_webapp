import React, { useState } from 'react';
import {  editUser } from '../../api_calls/webUsersApi';
import { message } from 'antd';

const EditWebUser = ({ user, setShowEditModal }) => {
    const [formData, setFormData] = useState({
        userName: user.userName,
        password: user.password,
        mobileNumber: user.mobileNumber,
        firstName: user.firstName,
        lastName: user.lastName
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await editUser(user._id, formData);
            if(response.success){
                message.success(response.message);
                setShowEditModal(false); 
                window.location.reload();
            } else {
                message.error(response.message);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };
    
    return (
        <div>
            <div className="modal-content">
                <span className="close" onClick={() => setShowEditModal(false)}>×</span>
                <h2>Edit User</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        User Name:
                        <input type="text" name="userName" value={formData.userName} onChange={handleChange} />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" value={formData.password} onChange={handleChange} />
                    </label>
                    <label>
                        Mobile Number:
                        <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} />
                    </label>
                    <label>
                        First Name:
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                    </label>
                    <label>
                        Last Name:
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                    </label>
                    <button className='submit' type="submit">Update User</button>
                </form>
            </div>
        </div>
    );
}

export default EditWebUser;
