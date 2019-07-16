import React, { Component } from "react";
import { List, Popup, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

class EventListAttendee extends Component {
  render() {
    const { attendee } = this.props;
    return (
      <List.Item>
        <Popup
          trigger={
            <Image
              src={attendee.photoURL || 'assets/user.png'}
              circular
              size="mini"
              as={Link}
              to={`/profile/${attendee.id}`}
            />
          }
          key={attendee.id}
          header={attendee.displayName}
          size="tiny"
        />
      </List.Item>
    );
  }
}

export default EventListAttendee;
