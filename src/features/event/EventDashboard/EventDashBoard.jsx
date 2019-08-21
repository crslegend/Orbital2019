import React, { Component, createRef } from "react";
import {
  Grid,
  Loader,
  Container,
  Dropdown,
  Input,
  Label
} from "semantic-ui-react";
import EventList from "../EventList/EventList";
import { connect } from "react-redux";
import { getEventsforDashboard, getSearchEvents } from "../eventActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventActivity from "../EventActivity/EventActivity";
import { firestoreConnect } from "react-redux-firebase";
import SocialLoginModal from "../../modals/SocialLoginModal";

const options = [
  { key: "all", text: "All Subjects", value: "" },
  { key: "english", text: "English", value: "English" },
  { key: "mathematics", text: "Mathematics", value: "Mathematics" },
  { key: "science", text: "Science", value: "Science" },
  { key: "chinese", text: "Chinese", value: "Chinese" },
  { key: "malay", text: "Bahasa Melayu", value: "Bahasa Melayu" },
  { key: "tamil", text: "Tamil", value: "Tamil" }
];

const query = [
  {
    collection: "activity",
    orderBy: ["timestamp", "desc"],
    limit: 5
  }
];

const mapStateToProps = state => ({
  events: state.events.events,
  loading: state.async.loading,
  activities: state.firestore.ordered.activity,
  profile: state.firebase.profile,
  auth: state.firebase.auth,
  providerData: state.firebase.auth.providerData
});

const mapDispatchToProps = {
  getEventsforDashboard,
  getSearchEvents
};

class EventDashBoard extends Component {
  contextRef = createRef();

  state = {
    moreEvents: false,
    loadingInitial: true,
    loadedEvents: [],
    subject: "",
    searchIsLoading: false,
    searchValue: "",
    searchResults: true
  };

  async componentDidMount() {
    let next = await this.props.getEventsforDashboard();

    if (next && next.docs && next.docs.length >= 0) {
      this.setState({
        moreEvents: true,
        loadingInitial: false
      });
    }
  }

  componentDidUpdate = async prevProps => {
    if (this.props.events !== prevProps.events) {
      this.setState({
        loadedEvents: [...this.state.loadedEvents, ...this.props.events]
      });
    }
  };

