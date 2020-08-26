import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getQuestions } from '../actions'

import Questionitem from '../widgetsUI/question_items'

class QuestionsContainer extends Component {
    state = {
        count: 0,
        total: this.props.questions.length,
        showButton: false,
        questionAnswered: false,
        score:0,
    }
    // nextQuestion = nextQuestion.bind(this)
    // handleShowButton = handleShowButton.bind()
    
    componentWillMount(){
        let { count } = this.state
        this.props.dispatch(getQuestions(1,0,'desc'))
    }

    renderItems = (questions) =>(
        questions.list ?
            questions.list.map(item => (
                <Questionitem {...item} key={item._id}/>
            ))
        :null
    )

    loadmore = ()=>{
        let count = this.props.questions.list.length;
        this.props.dispatch(getQuestions(1,count,'desc',this.props.questions.list))
    }

    render(){   
        
        // let { count, total, question, answers, correct, showButton, questionAnswered, displayPopup, score} = this.state;

        return (

            <div>
                {this.renderItems(this.props.questions)}
                {/* <div 
                    className="next"
                    onClick={this.loadmore}>
                    Next
                </div> */}
                <div className="next">
                    <div className="button"
                        onClick = {this.loadmore}
                    >
                        Next
                    </div>
                </div>
            </div>
            

        );
    }
}
function mapStateToProps(state){
    return {
        questions:state.questions
    }
}

export default connect(mapStateToProps)(QuestionsContainer)