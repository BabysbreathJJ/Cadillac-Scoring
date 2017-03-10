import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Display from './components/Display/Display';
//import Edit from './components/Edit/Edit'
import Login from './components/Login/Login'
import EditContainer from './contaniners/EditContainer'
import DisplayContainer from './contaniners/DisplayContainer'

//import injectTapEventPlugin from 'react-tap-event-plugin';
import store from './store';


//injectTapEventPlugin();
function changePage() {

    //if (localStorage.selectedItems) {
    //    var storedItems = JSON.parse(localStorage.selectedItems);
    //    storedItems = storedItems.concat(store.getState().getIn(['tabledata', 'selectedItems']).toJS());
    //    console.log(storedItems);
    //    localStorage.selectedItems = JSON.stringify(storedItems);
    //}
    //else {
    //    var storedItems = [];
    //    storedItems = storedItems.concat(store.getState().getIn(['tabledata', 'selectedItems']).toJS());
    //    var test = store.getState().getIn(['tabledata', 'selectedItems']).toJS();
    //    console.log(test);
    //    console.log(storedItems);
    //    localStorage.selectedItems = JSON.stringify(storedItems);
    //}

    // if (store.getState().getIn(['tabledata', 'selectedItems']).toJS()) {
    //     alert("请先提交当前页修改!");
    //     return false;
    // }

    // window.location.reload();
}


ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={DisplayContainer}>
                <IndexRoute component={DisplayContainer}/>
            </Route>
            <Router path="/login" component={Login}/>
            <Router path="/display" component={DisplayContainer} onChange={changePage}/>
            <Router path="/edit/:page" component={EditContainer} onChange={changePage}/>
        </Router>
    </Provider>,
    document.getElementById('root'));