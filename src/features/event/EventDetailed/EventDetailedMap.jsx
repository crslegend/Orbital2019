import React, { Fragment, useState, useEffect } from "react";
import {
  Segment,
  Icon,
  Popup,
  Loader,
  Container,
  Grid,
  Label
} from "semantic-ui-react";
import GoogleMapReact from "google-map-react";
import { geolocated } from "react-geolocated";
import EventDetailedDirections from "./EventDetailedDirections";
import {
  findNearestBusStop,
  getBusInfo,
  getPathInfo,
  getBusPath,
  handleApiLoaded
} from "./Directions/DirectionsUtil";
import bsMap from "./Directions/DirectionsMap";
import BusMarker from "./BusMarker";

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
    hideOnScroll
  />
);

const CurrentMarker = ({ message }) => (
  <Popup
    trigger={<Icon name="male" size="big" style={{ color: "#b21f1f" }} />}
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
  const [zoom, setZoom] = useState(16);

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

  if (address && coords) {
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
              zoom={zoom}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) =>
                handleApiLoaded(map, maps, pathInfo, inNus, coords, eventLatLng)
              }
            >
              {busInfo &&
                busInfo.map(bus => (
                  <BusMarker
                    key={bus.name}
                    lat={bus.lat}
                    lng={bus.lng}
                    stopName={bus.name}
                  />
                ))}
              {inNus && (
                <Marker
                  lat={eventLatLng.lat}
                  lng={eventLatLng.lng}
                  message={address}
                />
              )}
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
          <EventDetailedDirections
            busInfo={busInfo}
            eventStop={eventStop}
            setZoom={setZoom}
          />
        )}
      </Fragment>
    );
  } else {
    return (
      <Segment attached="bottom" padded="very">
        <Container>
          <Loader active />
        </Container>
      </Segment>
    );
  }
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true
  },
  userDecisionTimeout: 5000
})(EventDetailedMap);
