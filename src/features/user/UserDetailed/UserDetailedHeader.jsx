import React from "react";
import { Grid, Header, Item, Segment } from "semantic-ui-react";
import { differenceInYears } from "date-fns";
import LazyLoad from "react-lazyload";
import { format } from "date-fns";

const UserDetailedHeader = ({ profile }) => {
  let age;
  if (profile.dateOfBirth) {
    age = differenceInYears(Date.now(), profile.dateOfBirth.toDate());
  }

  let joinDate =
    profile.createdAt && format(profile.createdAt.toDate(), "dd LLL yyyy");

  return (
    <Grid.Column width={16}>
      <Segment>
        <Item.Group>
          <Item>
            <LazyLoad
              height={150}
              placeholder={
                <Item.Image avatar size="small" src={profile.photoURL} />
              }
            >
              <Item.Image avatar size="small" src={profile.photoURL} />
            </LazyLoad>

            <Item.Content verticalAlign="bottom">
              <Header as="h1">{profile.displayName}</Header>
              <br />
              {age && <Header as="h3">Age: {age}</Header>}
              <br />
              <Header as="h3">Joined since: {joinDate}</Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedHeader;
