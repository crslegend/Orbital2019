import React, { Component, createRef } from "react";
import { Grid, Button, Loader } from "semantic-ui-react";
import EventList from "../EventList/EventList";
import { connect } from "react-redux";
import { getEventsforDashboard } from "../eventActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventActivity from "../EventActivity/EventActivity";
import { firestoreConnect } from "react-redux-firebase";
import SocialLoginModal from "../../modals/SocialLoginModal";

const query = [
  {
    collection: "activity",
    orderBy: ["timestamp", "desc"],
    limit: 5
  }
];

const mapStateToProps = state => ({
  events: state.events,
  loading: state.async.loading,
  activities: state.firestore.ordered.activity,
  profile: state.firebase.profile,
  auth: state.firebase.auth
});

const mapDispatchToProps = {
  getEventsforDashboard
};

class EventDashBoard extends Component {
  contextRef = createRef();

  state = {
    moreEvents: false,
    loadingInitial: true,
    loadedEvents: []
  };

  async componentDidMount() {
    let next = await this.props.getEventsforDashboard();

    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreEvents: true,
        loadingInitial: false
      });
    }
  }

  componentDidUpdate = prevProps => {
    if (this.props.events !== prevProps.events) {
      this.setState({
        loadedEvents: [...this.state.loadedEvents, ...this.props.events]
      });
    }
  };

  getNextEvents = async () => {
    const { events } = this.props;
    let lastEvent = events && events[events.length - 1]; // last doc received
    let next = await this.props.getEventsforDashboard(lastEvent);

    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreEvents: false
      });
    }
  };

  render() {
    const { loading, activities, profile, auth } = this.props;
    const { moreEvents, loadedEvents } = this.state;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    if (this.state.loadingInitial) return <LoadingComponent />;
    if (
      authenticated &&
      profile.userType !== "tutor" &&
      profile.userType !== "tutee"
    ) {
      return <SocialLoginModal />;
    }
    return (
      <Grid>
        <Grid.Column width={10} only="computer">
          <div ref={this.contextRef}>
            <EventList
              loading={loading}
              events={loadedEvents}
              moreEvents={moreEvents}
              getNextEvents={this.getNextEvents}
            />
          </div>
        </Grid.Column>
        <Grid.Column width={16} only="mobile">
          <EventList
            loading={loading}
            events={loadedEvents}
            moreEvents={moreEvents}
            getNextEvents={this.getNextEvents}
          />
        </Grid.Column>
        <Grid.Column width={16} only="tablet">
          <EventList
            loading={loading}
            events={loadedEvents}
            moreEvents={moreEvents}
            getNextEvents={this.getNextEvents}
          />
        </Grid.Column>
        <Grid.Column width={6} only="computer">
          <EventActivity activities={activities} contextRef={this.contextRef} />
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={loading} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(firestoreConnect(query)(EventDashBoard));
