import React, { Fragment } from "react";
import { Segment, Item, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";

const EventDetailedSidebar = ({ attendees }) => {
  return (
    <Fragment>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="blue"
      >
        {attendees && attendees.length - 1}{" "}
        {attendees && attendees.length - 1 === 1 ? "Person" : "People"} Going
      </Segment>
      <Segment attached>
        <Item.Group divided>
          {attendees &&
            attendees
              .filter(attendee => attendee.isTutor === false)
              .map(attendee => (
                <Item key={attendee.id} style={{ position: "relative" }}>
                  {attendee.isTutor && (
                    <Label
                      style={{ position: "absolute" }}
                      color="red"
                      ribbon="right"
                      size="large"
                    >
                      Tutor
                    </Label>
                  )}
                  <Item.Image
                    avatar
                    size="tiny"
                    src={attendee.photoURL || "assets/user.png"}
                  />
                  <Item.Content verticalAlign="middle">
                    <Item.Header as="h3">
                      <Link to={`/profile/${attendee.id}`}>
                        {attendee.displayName}
                      </Link>
                    </Item.Header>
                  </Item.Content>
                </Item>
              ))}
        </Item.Group>
      </Segment>
    </Fragment>
  );
};

export default EventDetailedSidebar;
