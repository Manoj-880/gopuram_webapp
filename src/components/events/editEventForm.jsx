import React, { useEffect, useState } from 'react'
import { update } from '../../api_calls/eventApi';
import { DatePicker, TimePicker, message } from 'antd';
import { getAll } from '../../api_calls/eventTypeApi';

const EditEventForm = ({event, setShowEditModel}) => {
    const [formData, setFormData] = useState({
        eventType: event.eventType.title,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate),
        venue: event.venue,
        userId: event.userId
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
        var response = await update(formData);
        message.success(response.message);
        setShowEditModel(false);
        window.location.reload();
    } catch (error) {
        console.error(`Error during updating Event: ${error}`);
        message.error('Error during updating Event. Please try again later.');
    }
};

    return (
        <div>
            <div className="modal-content">
                <span className="close" onClick={() => setShowEditModel(false)}>×</span>
                <h2>Update Event</h2>
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
                    <button className='submit' type="submit">Update Event</button>
                </form>
            </div>
        </div>
    )
}

export default EditEventForm