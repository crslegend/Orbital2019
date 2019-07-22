import React, { Component, Fragment } from "react";
import { Menu, Container, Icon, Sidebar, Button } from "semantic-ui-react";
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
        <Menu inverted fixed="top">
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
