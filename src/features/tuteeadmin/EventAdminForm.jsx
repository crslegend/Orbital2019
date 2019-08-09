import React from "react";
import { Segment, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import { objectToArray } from "../../app/common/util/helpers";

const mapDispatchToProps = {};

const LoginForm = tutees => {
    console.log(tutees.tutees);
  const options = tutees.tutees.map(tutee => ({
    key: tutee.tuteeUid,
    text: tutee.displayName,
    value: tutee
  }));

  return (
    <Segment>
      <Dropdown
        placeholder="Select Tutees"
        fluid
        multiple
        search
        selection
        options={options}
      />
    </Segment>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(LoginForm);
