import axios from 'axios';
import { GET_SUPPLIES, ADD_SUPPLY, ADD_SUPPLY_FAIL, DELETE_SUPPLY, SUPPLIES_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getGradeSupplies = id => dispatch => {
    dispatch(setSuppliesLoading());
    axios.get(`/api/supplies/grade/${id}`)
        .then(res => dispatch({
            type: GET_SUPPLIES,
            payload: res.data
        }))
        .catch(err => dispatch(
            returnErrors(err.response.data, err.response.status)
        ))
}

export const addSupply = (supply) => (dispatch, getState) => {
    axios.post('/api/supplies', supply, tokenConfig(getState))
        .then(res => dispatch({
            type: ADD_SUPPLY,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ADD_SUPPLY_FAIL'))
            dispatch({
                type: ADD_SUPPLY_FAIL
            })
        })       
}

export const deleteSupply = (id) => (dispatch, getState) => {
    axios.delete(`/api/supplies/${id}`, tokenConfig(getState))
        .then(res => dispatch({
            type: DELETE_SUPPLY,
            payload: id
        }))
        .catch(err => dispatch(
            returnErrors(err.response.data, err.response.status))
        ) 
}

export const setSuppliesLoading = () => {
    return {
        type: SUPPLIES_LOADING
    }
}