import React, { useEffect, useState } from 'react'
import {getAll} from '../api_calls/eventTypeApi'
import AddEventTypeForm from '../components/eventTypes/addEventTypeForm';
import EditEventType from '../components/eventTypes/editEventTypeForm';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

const EventType = () => {
  const [eventTypes, setEventTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState(null);

  useEffect(() => {
    fetchEventTypes();
  }, []);

  const fetchEventTypes = async () => {
    var response = await getAll();
    setEventTypes(response.data);
  };

  const handleEditEventType = (eventType) => {
    setSelectedEventType(eventType);
    setShowEditModal(true);
  };

  const handleAddEventType = () => {
    setShowModal(true);
  }

  return (
    <div className='eventType'>
      <div>
        <div className='web-header'>
          <h1>Event Types</h1>
          <button onClick={handleAddEventType} className='AddUser'><ControlPointIcon/> <p>Add Type</p></button>
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