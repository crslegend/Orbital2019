import React, { Fragment } from "react";
import { Segment, Header, Label, Icon } from "semantic-ui-react";

const BusLabel = ({ buses }) => {
  return (
    <Fragment>
      {buses.map(bus => (
        <Label key={bus} size="small" color="teal">
          {" "}{bus}{" "}
        </Label>
      ))}
    </Fragment>
  );
};

const EventDetailDirections = ({ busInfo, eventStop }) => {
  var subsequentBuses = [...busInfo];
  subsequentBuses.shift();
  console.log(subsequentBuses);
  return (
    <Segment attached="bottom" clearing>
      <Header as="h4">
        <Icon size="large" style={{ color: "#b21f1f" }} name="location arrow" />
        <Header.Content>From {busInfo[0].stopName}:</Header.Content>
      </Header>
      <span>
        Take bus <BusLabel buses={busInfo[0].buses} /> to {busInfo[0].endName}
        <br />
      </span>
      {subsequentBuses.map(stop => (
        <span key={stop}>
          Then take bus <BusLabel buses={stop.buses} /> to {stop.endName}
          <br />
        </span>
      ))}
    </Segment>
  );
};

export default EventDetailDirections;
