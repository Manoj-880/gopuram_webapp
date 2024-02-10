import React, { useEffect, useState } from 'react'
import { update } from '../../api_calls/donationApi';

const EditDonationTypeForm = ({donationType, setShowEditModal}) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        amount: '',
    });

useEffect(() => {
    if(donationType) {
        setFormData({
            title: donationType.title || '',
            description: donationType.description || '',
            amount: donationType.amount || '',
        });
    }
}, [donationType]);

const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name] : e.target.value
    });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await update(donationType._id, formData);
        console.log(response);
        setShowEditModal(false);
    } catch (error) {
        console.log('Error updating donation type: ', error);
    }
}

    return (
        <div>
            <div className="modal-content">
                    <span className="close" onClick={() => setShowEditModal(false)}>×</span>
                    <h2>Add Donation Type</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Title:
                            <input type="text" name="title" value={formData.title} onChange={handleChange} />
                        </label>
                        <label>
                            Description:
                            <input type="text" name="description" value={formData.description} onChange={handleChange} />
                        </label>
                        <label>
                            Amount:
                            <input type="text" name="amount" value={formData.amount} onChange={handleChange} />
                        </label>
                        <button className='submit' type="submit">Update Event Type</button>
                    </form>
                </div>
        </div>
    );
}

export default EditDonationTypeForm