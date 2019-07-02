import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import EventList from "../EventList/EventList";
import { connect } from "react-redux";
import { getEventsforDashbaord } from "../eventActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventActivity from "../EventActivity/EventActivity";
import { firestoreConnect } from "react-redux-firebase";

const mapStateToProps = state => ({
  events: state.events,
  loading: state.async.loading
});

const mapDispatchToProps = {
  getEventsforDashbaord
};

class EventDashBoard extends Component {
  componentDidMount() {
    this.props.getEventsforDashbaord();
  }

  render() {
    const { events, loading } = this.props;
    if (loading) return <LoadingComponent />;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList events={events} />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(firestoreConnect([{ collection: "events" }])(EventDashBoard));
