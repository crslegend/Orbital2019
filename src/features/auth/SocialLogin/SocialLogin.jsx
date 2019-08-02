import React from "react";
import { Button, Icon } from "semantic-ui-react";
import userManager from "../OidcUtil";

const SocialLogin = ({ socialLogin, oidcLogin }) => {

  const handleOidcLogin = () => {
    userManager.signinRedirect();
  }

  return (
    <div>
      <Button
        type="button"
        style={{ marginBottom: "10px" }}
        fluid
        color="facebook"
        onClick={() => socialLogin("facebook")}
      >
        <Icon name="facebook" /> Login with Facebook
      </Button>

      <Button
        type="button"
        style={{ marginBottom: "10px" }}
        fluid
        color="google plus"
        onClick={() => socialLogin("google")}
      >
        <Icon name="google plus" />
        Login with Google
      </Button>

      <Button type="button" fluid color="orange" onClick={handleOidcLogin}>
        Login with NUS OpenID
      </Button>
    </div>
  );
};

export default SocialLogin;
