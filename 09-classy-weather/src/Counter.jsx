import React from "react";

class Counter extends React.Component {
  state = {
    count: 0,
  };

  decreaseHandler = () => {
    this.setState((curState) => {
      return {
        count: curState.count - 1,
      };
    });
  };

  increaseHandler = () => {
    this.setState((curState) => {
      return {
        count: curState.count + 1,
      };
    });
  };

  render() {
    let currentNumber = 10;

    return (
      <div>
        <button onClick={this.decreaseHandler}>-</button>
        <span>
          {`Current Number: ${currentNumber + this.state.count}`} -
          {this.state.count}
        </span>
        <button onClick={this.increaseHandler}>+</button>
      </div>
    );
  }
}

export default Counter;
