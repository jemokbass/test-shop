import React, { Component, Suspense, lazy } from 'react';
import Layout from '@Src/components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { authCheckState } from './store/actions/auth';
import Spinner from './components/UI/Spinner/Spinner';

const Checkout = lazy(() => import('./containers/Checkout/Checkout'));
const Orders = lazy(() => import('./containers/Orders/Orders'));
const Auth = lazy(() => import('./containers/Auth/Auth'));
const Logout = lazy(() => import('./containers/Auth/Logout/Logout'));

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    const fallback = (
      <div>
        <Spinner />
      </div>
    );

    let routes = (
      <>
        <Suspense fallback={fallback}>
          <Route path="/auth" component={Auth} />
        </Suspense>
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <>
          <Suspense fallback={fallback}>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/logout" component={Logout} />
            <Route path="/auth" component={Auth} />
          </Suspense>
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </>
      );
    }
    return (
      <Layout>
        <Switch>{routes}</Switch>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps = dispatch => ({
  onTryAutoSignup: () => dispatch(authCheckState()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
