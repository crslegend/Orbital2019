import React from "react";
import { connect } from "react-redux";
import { CallbackComponent } from "redux-oidc";
import {withRouter} from "react-router-dom";
import userManager from "./OidcUtil";
import { Segment } from "semantic-ui-react";

class CallbackPage extends React.Component {
  render() {
    // just redirect to '/' in both cases
    return (
      <CallbackComponent
        userManager={userManager}
        successCallback={user => {
          console.log(user);
          this.props.history.push("/classes");
        }}
        errorCallback={error => {
          console.error(error);
          this.props.history.push("/classes");
        }}
      >
        <Segment padded="very">Redirecting...</Segment>
      </CallbackComponent>
    );
  }
}

export default withRouter(CallbackPage);
