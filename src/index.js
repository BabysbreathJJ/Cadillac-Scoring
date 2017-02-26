import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Display from './components/Display/Display';
import Edit from './components/Edit/Edit'
import Login from './components/Login/Login'


ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Display}>
            <IndexRoute component={Display}/>
        </Route>
        <Router path="/login" component={Login}/>
        <Router path="/display" component={Display}/>
        <Router path="/edit" component={Edit}/>
    </Router>,
    document.getElementById('root'));