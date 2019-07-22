import React, { useState, Fragment } from "react";
import { format } from "date-fns";
import { Segment, Grid, Icon, Button } from "semantic-ui-react";
import EventDetailedMap from "./EventDetailedMap.jsx";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const EventDetailedInfo = ({ event }) => {
  const [isMapOpen, showMapToggle] = useState(false);
  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" style={{ color: "#b21f1f" }} name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{event.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" size="large" style={{ color: "#b21f1f" }} />
          </Grid.Column>
          <Grid.Column width={15}>
            {event.date && (
              <span>
                {format(event.date.toDate(), "EEEE do LLL")} at{" "}
                {format(event.date.toDate(), "h:mm a")}
              </span>
            )}
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" style={{ color: "#b21f1f" }} name="time" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{event.duration} mins</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" style={{ color: "#b21f1f" }} name="users" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{event.size}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="marker" size="large" style={{ color: "#b21f1f" }} />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{event.location}</span>
            <br />
            <span>{event.venue}</span>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button
              fluid
              onClick={() => showMapToggle(!isMapOpen)}
              color="teal"
              size="tiny"
              content={isMapOpen ? "Close Map" : "Show on Map"}
            />
          </Grid.Column>
        </Grid>
      </Segment>
      {isMapOpen && (
        <EventDetailedMap
          eventLatLng={event.locationLatLng}
          address={event.address}
          inNus={event.inNus}
        />
      )}
    </Segment.Group>
  );
};

export default EventDetailedInfo;
