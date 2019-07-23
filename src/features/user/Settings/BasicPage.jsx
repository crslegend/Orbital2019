import React, { Component, Fragment } from "react";
import { Segment, Form, Header, Divider, Button } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import DateInput from "../../../app/common/form/DateInput";
import TextInput from "../../../app/common/form/TextInput";
import RadioInput from "../../../app/common/form/RadioInput";
import { addYears } from "date-fns";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";

const interests = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" }
];

class BasicPage extends Component {
  render() {
    const {
      pristine,
      submitting,
      handleSubmit,
      updateProfile,
      user,
      loading
    } = this.props;
    return (
      <Fragment>
        <Segment>
          <Header dividing size="large" content="Basics" />
          <Form onSubmit={handleSubmit(updateProfile)}>
            <Form.Group inline>
              <label>Full Name</label>
              <Field
                width={8}
                name="displayName"
                type="text"
                component={TextInput}
                placeholder="Full Name"
              />
            </Form.Group>
            <Form.Group inline>
              <label>Gender: </label>
              <Field
                name="gender"
                type="radio"
                value="Male"
                label="Male"
                component={RadioInput}
              />
              <Field
                name="gender"
                type="radio"
                value="Female"
                label="Female"
                component={RadioInput}
              />
            </Form.Group>
            <Form.Group inline>
              <label>I am a: </label>
              <Field
                name="userType"
                type="radio"
                value="tutor"
                label="Tutor"
                component={RadioInput}
              />
              <Field
                name="userType"
                type="radio"
                value="tutee"
                label="Tutee"
                component={RadioInput}
              />
            </Form.Group>
            <Form.Group inline>
              <label>Date of Birth</label>
              <Field
                width={8}
                name="dateOfBirth"
                component={DateInput}
                placeholder="Choose Date of Birth"
                dateFormat="dd LLL yyyy"
                showYearDropdown={true}
                showMonthDropdown={true}
                dropdownMode="select"
                maxDate={addYears(new Date(), -18)}
              />
            </Form.Group>

            {/* <Field
                        name='city'
                        placeholder='Home Town'
                        options={{types: ['(cities)']}}
                        label='Female'
                        component={PlaceInput}
                        width={8}
                    /> */}
            <Divider />
            <Button
              disabled={pristine || submitting}
              size="large"
              positive
              content="Update Profile"
              loading={loading}
            />
          </Form>
        </Segment>

        <Segment>
          <Header dividing size="large" content="About Me" />
          <p>
            Complete your profile to let other tutors and tutees know more about
            you!
          </p>
          <Form onSubmit={handleSubmit(updateProfile)}>
            <label>Tell us about yourself</label>
            <Field name="about" component={TextArea} placeholder="About Me" />
            <Field
              name="interests"
              component={SelectInput}
              options={interests}
              value="interests"
              multiple={true}
              placeholder="Select your interests"
            />
            <Field
              width={8}
              name="school"
              type="text"
              component={TextInput}
              placeholder="Name of school currently studying in"
            />
            {user.userType === "tutor" && (
              <Field
                width={8}
                name="major"
                type="text"
                component={TextInput}
                placeholder="Major"
              />
            )}

            {/* <Field
          width={8}
          name="origin"
          options={{ types: ['(regions)'] }}
          component={PlaceInput}
          placeholder="Country of Origin"
        /> */}
            <Divider />
            <Button
              disabled={pristine || submitting}
              size="large"
              positive
              content="Update Profile"
              loading={loading}
            />
          </Form>
        </Segment>
        <Divider />
      </Fragment>
    );
  }
}

export default reduxForm({
  form: "userProfile",
  enableReinitialize: true,
  destroyOnUnmount: false
})(BasicPage);
