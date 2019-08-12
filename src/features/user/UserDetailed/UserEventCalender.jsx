import React, { Component } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import firebase from "firebase";

const localizer = momentLocalizer(moment);

const convert = (date, duration) => {
  let endDate = date.toMillis() + duration * 60000;
  return firebase.firestore.Timestamp.fromMillis(endDate);
};

class MyCalendar extends Component {
  render() {
    const { events } = this.props;
    return (
      <div>
        <Calendar
          className="calendar"
          localizer={localizer}
          events={
            events &&
            events.map(event => ({
              start: event.date.toDate(),
              end: convert(event.date, event.duration).toDate(),
              title: event.className
            }))
          }
          style={{ height: "80vh" }}
          views={["month", "week", "day"]}
          popup
        />
      </div>
    );
  }
}

export default MyCalendar;
