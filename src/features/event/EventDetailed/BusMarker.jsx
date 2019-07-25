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
  Segment,
  Button,
  SegmentGroup
} from "semantic-ui-react";

class BusMarker extends Component {
  state = {
    name: "",
    busTimings: null
  };

  async componentDidMount() {
    const { stopName } = this.props;
    this.setState({
      name: stopName
    });
    await this.getBusTimings(stopName);
  }

  getBusTimings = stopName => {
    this.setState({
      busTimings: null
    });
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
        console.log(timings);
        this.setState({
          busTimings: timings
        });
      });
  };

  handleClick = () => {
    this.getBusTimings(this.state.name);
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
              <Segment clearing>
                <Header as="h5">
                  Bus Timings
                  <Button
                    floated="right"
                    size="mini"
                    onClick={this.handleClick}
                  >
                    Refresh
                  </Button>
                </Header>
              </Segment>
              {this.state.busTimings.map(bus => (
                <Segment key={bus.name} textAlign="center" attached>
                  <Grid divided>
                    <Grid.Row>
                      <Grid.Column width={5}>
                        <Label size="small" color="teal">
                          {" "}
                          {bus.name}{" "}
                        </Label>
                      </Grid.Column>
                      {bus.arrivalTime === "Arr" ? (
                        <Grid.Column width={5}>
                          <Label basic color="green">
                            Arr
                          </Label>
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
            <Segment basic padded>
              <Icon name="circle notch" size="large" loading />
            </Segment>
          )}
        </Popup.Content>
      </Popup>
    );
  }
}

export default BusMarker;
