import React, { Component, Fragment } from "react";
import axios from "axios";
import XMLParser from "react-xml-parser";
import {
  Popup,
  Icon,
  Grid,
  Label,
  Header,
  Loader,
  Container,
  Segment
} from "semantic-ui-react";

class BusMarker extends Component {
  state = {
    name: "",
    busTimings: []
  };

  async componentDidMount() {
    const { stopName } = this.props;
    this.setState({
      name: stopName
    });
    await this.getBusTimings(stopName);
  }

  getBusTimings = stopName => {
    var timings = [];
    var stopObj = {};
    axios
      .get(
        `${"https://cors-anywhere.herokuapp.com/"}nextbus.comfortdelgro.com.sg/testMethod.asmx/GetShuttleService`,
        {
          params: {
            busstopname: stopName
          }
        }
      )
      .then(response => {
        var xml = new XMLParser().parseFromString(response.data);
        stopObj = JSON.parse(xml.value);
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => {
        timings = stopObj.ShuttleServiceResult.shuttles;
        // console.log(timings);
        this.setState({
          busTimings: timings
        });
      });
  };

  /*return (
    <Popup
        trigger={<Icon name="bus" size="big" style={{ color: "#b21f1f" }} />}
        position="top center"
        on="click"
        pinned="true"
      >
        <Popup.Header as="h3">Bus Timings</Popup.Header>
        <Popup.Content>{this.state.name}</Popup.Content>
      </Popup>
  );*/

  render() {
    return (
      <Popup
        trigger={<Icon name="bus" size="big" style={{ color: "#b21f1f" }} />}
        position="top center"
        on="click"
        pinned="true"
      >
        <Popup.Content>
          {this.state.busTimings ? (
            <Segment.Group size="tiny">
            <Header as="h4" attached>Bus Timings</Header>
              {this.state.busTimings.map(bus => (
                <Segment textAlign="center" attached>
                  <Grid divided>
                    <Grid.Row>
                      <Grid.Column width={5}>
                        <Label key={bus.name} size="small" color="teal">
                          {" "}
                          {bus.name}{" "}
                        </Label>
                      </Grid.Column>
                      {bus.arrivalTime === "Arr" ? (
                        <Grid.Column width={5}>
                          <Label basic color="green">Arr</Label>
                        </Grid.Column>
                      ) : (
                        <Grid.Column width={5}>
                          {bus.arrivalTime}mins
                        </Grid.Column>
                      )}
                      <Grid.Column width={5}>
                        {bus.nextArrivalTime}mins
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
              ))}
            </Segment.Group>
          ) : (
            <Container>
              <Loader active />
            </Container>
          )}
        </Popup.Content>
      </Popup>
    );
  }
}

export default BusMarker;
