import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { Icon } from "semantic-ui-react";

const AnyReactComponent = ({ text }) => (
  <Icon name="marker" size="big" color="red" />
);

class SimpleMap extends Component {
  static defaultProps = {
    zoom: 11
  };

  render() {
    const { latlng } = this.props;
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "300px", width: "50%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyA8jB-vlpj9lB0wvsFVXGqlQHflAGJGjMM" }}
          defaultCenter={latlng}
          defaultZoom={this.props.zoom}
        >
          {latlng && <AnyReactComponent lat={latlng.lat} lng={latlng.lng} />}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
