import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { checkValidity, updateObject } from '@src/shared/utility';

import Input from '@src/components/UI/Input/Input';
import Button from '@src/components/UI/Button/Button';
import { auth, setAuthRedirectPath } from '@src/store/actions/auth';
import Spinner from '@src/components/UI/Spinner/Spinner';
import './Auth.css';

const Auth = props => {
  const [formControls, setFormControls] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Mail Address',
      },
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password',
      },
      value: '',
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(true);
  const loading = useSelector(state => state.auth.loading);
  const isError = useSelector(state => state.auth.error);
  const isAuthenticated = useSelector(state => state.auth.token !== null);
  const buildBurger = useSelector(state => state.burgerBuilder.building);
  const authRedirectPath = useSelector(state => state.auth.authRedirectPath);
  const onAuth = (email, password, isSignUp) => dispatch(auth(email, password, isSignUp));
  const onSetAuthRedirectPath = useCallback(() => dispatch(setAuthRedirectPath('/')), [dispatch]);

  useEffect(() => {
    if (!buildBurger && authRedirectPath !== '/') {
      onSetAuthRedirectPath();
    }
  }, [buildBurger, authRedirectPath, onSetAuthRedirectPath]);

  const switchAuthModeHandler = () => {
    setIsSignUp(!isSignUp);
  };

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(formControls, {
      [controlName]: updateObject(formControls[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, formControls[controlName].validation),
        touched: true,
      }),
    });

    setFormControls(updatedControls);
  };

  const submitHandler = event => {
    event.preventDefault();
    onAuth(formControls.email.value, formControls.password.value, isSignUp);
  };

  const formElementsArr = [];
  for (let key in formControls) {
    formElementsArr.push({ id: key, config: formControls[key] });
  }

  const form = formElementsArr.map(formEl => (
    <Input
      key={formEl.id}
      elementType={formEl.config.elementType}
      elementConfig={formEl.config.elementConfig}
      value={formEl.config.value}
      invalid={!formEl.config.valid}
      shouldValidate={formEl.config.validation}
      touched={formEl.config.touched}
      changed={event => inputChangedHandler(event, formEl.id)}
    />
  ));

  let error = null;

  if (isError) {
    error = <p className="auth__error">{isError.message.replace('_', ' ')}</p>;
  }

  let authenticate = (
    <div className="auth">
      <form className="auth__inner" onSubmit={submitHandler}>
        {form}
        {error}
        <Button btnType="success" className="auth__btn">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </Button>
      </form>
      <Button btnType="danger" className="auth__btn" clicked={switchAuthModeHandler}>
        Switch to {isSignUp ? 'Sign In' : 'Sign Up'}
      </Button>
      {isAuthenticated && <Redirect to={authRedirectPath} />}
    </div>
  );

  if (loading) {
    authenticate = <Spinner />;
  }

  return authenticate;
};

export default Auth;
