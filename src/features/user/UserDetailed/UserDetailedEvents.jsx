import React from "react";
import {
  Card,
  Grid,
  Header,
  Image,
  Menu,
  Segment,
  Tab
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import format from "date-fns/format";

const panes = [
  { menuItem: "All Classes", pane: { key: "allclasses" } },
  { menuItem: "Past Classes", pane: { key: "pastclasses" } },
  { menuItem: "Future Classes", pane: { key: "futureclasses" } },
  { menuItem: "Classes Tutored", pane: { key: "tutoring" } }
];

const UserDetailedEvents = ({ events, eventsLoading, changeTab }) => {
  return (
    <Grid.Column width={12}>
      <Segment attached loading={eventsLoading}>
        <Header icon="calendar" content="Classes" />
        <Tab
          onTabChange={(e, data) => changeTab(e, data)}
          panes={panes}
          menu={{ secondary: true, pointing: true }}
        />
        <br />

        <Card.Group itemsPerRow={5}>
          {events &&
            events.map(event => (
              <Card as={Link} to={`/classes/${event.id}`} key={event.id}>
                <Image src={"/assets/classroom.jpg"} />
                <Card.Content>
                  <Card.Header textAlign="center">{event.subject}</Card.Header>
                  <Card.Meta textAlign="center">
                    <div>
                      {format(event.date && event.date.toDate(), "dd LLL yyyy")}
                    </div>
                    <div>
                      {format(event.date && event.date.toDate(), "h:mm a")}
                    </div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
        </Card.Group>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedEvents;
