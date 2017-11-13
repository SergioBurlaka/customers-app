import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import users from './users';
import UsersTablePagination from './UsersTablePagination';

export  default combineReducers ({
    routing: routerReducer,
    users,
    UsersTablePagination
})