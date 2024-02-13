import React, { useState } from 'react'
import { add } from '../../api_calls/donationApi';

const AddDonationTypeForm = (props) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        amount: '',
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
}

  return (
        <div>
            <div className="modal-content">
                <span className="close" onClick={() => props.setShowModal(false)}>×</span>
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
                    <button className='submit' type="submit">Add Event Type</button>
                </form>
            </div>
        </div>
    )
}

export default AddDonationTypeForm