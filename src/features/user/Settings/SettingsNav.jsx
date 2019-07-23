import React, { Fragment } from "react";
import { Header, Menu, Grid } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const SettingsNav = () => {
  return (
    <Fragment>
      <Grid.Column width={4}>
        <Menu vertical size="large">
          <Header
            icon="user"
            attached
            inverted
            color="grey"
            content="Profile"
          />
          <Menu.Item as={NavLink} to="/settings/about">
            About Me
          </Menu.Item>
          {/* <Menu.Item as={NavLink} to="/settings/about">
          About Me
        </Menu.Item> */}
          <Menu.Item as={NavLink} to="/settings/photos">
            My Photos
          </Menu.Item>
        </Menu>

        <Menu vertical size="large">
          <Header
            icon="settings"
            attached
            inverted
            color="grey"
            content="Account"
          />
          <Menu.Item as={NavLink} to="/settings/account">
            Change My Password
          </Menu.Item>
        </Menu>
      </Grid.Column>
    </Fragment>
  );
};

export default SettingsNav;
