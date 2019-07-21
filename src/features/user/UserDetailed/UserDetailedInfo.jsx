import React from "react";
import { Segment, Grid, Header, List, Item, Icon } from "semantic-ui-react";

const UserDetailedInfo = ({ profile }) => {
  return (
    <Grid.Column width={16}>
      <Segment>
        <Grid columns={2}>
          <Grid.Column width={10}>
            <Header icon="smile" content="About Me" />
            <p>
              I am a: <strong>{profile.userType || "-"}</strong>
            </p>
            <p>
              Gender: <strong>{profile.gender || "-"}</strong>
            </p>
            <p>
              School: <strong>{profile.school || "-"}</strong>
            </p>
            {profile.userType === "tutor" && (
              <p>
                Major: <strong>{profile.major || "-"}</strong>
              </p>
            )}
            <p>
              More About Me:{" "}
              <strong>{profile.about || "Nothing interesting :("}</strong>
            </p>
          </Grid.Column>
          <Grid.Column width={6}>
            <Header icon="heart outline" content="Interests" />
            <List>
              {profile.interests ? (
                profile.interests.map((interest, index) => (
                  <Item key={index}>
                    <Icon name="heart" />
                    <Item.Content>{interest}</Item.Content>
                  </Item>
                ))
              ) : (
                <p>No interests</p>
              )}
            </List>
          </Grid.Column>
        </Grid>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedInfo;
