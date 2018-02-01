import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Redirect, Switch} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

// Styles
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.scss';
// Temp fix for reactstrap
import '../scss/core/_dropdown-menu-right.scss';
// Bootstrap DataTable
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// Authentication
import Auth from './modules/Auth';

// Containers
import Full from './containers/Full/';

// Views
import Login from './views/auth/Login/';
import Register from './views/auth/Register/';
import Page404 from './views/status/page404/';
import Page500 from './views/status/page500/';

const history = createBrowserHistory();

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const logoutUser = (nextState, replace) => {
  Auth.deauthenticateUser();
  replace('/');
}

ReactDOM.render((
  <Router history={history}>
    <Switch>
      <Route exact path="/login" name="Login Page" component={Login}/>
      <Route exact path="/register" name="Register Page" component={Register}/>
      <Route exact path="/logout" onEnter={logoutUser}/>
      <Route exact path="/404" name="Page 404" component={Page404}/>
      <Route exact path="/500" name="Page 500" component={Page500}/>
      <PrivateRoute path="/" name="Home" component={Full}/>
    </Switch>
  </Router>
), document.getElementById('root'));