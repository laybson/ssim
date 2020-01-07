import { GET_PDF, ADD_PDF, PDF_LOADING, ADD_PDF_FAIL } from '../actions/types';

const initialState = {
    pdf: null,
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_PDF:
            return {
                ...state,
                pdf: action.payload,
                loading: false
            };        
        case ADD_PDF:
            return {
                ...state,
                pdf: action.payload
            };
        case PDF_LOADING:
            return {
                ...state,
                loading: true
            };
        case ADD_PDF_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }    
}