import React, { Component } from 'react';
import { logout } from '@Src/store/actions/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout()),
});

export default connect(null, mapDispatchToProps)(Logout);
