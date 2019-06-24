import React from "react";
import { Grid, Header, Item, Segment } from "semantic-ui-react";
import { differenceInYears } from "date-fns";
import LazyLoad from "react-lazyload";

const UserDetailedHeader = ({ profile }) => {
  let age;
  if (profile.dateOfBirth) {
    age = differenceInYears(Date.now(), profile.dateOfBirth.toDate());
  } else {
    age = "unknown age";
  }
  return (
    <Grid.Column width={16}>
      <Segment>
        <Item.Group>
          <Item>
            <LazyLoad
              height={150}
              placeholder={
                <Item.Image
                  avatar
                  size="small"
                  src="https://randomuser.me/api/portraits/men/20.jpg"
                />
              }
            >
              <Item.Image
                avatar
                size="small"
                src="https://randomuser.me/api/portraits/men/20.jpg"
              />
            </LazyLoad>

            <Item.Content verticalAlign="bottom">
              <Header as="h1">{profile.displayName}</Header>
              <br />
              <Header as="h3">{age}</Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedHeader;
