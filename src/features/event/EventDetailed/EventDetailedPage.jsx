import React, { Component, Fragment, createRef } from "react";
import { Grid, List, Segment, Divider } from "semantic-ui-react";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import { connect } from "react-redux";
import { withFirestore } from "react-redux-firebase";
import { objectToArray } from "../../../app/common/util/helpers";
import { goingToEvent, cancelGoingToEvent } from "../../user/userActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventListAttendee from "../EventList/EventListAttendee";
import NotFound from "../../../app/layout/NotFound";
import EventDetailedSidebar from "./EventDetailedSidebar";
import { openModal } from "../../modals/modalActions";

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
    profile: state.firebase.profile,
    loading: state.async.loading,
    requesting: state.firestore.status.requesting
  };
};

const mapDispatchToProps = {
  goingToEvent,
  cancelGoingToEvent,
  openModal
};

class EventDetailedPage extends Component {
  contextRef = createRef();

  state = {
    loadingEvent: true
  };

  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`events/${match.params.id}`);
    if (firestore && match) {
      this.setState({
        loadingEvent: false
      });
    }
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  handleManageUsers = () => {
    this.props.openModal("TuteeAdminModal", this.props.event);
  };

  render() {
    const {
      event,
      auth,
      profile,
      loading,
      goingToEvent,
      cancelGoingToEvent,
      requesting,
      match
    } = this.props;
    const attendees =
      event && event.attendees && objectToArray(event.attendees);
    // .sort((a, b) => {
    //   return a.joinDate.toDate() - b.joinDate.toDate();
    // }); // to make sure tutor is always at the top of the going list
    const isHost = event.tutorUid === auth.uid;
    const isGoing = attendees && attendees.some(a => a.id === auth.uid);
    const loadingEvent = requesting[`events/${match.params.id}`];

    if (loadingEvent) {
      return <LoadingComponent />;
    } else {
      if (Object.keys(event).length === 0) {
        return <NotFound />;
      }
      return (
        <Grid>
          <Fragment>
            <Grid.Column width={16} only="mobile">
              <EventDetailedHeader
                loading={loading}
                event={event}
                isGoing={isGoing}
                isHost={isHost}
                profile={profile}
                goingToEvent={goingToEvent}
                cancelGoingToEvent={cancelGoingToEvent}
                attendees={attendees}
                manage={this.handleManageUsers}
              />
              {/* <EventDetailedSidebar attendees={attendees} /> */}
              <Segment
                textAlign="center"
                style={{ border: "none" }}
                attached="top"
                secondary
                inverted
                color="blue"
              >
                {attendees && attendees.length - 1}{" "}
                {attendees && attendees.length - 1 === 1 ? "Person" : "People"}{" "}
                Going
              </Segment>
              <Segment attached>
                <List horizontal>
                  {event.attendees &&
                    objectToArray(event.attendees)
                      .filter(attendee => attendee.isTutor === false)
                      .map(attendee => (
                        <EventListAttendee
                          key={attendee.id}
                          attendee={attendee}
                        />
                      ))}
                </List>
              </Segment>
              <EventDetailedInfo event={event} />
              <Divider />
            </Grid.Column>

            <Grid.Column width={10} only="computer">
              <EventDetailedHeader
                loading={loading}
                event={event}
                isGoing={isGoing}
                isHost={isHost}
                profile={profile}
                goingToEvent={goingToEvent}
                cancelGoingToEvent={cancelGoingToEvent}
                attendees={attendees}
                manage={this.handleManageUsers}
              />
            </Grid.Column>

            <Grid.Column width={6} only="computer">
              <EventDetailedSidebar attendees={attendees} />
            </Grid.Column>
            <Grid.Column width={10} only="computer">
              <EventDetailedInfo event={event} />
              <Divider />
            </Grid.Column>

            <Grid.Column width={10} only="tablet">
              <EventDetailedHeader
                loading={loading}
                event={event}
                isGoing={isGoing}
                isHost={isHost}
                profile={profile}
                goingToEvent={goingToEvent}
                cancelGoingToEvent={cancelGoingToEvent}
                attendees={attendees}
                manage={this.handleManageUsers}
              />
            </Grid.Column>

            <Grid.Column width={6} only="tablet">
              <EventDetailedSidebar attendees={attendees} />
            </Grid.Column>
            <Grid.Column width={10} only="tablet">
              <EventDetailedInfo event={event} />
              <Divider />
            </Grid.Column>
          </Fragment>
        </Grid>
      );
    }
  }
}

export default withFirestore(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EventDetailedPage)
);
