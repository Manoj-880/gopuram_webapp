import React, { useState } from 'react'
import { addUser } from '../../api_calls/webUsersApi'
import { message } from 'antd';

const AddWebUserForm = (props) => {
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        mobileNumber: '',
        firstName: '',
        lastName: ''
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
            var response = await addUser(formData);
        if(response && response.success) {
            message.success(response.message);
            props.setShowModal(false);
            window.location.reload();
        } else{
            message.error(response ? response.message: 'Unknown error');
        }
        } catch (error) {
            console.error(`Error during adding web user: ${error}`);
            message.error('Error during adding web user. Please try again later.');
        }
    };
    
    return (
        <div>
            <div className="modal-content">
                <span className="close" onClick={() => props.setShowModal(false)}>×</span>
                <h2>Add User</h2>
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
                    <button className='submit' type="submit">Add User</button>
                </form>
            </div>
        </div>
    )
}

export default AddWebUserForm