import { combineReducers } from 'redux';
import courses from './courses_reducer';
import user from './user_reducer'
import admin from './admin_reducer'
import questions from './questions_reducer'

const rootReducer = combineReducers({
    courses,
    user,
    admin,
    questions
});
export default rootReducer;