import React from "react";
import { Label, Form, Segment, Button, Divider } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../app/common/form/TextInput";
import { connect } from "react-redux";
import { registerUser, socialLogin } from "../authActions";
import { combineValidators, isRequired } from "revalidate";
import RadioInput from "../../../app/common/form/RadioInput";
import SocialLogin from "../SocialLogin/SocialLogin";

const mapDispatchToProps = {
  registerUser,
  socialLogin
};

const validate = combineValidators({
  displayName: isRequired("displayName"),
  email: isRequired("email"),
  password: isRequired("password")
});

const RegisterForm = ({
  handleSubmit,
  registerUser,
  error,
  invalid,
  submitting,
  socialLogin
}) => {
  return (
    <div>
      <Form
        size="large"
        onSubmit={handleSubmit(registerUser)}
        autoComplete="off"
      >
        <Segment>
          <Field
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Full Name"
          />
          <Field
            name="email"
            type="text"
            component={TextInput}
            placeholder="Email"
          />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Password"
          />
          {error && (
            <Label basic color="red">
              {error}
            </Label>
          )}
          <Form.Group inline>
            <label>Sign Up As: </label>
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
          <Button
            disabled={invalid || submitting}
            fluid
            size="large"
            color="teal"
            loading={submitting}
          >
            Register
          </Button>
          <Divider horizontal>Or</Divider>
          <SocialLogin socialLogin={socialLogin} />
        </Segment>
      </Form>
    </div>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(reduxForm({ form: "registerForm", validate })(RegisterForm));
