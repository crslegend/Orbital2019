import React from "react";
import { Dimmer, Loader, Segment } from "semantic-ui-react";

const LoadingComponent = ({ inverted = true }) => {
  return (
    <Segment padded="very">
      <Dimmer inverted={inverted} active={true}>
        <Loader content="Loading..." />
      </Dimmer>
    </Segment>
  );
};

export default LoadingComponent;
