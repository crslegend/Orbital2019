import React, { useState } from "react";
import { Segment, Button } from "semantic-ui-react";
import busStops from "./BusStopData";
import bsMap from "./DirectionsMap";

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

// returns shortest path of bus stops
const getBusPath = (map, start, end) => {
  // compute 4 diff paths of permutations of user, event bus stops
  // and opposite bus stops
  map.bfs(start.name);
  map.backtrack(end.name);
  var path = [...map.path];
  map.bfs(start.name);
  map.backtrack(end.opposite.name);
  if (map.path.length < path.length) {
    path = [...map.path];
  }
  map.bfs(start.opposite.name);
  map.backtrack(end.name);
  if (map.path.length < path.length) {
    path = [...map.path];
  }
  map.bfs(start.opposite.name);
  map.backtrack(end.opposite.name);
  if (map.path.length < path.length) {
    path = [...map.path];
  }
  return path;
};

// get array of bus stop info in path
const getPathInfo = path => {
  var pathInfo = [];
  path.forEach(stop => {
    pathInfo.push(busStops.find(e => e.name === stop));
  });
  return pathInfo;
};

// get array of latlng to render on google maps
const getLatLngArr = pathInfo => {
  var arrLatLng = [];
  pathInfo.forEach(stop => {
    arrLatLng.push([stop.lat, stop.lng]);
  });
  return arrLatLng;
};

const EventDetailDirections = ({ eventLatLng, coords }) => {
  const map = bsMap;

  const userLatLng = {
    lat: coords.latitude,
    lng: coords.longitude
  };

  var eventStop = findNearestBusStop(eventLatLng);
  var userStop = findNearestBusStop(userLatLng);
  var path = getBusPath(map, userStop, eventStop);
  console.log(path);

  var pathInfo = getPathInfo(path);
  console.log(pathInfo);

  var arrLatLng = getLatLngArr(pathInfo);
  console.log(arrLatLng);

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
