import React, { Fragment } from "react";
import { Segment, Icon, Popup, Loader } from "semantic-ui-react";
import GoogleMapReact from "google-map-react";
import { geolocated } from "react-geolocated";
import EventDetailDirections from "./Directions/EventDetailDirections";
import {
  findNearestBusStop,
  getBusInfo,
  getPathInfo,
  getBusPath
} from "./Directions/DirectionsUtil";
import bsMap from "./Directions/DirectionsMap";
import axios from "axios";

// get array of latlng to render on google maps
const getLatLngArr = (maps, pathInfo) => {
  var arrLatLng = [];
  pathInfo.forEach(stop => {
    arrLatLng.push(new maps.LatLng(stop.lat, stop.lng));
  });
  return arrLatLng;
};

const handleApiLoaded = (map, maps, pathInfo, inNus) => {
  if (inNus) {
    // set bounds of map
    var bounds = new maps.LatLngBounds();
    pathInfo.forEach(stop => {
      bounds.extend(new maps.LatLng(stop.lat, stop.lng));
    });
    map.setCenter(bounds.getCenter());

    // initialize values for snapToRoad function
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
          strokeWeight: 3.5
        });

        busPath.setMap(map);
      });
  }
};

// map components
const Marker = ({ message }) => (
  <Popup
    trigger={
      <Icon
        name="map marker alternate"
        size="big"
        style={{ color: "#b21f1f" }}
      />
    }
    content={message}
    position="top center"
    on="click"
    pinned="true"
  />
);

const CurrentMarker = ({ message }) => (
  <Popup
    trigger={
      <Icon
        name="map marker alternate"
        size="big"
        style={{ color: "#b21f1f" }}
      />
    }
    content={message}
    position="top center"
    on="click"
    pinned="true"
  />
);

const BusMarker = ({ message }) => (
  <Popup
    trigger={<Icon name="bus" size="big" style={{ color: "#1a2a6c" }} />}
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
  var userLatLng = {};

  if (coords && inNus) {
    userLatLng = {
      lat: coords.latitude,
      lng: coords.longitude
    };

    var eventStop = findNearestBusStop(eventLatLng);
    var userStop = findNearestBusStop(userLatLng);
    var path = getBusPath(map, userStop, eventStop);

    var pathInfo = getPathInfo(path);
    eventStop = pathInfo[pathInfo.length - 1];
    userStop = pathInfo[0];
    pathInfo.push(eventLatLng);
    //pathInfo.unshift(userLatLng);
    console.log(pathInfo);

    if (pathInfo) {
      var busInfo = getBusInfo(pathInfo, eventStop);
      console.log(busInfo);
    }
  }

  var zoom = 16;
  if (inNus) {
    zoom = 15;
  }

  if (address) {
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
                handleApiLoaded(map, maps, pathInfo, inNus)
              }
            >
              <Marker
                lat={eventLatLng.lat}
                lng={eventLatLng.lng}
                message={address}
              />
              {busInfo && busInfo.map(stop => (
                <BusMarker
                  key={stop.stopName}
                  lat={stop.lat}
                  lng={stop.lng}
                  message={stop.buses}
                />
              ))}
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
