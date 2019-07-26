import React, { Component } from "react";
import { Modal, Header, Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { closeModal } from "./modalActions";
import { withRouter } from "react-router-dom";

const actions = { closeModal };

class SocialLoginModal extends Component {
  state = { modalOpen: true };

  handleClose = () => {
    this.setState({ modalOpen: false });
    this.props.history.push("/settings/about");
  };
  render() {
    return (
      <Modal
        size="small"
        basic
        open={this.state.modalOpen}
        //onClose={this.handleClose}
      >
        <Header icon="child" content="Hey there!" />
        <Modal.Content>
          <h3>
            Please go to profile settings to set your user type (Tutor OR Tutee)
            to make full use of HelpDen!
          </h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={this.handleClose} inverted>
            <Icon name="angle double right" fitted /> Bring me there
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default withRouter(
  connect(
    null,
    actions
  )(SocialLoginModal)
);
//withRouter provides access to props.history
