import { combineReducers } from 'redux';
import gradeReducer from './gradeReducer';

export default combineReducers({
    grade: gradeReducer
});