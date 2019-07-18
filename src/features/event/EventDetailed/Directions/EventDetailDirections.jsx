import React, { useState } from "react";
import { Segment, Button } from "semantic-ui-react";
import busStops from "./BusStopData";
import LoadingComponent from "../../../../app/layout/LoadingComponent";

const EventDetailDirections = ({ eventLatLng }) => {

  var distance = Math.sqrt(
    Math.pow(eventLatLng.lat - busStops[0].lat, 2) +
      Math.pow(eventLatLng.lng - busStops[0].lng, 2)
  );
  var name = busStops[0].name;
  for (var i = 1; i < 39; i++) {
    let newDistance = Math.sqrt(
      Math.pow(eventLatLng.lat - busStops[i].lat, 2) +
        Math.pow(eventLatLng.lng - busStops[i].lng, 2)
    );
    if (newDistance < distance) {
      distance = newDistance;
      name = busStops[i].name;
    }
  }

  return (
    <Segment attached="bottom" >
      <span>Nearest bus stop is: </span>
      {name}
    </Segment>
  );
};

export default EventDetailDirections;
