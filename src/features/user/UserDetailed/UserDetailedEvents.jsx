import React from "react";
import { Grid, Header, Image, Segment, Tab, List } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import UserEventCalendar from "./UserEventCalender";

const panesForTutor = [
  { menuItem: "Classes Taught/Teaching", pane: { key: "tutoring" } },
  { menuItem: "Past Classes", pane: { key: "pastclasses" } },
  { menuItem: "Upcoming Classes", pane: { key: "futureclasses" } }
];

const panesForTutee = [
  { menuItem: "Classes Attended/Attending", pane: { key: "allclasses" } },
  { menuItem: "Past Classes", pane: { key: "pastclasses" } },
  { menuItem: "Upcoming Classes", pane: { key: "futureclasses" } }
];

const UserDetailedEvents = ({ events, eventsLoading, changeTab, profile }) => {
  return (
    <Grid.Column width={16}>
      <Segment attached loading={eventsLoading}>
        <Header icon="calendar" content="Classes" />
        <Grid columns={2} stackable>
          <Grid.Column width={8}>
            <Tab
              onTabChange={(e, data) => changeTab(e, data)}
              panes={
                profile.userType === "tutor" ? panesForTutor : panesForTutee
              }
              menu={{ secondary: true, pointing: true, className: "wrapped" }}
            />
            <br />

            <List>
              {events &&
                events.map(event => (
                  <List.Item key={event.id}>
                    <Image
                      src={"/assets/" + event.subject + ".jpg"}
                      size="tiny"
                    />
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
                          {format(
                            event.date && event.date.toDate(),
                            "dd LLL yyyy"
                          )}
                          {" at "}
                          {format(event.date && event.date.toDate(), "h:mm a")}
                        </div>
                      </List.Description>
                    </List.Content>
                  </List.Item>
                ))}
            </List>
          </Grid.Column>

          <Grid.Column width={8}>
            <UserEventCalendar events={events} />
          </Grid.Column>
        </Grid>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedEvents;
