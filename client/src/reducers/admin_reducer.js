export default function(state={},action){
    switch(action.type){
        case 'ADMIN_LOGIN':
            return{...state,signin:action.payload}
        case 'ADMIN_AUTH':
            return{...state,signin:action.payload}
        case 'GET_ADMIN_POSTS':
            return {...state,adminPosts:action.payload}
        case 'GET_ADMIN':
            return {...state,admins:action.payload}
        case 'ADMIN_REGISTER':
            return {
                ...state,
                register:action.payload.success,
                admins:action.payload.admins
            }
        //  case 'ADMIN_REGISTER':
        //     return {
        //         ...state,
        //         register:action.payload.success,
        //         admins:action.payload.admins
        //     }
        default:
            return state;
    }
}