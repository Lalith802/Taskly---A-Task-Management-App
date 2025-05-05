import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "../styles/Calendar.css";
import logo from "../assets/taskly-logo.png";
import menuIcon from "../assets/menu-icon.png";
import calendarIcon from "../assets/calendar.png";
import axios from "axios";
import { Calendar as ReactCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: "", description: "", start: "", end: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCalendarEvents();
  }, []);

  const fetchCalendarEvents = async () => {
    try {
      // Replace this with your API endpoint to fetch events
      const res = await axios.get("http://localhost:5001/api/calendar-events");
      setEvents(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load calendar events.");
    }
  };

  const handleAddEvent = async () => {
    if (!newEvent.title.trim()) return;
    try {
      // Send the new event to the server
      const res = await axios.post("http://localhost:5001/api/calendar-events", newEvent);
      setEvents([...events, res.data]);
      setNewEvent({ title: "", description: "", start: "", end: "" });
    } catch (err) {
      setError("Failed to add event.");
      console.error(err);
    }
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm("Delete this event?")) {
      try {
        await axios.delete(`http://localhost:5001/api/calendar-events/${id}`);
        setEvents(events.filter((event) => event._id !== id));
      } catch (err) {
        setError("Failed to delete event.");
        console.error(err);
      }
    }
  };

  return (
    <div className="dashboard-container">
      <div className="topbar">
        <img src={logo} alt="Taskly Logo" className="taskly-logo" />
      </div>

      <div className="content">
        <Sidebar />
        <div className="calendar-container">
          <div className="calendar-section">
            <div className="calendar-header">
              <div className="header-left">
                <img src={calendarIcon} alt="Calendar Icon" className="calendar-icon" />
                <h1>Calendar</h1>
              </div>
              <button className="add-event" onClick={handleAddEvent}>+ Add Event</button>
            </div>

            {/* Event Inputs */}
            <div className="event-inputs">
              <input
                type="text"
                placeholder="Event Title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
              <textarea
                placeholder="Description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              />
              <input
                type="datetime-local"
                value={newEvent.start}
                onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
              />
              <input
                type="datetime-local"
                value={newEvent.end}
                onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            {/* Calendar Display */}
            <ReactCalendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              onSelectEvent={(event) => handleDeleteEvent(event._id)} // Delete event on click
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
