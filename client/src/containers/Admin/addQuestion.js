import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addQuestion, clearNewQuestion } from '../../actions'

class AddQuestion extends Component {

    state = {
        formdata:{
            question: '',
            qtype: '',
            answer:'',
            optioncount:'',
            option1:'',
            option2:'',
            option3:'',
            option4:''
        }
    }


    handleInput = (event,name) =>{
        const newFormdata={
            ...this.state.formdata
        }
        newFormdata[name] = event.target.value

        this.setState({
            formdata:newFormdata
        })
    }

    showNewQuestion = (question) => (
        question.post ?
        <div className="conf_link">
            Your Question has been posted <Link to= {`/questions/${question.questionId}`}>
                Click to view

            </Link>
        </div>
        :null
    )

    submitForm = (e) => {
        e.preventDefault(); 
        this.props.dispatch(addQuestion({
            ...this.state.formdata,
            ownerId:this.props.admin.signin.id
        }))
    }

    componentWillUnmount(){
        this.props.dispatch(clearNewQuestion())
    }



    render() {
        return (
            <div className="rl_container article">
                <form onSubmit={this.submitForm}>
                    <h2>Add Question</h2>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter Question"
                            value={this.state.formdata.question}
                            onChange={(event)=>this.handleInput(event,'question')}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Select Question Type"
                            value={this.state.formdata.qtype}
                            onChange={(event)=>this.handleInput(event,'qtype')}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter Correct Answer"
                            value={this.state.formdata.answer}
                            onChange={(event)=>this.handleInput(event,'answer')}
                        />
                    </div>

                    <div className="form_element">
                        Select The Number Of Options <br />
                        <select
                            value={this.state.formdata.optioncount}
                            onChange={(event)=>this.handleInput(event,'optioncount')}
                        >
                            <option val="1">4</option>
                            <option val="1">2</option>
                            <option val="1">3</option>
                            <option val="1">5</option>
                        
                        </select>
                    </div>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Option 1"
                            value={this.state.formdata.option1}
                            onChange={(event)=>this.handleInput(event,'option1')}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Option 2"
                            value={this.state.formdata.option2}
                            onChange={(event)=>this.handleInput(event,'option2')}
                        />
                    </div>
                    
                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Option 3"
                            value={this.state.formdata.option3}
                            onChange={(event)=>this.handleInput(event,'option3')}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Option 4"
                            value={this.state.formdata.option4}
                            onChange={(event)=>this.handleInput(event,'option4')}
                        />
                    </div>

                    <button type="submit">Add Question</button>
                    {
                        this.props.questions.newquestion ?
                            this.showNewQuestion(this.props.questions.newquestion)
                            :null
                    }
                </form>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        questions:state.questions
    }
}
export default connect(mapStateToProps)(AddQuestion)