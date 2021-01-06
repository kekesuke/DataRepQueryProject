import axios from 'axios'
import { returnErrors } from './errorActions'
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_FAIL
} from "./Types"

//register
export const register = ({ name, username, password }) => dispatch => {
    //headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //request body 
    const body = JSON.stringify({ name, username, password })

    axios.post('http://localhost:4000/api/users', body, config)
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

//check token & load user
export const loadUser = () => (dispatch, getState) => {
    //setting user loading to true
    dispatch({ type: USER_LOADING });
    //get token from localstorage
    axios.get('http://localhost:4000/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR //set everything to null and remove token if there is an error
            });
        });
}


export const login = ({ username, password }) => dispatch => {
    //headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //request body 
    const body = JSON.stringify({ username, password })

    axios.post('http://localhost:4000/api/auth/login', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))// IF its succsess we send the payload to auth reducer else send error
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            })
        })
}

//logout user
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

//setup config/headers and token
export const tokenConfig = (getState) => {
    const token = getState().auth.token//getting the token from the local storage

    //header
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    //if token, add to headers
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
}