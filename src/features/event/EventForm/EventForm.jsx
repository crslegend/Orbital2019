import React, { Component } from "react";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import { updateEvent, createEvent, cancelToggle } from "../eventActions";
import { reduxForm, Field } from "redux-form";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";
import {
  combineValidators,
  composeValidators,
  isRequired,
  hasLengthGreaterThan
} from "revalidate";
import { withFirestore } from "react-redux-firebase";

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
    event
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
  venue: isRequired("venue"),
  date: isRequired("date")
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

class EventForm extends Component {
  // state = {
  //   venueLatLng: {}
  // };

  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`events/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  onFormSubmit = async values => {
    // values.venueLatLng = this.state.venueLatLng
    try {
      if (this.props.initialValues.id) {
        // if (Object.keys(values.venueLatLng).length === 0) {
        //   values.venueLatLng = this.props.event.venueLatLng;
        // }
        this.props.updateEvent(values);
        this.props.history.push(`/events/${this.props.initialValues.id}`);
      } else {
        let createdEvent = await this.props.createEvent(values);
        this.props.history.push(`/events/${createdEvent.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {
      history,
      initialValues,
      invalid,
      submitting,
      pristine,
      event,
      cancelToggle
    } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Class Details" />
            <Form
              onSubmit={this.props.handleSubmit(this.onFormSubmit)}
              autoComplete="off"
            >
              <Field
                name="subject"
                component={SelectInput}
                options={subject}
                placeholder="Choose the subject to tutor"
              />
              <Field
                name="description"
                component={TextArea}
                rows={3}
                placeholder="Description of the class OR the topic of the subject"
              />
              <Field
                name="size"
                component={SelectInput}
                options={size}
                placeholder="Maximum number of students"
              />
              <Header sub color="teal" content="Class Location Details" />
              <Field
                name="venue"
                component={TextInput}
                placeholder="Enter Venue"
              />
              <Field
                name="date"
                component={DateInput}
                dateFormat="dd LLL yyyy h:mm a"
                placeholder="Date"
                showTimeSelect
                timeFormat="HH:mm"
              />
              <Button
                disabled={invalid || submitting || pristine}
                positive
                type="submit"
              >
                Submit
              </Button>
              <Button
                onClick={
                  initialValues.id
                    ? () => history.push(`/events/${initialValues.id}`)
                    : () => history.push("/events")
                }
                type="button"
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
