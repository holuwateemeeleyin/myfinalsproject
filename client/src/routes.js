import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home/home';
import Questions from './components/Questions/questions';
import CourseView from './components/Courses';
import QuestionView from './components/Questions';
import Layout from './hoc/layout';
import Signin from './containers/Admin/signin';
// import User from './components/Admin'
import Admin from './components/Admin';
import AddCourse from './containers/Admin/add';
import AddQuestion from './containers/Admin/addQuestion'
import AdminPosts from './components/Admin/adminPosts';
import EditCourse from './containers/Admin/edit';
import AdminRegister from './containers/Admin/adminRegister';
import Signout from './components/Admin/signout';

import Login from './containers/Student/login';
import Register from './containers/Student/register';
import Play from './components/Questions/play'
import ScoreDetails from './components/Questions/scoreDetails'
import AdminAuth from './hoc/adminAuth'
import Auth from './hoc/auth'
const Routes = () =>{
    return (
        <Layout>
            <Switch>
                <Route path="/play" exact component={AdminAuth,Auth(Play,null)}/>
                <Route path="/play/scoredetails" exact component={AdminAuth,Auth(ScoreDetails,null)}/>
                <Route path="/" exact component={AdminAuth,Auth(Home,null)}/>
                <Route path="/questions" exact component={AdminAuth,Auth(Questions,null)}/>
                <Route path="/courses/:id" exact component={AdminAuth(CourseView,null)}/>
                <Route path="/questions/:id" exact component={AdminAuth(QuestionView,null)}/>
                <Route path ="/sign-in" exact component={AdminAuth(Signin,false)}/>
                <Route path ="/admin/sign-out" exact component={AdminAuth(Signout)}/>
                <Route path ="/admin" exact component ={AdminAuth(Admin,true)}/>
                <Route path ="/admin/add-course" exact component={AdminAuth(AddCourse,true)}/>
                <Route path ="/admin/add-question" exact component={AdminAuth(AddQuestion,true)}/>
                <Route path ="/admin/admin-register" exact component={AdminAuth(AdminRegister,true)}/>
                <Route path ="/admin/course-reviews" exact component ={AdminAuth(AdminPosts,true)}/>
                <Route path ="/admin/edit-course/:id"exact component={AdminAuth(EditCourse,true)}/>
                

                <Route path ="/login" exact component={Auth(Login,false)}/>
                <Route path ="/admin/register" exact component={AdminAuth(Register,true)}/>
            </Switch>
        </Layout>
    );
}
export default Routes;