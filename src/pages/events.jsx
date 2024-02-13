import React, { useEffect, useState } from 'react'
import { deleteById, getAll } from '../api_calls/eventApi';
import AddEventForm from '../components/events/addEventForm';
import EditEventForm from '../components/events/editEventForm';
import { message } from 'antd';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
  fetchEvents();
}, []);

const fetchEvents = async () => {
  var response = await getAll();
  setEvents(response.data);
};

const handleEditEvent = (event) => {
  setSelectedEvent(event);
  setShowEditModal(true);
}

const handleDeleteEvent = async (id) => {
  var response = await deleteById(id);
  message.success(response.message);
  window.location.reload();
}

const handleAddEvent = () => {
  setShowModal(true);
};

  return (
    <div className='events'>
      <div>
        <div className='header'>
          <h1>Events List</h1>
          <button onClick={handleAddEvent} className='AddUser'>Add Event</button>
        </div>
        <hr />
        <table className='userTable'>
          <thead>
              <tr>
                  <th>User Name</th>
                  <th>Event Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Venue</th>
                  <th>Time</th>
                  <th>Actions</th>
              </tr>
          </thead>
          <tbody>
              {events.map(event => (
                  <tr key={event._id}>
                      <td>{event.userId.userName}</td>
                      <td>{event.eventType.title}</td>
                      <td>{new Date(event.startDate).toLocaleDateString()}</td>
                      <td>{new Date(event.endDate).toLocaleDateString()}</td>
                      <td>{event.venue}</td>
                      <td>{event.time}</td>
                      <td>
                          <button className='actionButton' onClick={() => handleEditEvent(event)}>Edit</button>
                          <button className='actionButton' onClick={() => handleDeleteEvent(event._id)}>Delete</button>
                      </td>
                  </tr>
              ))}
          </tbody>
        </table>
      </div> 
      {showModal && (
        <div className="addEventModal">
          <AddEventForm setShowModal={setShowModal}/>
        </div>
      )}
      {showEditModal && (
        <div className="editEventModel">
          <EditEventForm event={selectedEvent} setShowEditModel={setShowEditModal} />
        </div>
      )}
    </div>
  )
}

export default Events