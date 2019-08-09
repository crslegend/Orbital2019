import React, { Fragment } from "react";
import { Header, Menu, Grid } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const TuteeAdminNav = () => {
  return (
    <Fragment>
      <Grid.Column width={4}>
        <Menu vertical size="large">
          <Header
            icon="user"
            attached
            inverted
            color="grey"
            content="Tutee Admin"
          />
          <Menu.Item as={NavLink} to="/admin/createtutee">
            Create Tutee
          </Menu.Item><Menu.Item as={NavLink} to="/admin/manage">
            Manage Tutees
          </Menu.Item>
        </Menu>
      </Grid.Column>
    </Fragment>
  );
};

export default TuteeAdminNav;