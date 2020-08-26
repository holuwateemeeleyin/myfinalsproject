import React, { Component } from 'react';
import { getQuestionView, clearCourseView} from '../../actions'
import { connect } from 'react-redux';

class QuestionView extends Component {

    componentWillMount(){
        this.props.dispatch(getQuestionView(this.props.match.params.id))
    }

    // componentWillUnmount(){
    //     this.props.dispatch(clearCourseView())
    // }

    renderQuestion = (questions) =>(
        questions.question ?
            <div className="br_container">
                <div className="br_header">
                    <h2>{questions.question.question}</h2>
                    {/* <h5>{courses.course.courseCode}</h5> */}
                    <div className="br_reviewer">
                        {/* <span>Course Unit:</span>{courses.course.courseUnit} */}
                    </div>
                </div>
                <div className="br_reviewer">
                    {questions.question.option1} <br />
                    {questions.question.option2} <br />
                    {questions.question.option3} <br />
                    {questions.question.option4} 
                </div>
            </div>
        :null

    )

    render(){
        let questions = this.props.questions;
        return (
            <div>
                {this.renderQuestion(questions)}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        questions: state.questions
    }
}
export default connect(mapStateToProps)(QuestionView)