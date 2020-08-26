export default function(state={}, action){
    switch(action.type){
        case 'ADD_QUESTION':
            return {...state,newquestion:action.payload}
        case 'CLEAR_NEWQUESTION':
            return {...state,newquestion:action.payload}
        case 'GET_QUESTION_VIEW':
            return {
                ...state,
                question:action.payload.question,
                reviewer:action.payload.reviewer
            }
        case 'GET_QUESTIONS':
            return { ...state,list:action.payload }
    default:
        return state;
    }
}