import React, { useEffect, useState } from 'react';
import { update } from '../../api_calls/eventApi';
import { DatePicker, TimePicker, message } from 'antd';
import { getAll } from '../../api_calls/eventTypeApi';
import moment from 'moment';

const EditEventForm = ({ event, setShowEditModel }) => {
    const [formData, setFormData] = useState({
        eventType: '',
        startDate: moment(),
        endDate: moment(),
        time: moment(),
        venue: '',
        userId: ''
    });

    const [eventTypes, setEventTypes] = useState([]);

    useEffect(() => {
        if (event) {
        setFormData({
            eventType: event.eventType._id,
            startDate: moment(event.startDate),
            endDate: moment(event.endDate),
            time: moment(event.time),
            venue: event.venue,
            userId: event.userId
        });
        }
        fetchEventTypes();
    }, [event]);

    const fetchEventTypes = async () => {
        try {
        const response = await getAll();
        setEventTypes(response.data);
        } catch (error) {
        console.error('Error fetching event types:', error);
        }
    };

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
        const response = await update(event._id, formData);
        message.success(response.message);
        setShowEditModel(false);
        window.location.reload();
        } catch (error) {
        console.error('Error during updating Event:', error);
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
                value={formData.startDate}
                onChange={handleStartDateChange}
                format="YYYY-MM-DD"
                />
            </label>
            <label>
                End Date:
                <DatePicker
                value={formData.endDate}
                onChange={handleEndDateChange}
                format="YYYY-MM-DD"
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
    );
};

export default EditEventForm;
