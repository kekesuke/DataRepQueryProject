import { GET_ERRORS, CLEAR_ERRORS } from './Types'

//return errors

export const returnErrors = (msg, status, id = null) => {
    return {
        type: GET_ERRORS, //returning get-error type which we check in the reducer
        payload: { msg, status, id }
    }
}

// CLEAR ERRORS

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}