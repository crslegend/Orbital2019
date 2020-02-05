import React, { Fragment } from "react";
import {
  Menu,
  Image,
  Icon,
  Container
} from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";

const SignedInMenu = ({ signOut, profile, auth, hideSidebar }) => {
  // comment
  return (
    <Fragment>
      <Container textAlign="center">
        <Menu.Item>
          <Image
            centered
            as={Link}
            to={`/profile/${auth.uid}`}
            circular
            size="small"
            src={profile.photoURL}
            onClick={hideSidebar}
          />
        </Menu.Item>
      </Container>
      <Menu.Item>
        <Menu.Header size="medium">{profile.displayName}</Menu.Header>
        <Menu.Menu>
          <Menu.Item
            as={Link}
            to={`/profile/${auth.uid}`}
            onClick={hideSidebar}
          >
            <p>
              <Icon name="user" />
              My Profile
            </p>
          </Menu.Item>
          <Menu.Item as={Link} to="/settings" onClick={hideSidebar}>
            <p>
              <Icon name="settings" /> Settings
            </p>
          </Menu.Item>
        </Menu.Menu>
      </Menu.Item>
      <Menu.Item as={NavLink} to={"/classes"} onClick={hideSidebar}>
        <p>
          <Icon circular name="book" />
          Classes
        </p>
      </Menu.Item>

      {profile.userType === "tutor" && (
        <Menu.Item as={NavLink} to={"/createEvent"} onClick={hideSidebar}>
          <p>
            <Icon circular color="green" name="plus" />
            Create Class
          </p>
        </Menu.Item>
      )}
      {profile.userType === "tuteeAdmin" && (
        <Menu.Item as={NavLink} to={"/admin"} onClick={hideSidebar}>
          <p>
            <Icon circular color="green" name="address book outline" />
            Manage Tutees
          </p>
        </Menu.Item>
      )}
      <Menu.Item onClick={() => {signOut(); hideSidebar();}} >
        <p>
          <Icon circular color="red" name="power" /> Sign Out
        </p>
      </Menu.Item>
    </Fragment>
  );
};

export default SignedInMenu;
