import React, { Fragment } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { Segment, Icon, Popup } from "semantic-ui-react";
import { geolocated } from "react-geolocated";
import EventDetailDirections from "./Directions/EventDetailDirections";
import { compose } from "redux";

const NewEventDetailedMap = ({
  google,
  showInfoWindow,
  eventLatLng,
  address,
  inNus,
  coords,
  isGeolocationAvailable,
  isGeolocationEnabled
}) => {

  const zoom = 16;

  const style = {
    width: "100%",
    height: "300px",
  };
  if (isGeolocationEnabled && isGeolocationAvailable) {
    if (coords) {
      console.log(coords);
    }
  }
  if (address) {
    return (
      <Fragment>
        <Segment attached style={{ padding: 0 }}>
          <div style={style}>
            <Map google={google} zoom={zoom} initialCenter={{
              lat: eventLatLng.lat,
              lng: eventLatLng.lng
            }}>
              <Marker
                title={"Location"}
                name={'SOMA'}
                position={eventLatLng}
              >
                <InfoWindow visible={showInfoWindow} >
                  <div>
                    <p>
                      Click on the map or drag the marker to select location
                      where the incident occurred
                    </p>
                  </div>
                </InfoWindow>
              </Marker>
            </Map>
          </div>
        </Segment>
        {coords && inNus && (
          <EventDetailDirections eventLatLng={eventLatLng} coords={coords} />
        )}
      </Fragment>
    );
  }
};

export default compose(
  GoogleApiWrapper({
    apiKey: "AIzaSyA8jB-vlpj9lB0wvsFVXGqlQHflAGJGjMM"
  }),
  geolocated({
    positionOptions: {
      enableHighAccuracy: false
    },
    userDecisionTimeout: 5000
  })
)(NewEventDetailedMap);
