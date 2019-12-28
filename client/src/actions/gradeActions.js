import axios from 'axios';
import { GET_GRADES, ADD_GRADE, DELETE_GRADE, GRADES_LOADING } from './types';

export const getGrades = () => dispatch => {
    dispatch(setGradesLoading());
    axios.get('/api/grades')
        .then(res => dispatch({
            type: GET_GRADES,
            payload: res.data
        }))
}

export const deleteGrade = (id) => dispatch => {
    axios.delete(`/api/grades/${id}`)
        .then(res => dispatch({
            type: DELETE_GRADE,
            payload: id
        }))
}

export const addGrade = (grade) => dispatch => {
    axios.post('/api/grades', grade)
        .then(res => dispatch({
            type: ADD_GRADE,
            payload: res.data
        }))
}

export const setGradesLoading = () => {
    return {
        type: GRADES_LOADING
    }
}