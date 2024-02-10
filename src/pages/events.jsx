import React, { useEffect, useState } from 'react'
import { deleteById, getAll } from '../api_calls/eventApi';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
  fetchEvents();
}, [events]);

const fetchEvents = async () => {
  var response = await getAll();
  setEvents(response.data);
}

const handleDeleteEvent = async (id) => {
  var response = await deleteById(id);
  console.log(response);
}

  return (
    <div className='events'>
      <div>
                <div className='header'>
                    <h1>Events List</h1>
                </div>
                <hr />
                <table className='userTable'>
    <thead>
        <tr>
            <th>User ID</th>
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
                <td>{event.userId}</td>
                <td>{event.userName}</td>
                <td>{event.eventType}</td>
                <td>{event.startDate}</td>
                <td>{event.endDate}</td>
                <td>{event.venue}</td>
                <td>{event.time}</td>
                <td>
                    <button className='actionButton' onClick={() => handleDeleteEvent(event._id)}>Delete</button>
                </td>
            </tr>
        ))}
    </tbody>
</table>
            </div> 
    </div>
  )
}

export default Events