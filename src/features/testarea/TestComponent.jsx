import React, { Component } from "react";
import { connect } from "react-redux";
import { incrementCounter, decrementCounter } from "./testActions";
import { Button } from "semantic-ui-react";

const mapStateToProps = state => ({
  data: state.test.data
});

const mapDispatchToProps = {
  incrementCounter,
  decrementCounter
};

class TestComponent extends Component {
  render() {
    const { data, incrementCounter, decrementCounter } = this.props;
    return (
      <div>
        <h1>Test</h1>
        <h3>The answer is: {data}</h3>
        <Button onClick={incrementCounter} />
        <Button onClick={decrementCounter} />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestComponent);
