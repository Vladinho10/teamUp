import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import EventDashboardPage from '../components/EventDashboardPage';
import EventLoginPage from '../components/EventLoginPage';
import NotFoundPage from '../components/NotFoundPage';
import EventPage from '../components/EventPage';
import SearchResultsPage from '../components/search/SearchResultsPage';
import { AccountPage } from '../components/AccountPage';

const AppRouter = () => (
  <BrowserRouter>
    <React.Fragment>
      <Switch>
        <Route path="/" component={EventLoginPage} exact />
        <Route path="/dashboard" component={EventDashboardPage} />
        <Route path='/eventpage/:id' component={EventPage} />
        <Route path='/search/all/' component={SearchResultsPage} />
        <Route path='/search/people/' component={SearchResultsPage} />
        <Route path='/search/events/' component={SearchResultsPage} />
        <Route path='/account/:id' component={AccountPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </React.Fragment>
  </BrowserRouter>
);

export default AppRouter;
