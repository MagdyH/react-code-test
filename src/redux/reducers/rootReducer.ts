

import { combineReducers } from 'redux';
import { State } from '../types';
import users from './userReducer';

export interface IRootReducer {
    users: State
}
export default combineReducers({
    users
});