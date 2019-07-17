import React from "react";
import { Segment, Icon, Popup } from "semantic-ui-react";
import GoogleMapReact from "google-map-react";
import { geolocated } from 'react-geolocated';

const Marker = ({address}) => (
  <Popup
    trigger={<Icon name="map marker alternate" size="big" color="red" />}
    content={address}
    position="top center"
    on="click"
    pinned='true'
  />
);

const CurrentMarker = ({address}) => (
  <Popup
    trigger={<Icon name="male" size="big" color="red" />}
    content={address}
    position="top center"
    on="click"
    pinned='true'
  />
);

const EventDetailedMap = ({ lat, lng, address, coords, isGeolocationAvailable, isGeolocationEnabled }) => {
  const zoom = 16;

  if (isGeolocationEnabled && isGeolocationAvailable) {
    if (coords) {
      console.log(coords);
    }
  };

  return (
    <Segment attached="bottom" style={{ padding: 0 }}>
      <div style={{ height: "300px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyA8jB-vlpj9lB0wvsFVXGqlQHflAGJGjMM" }}
          defaultCenter={{ lat: lat, lng: lng }}
          defaultZoom={zoom}
        >
          <Marker lat={lat} lng={lng} address={address} />
          {coords && <CurrentMarker lat={coords.latitude} lng={coords.longitude} address='you are here' />}
        </GoogleMapReact>
      </div>
    </Segment>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(EventDetailedMap);
