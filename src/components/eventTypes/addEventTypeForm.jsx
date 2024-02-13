import React, { useState } from 'react'
import {add} from '../../api_calls/eventTypeApi'

const AddEventTypeForm = (props) => {
    const [formData, setFormData] = useState({
        title: '',
        duration: '',
        description: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        var response = await add(formData);
        console.log(response);
        props.setShowModal(false);
        window.location.reload();
    };
    
    return (
        <div>
            <div className="modal-content">
                <span className="close" onClick={() => props.setShowModal(false)}>×</span>
                <h2>Add User</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Title:
                        <input type="text" name="title" value={formData.userName} onChange={handleChange} />
                    </label>
                    <label>
                        Duration:
                        <input type="text" name="duration" value={formData.password} onChange={handleChange} />
                    </label>
                    <label>
                        Description:
                        <input type="text" name="description" value={formData.mobileNumber} onChange={handleChange} />
                    </label>
                    <button className='submit' type="submit">Add Event type</button>
                </form>
            </div>
        </div>
    )
}

export default AddEventTypeForm