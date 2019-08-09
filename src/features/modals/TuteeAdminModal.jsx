import React, { Component } from "react";
import { Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import { closeModal } from "./modalActions";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import EventAdminForm from "../tuteeadmin/EventAdminForm";

const query = ({ auth }) => {
  return [
    {
      collection: "users",
      doc: auth.uid,
      subcollections: [{ collection: "tutees" }],
      storeAs: "tutees"
    }
  ];
};

const mapDispatchToProps = { closeModal };

const mapStateToProps = state => ({
  user: state.firebase.profile,
  auth: state.firebase.auth,
  tutees: state.firestore.ordered.tutees
});

class TuteeAdminModal extends Component {
  render() {
    const { tutees } = this.props;
    return (
      <Modal size="mini" open={true} onClose={this.props.closeModal}>
        <Modal.Header>Add/Remove Tutees</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            Select tutees:
            <EventAdminForm tutees={tutees} />
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
