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
  filter: "brightness(30%)"
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
  attendees
}) => {
  return (
    <Fragment>
      <Segment.Group>
        <Segment basic attached="top" style={{ padding: "0" }}>
          <Image src="/assets/classroom.jpg" fluid style={eventImageStyle} />

          <Segment basic style={eventImageTextStyle}>
            <Item.Group>
              <Grid>
                <Grid.Column width={13}>
                  <Item>
                    <Item.Content>
                      <Header
                        size="huge"
                        content={event.subject}
                        style={{ color: "white" }}
                      />
                      <p>
                        {event.date &&
                          format(event.date.toDate(), "EEEE do LLLL")}
                      </p>
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
                <Grid.Column width={3} verticalAlign="bottom">
                  {isHost && (
                    <Button as={Link} to={`/manage/${event.id}`} icon inverted>
                      <Icon name="edit" />
                    </Button>
                  )}

                  {!isHost && profile.userType === "tutee" && (
                    <Fragment>
                      {isGoing ? (
                        <Button
                          onClick={() => cancelGoingToEvent(event)}
                          icon
                          inverted
                        >
                          <Icon name="user times" />
                        </Button>
                      ) : (
                        !event.cancelled &&
                        attendees &&
                        attendees.length < event.size + 1 && (
                          <Button
                            onClick={() => goingToEvent(event)}
                            icon
                            inverted
                          >
                            <Icon name="user plus" />
                          </Button>
                        )
                      )}
                    </Fragment>
                  )}
                </Grid.Column>
              </Grid>
            </Item.Group>
          </Segment>
        </Segment>

        <Segment attached="bottom" clearing>
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
        </Segment>
      </Segment.Group>
    </Fragment>
  );
};

export default EventDetailedHeader;
