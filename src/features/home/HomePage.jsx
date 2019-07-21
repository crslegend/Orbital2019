import React from "react";
import {
  Segment,
  Container,
  Button,
  Icon,
  Header,
  Image
} from "semantic-ui-react";

const HomePage = ({ history }) => {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            className="ui massive image"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          HelpDen
        </Header>
        <Button onClick={() => history.push("/classes")} size="huge" inverted>
          Welcome!
          <Icon name="right arrow" inverted />
        </Button>
      </Container>
    </Segment>
  );
};

export default HomePage;
