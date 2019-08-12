import React, { Component } from "react";
import { Modal, Button, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { closeModal } from "./modalActions";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import EventAdminForm from "../tuteeadmin/EventAdminForm";
import { objectToArray } from "../../app/common/util/helpers.js";
import {
  goingToEventAdmin,
  cancelGoingToEventAdmin
} from "../tuteeadmin/TuteeAdminActions";

const query = ({ auth }) => {
  return [
    {
      collection: "users",
      doc: auth.uid,
      subcollections: [{ collection: "tutees" }],
      storeAs: "tutees"
    },
    {
      collection: "users",
      doc: auth.uid,
      subcollections: [{ collection: "events" }],
      storeAs: "registeredEvents"
    }
  ];
};

const mapDispatchToProps = {
  closeModal,
  goingToEventAdmin,
  cancelGoingToEventAdmin
};

const mapStateToProps = state => ({
  user: state.firebase.profile,
  auth: state.firebase.auth,
  tutees: state.firestore.ordered.tutees,
  registeredEvents: state.firestore.ordered.registeredEvents,
  loading: state.async.loading
});

class TuteeAdminModal extends Component {
  state = {
    initialArr: [],
    tuteeArr: [],
    error: false,
    loading: false
  };

  async componentDidMount() {
    const { registeredEvents, id } = this.props;

    if (registeredEvents) {
      let getAttendees = await registeredEvents.find(event => {
        return event.id === id;
      });

      const currentTutees = [];
      await objectToArray(getAttendees.attendees).forEach(attendee => {
        currentTutees.push(attendee.tuteeUid);
      });
      await this.setState({
        initialArr: currentTutees,
        tuteeArr: currentTutees
      });
    }
    console.log(this.state.initialArr);
  }

  handleChange = (e, { value }) => {
    this.setState({
      tuteeArr: value
    });

    if (
      this.state.tuteeArr.length + objectToArray(this.props.attendees).length-1 >
        this.props.size &&
      this.state.tuteeArr.length !== 0
    ) {
      this.setState({
        error: true
      });
    } else {
      this.setState({
        error: false
      });
    }
  };

  handleSubmit = async () => {
    this.setState({
      loading: true
    });
    const addedTutees = [];

    this.state.tuteeArr.forEach(id => {
      this.props.tutees.find(tutee => {
        if (tutee.tuteeUid === id) {
          addedTutees.push(tutee);
        }
        return tutee.tuteeUid === id;
      });
    });

    //console.log(addedTutees);
    await this.props.cancelGoingToEventAdmin(this.props, this.state.initialArr);
    await this.props.goingToEventAdmin(this.props, addedTutees);
    this.setState({
      loading: false
    });
  };

  render() {
    const { tutees } = this.props;
    const { error, loading } = this.state;
    return (
      <Modal size="mini" open={true} onClose={this.props.closeModal}>
        <Modal.Header>Add/Remove Tutees</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            Select tutees:
            <Segment>
              {tutees && (
                <EventAdminForm
                  tutees={tutees}
                  value={this.state.tuteeArr}
                  handleChange={this.handleChange}
                  error={error}
                />
              )}
            </Segment>
            <Button
              disabled={error}
              fluid
              size="large"
              color="teal"
              onClick={this.handleSubmit}
              loading={loading}
            >
              Submit
            </Button>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(auth => query(auth))
)(TuteeAdminModal);
