import React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { Icon } from "semantic-ui-react";

// ...

const MapContainer = ({ google, latLng, onInfoWindowClose }) => {
  const style = {
    width: "50%",
    height: "300px"
  };
  return (
    <Map google={google} zoom={14} style={style} center={latLng}>
      <Marker position={latLng} icon={<Icon name="marker" size="big" color="red" />} />

      <InfoWindow onClose={onInfoWindowClose}>
        <div>
          <h1>Huh??</h1>
        </div>
      </InfoWindow>
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyA8jB-vlpj9lB0wvsFVXGqlQHflAGJGjMM"
})(MapContainer);
