import React from "react";
import { Grid, Divider } from "semantic-ui-react";
import SettingsNav from "./SettingsNav";
import { Route, Redirect, Switch } from "react-router-dom";
import BasicPage from "./BasicPage";
import PhotosPage from "./Photos/PhotosPage";
import AccountPage from "./AccountPage";
import { connect } from "react-redux";
import { updatePassword } from "../../auth/authActions";
import { updateProfile } from "../../user/userActions";

const mapStateToProps = state => ({
  providerId: state.firebase.auth.providerData[0].providerId,
  user: state.firebase.profile,
  auth: state.firebase.auth,
  loading: state.async.loading
});

const mapDispatchToProps = {
  updatePassword,
  updateProfile
};

const SettingsDashboard = ({
  updatePassword,
  providerId,
  user,
  updateProfile,
  auth,
  loading
}) => {
  return (
    <Grid stackable>
      <Grid.Column width={12}>
        <Switch>
          <Redirect exact from="/settings" to="/settings/about" />
          <Route
            path="/settings/about"
            render={() => (
              <BasicPage
                initialValues={user}
                updateProfile={updateProfile}
                user={user}
                loading={loading}
              />
            )}
          />
          {/* <Route
            path="/settings/about"
            render={() => (
              <AboutPage initialValues={user} updateProfile={updateProfile} />
            )}
          /> */}
          <Route path="/settings/photos" component={PhotosPage} />
          <Route
            path="/settings/account"
            render={() => (
              <AccountPage
                updatePassword={updatePassword}
                providerId={providerId}
              />
            )}
          />
        </Switch>
      </Grid.Column>
      <Grid.Column width={4}>
        <SettingsNav />
        <Divider />
      </Grid.Column>
    </Grid>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsDashboard);
