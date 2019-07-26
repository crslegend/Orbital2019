import React, { Component } from "react";
import {
  Segment,
  Item,
  Icon,
  List,
  Button,
  Label,
  Grid,
  Image
} from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { objectToArray } from "../../../app/common/util/helpers";

class EventListItem extends Component {
  render() {
    const { event } = this.props;
    const attendees =
      event && event.attendees && objectToArray(event.attendees);
    var imageSrc = "/assets/" + event.subject + ".jpg";
    const imageStyle = {
      height: "100px"
    };
    return (
      <Segment.Group>
        <Segment>
          <Grid verticalAlign="middle" stackable columns={2}>
            <Grid.Column width={4}>
              <Image
                rounded
                src={imageSrc}
                size="small"
                style={imageStyle}
                fluid
              />
            </Grid.Column>
            <Grid.Column width={11}>
              <Item>
                <Item.Content>
                  <Item.Header as="h2">{event.className}</Item.Header>
                  <Item.Description>
                    Tutor:{" "}
                    <Link to={`/profile/${event.tutorUid}`}>
                      {event.tutorName}
                    </Link>
                  </Item.Description>
                </Item.Content>
              </Item>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment>
          <span>
            <p>
              <Icon name="calendar alternate" />
              {format(event.date.toDate(), "EEEE do LLL")} at{" "}
              {format(event.date.toDate(), "h:mm a")}{" "}
            </p>
            <p>
              <Icon name="map marker alternate" />
              {event.location}
            </p>
            <p>
              <Icon name="users" /> {event.size}
            </p>
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {event.attendees &&
              objectToArray(event.attendees)
                .filter(attendee => attendee.isTutor === false)
                .map(attendee => (
                  <EventListAttendee key={attendee.id} attendee={attendee} />
                ))}
          </List>
        </Segment>
        <Segment clearing>
          <Grid verticalAlign="middle">
            <Grid.Column width={10}>
              {event.inNus && <Label color="blue" content="NUS" tag />}
              {event.cancelled && <Label color="red" content="Cancelled" tag />}
              {attendees && attendees.length > event.size && (
                <Label color="orange" content="Full" tag />
              )}
            </Grid.Column>
            <Grid.Column width={6}>
              <Button
                as={Link}
                to={`/classes/${event.id}`}
                color="blue"
                floated="right"
                content="Class Details"
              />
            </Grid.Column>
          </Grid>
        </Segment>
      </Segment.Group>
    );
  }
}

export default EventListItem;
