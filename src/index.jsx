import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';

export default class UserItem extends Component {
  static defaultProps = {
    user: {
      name: 'John Doe'
    }
  };

  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string
    })
  };

  state = {
    name: this.props.user.name
  };

  render() {
    const { name } = this.state;

    return (
      <div>
        <h2>Hello!!!</h2>
        <p>
          I am {name}
        </p>
      </div>
    );
  }
}

render(<UserItem />, document.getElementById('app'));
