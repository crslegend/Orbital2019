/*global google*/
import React, { Component, Fragment } from "react";
import {
  Segment,
  Form,
  Button,
  Grid,
  Header,
  Checkbox,
  Divider
} from "semantic-ui-react";
import { connect } from "react-redux";
import { updateEvent, createEvent, cancelToggle } from "../eventActions";
import { reduxForm, Field } from "redux-form";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";
import PlaceInput from "../../../app/common/form/PlaceInput";
import {
  combineValidators,
  composeValidators,
  isRequired,
  hasLengthGreaterThan
} from "revalidate";
import { withFirestore } from "react-redux-firebase";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import Geocode from "react-geocode";

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
    initialValues: event,
    event,
    loading: state.async.loading
  };
};

const mapDispatchToProps = {
  createEvent,
  updateEvent,
  cancelToggle
};

const validate = combineValidators({
  subject: isRequired({ message: "The subject is required" }),
  size: isRequired({ message: "Please choose the maximum number of students" }),
  description: composeValidators(
    isRequired({ message: "Please enter a description" }),
    hasLengthGreaterThan(4)({
      message: "Description needs to be at least 5 characters"
    })
  )(),
  location: isRequired({ message: "Please select a location" }),
  venue: isRequired({ message: "Please enter a venue" }),
  date: isRequired({ message: " Please select a date and time" }),
  area: isRequired({ message: "Please indicate your area" }),
  duration: isRequired({ message: "Please indicate a duration" }),
  className: isRequired({ message: "Please enter a class name" })
});

const size = [
  { key: "1", text: "1", value: "1" },
  { key: "2", text: "2", value: "2" },
  { key: "3", text: "3", value: "3" },
  { key: "4", text: "4", value: "4" },
  { key: "5", text: "5", value: "5" },
  { key: "6", text: "6", value: "6" }
];

const subject = [
  { key: "english", text: "English", value: "English" },
  { key: "mathematics", text: "Mathematics", value: "Mathematics" },
  { key: "science", text: "Science", value: "Science" },
  { key: "chinese", text: "Chinese", value: "Chinese" },
  { key: "malay", text: "Bahasa Melayu", value: "Bahasa Melayu" },
  { key: "tamil", text: "Tamil", value: "Tamil" }
];

const durations = [
  { key: "30", text: "30mins", value: "30" },
  { key: "60", text: "60mins", value: "60" },
  { key: "90", text: "90mins", value: "90" },
  { key: "120", text: "120mins", value: "120" }
];

const nusLatLng = {
  lat: 1.294732,
  lng: 103.776565
};

const defaultLatLng = {
  lat: 1.363825,
  lng: 103.80923
};

class EventForm extends Component {
  state = {
    area: "",
    areaLatLng: {},
    locationLatLng: {},
    address: "",
    inNus: null
  };