  getNextEvents = async () => {
    const { events } = this.props;
    let lastEvent = events && events[events.length - 1]; // last doc received
    let next = await this.props.getEventsforDashboard(
      lastEvent,
      this.state.subject
    );

    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreEvents: false
      });
    }
  };

  handleFilterSubject = async (e, { value }) => {
    await this.setState({
      subject: value,
      loadedEvents: [],
      moreEvents: true
    });
    this.getFilteredEvents();
  };

  getFilteredEvents = async () => {
    let next = await this.props.getEventsforDashboard(null, this.state.subject);
    console.log(next);
    if (next && next.docs && next.docs.length >= 0) {
      this.setState({
        moreEvents: true,
        loadingInitial: false
      });
    }
  };

  handleSearchChange = async (e, { value }) => {
    const prevEvents = this.state.loadedEvents;
    this.setState({
      searchIsLoading: true,
      loadedEvents: []
    });
    if (value.length < 1) {
      this.setState({
        searchIsLoading: false,
        searchResults: false
      });
    }

    let result = await this.props.getSearchEvents(value);

    if (result && result.docs && result.docs.length < 1) {
      this.setState({
        searchResults: false
      });
      let next = await this.props.getEventsforDashboard();

      if (next && next.docs && next.docs.length >= 0) {
        this.setState({
          moreEvents: true,
          loadingInitial: false
        });
      }
    } else {
      this.setState({
        searchResults: true
      });
    }

    this.setState({
      searchIsLoading: false
    });
  };

  render() {
    const { loading, activities, profile, auth, providerData } = this.props;
    const {
      moreEvents,
      loadedEvents,
      searchIsLoading,
      searchResults
    } = this.state;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    const providerId = providerData && providerData[0].providerId;

    if (
      authenticated &&
      providerData &&
      providerId !== "password" &&
      profile.userType !== "tutor" &&
      profile.userType !== "tutee"
    ) {
      return <SocialLoginModal />;
    } else {
      if (this.state.loadingInitial) {
        return (
          <Container className="main">
            <LoadingComponent />
          </Container>
        );
      }
      return (
        <Grid>
          <Grid.Column width={10} only="computer">
            <div ref={this.contextRef}>
              <Container className="filter">
                <Grid>
                  <Grid.Column floated="left" width={10}>
                    <Input
                      icon="search"
                      loading={searchIsLoading}
                      onChange={this.handleSearchChange}
                    />
                    {!searchResults && (
                      <Label basic color="red" pointing="left">
                        Oops! Class not found!
                      </Label>
                    )}
                  </Grid.Column>
                  <Grid.Column textAlign="right" floated="right" width={4}>
                    <Dropdown
                      text="Filter by:"
                      icon="filter"
                      floating
                      labeled
                      button
                      className="icon"
                    >
                      <Dropdown.Menu>
                        <Dropdown.Menu scrolling>
                          {options.map(option => (
                            <Dropdown.Item
                              key={option.value}
                              {...option}
                              onClick={this.handleFilterSubject}
                            />
                          ))}
                        </Dropdown.Menu>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Grid.Column>
                </Grid>
              </Container>
              <EventList
                loading={loading}
                events={loadedEvents}
                moreEvents={moreEvents}
                getNextEvents={this.getNextEvents}
              />
            </div>
          </Grid.Column>
          <Grid.Column width={16} only="mobile">
            <Container className="filter">
              <Grid>
                <Grid.Column floated="left" width={8}>
                  <Input
                    icon="search"
                    loading={searchIsLoading}
                    onChange={this.handleSearchChange}
                  />
                  {!searchResults && (
                    <Label basic color="red" pointing>
                      Oops! Class not found!
                    </Label>
                  )}
                </Grid.Column>
                <Grid.Column textAlign="right" width={5}>
                  <Dropdown
                    text="Filter by:"
                    icon="filter"
                    floating
                    labeled
                    button
                    className="icon"
                  >
                    <Dropdown.Menu>
                      <Dropdown.Menu scrolling>
                        {options.map(option => (
                          <Dropdown.Item
                            key={option.value}
                            {...option}
                            onClick={this.handleFilterSubject}
                          />
                        ))}
                      </Dropdown.Menu>
                    </Dropdown.Menu>
                  </Dropdown>
                </Grid.Column>
              </Grid>
            </Container>
            <EventList
              loading={loading}
              events={loadedEvents}
              moreEvents={moreEvents}
              getNextEvents={this.getNextEvents}
            />
          </Grid.Column>
          <Grid.Column width={16} only="tablet">
            <Container className="filter">
              <Grid>
                <Grid.Column verticalAlign="middle" floated="left" width={10}>
                  <Input
                    icon="search"
                    loading={searchIsLoading}
                    onChange={this.handleSearchChange}
                  />
                  {!searchResults && (
                    <Label basic color="red" pointing>
                      Oops! Class not found!
                    </Label>
                  )}
                </Grid.Column>
                <Grid.Column textAlign="right" floated="right" width={4}>
                  <Dropdown
                    text="Filter by:"
                    icon="filter"
                    floating
                    labeled
                    button
                    className="icon"
                  >
                    <Dropdown.Menu>
                      <Dropdown.Menu scrolling>
                        {options.map(option => (
                          <Dropdown.Item
                            key={option.value}
                            {...option}
                            onClick={this.handleFilterSubject}
                          />
                        ))}
                      </Dropdown.Menu>
                    </Dropdown.Menu>
                  </Dropdown>
                </Grid.Column>
              </Grid>
            </Container>
            <EventList
              loading={loading}
              events={loadedEvents}
              moreEvents={moreEvents}
              getNextEvents={this.getNextEvents}
            />
          </Grid.Column>
          <Grid.Column width={6} only="computer">
            <EventActivity
              activities={activities}
              contextRef={this.contextRef}
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Loader active={loading} />
          </Grid.Column>
        </Grid>
      );
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(firestoreConnect(query)(EventDashBoard));
