import axios from 'axios';
import { GET_GRADES, ADD_GRADE, DELETE_GRADE, GRADES_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getGrades = () => dispatch => {
    dispatch(setGradesLoading());
    axios.get('/api/grades')
        .then(res => dispatch({
            type: GET_GRADES,
            payload: res.data
        }))
        .catch(err => dispatch(
            returnErrors(err.response.data, err.response.status))
        )
}

export const deleteGrade = (id) => (dispatch, getState) => {
    axios.delete(`/api/grades/${id}`, tokenConfig(getState))
        .then(res => dispatch({
            type: DELETE_GRADE,
            payload: id
        }))
        .catch(err => dispatch(
            returnErrors(err.response.data, err.response.status))
        ) 
}

export const addGrade = (grade) => (dispatch, getState) => {
    axios.post('/api/grades', grade, tokenConfig(getState))
        .then(res => dispatch({
            type: ADD_GRADE,
            payload: res.data
        }))
        .catch(err => dispatch(
            returnErrors(err.response.data, err.response.status))
        )       
}

export const setGradesLoading = () => {
    return {
        type: GRADES_LOADING
    }
}