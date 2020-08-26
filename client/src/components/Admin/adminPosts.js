import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAdminPosts } from '../../actions';
import moment from 'moment-js';
import { Link } from 'react-router-dom';

class AdminPosts extends Component {

    componentWillMount(){
        this.props.dispatch(getAdminPosts(this.props.admin.signin.id))
    }

    showAdminPosts = (admin)=>(
        admin.adminPosts ?
            admin.adminPosts.map(item =>(
                <tr key={item._id}>
                    <td><Link to={
                        `/admin/edit-course/${item._id}`
                    }>
                        {item.courseTitle}
                    </Link> </td>
                    <td> {item.courseCode} </td>
                    <td> {item.courseUnit} </td>
                    <td> 
                        {moment(item.createdAt).format("MM/DD/YY")}
                    </td>
                    <td> 
                        {moment(item.updatedAt).format("MM/DD/YY")}
                    </td>
                </tr>
            ))
        :null
    )
    render(){
        let admin = this.props.admin;        
        return(
            <div className="user_posts" >
                <h4>Course reviews:</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Course Title</th>
                            <th>Course Code</th>
                            <th>Course Unit</th>
                            <th>Date Added</th>
                            <th>Date Updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.showAdminPosts(admin)}
                    </tbody>
                </table>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        admin:state.admin        
    }
}
export default connect(mapStateToProps)(AdminPosts)