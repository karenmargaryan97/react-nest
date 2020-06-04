import React, { Suspense, lazy } from 'react';
import {
  Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { createBrowserHistory } from 'history';
import { CircularProgress } from "@material-ui/core";

const Login = lazy(() => import('./components/Login'));
const Signup = lazy(() => import('./components/Signup'));
const Main = lazy(() => import('./components/Main'));

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => (
      !!localStorage.getItem('token')
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
)};

const Routes = () => {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <>
      <Router history={createBrowserHistory()}>
        <Switch>
          {!isLoggedIn ? <Redirect exact from="/" to="/login" /> : <Redirect exact from="/" to="/main" /> }
          <Suspense fallback={<CircularProgress />}>
            <PrivateRoute exact path="/main" component={Main} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
          </Suspense>
          <Route component={() => <div className="not-found">Not found 404</div>} />
        </Switch>
      </Router>
    </>
  );
};

export default Routes;