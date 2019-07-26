import React, { Fragment } from "react";
import {
  Segment,
  Image,
  Item,
  Header,
  Button,
  Label,
  Icon,
  Grid
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const eventImageStyle = {
  filter: "brightness(30%)",
  height: "300px"
};

const eventImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white"
};

const EventDetailedHeader = ({
  event,
  isGoing,
  isHost,
  profile,
  goingToEvent,
  cancelGoingToEvent,
  attendees,
  loading
}) => {
  var imageSrc = "/assets/" + event.subject + ".jpg";
  return (
    <Fragment>
      <Segment.Group>
        <Segment basic attached="top" style={{ padding: "0" }}>
          <Image src={imageSrc} fluid style={eventImageStyle} />

          <Segment basic style={eventImageTextStyle}>
            <Item.Group>
              <Grid>
                <Grid.Column width={13}>
                  <Item>
                    <Item.Content>
                      <Header
                        as="h1"
                        size="huge"
                        content={event.className}
                        style={{ color: "white" }}
                      />
                      <Header as="h3" style={{ color: "white" }}>
                        Subject: {event.subject}
                      </Header>
                      <p>
                        Tutor:{" "}
                        <strong>
                          <Link
                            to={`/profile/${event.tutorUid}`}
                            style={{ color: "white" }}
                          >
                            {event.tutorName}
                          </Link>
                        </strong>
                      </p>
                    </Item.Content>
                  </Item>
                </Grid.Column>
              </Grid>
            </Item.Group>
          </Segment>
        </Segment>

        <Segment attached="bottom" clearing>
          <Grid>
            <Grid.Column width={10} verticalAlign="middle">
              {isHost && (
                <Fragment>
                  {event.cancelled ? (
                    <Label color="red" content="Cancelled" tag />
                  ) : (
                    attendees &&
                    attendees.length > event.size && (
                      <Label color="orange" content="Full" tag />
                    )
                  )}
                  {event.cancelled &&
                    attendees &&
                    attendees.length > event.size && (
                      <Label color="orange" content="Full" tag />
                    )}
                </Fragment>
              )}
              {!isHost && profile.userType === "tutee" && (
                <Fragment>
                  {event.cancelled &&
                  attendees &&
                  attendees.length < event.size + 1 ? (
                    <Label color="red" tag>
                      Cancelled
                    </Label>
                  ) : (
                    attendees &&
                    attendees.length > event.size && (
                      <Label color="orange" tag>
                        Full
                      </Label>
                    )
                  )}
                </Fragment>
              )}
            </Grid.Column>

            <Grid.Column width={6} verticalAlign="middle">
              {isHost && (
                <Button
                  as={Link}
                  to={`/manage/${event.id}`}
                  icon
                  labelPosition="right"
                  floated="right"
                >
                  Edit
                  <Icon name="edit" />
                </Button>
              )}

              {!isHost && profile.userType === "tutee" && (
                <Fragment>
                  {isGoing ? (
                    <Button
                      loading={loading}
                      onClick={() => cancelGoingToEvent(event)}
                      icon
                      labelPosition="right"
                      floated="right"
                    >
                      Cancel Place
                      <Icon name="user times" />
                    </Button>
                  ) : (
                    !event.cancelled &&
                    attendees &&
                    attendees.length < event.size + 1 && (
                      <Button
                        loading={loading}
                        onClick={() => goingToEvent(event)}
                        icon
                        labelPosition="right"
                        floated="right"
                      >
                        Sign Up
                        <Icon name="user plus" />
                      </Button>
                    )
                  )}
                </Fragment>
              )}
            </Grid.Column>
          </Grid>
        </Segment>
      </Segment.Group>
    </Fragment>
  );
};

export default EventDetailedHeader;
