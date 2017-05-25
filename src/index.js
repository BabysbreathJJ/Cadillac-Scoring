import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Display from './components/Display/Display';
import Edit from './components/Edit/Edit'
import Login from './components/Login/Login';
import Download from './components/Download/Download';

const checkStatus = (nextState, replace,next) =>{
    var authorization = window.localStorage.getItem('authorization');
    var type = window.localStorage.getItem('type');
    if(authorization) {
        next();//如果有值直接下一步
    }else{
        alert("请先登录!");
        replace("/")//如果token信息为空就直接到登录页面
        next();
    }
}

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Login}>
            <IndexRoute component={Login}/>
        </Route>
        <Router path="/login" component={Login}/>
        <Router path="/display" component={Display} onEnter={checkStatus}/>
        <Router path="/edit" component={Edit} onEnter={checkStatus}/>
        <Router path="/download" component={Download} onEnter={checkStatus}/>
    </Router>,
    document.getElementById('root'));