import React, { Component } from "react";
import { Segment, Header, Card } from "semantic-ui-react";
import TuteeListItem from "./TuteeListItem";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { deleteTutee } from "./TuteeAdminActions";

const query = ({ auth }) => {
  return [
    {
      collection: "users",
      doc: auth.uid,
      subcollections: [{ collection: "tutees" }],
      storeAs: "tutees"
    }
  ];
};

const mapStateToProps = state => ({
  user: state.firebase.profile,
  auth: state.firebase.auth,
  tutees: state.firestore.ordered.tutees
});

const mapDispatchToProps = {
  deleteTutee
};

class TuteeListPage extends Component {
  render() {
    const { tutees, user } = this.props;
    if (!tutees) {
      return (
        <Segment.Group>
          <Header as="h2" attached="top">
            Admin Dashboard
          </Header>
          <LoadingComponent />
        </Segment.Group>
      );
    } else {
      return (
        <Segment.Group>
          <Header as="h2" attached="top">
            Admin Dashboard
          </Header>
          <Segment attached>
            {tutees && tutees.length > 0 ? (
              <Card.Group itemsPerRow={3}>
                {tutees &&
                  tutees.map(tutee => (
                    <TuteeListItem
                      key={tutee.tuteeUid}
                      tutee={tutee}
                      user={user}
                      deleteTutee={deleteTutee}
                    />
                  ))}
              </Card.Group>
            ) : (
              <div>
                You have not registered a student yet. Click "Add New Tutee" on
                the right to start.
              </div>
            )}
          </Segment>
        </Segment.Group>
      );
    }
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(auth => query(auth))
)(TuteeListPage);
