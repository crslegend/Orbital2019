import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { firestoreConnect, isEmpty } from "react-redux-firebase";
import UserDetailedEvents from "./UserDetailedEvents";
import UserDetailedSideBar from "./UserDetailedSidebar";
import UserDetailedHeader from "./UserDetailedHeader";
import { userDetailedQuery } from "../userQueries";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const mapStateToProps = (state, ownProps) => {
  let userUid = null;
  let profile = {};

  if (ownProps.match.params.id === state.auth.uid) {
    profile = state.firebase.profile;
  } else {
    profile =
      !isEmpty(state.firestore.ordered.profile) &&
      state.firestore.ordered.profile[0];
    userUid = ownProps.match.params.id;
  }

  return {
    profile,
    userUid,
    auth: state.firebase.auth,
    requesting: state.firestore.status.requesting
  };
};

class UserDetailedPage extends Component {
  render() {
    const { profile, auth, match, requesting } = this.props;
    const isCurrentUser = auth.uid === match.params.id;

    // this below means if any request statuses in firestore when loading this page is
    // true, then loading is set to true
    const loading = Object.values(requesting).some(a => a === true);
    if (loading) return <LoadingComponent />;
    return (
      <Grid>
        <UserDetailedHeader profile={profile} />
        {isCurrentUser && <UserDetailedSideBar />}
        <UserDetailedEvents />
      </Grid>
    );
  }
}

export default connect(mapStateToProps)(
  firestoreConnect((auth, userUid) => userDetailedQuery(auth, userUid))(
    UserDetailedPage
  )
);
