import { GET_SUPPLIES, ADD_SUPPLY, EDIT_SUPPLY, EDIT_SUPPLY_FAIL, ADD_SUPPLY_FAIL, DELETE_SUPPLY, SUPPLIES_LOADING } from '../actions/types';

const initialState = {
    supplies: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_SUPPLIES:
            return {
                ...state,
                supplies: action.payload,
                loading: false
            };
        case EDIT_SUPPLY_FAIL:
            return {
                ...state,
                loading: false
            }
        case EDIT_SUPPLY:
            return {
                ...state,
                supplies: [action.payload, ...state.supplies]
            };
        case DELETE_SUPPLY:
            return {
                ...state,
                supplies: state.supplies.filter(supply => supply._id !== action.payload)
            };
        case ADD_SUPPLY:
            return {
                ...state,
                supplies: [action.payload, ...state.supplies]
            };
        case SUPPLIES_LOADING:
            return {
                ...state,
                loading: true
            };
        case ADD_SUPPLY_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }    
}