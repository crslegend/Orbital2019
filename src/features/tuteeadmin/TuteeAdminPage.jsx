import React, { Component } from "react";
import { Grid, Divider } from "semantic-ui-react";
import { Route, Redirect, Switch } from "react-router-dom";
import CreateTuteeForm from "./CreateTuteeForm";
import TuteeAdminNav from "./TuteeAdminNav";
import TuteeListPage from "./TuteeListPage";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  providerId: state.firebase.auth.providerData[0].providerId,
  user: state.firebase.profile,
  auth: state.firebase.auth,
  loading: state.async.loading
});

const mapDispatchToProps = {};

class TuteeAdminPage extends Component {
  render() {
    const { loading } = this.props;
    return (
      <Grid stackable>
        <Grid.Column width={12}>
          <Switch>
            <Redirect exact from="/admin" to="/admin/manage" />
            <Route
              path="/admin/createtutee"
              render={() => <CreateTuteeForm loading={loading} />}
            />
            <Route path="/admin/manage" render={() => <TuteeListPage />} />
          </Switch>
        </Grid.Column>
        <Grid.Column width={4}>
          <TuteeAdminNav />
          <Divider />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TuteeAdminPage);
