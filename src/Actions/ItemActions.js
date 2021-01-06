import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, EDIT_ITEM, ITEMS_LOADING, GET_ERRORS } from './Types'
import axios from 'axios'

export const getItems = () => dispatch => {
    //going to itemreducer and checking item.type
    dispatch(setItemLoading());
    axios.get('http://localhost:4000/api/items')
        .then(res => dispatch({
            type: GET_ITEMS,
            payload: res.data
        }))
}

export const deleteItem = (id) => dispatch => {
    //going to itemreducer and checking item.type
    axios.delete('http://localhost:4000/api/items/' + id)
        .then(res => dispatch({
            type: DELETE_ITEM,
            payload: id
        }))
}

export const addItem = (item) => dispatch => {

    axios.post('http://localhost:4000/api/items', item)
        .then(res => dispatch({
            type: ADD_ITEM,
            payload: res.data
        }))
}

export const setItemLoading = () => {
    //going to itemreducer and checking item.type
    return {
        type: ITEMS_LOADING
    }
}