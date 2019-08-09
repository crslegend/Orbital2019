import React, { Component } from "react";
import { Segment, Form, Input, Header } from "semantic-ui-react";
import { createTutee } from "./TuteeAdminActions";
import { connect } from "react-redux";

const mapDispatchToProps = {
  createTutee
};

class CreateTuteeForm extends Component {
  state = {
    name: ""
  };

  handleChange = (e, { value }) => {
    this.setState({
      name: value
    });
  };

  handleSubmit = async () => {
    const { name } = this.state;
    await this.props.createTutee(name);
    console.log(name);
  };

  render() {
    const { name } = this.state;
    const { loading } = this.props;
    return (
      <Segment.Group>
        <Header as="h2" attached="top">
          Admin Dashboard
        </Header>
        <Segment attached>
          <Form
            onSubmit={this.handleSubmit}
            autoComplete="off"
            loading={loading}
          >
            <Form.Field inline>
              <label>Add New Tutee: </label>
              <Input
                placeholder="Tutee's name"
                name="name"
                value={name}
                onChange={this.handleChange}
              />
              <Form.Button content="Submit" />
            </Form.Field>
          </Form>
        </Segment>
      </Segment.Group>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CreateTuteeForm);
