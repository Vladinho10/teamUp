import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import EventDashboardPage from '../components/EventDashboardPage';
import EventLoginPage from '../components/EventLoginPage';
import NotFoundPage from '../components/NotFoundPage';
import EventPage from '../components/EventPage';

const AppRouter = () => (
  <BrowserRouter>
    <React.Fragment>
      <Switch>
        <Route path="/" component={EventLoginPage} exact />
        <Route path="/dashboard" component={EventDashboardPage} />
        <Route path='/eventpage/:id' component={EventPage} exact/>
        <Route component={NotFoundPage} />
      </Switch>
    </React.Fragment>
  </BrowserRouter>
);

export default AppRouter;
