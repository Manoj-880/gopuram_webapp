import React, { useEffect, useState } from 'react'
import {getAll, detele} from '../api_calls/eventTypeApi'
import AddEventTypeForm from '../components/eventTypes/addEventTypeForm';
import EditEventType from '../components/eventTypes/editEventTypeForm';

const EventType = () => {
  const [eventTypes, setEventTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState(null);

  useEffect(() => {
    fetchEventTypes();
  }, [eventTypes]);

  const fetchEventTypes = async () => {
    var response = await getAll();
    setEventTypes(response.data);
  };

  const handleEditEventType = (eventType) => {
    setSelectedEventType(eventType);
    setShowEditModal(true);
  };

  const handleDeleteEventType = async (id) => {
    var response = await detele(id);
    console.log(response);
  };

  const handleAddEventType = () => {
    setShowModal(true);
  }

  return (
    <div className='eventType'>
      <div>
        <div className='header'>
          <h1>Event Types</h1>
          <button onClick={handleAddEventType} className='AddUser'>Add Event type</button>
        </div>
        <hr />
        <table className='userTable'>
          <thead>
              <tr>
                  <th>Title</th>
                  <th>Duration</th>
                  <th>Desciption</th>
                  <th>Actions</th>
              </tr>
          </thead>
          <tbody>
              {eventTypes.map(eventTypes => (
                  <tr key={eventTypes._id}>
                      <td>{eventTypes.title}</td>
                      <td>{eventTypes.duration}</td>
                      <td>{eventTypes.description}</td>
                      <td>
                          <button className='actionButton' onClick={() => handleEditEventType(eventTypes)}>Edit</button>
                          <button className='actionButton' onClick={() => handleDeleteEventType(eventTypes._id)}>Delete</button>
                      </td>
                  </tr>
              ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="addUserModal">
            <AddEventTypeForm setShowModal= {setShowModal}/>
        </div>
      )}
      {showEditModal && (
                <div className="editUserModal">
                    <EditEventType eventType={selectedEventType} setShowEditModal={setShowEditModal} />
                </div>
            )}
    </div>
  )
}

export default EventType