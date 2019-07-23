import React from "react";
import { Segment, Header } from "semantic-ui-react";

const EventDetailDirections = ({ busInfo, eventStop }) => {
  return (
    <Segment attached="bottom" clearing>
    <Header>Directions</Header>
      <span>Take bus {busInfo[0].buses} from {busInfo[0].stopName} to {eventStop.caption}</span>
    </Segment>
  );
};

export default EventDetailDirections;
