import React, { Fragment } from "react";
import { Segment, Header, Label, Icon, Container } from "semantic-ui-react";

const BusLabel = ({ buses }) => {
  return (
    <Fragment>
      {buses.map(bus => (
        <Label key={bus} size="small" color="teal">
          {" "}
          {bus}{" "}
        </Label>
      ))}
    </Fragment>
  );
};

const EventDetailedDirections = ({ busInfo, eventStop, setZoom }) => {
  var subsequentBuses = [...busInfo];
  subsequentBuses.shift();
  return (
    <Segment attached="bottom" clearing>
      <Header as="h4">
        <Icon size="large" style={{ color: "#b21f1f" }} name="location arrow" />
        <Header.Content>From {busInfo[0].stopName}:</Header.Content>
      </Header>
      <Container text>
        <span>
          (Click on the <Icon name="bus" style={{ color: "#b21f1f" }} /> icon to
          view bus timings)
          <br />
        </span>
      </Container>

      <Container text>
        <span>
          Take bus <BusLabel buses={busInfo[0].buses} /> and alight at{" "}
          {busInfo[0].endName}
          <br />
        </span>
        {subsequentBuses.map(stop => (
          <span key={stop}>
            Then change to bus <BusLabel buses={stop.buses} /> and alight at{" "}
            {stop.endName}
            <br />
          </span>
        ))}
      </Container>
    </Segment>
  );
};

export default EventDetailedDirections;
