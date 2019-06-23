import React, { Component, Fragment } from "react";
import EventDashBoard from "../../features/event/EventDashboard/EventDashBoard";
import NavBar from "../../features/nav/NavBar/NavBar";
import { Container } from "semantic-ui-react";
import { Route, Switch, withRouter } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import EventDetailedPage from "../../features/event/EventDetailed/EventDetailedPage";
import PeopleDashboard from "../../features/user/PeopleDashboard/PeopleDashboard";
import SettingsDashBoard from "../../features/user/Settings/SettingsDashboard";
import UserDetailedPage from "../../features/user/UserDetailed/UserDetailedPage";
import EventForm from "../../features/event/EventForm/EventForm";
import ModalManager from "../../features/modals/ModalManager";
import TestComponent from "../../features/testarea/TestComponent";

class App extends Component {
  render() {
    return (
      <Fragment>
        <ModalManager />
        <Route exact path="/" component={HomePage} />
        <Route
          path="/(.+)" // this means if the path is more than just a '/', it will render the respective component
          render={() => (
            <Fragment>
              <NavBar />
              <Container className="main">
                <Switch key={this.props.location.key}>
                  <Route exact path="/events" component={EventDashBoard} />
                  <Route path="/events/:id" component={EventDetailedPage} />
                  <Route path="/people" component={PeopleDashboard} />
                  <Route path="/profile/:id" component={UserDetailedPage} />
                  <Route path="/settings" component={SettingsDashBoard} />
                  <Route path="/test" component={TestComponent} />
                  <Route
                    path={["/createEvent", "/manage/:id"]}
                    component={EventForm}
                  />
                </Switch>
              </Container>
            </Fragment>
          )}
        />
      </Fragment>
    );
  }
}

export default withRouter(App);
