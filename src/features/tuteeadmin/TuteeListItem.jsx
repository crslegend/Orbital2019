import React, { Component } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { format } from "date-fns";
import { deleteTutee } from "./TuteeAdminActions";
import { connect } from "react-redux";

const mapDispatchToProps = {
  deleteTutee
};

class TuteeListItem extends Component {
  handleDelete = async () => {
    await this.props.deleteTutee(this.props.tutee);
    console.log(this.props.tutee);
  };

  render() {
    const { tutee, user, loading } = this.props;
    let joinDate =
      tutee.createdAt && format(tutee.createdAt.toDate(), "dd LLL yyyy");

    return (
      <Card>
        <Card.Content>
          <Image floated="left" size="tiny" src={tutee.photoURL} />
          <Card.Header>{tutee.displayName}</Card.Header>
          <Card.Meta>
            <span className="date">Joined since {joinDate} </span>
          </Card.Meta>
          <Card.Description>
            Tutee registered under <strong>{user.displayName}</strong>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button basic color="green" icon="edit" />
            <Button
              basic
              color="red"
              onClick={this.handleDelete}
              loading={loading}
              icon="trash alternate"
            />
          </div>
        </Card.Content>
      </Card>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(TuteeListItem);
