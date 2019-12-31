import axios from 'axios';
import { GET_STUDENTS, ADD_STUDENT, ADD_STUDENT_FAIL, DELETE_STUDENT, STUDENTS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getGradeStudents = id => dispatch => {
    dispatch(setStudentsLoading());
    axios.get(`/api/students/grade/${id}`)
        .then(res => dispatch({
            type: GET_STUDENTS,
            payload: res.data
        }))
        .catch(err => dispatch(
            returnErrors(err.response.data, err.response.status)
        ))
}

export const addStudent = (student) => (dispatch, getState) => {    
    axios.post('/api/students', student, tokenConfig(getState))
        .then(res => dispatch({
            type: ADD_STUDENT,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ADD_STUDENT_FAIL'))
            dispatch({
                type: ADD_STUDENT_FAIL
            })
        })       
}

export const deleteStudent = (id) => (dispatch, getState) => {
    axios.delete(`/api/students/${id}`, tokenConfig(getState))
        .then(res => dispatch({
            type: DELETE_STUDENT,
            payload: id
        }))
        .catch(err => dispatch(
            returnErrors(err.response.data, err.response.status))
        ) 
}

export const setStudentsLoading = () => {
    return {
        type: STUDENTS_LOADING
    }
}