// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// // import registerServiceWorker from './registerServiceWorker';
//
//
// import {composeWithDevTools} from 'redux-devtools-extension';
// import thunk from 'redux-thunk';
//
//
// import  {Provider} from 'react-redux';
// import  {createStore, applyMiddleware} from 'redux';
//
//
// import reducer from './reducers/index';
// // import { Router, Route, browserHistory, Switch  } from 'react-router';
// // import { Router, Route, Switch  } from 'react-router';
// import {   Switch  } from 'react-router';
// import { syncHistoryWithStore,ConnectedRouter } from 'react-router-redux';
//
// import UsersTable from './containers/UsersTable';
// import AddUser from './containers/AddUser';
// import CurrencyCalculator from './containers/CurrencyCalculator';
//
// import axios from 'axios';
// import { BrowserRouter } from 'react-router-dom';
// // import createHistory from 'history/createBrowserHistory'
//
// import { Router, Route, browserHistory } from 'react-router'
//
//
//
//
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';
// import 'react-select/dist/react-select.css';
//
// const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
// const history = syncHistoryWithStore(browserHistory,store);
// // const history = createHistory(store);
//
//
//
// axios.get(`https://jsonplaceholder.typicode.com/users`)
//     .then(res => {
//         store.dispatch((dispatch) =>{
//             dispatch({type:'ADD_USERS', payload: res.data});
//             dispatch({type:'CALCULATE_PAGINATION', payload: res.data});
//         })
//     });
//

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import registerServiceWorker from './registerServiceWorker';


import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';


import  {Provider} from 'react-redux';
import  {createStore, applyMiddleware} from 'redux';


import reducer from './reducers/index';
import { Router, Route, browserHistory  } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import UsersTable from './containers/UsersTable';
import AddUser from './containers/AddUser';
import CurrencyCalculator from './containers/CurrencyCalculator';

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'react-select/dist/react-select.css';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
const history = syncHistoryWithStore(browserHistory, store);

axios.get(`https://jsonplaceholder.typicode.com/users`)
    .then(res => {
        store.dispatch((dispatch) =>{
            dispatch({type:'ADD_USERS', payload: res.data});
            dispatch({type:'CALCULATE_PAGINATION', payload: res.data});
        })
    });



ReactDOM.render(
        //  <Provider store={store} >
        //      <ConnectedRouter history={history}>
        //         <div>
        //             <Route  path="/" exact component={UsersTable}/>
        //             <Route  path="/addUser"  component={AddUser}/>
        //             <Route  path="/currencyCalculator"  component={CurrencyCalculator}/>
        //         </div>
        //      </ConnectedRouter>
        // </Provider>

    <Provider store={store}>
        <Router history={history}>
            <Route  path="/"  component={UsersTable}/>
            <Route  path="/addUser"  component={AddUser}/>
            <Route  path="/currencyCalculator"  component={CurrencyCalculator}/>
        </Router>
    </Provider>
    , document.getElementById('root'));

// <Switch> </Switch>

// <BrowserRouter></BrowserRouter>

// registerServiceWorker();

// <Provider store={store} >
//     <div>
//         <UsersTable/>
//         <AddUser/>
//         <CurrencyCalculator/>
//     </div>
// </Provider>
// <Provider store={store}>
//     <Router history={history}>
//         <Route path="/" component={UsersTable}/>
//         <Route path="/addUser" component={AddUser}/>
//         <Route path="/currencyCalculator" component={CurrencyCalculator}/>
//     </Router>
// </Provider>