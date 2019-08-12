import React, { Fragment } from "react";
import { Dropdown, Message } from "semantic-ui-react";
import { connect } from "react-redux";

const mapDispatchToProps = {};

const EventAdminForm = ({ tutees, value, handleChange, error }) => {
  const options = tutees.map(tutee => ({
    key: tutee.tuteeUid,
    text: tutee.displayName,
    value: tutee.tuteeUid
  }));

  return (
    <Fragment>
      <Dropdown
        placeholder="Select Tutees"
        fluid
        multiple
        search
        selection
        value={value}
        options={options}
        onChange={handleChange}
      />
      {error && <Message
      error
      header='Invalid Selection'
      content='Please check the class size and try again'
    />}
    </Fragment>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(EventAdminForm);
