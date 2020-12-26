import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './pages/Home';
import Register from './pages/Register';
import Details from './pages/Details';
import Edit from './pages/Edit';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/details/:id" component={Details} />
            <Route exact path="/edit/:id" component={Edit} />
        </Switch>
    </BrowserRouter>
);

export default Routes;