import React from 'react';

export default class ChildComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};

    this.tick = this.tick.bind(this);
  }

  tick() {
      this.setState({date: new Date()});
  }

  componentDidMount() {
    setInterval(this.tick, 1000);
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
