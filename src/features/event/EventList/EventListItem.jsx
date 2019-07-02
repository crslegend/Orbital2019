import React, { Component } from "react";
import { Segment, Item, Icon, List, Button, Label } from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { objectToArray } from "../../../app/common/util/helpers";

class EventListItem extends Component {
  render() {
    const { event } = this.props;
    const attendees =
      event && event.attendees && objectToArray(event.attendees);
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src="/assets/user.png" />
              <Item.Content>
                <Item.Header>{event.subject}</Item.Header>
                <Item.Description>
                  Tutor:{" "}
                  <Link to={`/profile/${event.tutorUid}`}>
                    {event.tutorName}
                  </Link>
                </Item.Description>
                {event.cancelled && (
                  <Label
                    style={{ top: "-40px" }}
                    ribbon="right"
                    color="red"
                    content="This class has been cancelled"
                  />
                )}
                {attendees && attendees.length >= event.size && (
                  <Label
                    style={{ middle: "-40px" }}
                    ribbon="right"
                    color="orange"
                    content="This class is full"
                  />
                )}
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" />
            {format(event.date.toDate(), "EEEE do LLL")} at{" "}
            {format(event.date.toDate(), "h:mm a")} |
            <Icon name="marker" /> {event.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {event.attendees &&
              objectToArray(event.attendees).map(attendee => (
                <EventListAttendee key={attendee.id} attendee={attendee} />
              ))}
          </List>
        </Segment>
        <Segment clearing>
          <span>{event.description}</span>
          {/* <Button
            onClick={() => deleteEvent(event.id)}
            as="a"
            color="red"
            floated="right"
            content="Delete"
          /> */}
          <Button
            as={Link}
            to={`/classes/${event.id}`}
            color="teal"
            floated="right"
            content="View Class Details"
          />
        </Segment>
      </Segment.Group>
    );
  }
}

export default EventListItem;
