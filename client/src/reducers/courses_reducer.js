export default function(state={},action){
    switch(action.type){
        case 'GET_COURSES':
            return { ...state,list:action.payload }
        case 'GET_COURSE_VIEW':
            return {
                ...state,
                course:action.payload.course,
                reviewer:action.payload.reviewer
            }
        case 'CLEAR_COURSE_VIEW':
            return{
                ...state,
                course:action.payload.course,
                reviewer:action.payload.reviewer
            }
        case 'GET_COURSE':
            return{...state,course:action.payload}
        case 'UPDATE_COURSE':
            return{
                ...state,
                updateCourse:action.payload.success,
                course:action.payload.doc
            }
        case 'REMOVE_COURSE':
            return {
                ...state,
                courseDeleted:action.payload
            }
        case 'CLEAR_COURSE':
            return {
                ...state,
                updateCourse:action.payload.updateCourse,
                course:action.payload.course,
                courseDeleted:action.payload.courseDeleted
            }
        case 'ADD_COURSE':
            return{...state,newcourse:action.payload}
        case 'CLEAR_NEWCOURSE':
            return{...state,newcourse:action.payload}
        default:
            return state;
    }
}