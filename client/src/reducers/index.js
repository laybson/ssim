import { combineReducers } from 'redux';
import gradeReducer from './gradeReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    grade: gradeReducer,
    auth: authReducer,
    error: errorReducer
});