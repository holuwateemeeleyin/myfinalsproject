import axios from 'axios';

export function getCourses(
    limit = 10,
    start = 0,
    order = 'desc',
    list = ''
){
    
    const request = axios.get(`/api/courses?limit=${limit}&skip=${start}&order=${order}`)
                    .then(response=> {
                            if(list){
                                return[...list,...response.data]
                            }else{
                                return response.data

                            }
                        }
                   )
    return {
        type: 'GET_COURSES',
        payload:request
    }
    
}

export function getCourseView(id){
    const request = axios.get(`/api/getCourse?id=${id}`)

    return (dispatch)=>{
        request.then(({data})=>{
            let course = data;
            
            axios.get(`/api/getStudentDetails?id=${course.ownerId}`)
            .then(({data})=>{
                
                let response = {
                    course,
                    reviewer:data
                }
                console.log(response);
                
                dispatch({
                    type:'GET_COURSE_VIEW',
                    payload:response
                })
            })

        })
    }
}

export function clearCourseView(){
    return{
        type:'CLEAR_COURSE_VIEW',
        payload:{
            course:{},
            reviewer:{}
        }
    }
}

export function addCourse(course){
    const request = axios.post('/api/course',course)
        .then(response=>response.data);

    return {
        type:'ADD_COURSE',
        payload:request
    }
}

export function clearNewCourse(){
    return {
        type:'CLEAR_NEWCOURSE',
        payload:{}
    }
}

export function getAdminPosts(adminId){
    const request = axios.get(`/api/admin_exam_details?admin=${adminId}`)
                    .then(response => response.data)

    return {
        type:'GET_ADMIN_POSTS',
        payload:request
    }
}

export function getCourse(id){
    const request = axios.get(`/api/getCourse?id=${id}`)
                    .then(response => response.data)

    return {
        type:'GET_COURSE',
        payload:request
    }
}
export function updateCourse(data){
    const request = axios.post(`/api/course_update`,data)
                    .then(response=>response.data);
    
    return {
        type:'UPDATE_COURSE',
        payload:request
    }
}

export function removeCourse(id){
    const request = axios.delete(`/api/delete_course?id=${id}`)
                    .then(response => response.data)

    return {
        type: 'REMOVE_COURSE',
        payload: request
    }
}

export function clearCourse (){
    return{
        type:'CLEAR_COURSE',
        payload:{
            course:null,
            updateCourse:false,
            courseDeleted:false

        }
    }
}

/*============ USER =============*/

export function loginUser({matric,password}){
    const request = axios.post('/api/login',{matric,password})
                    .then(response => response.data)
    return{
        type:'USER_LOGIN',
        payload:request
    }
}

export function auth (){
    const request = axios.get('/api/auth')
                    .then(response => response.data);

    return {
        type:'USER_AUTH',
        payload:request
    }
}

/*=============Admin===========*/

export function signInAdmin({adminID,password}){
    const request = axios.post('/api/adminLogin',{adminID,password})
                    .then(response => response.data)
    return{
        type: 'ADMIN_LOGIN',
        payload:request
    }
}


export function adminAuth (){
    const request = axios.get('/api/adminAuth')
                    .then(response => response.data);

    return {
        type:'ADMIN_AUTH',
        payload:request
    }
}
export function getAdmins(){
    const request = axios.get(`/api/admins`)
                   .then(response => response.data)

    return {
        type:'GET_ADMIN',
        payload:request
    }
}


export function registerAdmin(admin,adminList){
    const request = axios.post(`/api/adminRegister`,admin)

    return (dispatch) =>{
        request.then(({data})=>{
            let admins = data.success ? [...adminList, data.admin]:adminList
            let response = {
                success:data.success,
                admins
            }
            dispatch({
                type:'ADMIN_REGISTER',
                payload:response
            })
        })
    }
}



export function getUsers(){
    const request = axios.get(`/api/users`)
                    .then(response => response.data)

    return {
        type:'GET_USER',
        payload:request
    }
}

export function userRegister(user,userList){
    const request = axios.post(`/api/register`,user)

    return (dispatch) =>{
        request.then(({data})=>{
            let users = data.success ? [...userList, data.user]:userList
            let response = {
                success:data.success,
                users
            }

            dispatch({
                type:'USER_REGISTER',
                payload:response
            })
        })
    }
}


// Questions

export function addQuestion(question){
    const request = axios.post('/api/question',question)
        .then(response => response.data);
        return {
            type: 'ADD_QUESTION',
            payload: request
        }
}

export function clearNewQuestion(){
    return {
        type: 'CLEAR_NEWQUESTION',
        payload: {}
    }
}

export function getQuestions(
    limit = 10,
    start = 0,
    order = 'desc',
    list = ''
){
    
    const request = axios.get(`/api/questions?limit=${limit}&skip=${start}&order=${order}`)
                    .then(response=> {
                            if(list){
                                return[...list,...response.data]
                            }else{
                                return response.data

                            }
                        }
                   )
    return {
        type: 'GET_QUESTIONS',
        payload:request
    }
    
}






export function getQuestionView(id){
    const request = axios.get(`/api/getQuestion?id=${id}`)

    return (dispatch)=>{
        request.then(({data})=>{
            let question = data;
            
            
            axios.get(`/api/getStudentDetails?id=${question.ownerId}`)
            .then(({data})=>{
                
                let response = {
                    question,
                    reviewer:data
                }
                console.log(response);
                
                dispatch({
                    type:'GET_QUESTION_VIEW',
                    payload:response
                })
            })

        })
    }
}
// export function userRegister(user){
//     const request = axios.post('/api/register',user)
//         .then(response=>response.data);

//     return {
//         type:'ADD_USER',
//         payload:request
//     }
// }
