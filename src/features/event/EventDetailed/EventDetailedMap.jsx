import React, { Fragment } from "react";
import { Segment, Icon, Popup } from "semantic-ui-react";
import GoogleMapReact from "google-map-react";
import { geolocated } from "react-geolocated";
import EventDetailDirections from "./Directions/EventDetailDirections";


const Marker = ({ address }) => (
  <Popup
    trigger={<Icon name="map marker alternate" size="big" color="red" />}
    content={address}
    position="top center"
    on="click"
    pinned="true"
  />
);

const CurrentMarker = ({ address }) => (
  <Popup
    trigger={<Icon name="male" size="big" color="red" />}
    content={address}
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
  const zoom = 16;

  if (isGeolocationEnabled && isGeolocationAvailable) {
    if (coords) {
      console.log(coords);
    }
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
            >
              <Marker
                lat={eventLatLng.lat}
                lng={eventLatLng.lng}
                address={address}
              />
              {coords && (
                <CurrentMarker
                  lat={coords.latitude}
                  lng={coords.longitude}
                  address="You are here"
                />
              )}
            </GoogleMapReact>
          </div>
        </Segment>
        {coords && inNus && (
          <EventDetailDirections eventLatLng={eventLatLng} coords={coords} />
        )}
      </Fragment>
    );
  } else {
    return (
      <Segment attached="bottom">
        <Icon name="warning circle" size="large" color="red" />{" "}
        <span>Invalid Address</span>
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
