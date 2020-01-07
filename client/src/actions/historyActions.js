import axios from 'axios';
import { GET_HISTORY, ADD_HISTORY, HISTORY_LOADING, ADD_HISTORY_FAIL } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getHistory = () => dispatch => {
    dispatch(setHistoryLoading());
    axios.get('/api/historicalFacts')
        .then(res => dispatch({
            type: GET_HISTORY,
            payload: res.data
        }))
        .catch(err => dispatch(
            returnErrors(err.response.data, err.response.status))
        )
}

export const addHistory = (historicalFact) => (dispatch, getState) => {
    axios.post('/api/historicalFacts', historicalFact, tokenConfig(getState))
        .then(res => dispatch({
            type: ADD_HISTORY,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ADD_HISTORY_FAIL'))
            dispatch({
                type: ADD_HISTORY_FAIL
            })
        })       
}

export const setHistoryLoading = () => {
    return {
        type: HISTORY_LOADING
    }
}