import React, { Component } from 'react';
import { getCourseView, clearCourseView} from '../../actions'
import { connect } from 'react-redux';

class CourseView extends Component {

    componentWillMount (){
        this.props.dispatch(getCourseView(this.props.match.params.id))
    }

    componentWillUnmount(){
        this.props.dispatch(clearCourseView())
    }

    renderCourse = (courses) =>(
        courses.course ?
            <div className="br_container">
                <div className="br_header">
                    <h2>{courses.course.courseTitle}</h2>
                    <h5>{courses.course.courseCode}</h5>
                    <div className="br_reviewer">
                        <span>Course Unit:</span>{courses.course.courseUnit}
                    </div>
                </div>
                <div className="br_reviewer">
                    course
                    <br />
                </div>
            </div>
        :null

    )

    render(){
        let courses = this.props.courses;
        return (
            <div>
                {this.renderCourse(courses)}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        courses: state.courses
    }
}
export default connect (mapStateToProps)(CourseView)