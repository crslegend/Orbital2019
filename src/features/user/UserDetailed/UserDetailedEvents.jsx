import React from "react";
import {
  Card,
  Grid,
  Header,
  Image,
  Segment,
  Tab,
  List
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const panesForTutor = [
  { menuItem: "Classes Tutored", pane: { key: "tutoring" } },
  { menuItem: "Past Classes", pane: { key: "pastclasses" } },
  { menuItem: "Future Classes", pane: { key: "futureclasses" } }
];

const panesForTutee = [
  { menuItem: "Classes Attended", pane: { key: "allclasses" } },
  { menuItem: "Past Classes", pane: { key: "pastclasses" } },
  { menuItem: "Future Classes", pane: { key: "futureclasses" } }
];

const UserDetailedEvents = ({ events, eventsLoading, changeTab, profile }) => {
  return (
    <Grid.Column width={16}>
      <Segment attached loading={eventsLoading}>
        <Header icon="calendar" content="Classes" />
        <Tab
          onTabChange={(e, data) => changeTab(e, data)}
          panes={profile.userType === "tutor" ? panesForTutor : panesForTutee}
          menu={{ secondary: true, pointing: true, className: "wrapped" }}
        />
        <br />

        <List>
          {events &&
            events.map(event => (
              <List.Item>
                <Image src={"/assets/classroom.jpg"} size="tiny" />
                <List.Content>
                  <br />
                  <List.Header
                    as={Link}
                    to={`/classes/${event.id}`}
                    key={event.id}
                  >
                    {event.subject}
                  </List.Header>
                  <List.Description>
                    <div>
                      {format(event.date && event.date.toDate(), "dd LLL yyyy")}
                      {" at "}
                      {format(event.date && event.date.toDate(), "h:mm a")}
                    </div>
                  </List.Description>
                </List.Content>
              </List.Item>
            ))}
        </List>

        {/* <Card.Group itemsPerRow={2} only="mobile">
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
        </Card.Group> */}
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedEvents;
