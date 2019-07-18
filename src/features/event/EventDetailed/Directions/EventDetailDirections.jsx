import React, { useState } from "react";
import { Segment, Button } from "semantic-ui-react";
import busStops from "./BusStopData";

const findNearestBusStop = latLng => {
  var distance = Math.sqrt(
    Math.pow(latLng.lat - busStops[0].lat, 2) +
      Math.pow(latLng.lng - busStops[0].lng, 2)
  );
  var busStop = busStops[0];
  for (var i = 1; i < busStops.length; i++) {
    let newDistance = Math.sqrt(
      Math.pow(latLng.lat - busStops[i].lat, 2) +
        Math.pow(latLng.lng - busStops[i].lng, 2)
    );
    if (newDistance < distance) {
      distance = newDistance;
      busStop = busStops[i];
    }
  }
  return busStop;
};

const EventDetailDirections = ({ eventLatLng, coords }) => {
  
  const userLatLng = {
    lat: coords.latitude,
    lng: coords.longitude
  }

  var eventStop = findNearestBusStop(eventLatLng);
  var userStop = findNearestBusStop(userLatLng);

  return (
    <Segment attached="bottom">
      <span>Nearest bus stop to venue is: </span>
      {eventStop.name}
      <br />
      <span>Nearest bus stop to you is : </span>
      {userStop.name}
    </Segment>
  );
};

export default EventDetailDirections;
