import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, EDIT_ITEM, ITEMS_LOADING } from './Types'
import axios from 'axios'
import { tokenConfig } from '../Actions/authActions'
import { returnErrors } from '../Actions/errorActions'

export const getItems = () => dispatch => {
    //going to itemreducer and checking item.type
    dispatch(setItemLoading());
    axios.get('http://localhost:4000/api/items')
        .then(res => dispatch({
            type: GET_ITEMS,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const deleteItem = (id) => (dispatch, getState) => {
    //going to itemreducer and checking item.type
    axios.delete('http://localhost:4000/api/items/' + id, tokenConfig(getState))
        .then(res => dispatch({
            type: DELETE_ITEM,
            payload: id
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const addItem = (item) => (dispatch, getState) => {

    axios.post('http://localhost:4000/api/items', item, tokenConfig(getState))
        .then(res => dispatch({
            type: ADD_ITEM,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}


/*
/@ need to be impemented
/@
/@
*/
export const editItem = (id, item) => (dispatch, getState) => {

    axios.post('http://localhost:4000/api/items/' + id, item, tokenConfig(getState))
        .then(res => dispatch({
            type: EDIT_ITEM,
            payload: id
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const setItemLoading = () => {
    //going to itemreducer and checking item.type
    return {
        type: ITEMS_LOADING
    }
}