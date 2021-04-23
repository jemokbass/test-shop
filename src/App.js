import React, { Suspense, lazy, useEffect, useCallback } from 'react';
import Layout from '@src/components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authCheckState } from './store/actions/auth';
import Spinner from './components/UI/Spinner/Spinner';

const Checkout = lazy(() => import('./containers/Checkout/Checkout'));
const Orders = lazy(() => import('./containers/Orders/Orders'));
const Auth = lazy(() => import('./containers/Auth/Auth'));
const Logout = lazy(() => import('./containers/Auth/Logout/Logout'));

const App = props => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.token !== null);
  const onTryAutoSignup = useCallback(() => dispatch(authCheckState()), [dispatch]);

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

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

  if (isAuthenticated) {
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
};

export default withRouter(App);
