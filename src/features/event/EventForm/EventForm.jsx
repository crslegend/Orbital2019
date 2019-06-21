import React, { Component } from "react";
import { Segment, Form, Button } from "semantic-ui-react";

class EventForm extends Component {
  state = {
    subject: "",
    date: "",
    venue: "",
    size: "",
    tutor: ""
  };

  componentDidMount() {
    if (this.props.selectedEvent !== null) {
      this.setState({
        ...this.props.selectedEvent
      });
    }
  }

  handleFormSubmit = e => {
    e.preventDefault();
    if (this.state.id) {
      this.props.updateEvent(this.state);
    } else {
      this.props.createEvent(this.state);
    }
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { cancelFormOpen } = this.props;
    const { subject, date, venue, tutor, size } = this.state;
    return (
      <Segment>
        <Form onSubmit={this.handleFormSubmit} autoComplete="off">
          <Form.Field>
            <label>Subject</label>
            <input
              name="subject"
              value={subject}
              onChange={this.handleInputChange}
              placeholder="Enter Subject (eg. Primary 4 Mathematics)"
            />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
            <input
              name="date"
              value={date}
              onChange={this.handleInputChange}
              type="date"
              placeholder="Event Date"
            />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input
              name="venue"
              value={venue}
              onChange={this.handleInputChange}
              placeholder="Enter the Venue of the event"
            />
          </Form.Field>
          <Form.Field>
            <label>Class Size</label>
            <input
              name="size"
              value={size}
              onChange={this.handleInputChange}
              placeholder="Enter the maximum number of tutees that can attend"
            />
          </Form.Field>
          <Form.Field>
            <label>Tutor's Name</label>
            <input
              name="tutor"
              value={tutor}
              onChange={this.handleInputChange}
              placeholder="Enter the tutor's name"
            />
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
          <Button onClick={cancelFormOpen} type="button">
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default EventForm;
