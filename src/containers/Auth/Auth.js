import React, { Component } from 'react';
import Input from '@Src/components/UI/Input/Input';
import Button from '@Src/components/UI/Button/Button';
import './Auth.css';
import { auth, setAuthRedirectPath } from '@Src/store/actions/auth';
import { connect } from 'react-redux';
import Spinner from '@Src/components/UI/Spinner/Spinner';
import { Redirect } from 'react-router';

class Auth extends Component {
  state = {
    controls: {
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
    },
    isSignUp: false,
  };

  checkValidity(value, rules = true) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isSelect) {
      isValid = value !== 'none';
    }

    return isValid;
  }

  componentDidMount() {
    if (!this.props.buildBurger && this.props.authRedirectPath !== '/') {
      this.props.setAuthRedirectPath();
    }
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => ({ isSignUp: !prevState.isSignUp }));
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  render() {
    const formElementsArr = [];
    for (let key in this.state.controls) {
      formElementsArr.push({ id: key, config: this.state.controls[key] });
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
        changed={event => this.inputChangedHandler(event, formEl.id)}
      />
    ));

    let error = null;

    if (this.props.error) {
      error = (
        <p className="auth__error">
          {this.props.error.message.replace('_', ' ')}
        </p>
      );
    }

    let auth = (
      <div className="auth">
        <form className="auth__inner" onSubmit={this.submitHandler}>
          {form}
          {error}
          <Button btnType="success" className="auth__btn">
            {this.state.isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
        </form>
        <Button
          btnType="danger"
          className="auth__btn"
          clicked={this.switchAuthModeHandler}
        >
          Switch to {this.state.isSignUp ? 'Sign In' : 'Sign Up'}
        </Button>
        {this.props.isAuthenticated && (
          <Redirect to={this.props.authRedirectPath} />
        )}
      </div>
    );

    if (this.props.loading) {
      auth = <Spinner />;
    }
    return auth;
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token !== null,
  buildBurger: state.burgerBuilder.building,
  authRedirectPath: state.auth.authRedirectPath,
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignUp) =>
    dispatch(auth(email, password, isSignUp)),
  onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath('/')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
