import { GET_HISTORY, ADD_HISTORY, HISTORY_LOADING, ADD_HISTORY_FAIL } from '../actions/types';

const initialState = {
    history: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_HISTORY:
            return {
                ...state,
                history: action.payload,
                loading: false
            };        
        case ADD_HISTORY:
            return {
                ...state,
                history: [action.payload, ...state.grades]
            };
        case HISTORY_LOADING:
            return {
                ...state,
                loading: true
            };
        case ADD_HISTORY_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }    
}