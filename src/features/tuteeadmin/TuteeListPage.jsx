import React, { Component } from "react";
import { Segment, Form, Input, Header } from "semantic-ui-react";

export default class TuteeListPage extends Component {
  render() {
    return (
      <Segment.Group>
        <Header as="h2" attached="top">
          Manage Tutees
        </Header>
        <Segment attached>
          <div>Tutee List</div>
        </Segment>
      </Segment.Group>
    );
  }
}
