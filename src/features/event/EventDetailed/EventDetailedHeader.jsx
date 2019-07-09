import React, { Fragment } from "react";
import { Segment, Image, Item, Header, Button, Label } from "semantic-ui-react";
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
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image src="/assets/classroom.jpg" fluid style={eventImageStyle} />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={event.subject}
                  style={{ color: "white" }}
                />
                <p>
                  {event.date && format(event.date.toDate(), "EEEE do LLLL")}
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
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom" clearing>
        {!isHost && profile.userType === "tutee" && (
          <Fragment>
            {isGoing ? (
              <Button onClick={() => cancelGoingToEvent(event)}>
                Cancel My Place
              </Button>
            ) : (
              [
                !event.cancelled &&
                attendees &&
                attendees.length < event.size + 1 ? (
                  <Button onClick={() => goingToEvent(event)} color="teal">
                    Join This Class
                  </Button>
                ) : (
                  [
                    event.cancelled &&
                    attendees &&
                    attendees.length < event.size + 1 ? (
                      <Button disabled color="teal">
                        Class Cancelled
                      </Button>
                    ) : (
                      <Button disabled color="teal">
                        Class is Full
                      </Button>
                    )
                  ]
                )
              ]
            )}
          </Fragment>
        )}

        {isHost && (
          <Fragment>
            {event.cancelled ? (
              <Fragment>
                <Button
                  as={Link}
                  to={`/manage/${event.id}`}
                  color="orange"
                  floated="right"
                >
                  Edit Class Details
                </Button>
                <Label
                  color="red"
                  content="You have cancelled this class"
                  size="large"
                />
              </Fragment>
            ) : (
              <Button
                as={Link}
                to={`/manage/${event.id}`}
                color="orange"
                floated="right"
              >
                Edit Class Details
              </Button>
            )}
          </Fragment>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default EventDetailedHeader;
