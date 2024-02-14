import React, { useEffect, useState } from 'react'
import { getAll } from '../../api_calls/eventTypeApi';
import { DatePicker, TimePicker, message } from 'antd';
import { add } from '../../api_calls/eventApi';

const AddEventForm = (props) => {
    const [formData, setFormData] = useState({
        eventType: '',
        startDate: new Date().setHours(0, 0, 0, 0),
    endDate: new Date().setHours(0, 0, 0, 0), 
        time: '',
        venue: '',
        userId: ''
    });

    const [eventTypes, setEventTypes] = useState([]);

    useEffect(() => {
        fetchEventTypes();
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData && userData._id) {
            setFormData(prevState => ({
                ...prevState,
                userId: userData._id
            }));
        };
    }, []);

    const fetchEventTypes = async () => {
        var response = await getAll();
        setEventTypes(response.data);
    }

const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
};

const handleStartDateChange = (date) => {
    setFormData({
        ...formData,
        startDate: date
    });
};

const handleEndDateChange = (date) => {
    setFormData({
        ...formData,
        endDate: date
    });
};

const handleTimeChange = (time) => {
    setFormData({
    ...formData,
    time: time
    });
};


const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        var response = await add(formData);
        message.success(response.message);
        props.setShowModal(false);
        window.location.reload();
    } catch (error) {
        console.error(`Error during adding Event: ${error}`);
        message.error('Error during adding Event. Please try again later.');
    }
};

    return (
        <div>
            <div className="modal-content">
                <span className="close" onClick={() => props.setShowModal(false)}>×</span>
                <h2>Add Event</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Event Type:
                        <select name="eventType" value={formData.eventType} onChange={handleChange}>
                            <option value="">Select Event Type</option>
                            {eventTypes.map(eventType => (
                                <option key={eventType._id.toString()} value={eventType._id.toString()}>{eventType.title}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Start Date:
                        <DatePicker
                            selected={formData.startDate}
                            onChange={handleStartDateChange}
                            dateFormat="yyyy-MM-dd"
                        />
                    </label>
                    <label>
                        End Date:
                        <DatePicker
                            selected={formData.endDate}
                            onChange={handleEndDateChange}
                            dateFormat="yyyy-MM-dd"
                        />
                    </label>
                    <label>
                        Time:
                        <TimePicker
                            value={formData.time}
                            onChange={handleTimeChange}
                        />
                    </label>
                    <label>
                        Venue:
                        <input type="text" name="venue" value={formData.venue} onChange={handleChange} />
                    </label>
                    <button className='submit' type="submit">Add Event</button>
                </form>
            </div>
        </div>
    )
}

export default AddEventForm