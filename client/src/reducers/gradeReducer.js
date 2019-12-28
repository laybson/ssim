import { GET_GRADES, ADD_GRADE, DELETE_GRADE, GRADES_LOADING } from '../actions/types';

const initialState = {
    grades: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_GRADES:
            return {
                ...state,
                grades: action.payload,
                loading: false
            };
        case DELETE_GRADE:
            return {
                ...state,
                grades: state.grades.filter(grade => grade._id !== action.payload)
            };
        case ADD_GRADE:
            return {
                ...state,
                grades: [action.payload, ...state.grades]
            };
        case GRADES_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }    
}