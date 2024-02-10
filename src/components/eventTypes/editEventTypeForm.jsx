import React, { useState, useEffect } from 'react';
import { update } from '../../api_calls/eventTypeApi';

const EditEventType = ({ eventType, setShowEditModal }) => {
    const [formData, setFormData] = useState({
        title: '',
        duration: '',
        description: '',
    });

    useEffect(() => {
        if (eventType) {
            setFormData({
                title: eventType.title || '',
                duration: eventType.duration || '',
                description: eventType.description || '',
            });
        }
    }, [eventType]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await update(eventType._id, formData);
            console.log(response);
            setShowEditModal(false); 
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
                        Title:
                        <input type="text" name="title" value={formData.title} onChange={handleChange} />
                    </label>
                    <label>
                        Duration:
                        <input type="text" name="duration" value={formData.duration} onChange={handleChange} />
                    </label>
                    <label>
                        Description:
                        <textarea type="text" name="description" value={formData.description} onChange={handleChange} />
                    </label>
                    <button className='submit' type="submit">Update Event type</button>
                </form>
            </div>
        </div>
    );
}

export default EditEventType;
