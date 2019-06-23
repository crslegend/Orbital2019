import React, { Component } from "react";
import { connect } from "react-redux";
import { incrementCounter, decrementCounter } from "./testActions";
import { Button } from "semantic-ui-react";
import { openModal } from "../modals/modalActions";

const mapStateToProps = state => ({
  data: state.test.data
});

const mapDispatchToProps = {
  incrementCounter,
  decrementCounter,
  openModal
};

class TestComponent extends Component {
  render() {
    const { data, incrementCounter, decrementCounter, openModal } = this.props;
    return (
      <div>
        <h1>Test</h1>
        <h3>The answer is: {data}</h3>
        <Button onClick={incrementCounter} positive />
        <Button onClick={decrementCounter} negative />
        <Button
          onClick={() => openModal("TestModal", { data: 42 })}
          color="teal"
          content="Modal"
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestComponent);
