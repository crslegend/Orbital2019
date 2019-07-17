import React from "react";
import { Segment, Icon, Popup } from "semantic-ui-react";
import GoogleMapReact from "google-map-react";

const Marker = ({location}) => (
  <Popup
    trigger={<Icon name="marker" size="big" color="red" />}
    content={location}
    position="top center"
    on="click"
    pinned
  />
);

const EventDetailedMap = ({ lat, lng, location }) => {
  const zoom = 16;
  return (
    <Segment attached="bottom" style={{ padding: 0 }}>
      <div style={{ height: "300px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyA8jB-vlpj9lB0wvsFVXGqlQHflAGJGjMM" }}
          defaultCenter={{ lat: lat, lng: lng }}
          defaultZoom={zoom}
        >
          <Marker lat={lat} lng={lng} location={location} />
        </GoogleMapReact>
      </div>
    </Segment>
  );
};

export default EventDetailedMap;
