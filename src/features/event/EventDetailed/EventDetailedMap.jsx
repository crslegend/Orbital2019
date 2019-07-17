import React from "react";
import { Segment, Icon, Popup } from "semantic-ui-react";
import GoogleMapReact from "google-map-react";

const Marker = ({address}) => (
  <Popup
    trigger={<Icon name="map marker alternate" size="big" color="red" />}
    content={address}
    position="top center"
    on="click"
    pinned='true'
  />
);

const EventDetailedMap = ({ lat, lng, address }) => {
  const zoom = 16;

  return (
    <Segment attached="bottom" style={{ padding: 0 }}>
      <div style={{ height: "300px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyA8jB-vlpj9lB0wvsFVXGqlQHflAGJGjMM" }}
          defaultCenter={{ lat: lat, lng: lng }}
          defaultZoom={zoom}
        >
          <Marker lat={lat} lng={lng} address={address} />
        </GoogleMapReact>
      </div>
    </Segment>
  );
};

export default EventDetailedMap;
