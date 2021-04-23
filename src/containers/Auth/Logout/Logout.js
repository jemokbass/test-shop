import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';

import { logout } from '@src/store/actions/auth';

const Logout = props => {
  const dispatch = useDispatch();
  const onLogout = useCallback(() => dispatch(logout()), [dispatch]);

  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return <Redirect to="/" />;
};

export default Logout;
