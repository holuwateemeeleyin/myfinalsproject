import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link} from 'react-router-dom';
import { getCourse, updateCourse, clearCourse, removeCourse } from '../../actions'

class EditCourse extends PureComponent {

    state = {
        formdata:{
            _id:this.props.match.params.id,
            courseTitle:'',
            courseCode:'',
            courseUnit:''

        }
    }

    handleInput =(event,name) =>{
        const newFormdata ={
            ...this.state.formdata
        }
        newFormdata[name]=event.target.value

        this.setState({
            formdata:newFormdata
        })
    }


    submitForm = (e)=>{
        e.preventDefault();
        this.props.dispatch(updateCourse(this.state.formdata))
        
        
    }

    deleteCourse = ()=>{
        this.props.dispatch(removeCourse(this.props.match.params.id))
    }
    redirectAdmin = ()=>{
        setTimeout(()=>{
            this.props.history.push('/admin/course-reviews')
        },1000)
    }

    componentWillMount(){
        this.props.dispatch(getCourse(this.props.match.params.id))
    }

    componentWillReceiveProps(nextProps){
        
        let course = nextProps.courses.course;
        this.setState({
            formdata:{
                _id:course._id,
                courseTitle:course.courseTitle,
                courseCode:course.courseCode,
                courseUnit:course.courseUnit
            }
        })
        
    }

    componentWillUnmount(){
        this.props.dispatch(clearCourse())
    }


    render(){ 
        let courses = this.props.courses;
        
        return (
            <div className="rl_container article">
                {
                    courses.updateCourse ?
                    <div className="edit_confirm">
                        Course Updated, <Link to={`/courses/${courses.course._id}`}>
                            Click here to view
                        </Link>
                    </div>
                    :null
                }
                {
                    courses.courseDeleted ?
                    <div className="red_tag">
                        Course deleted
                        {this.redirectAdmin()}
                    </div>                        
                    :null
                }
                <form onSubmit={this.submitForm}>
                    <h2> Edit Course  Details</h2>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter Course Title"
                            value={this.state.formdata.courseTitle}
                            onChange={(event)=>this.handleInput(event,'courseTitle')}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter Course Code"
                            value={this.state.formdata.courseCode}
                            onChange={(event)=>this.handleInput(event,'courseCode')}
                        />
                    </div>
                    <div className="form_element">
                        <select
                            value={this.state.formdata.courseUnit}
                            onChange={(event)=>this.handleInput(event,'courseUnit')}
                        >
                            <option val="1">1</option>
                            <option val="2">2</option>
                            <option val="3">3</option>
                            <option val="4">4</option>
                            <option val="5">5</option>
                        </select>                        
                    </div>
                    <button type="submit">Edit Course </button>
                    <div className="delete_post">
                        <div className="button"
                            onClick = {this.deleteCourse}
                        >
                            Remove Course
                        </div>
                    </div>
                </form>
                
            </div>
        )
    }
}

function mapStateToProps(state){
    console.log(state);
    
    return {
        courses:state.courses
    }
}
export default connect(mapStateToProps)(EditCourse)