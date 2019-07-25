import React, { Component, Fragment, createRef } from "react";
import {
  Menu,
  Container,
  Sidebar,
  Button,
  Sticky
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import SignedOutMenu from "../Menus/SignedOutMenu";
import SignedInMenu from "../Menus/SignedInMenu";
import { connect } from "react-redux";
import { openModal } from "../../modals/modalActions";
import { withFirebase } from "react-redux-firebase";

const mapDispatchToProps = { openModal };

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

class NavBar extends Component {
  handleSignIn = () => {
    this.props.openModal("LoginModal");
  };

  handleRegister = () => {
    this.props.openModal("RegisterModal");
  };

  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push("/classes");
  };

  contextRef = createRef();

  render() {
    const {
      auth,
      profile,
      handleShowClick,
      handleSidebarHide,
      visible
    } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    return (
      <Fragment>
        <Menu inverted fixed="top" borderless>
          <Container>
            <Menu.Item as={Link} to="/classes" header>
              <img src="/assets/logo.png" alt="logo" />
              HelpDen
            </Menu.Item>

            {authenticated ? (
              <Menu.Item position="right">
                <Button basic inverted icon="bars" onClick={handleShowClick} />
              </Menu.Item>
            ) : (
              <SignedOutMenu
                signIn={this.handleSignIn}
                register={this.handleRegister}
              />
            )}
          </Container>
        </Menu>
        <Sticky context={this.contextRef}>
          <Sidebar
            as={Menu}
            pointing
            animation="overlay"
            direction="right"
            onHide={handleSidebarHide}
            vertical
            visible={visible}
            width="thin"
          >
            <SignedInMenu
              signOut={this.handleSignOut}
              profile={profile}
              auth={auth}
              hideSidebar={handleSidebarHide}
            />
          </Sidebar>
        </Sticky>
      </Fragment>
    );
  }
}

export default withRouter(
  withFirebase(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(NavBar)
  )
);
//withRouter provides NavBar the access to props.history
