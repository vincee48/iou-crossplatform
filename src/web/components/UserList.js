import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class UserList extends Component {
  static propTypes = {
    users: PropTypes.array,
  };

  render() {
    const { users } = this.props;

    return (
      <ul>
        {
          users.map(user => (
            <li key={user.id}>
              <Link to={`user/${user.id}`}>{user.name}</Link>
            </li>
          ))
        }
      </ul>
    );
  }
}

export default UserList;
