import { combineReducers } from 'redux';
import gradeReducer from './gradeReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import supplyReducer from './supplyReducer';
import studentReducer from './studentReducer';

export default combineReducers({
    grade: gradeReducer,
    auth: authReducer,
    supply: supplyReducer,
    error: errorReducer,
    student: studentReducer
});