  async componentDidMount() {
    const { firestore, match, event } = this.props;
    await firestore.setListener(`events/${match.params.id}`);
    this.setState({
      inNus: event.inNus
    });
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  onFormSubmit = async values => {
    try {
      values.locationLatLng = this.state.locationLatLng;
      values.address = this.state.address;
      values.area = this.state.area;
      values.inNus = this.state.inNus;
      if (this.props.initialValues.id) {
        if (Object.keys(values.locationLatLng).length === 0) {
          values.locationLatLng = this.props.event.locationLatLng;
        }
        if (Object.keys(values.address).length === 0) {
          values.address = this.props.event.address;
        }
        if (Object.keys(values.area).length === 0) {
          values.area = this.props.event.area;
        }
        if (Object.keys(values.inNus).length === 0) {
          values.inNus = this.props.event.inNus;
        }
        await this.props.updateEvent(values);
        this.props.history.push(`/classes/${this.props.initialValues.id}`);
      } else {
        let createdEvent = await this.props.createEvent(values);
        this.props.history.push(`/classes/${createdEvent.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleToggle = (e, { inNus }) => {
    this.setState({
      inNus: inNus
    });
  };

  handleAreaSelect = selectedArea => {
    geocodeByAddress(selectedArea)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          areaLatLng: latlng,
          area: selectedArea
        });
      })
      .then(() => {
        this.props.change("area", selectedArea);
      });
  };

  handleLocationSelect = selectedLocation => {
    Geocode.setApiKey("AIzaSyA8jB-vlpj9lB0wvsFVXGqlQHflAGJGjMM");
    Geocode.enableDebug();

    geocodeByAddress(selectedLocation)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          locationLatLng: latlng
        });
      })
      .then(() => {
        this.props.change("location", selectedLocation);
      })
      .then(() => {
        Geocode.fromLatLng(
          this.state.locationLatLng.lat,
          this.state.locationLatLng.lng
        ).then(
          response => {
            this.setState({
              address: response.results[0].formatted_address
            });
            console.log(this.state.address);
          },
          error => {
            console.error(error);
          }
        );
      });
  };

  render() {
    const {
      history,
      initialValues,
      invalid,
      submitting,
      pristine,
      event,
      cancelToggle,
      loading
    } = this.props;
    const { inNus } = this.state;
    return (
      <Grid>
        <Grid.Column mobile={16} computer={10}>
          <Segment>
            <Header sub color="teal" content="Class Details" />
            <Form
              onSubmit={this.props.handleSubmit(this.onFormSubmit)}
              autoComplete="off"
            >
              <Field
                name="className"
                component={TextInput}
                placeholder="Enter a class name (eg. A-Math Chapter 12)"
              />
              <Field
                name="subject"
                component={SelectInput}
                options={subject}
                placeholder="Select the subject to tutor"
              />
              <Field
                name="description"
                component={TextArea}
                rows={3}
                placeholder="Enter a description of the class OR the topic of the subject"
              />
              <Field
                name="size"
                component={SelectInput}
                options={size}
                placeholder="Select maximum number of students"
              />
              <Field
                name="date"
                component={DateInput}
                dateFormat="dd LLL yyyy h:mm a"
                placeholder="Date"
                showTimeSelect
                timeFormat="HH:mm"
              />
              <Field
                name="duration"
                component={SelectInput}
                options={durations}
                placeholder="Select duration of class"
              />
              <Form.Group inline>
                <label>Is your venue in NUS? </label>
                <Form.Radio
                  label="Yes"
                  inNus={true}
                  checked={inNus === true}
                  onChange={this.handleToggle}
                />
                <Form.Radio
                  label="No"
                  inNus={false}
                  checked={inNus === false}
                  onChange={this.handleToggle}
                />
              </Form.Group>
              <Header sub color="teal" content="Class Location Details" />
              {!inNus ? (
                <Fragment>
                  <Field
                    name="area"
                    component={PlaceInput}
                    options={{
                      location: new google.maps.LatLng(defaultLatLng),
                      radius: 15000,
                      types: ["geocode"]
                    }}
                    onSelect={this.handleAreaSelect}
                    placeholder="Select Area (eg. Clementi, Bukit Batok)"
                  />
                  <Field
                    name="location"
                    component={PlaceInput}
                    options={{
                      location: new google.maps.LatLng(this.state.areaLatLng),
                      radius: 800,
                      types: ["establishment", "geocode"]
                    }}
                    onSelect={this.handleLocationSelect}
                    placeholder="Select Location"
                  />
                  <Field
                    name="venue"
                    component={TextInput}
                    placeholder="Enter Venue Details (eg. classroom no.)"
                  />
                </Fragment>
              ) : (
                <Fragment>
                  <Field
                    name="location"
                    component={PlaceInput}
                    options={{
                      location: new google.maps.LatLng(nusLatLng),
                      radius: 500,
                      types: ["establishment", "geocode"]
                    }}
                    onSelect={this.handleLocationSelect}
                    placeholder="Select Location in NUS (eg. YIH)"
                  />
                  <Field
                    name="venue"
                    component={TextInput}
                    placeholder="Enter Venue Details (eg. classroom no.)"
                  />
                </Fragment>
              )}

              <Button
                disabled={invalid || submitting || pristine}
                loading={loading}
                positive
                type="submit"
              >
                Submit
              </Button>
              <Button
                onClick={
                  initialValues.id
                    ? () => history.push(`/classes/${initialValues.id}`)
                    : () => history.push("/classes")
                }
                type="button"
                disabled={loading}
              >
                Cancel
              </Button>
              {initialValues.id && (
                <Button
                  type="button"
                  color={event.cancelled ? "green" : "red"}
                  floated="right"
                  content={
                    event.cancelled ? "Reactivate Class" : "Cancel Class"
                  }
                  onClick={() => cancelToggle(!event.cancelled, event.id)}
                />
              )}
            </Form>
          </Segment>
          <Divider />
        </Grid.Column>
      </Grid>
    );
  }
}

export default withFirestore(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    reduxForm({ form: "eventForm", validate, enableReinitialize: true })(
      EventForm
    )
  )
);
