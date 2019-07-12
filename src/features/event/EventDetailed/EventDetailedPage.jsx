import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedSidebar from "./EventDetailedSidebar";
import { connect } from "react-redux";
import { withFirestore } from "react-redux-firebase";
import { objectToArray } from "../../../app/common/util/helpers";
import { goingToEvent, cancelGoingToEvent } from "../../user/userActions";

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {};

  if (
    state.firestore.ordered.events &&
    state.firestore.ordered.events.length > 0
  ) {
    event =
      state.firestore.ordered.events.filter(event => event.id === eventId)[0] ||
      {};
  }

  return {
    event,
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = {
  goingToEvent,
  cancelGoingToEvent
};

class EventDetailedPage extends Component {
  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`events/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  render() {
    const {
      event,
      auth,
      profile,
      goingToEvent,
      cancelGoingToEvent
    } = this.props;
    const attendees =
      event && event.attendees && objectToArray(event.attendees);
    // .sort((a, b) => {
    //   return a.joinDate.toDate() - b.joinDate.toDate();
    // }); // to make sure tutor is always at the top of the going list
    const isHost = event.tutorUid === auth.uid;
    const isGoing = attendees && attendees.some(a => a.id === auth.uid);
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailedHeader
            event={event}
            isGoing={isGoing}
            isHost={isHost}
            profile={profile}
            goingToEvent={goingToEvent}
            cancelGoingToEvent={cancelGoingToEvent}
            attendees={attendees}
          />
          <EventDetailedInfo event={event} />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailedSidebar attendees={attendees} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default withFirestore(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EventDetailedPage)
);
