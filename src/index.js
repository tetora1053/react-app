import React from 'react';
import ReactDOM from 'react-dom';
import ChildComponent from './welcome_dialog';

class ParentComponent extends React.Component {
  render() {
    return (
      <div>
        <ChildComponent />
      </div>
    )
  }
}

ReactDOM.render(
  <ParentComponent />,
  document.getElementById('root')
);