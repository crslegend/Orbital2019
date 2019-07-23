import React, { Fragment } from "react";
import { Segment, Icon, Popup, Loader } from "semantic-ui-react";
import GoogleMapReact from "google-map-react";
import { geolocated } from "react-geolocated";
import EventDetailDirections from "./Directions/EventDetailDirections";
import busStops from "./Directions/BusStopData";
import bsMap from "./Directions/DirectionsMap";
import axios from "axios";

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

const getBusInfo = pathInfo => {
  var i = 0;
  var busInfo = [
    {
      stopName: pathInfo[1].caption,
      buses: pathInfo[1].buses
    }
  ];
  for (var j = 1; j < pathInfo.length - 1; j++) {
    var busArr = compareArr(busInfo[i].buses, pathInfo[j].buses);
    if (busArr.length !== 0) {
      busInfo[i].buses = busArr;
    } else {
      busInfo.push({
        stopName: pathInfo[j - 1].caption,
        buses: pathInfo[j - 1].buses
      });
      i++;
    }
  }

  return busInfo;
};

const compareArr = (arr1, arr2) => {
  var finalArr = [];
  arr1.forEach(e1 =>
    arr2.forEach(e2 => {
      if (e1 === e2) {
        finalArr.push(e1);
      }
    })
  );
  return finalArr;
};

// get array of latlng to render on google maps
const getLatLngArr = (maps, pathInfo) => {
  var arrLatLng = [];
  pathInfo.forEach(stop => {
    arrLatLng.push(new maps.LatLng(stop.lat, stop.lng));
  });
  return arrLatLng;
};

const handleApiLoaded = (map, maps, pathInfo) => {
  var pathValues = [];
  var arrLatLng = getLatLngArr(maps, pathInfo);
  arrLatLng.forEach(latlng => {
    pathValues.push(latlng.toUrlValue());
  });
  var path = pathValues.join("|");

  var snappedCoords = [];
  axios
    .get("https://roads.googleapis.com/v1/snapToRoads", {
      params: {
        interpolate: true,
        path: path,
        key: "AIzaSyA8jB-vlpj9lB0wvsFVXGqlQHflAGJGjMM"
      }
    })
    .then(data => {
      data.data.snappedPoints.forEach(snappedPoint => {
        snappedCoords.push({
          lat: snappedPoint.location.latitude,
          lng: snappedPoint.location.longitude
        });
      });
    })
    .catch(error => {
      console.log(error);
    })
    .then(() => {
      var busPath = new maps.Polyline({
        path: snappedCoords,
        geodesic: false,
        strokeColor: "#b21f1f",
        strokeOpacity: 0.8,
        strokeWeight: 3
      });

      busPath.setMap(map);
    });
};

// map components
const Marker = ({ message }) => (
  <Popup
    trigger={<Icon name="map marker alternate" size="big" color="red" />}
    content={message}
    position="top center"
    on="click"
    pinned="true"
  />
);

const CurrentMarker = ({ message }) => (
  <Popup
    trigger={<Icon name="marker" size="big" color="red" />}
    content={message}
    position="top center"
    on="click"
    pinned="true"
  />
);

const BusMarker = ({ message }) => (
  <Popup
    trigger={<Icon name="marker" size="big" color="red" />}
    content={message}
    position="top center"
    on="click"
    pinned="true"
  />
);

const EventDetailedMap = ({
  eventLatLng,
  address,
  inNus,
  coords,
  isGeolocationAvailable,
  isGeolocationEnabled
}) => {
  const map = bsMap;

  if (coords) {
    const userLatLng = {
      lat: coords.latitude,
      lng: coords.longitude
    };

    var eventStop = findNearestBusStop(eventLatLng);
    var userStop = findNearestBusStop(userLatLng);
    var path = getBusPath(map, userStop, eventStop);

    var pathInfo = getPathInfo(path);
    pathInfo.push(eventLatLng);
    pathInfo.unshift(userLatLng);
    console.log(pathInfo);
    eventStop = pathInfo[pathInfo.length - 1];
    userStop = pathInfo[0];

    var busInfo = getBusInfo(pathInfo);
    console.log(busInfo);
  }

  const zoom = 16;

  if (address && pathInfo) {
    return (
      <Fragment>
        <Segment attached style={{ padding: 0 }}>
          <div style={{ height: "300px", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyA8jB-vlpj9lB0wvsFVXGqlQHflAGJGjMM"
              }}
              defaultCenter={{
                lat: eventLatLng.lat,
                lng: eventLatLng.lng
              }}
              defaultZoom={zoom}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) =>
                handleApiLoaded(map, maps, pathInfo)
              }
            >
              <Marker
                lat={eventLatLng.lat}
                lng={eventLatLng.lng}
                message={address}
              />
              <BusMarker
                lat={userStop.lat}
                lng={userStop.lng}
                message="buses"
              />
              {coords && (
                <CurrentMarker
                  lat={coords.latitude}
                  lng={coords.longitude}
                  message="You are here"
                />
              )}
            </GoogleMapReact>
          </div>
        </Segment>
        {coords && inNus && (
          <EventDetailDirections busInfo={busInfo} eventStop={eventStop} />
        )}
      </Fragment>
    );
  } else {
    return (
      <Segment attached="bottom">
        <Loader active />
      </Segment>
    );
  }
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(EventDetailedMap);
