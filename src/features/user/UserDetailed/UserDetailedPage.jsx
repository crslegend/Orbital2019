import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { firestoreConnect, isEmpty } from "react-redux-firebase";
import UserDetailedEvents from "./UserDetailedEvents";
import UserDetailedSideBar from "./UserDetailedSidebar";
import UserDetailedHeader from "./UserDetailedHeader";
import { userDetailedQuery } from "../userQueries";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { getUserEvents } from "../userActions";

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
    requesting: state.firestore.status.requesting,
    events: state.events,
    eventsLoading: state.async.loading
  };
};

const mapDispatchToProps = {
  getUserEvents
};

class UserDetailedPage extends Component {
  async componentDidMount() {
    let events = await this.props.getUserEvents(this.props.userUid);
    console.log(events);
  }

  changeTab = (e, data) => {
    this.props.getUserEvents(this.props.userUid, data.activeIndex);
  };

  render() {
    const {
      profile,
      auth,
      match,
      requesting,
      events,
      eventsLoading
    } = this.props;
    const isCurrentUser = auth.uid === match.params.id;

    // this below means if any request statuses in firestore when loading this page is
    // true, then loading is set to true
    const loading = Object.values(requesting).some(a => a === true);
    if (loading) return <LoadingComponent />;
    return (
      <Grid>
        <UserDetailedHeader profile={profile} />
        {isCurrentUser && <UserDetailedSideBar />}
        <UserDetailedEvents
          events={events}
          eventsLoading={eventsLoading}
          changeTab={this.changeTab}
        />
      </Grid>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  firestoreConnect((auth, userUid) => userDetailedQuery(auth, userUid))(
    UserDetailedPage
  )
);
