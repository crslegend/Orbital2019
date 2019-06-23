import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import UserDetailedEvents from "./UserDetailedEvents";
import UserDetailedSideBar from "./UserDetailedSidebar";
import UserDetailedHeader from "./UserDetailedHeader";

const query = ({ auth }) => {
  return [
    {
      collection: "users",
      doc: auth.uid
    }
  ];
};

const mapStateToProps = state => ({
  profile: state.firebase.profile,
  auth: state.firebase.auth
});

class UserDetailedPage extends Component {
  render() {
    const { profile } = this.props;
    return (
      <Grid>
        <UserDetailedHeader profile={profile} />
        <UserDetailedSideBar />
        <UserDetailedEvents />
      </Grid>
    );
  }
}

export default connect(mapStateToProps)(
  firestoreConnect(auth => query(auth))(UserDetailedPage)
);
