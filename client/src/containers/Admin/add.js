import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link} from 'react-router-dom';
import { addCourse, clearNewCourse } from '../../actions'

class AddCourse extends Component {

    state = {
        formdata:{
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

    showNewCourse = (course)=>(
        course.post ?
        <div className="conf_link">
            Your Course has been added !! <Link to={`/courses/${course.courseId}`}>
                Click the link to see the Course
            </Link>
        </div>
        :null

    )

    submitForm = (e)=>{
        e.preventDefault();
        this.props.dispatch(addCourse({
            ...this.state.formdata,
            ownerId:this.props.admin.signin.id
        }))
        
    }

    componentWillUnmount(){
        this.props.dispatch(clearNewCourse())
    }

    render(){
        
        return (
            <div className="rl_container article">
                <form onSubmit={this.submitForm}>
                    <h2> Add Question Details</h2>

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
                    <button type="submit">Add Course </button>
                        {
                            this.props.courses.newcourse ?
                                this.showNewCourse(this.props.courses.newcourse)
                            :null
                        }
                </form>
                
            </div>
        )
    }
}

function mapStateToProps(state){
    
    return {
        courses:state.courses
    }
}
export default connect(mapStateToProps)(AddCourse)