import axios from 'axios';
import { returnErrors } from './errorActions'

import { 
    GET_USERS,
    EDIT_USER,
    EDIT_USER_FAIL,
    DELETE_USER,
    USER_LOADING, 
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL 
} from './types';

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING });

    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            })
        })
};

// Register User
export const register = ({ name, email, password }) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request body
    const body = JSON.stringify({ name, email, password });

    axios.post('/api/users', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            })
        })
}

// Login user
export const login = ({ email, password })  => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request body
    const body = JSON.stringify({ email, password });

    axios.post('/api/auth', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            })
        })
}

// Logout user
export const logout = () => {
    window.location = '/';
    return {
        type: LOGOUT_SUCCESS
    }
} 

// Setup config/headers and token
export const tokenConfig = getState => {
    // Get token from localstorage
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // If token, add to headers
    if(token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}

export const getUsers = () => (dispatch, getState) => {
    dispatch(setUsersLoading());
    axios.get('/api/users', tokenConfig(getState))
        .then(res => dispatch({
            type: GET_USERS,
            payload: res.data
        }))
        .catch(err => dispatch(
            returnErrors(err.response.data, err.response.status))
        )
}

export const editUser = (user, id) => (dispatch, getState) => {
    axios.post(`/api/users/${id}`, user, tokenConfig(getState))
        .then(res => dispatch({
            type: EDIT_USER,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'EDIT_USER_FAIL'))
            dispatch({
                type: EDIT_USER_FAIL
            })
        })
}

export const deleteUser = (id) => (dispatch, getState) => {
    axios.delete(`/api/users/${id}`, tokenConfig(getState))
        .then(res => dispatch({
            type: DELETE_USER,
            payload: id
        }))
        .catch(err => dispatch(
            returnErrors(err.response.data, err.response.status))
        ) 
}

export const setUsersLoading = () => {
    return {
        type: USER_LOADING
    }
}