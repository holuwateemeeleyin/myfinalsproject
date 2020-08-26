import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types'
import questions from '../../questions.json'
import isEmpty from '../../utils/is-empty';
import M from 'materialize-css'
import '../../../node_modules/@mdi/font/css/materialdesignicons.min.css'
class Play extends Component {
    constructor (props){
        super(props);
       this.state = {
            questions,
            currentQuestion:{},
            nextQuestion: {},
            previousQuestion:{},
            answer:'',
            numberOfQuestions:0,
            numberOfAnsweredQuestions: 0,
            currentQuestionIndex:0,
            score:0,
            correctAnswers:0,
            wrongAnswers:0,
            time: {}
       };
       this.interval = null
    }

    componentDidMount () {
        const { questions, currentQuestion, nextQuestion, previousQuestion} = this.state;
        this.displayQuestions(questions, currentQuestion, nextQuestion, previousQuestion);
        this.startTimer()
    }
    
    componentWillUnmount () {
        clearInterval(this.interval)
    }
    displayQuestions = (questions=this.state.questions, currentQuestion, nextQuestion, previousQuestion) =>{
        let { currentQuestionIndex}= this.state;
        if(!isEmpty(questions)){
            questions = this.state.questions;
            currentQuestion = questions[currentQuestionIndex];
            nextQuestion = questions[currentQuestionIndex + 1];
            previousQuestion = questions[currentQuestionIndex - 1];
            const answer = currentQuestion.answer;
            this.setState({
                currentQuestion,
                nextQuestion,
                previousQuestion,
                numberOfQuestions: questions.length,
                answer
            })
        }
    }

    handleOptionClick = (e) => {
        if(e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()){
            this.correctAnswer()
        } else {
            this.wrongAnswer()
        }
    }
    

    correctAnswer= () => {
        M.toast({
            // html:'correct Answer',
            classes :  'toast-valid',
            displayLength:1500
        })
        this.setState(prevState => ({
            score: prevState.score + 1,
            correctAnswers: prevState.correctAnswers + 1,
            // currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions:prevState.numberOfAnsweredQuestions + 1
        }), ()=>{
            if(this.state.nextQuestion === undefined){
                this.endExam()
            } else {
                this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
            }
        })
    }

    wrongAnswer = () => {
        navigator.vibrate(1000)
        M.toast({
            // html: 'Wrong Answer!',
            classes: 'toast-invalid',
            displayLength: 15000
        })
        this.setState(prevState => ({
           wrongAnswers: prevState.wrongAnswers + 1,
        //    currentQuestionIndex: prevState.currentQuestionIndex + 1,
           numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
        }), ()=>{
            if(this.state.nextQuestion === undefined){
                this.endExam()
            } else {
                this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
            }
            
        } )
    }

    handleNextButtonClick = () =>{
        if (this.state.nextQuestion !== undefined ){
            this.setState(prevState=> ({
                currentQuestionIndex: prevState.currentQuestionIndex + 1
            }), () => {
                this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
            });
        }
    }

    handlePreviousButtonClick = () =>{
        if (this.state.previousQuestion !== undefined ){
            this.setState(prevState=> ({
                currentQuestionIndex: prevState.currentQuestionIndex - 1
            }), () => {
                this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
            });
        }
    }

    handleQuitButtonClick = () => {
        if(window.confirm('Are you sure you want to submit')){
            // this.props.history.push('/');
            this.endExam()
        }
    }

    startTimer = () =>{
        const countDownTime = Date.now() + 180000;
        this.interval = setInterval(()=> {
            const now = new Date();
            const distance = countDownTime - now;
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000*60));
            const seconds = Math.floor((distance % (1000 * 60 )) / (1000));

            if(distance < 0){
                clearInterval(this.interval);
                this.setState ({
                    time: {
                        minutes: 0,
                        seconds:0
                    }
                }, () => {
                    this.endExam();
                });
            } else {
                this.setState({
                    time: {
                        minutes,
                        seconds
                    }
                })
            }
        }, 1000)
    }

    endExam = () => {
        alert ('quiz has ended');
        const { state } = this;
        const candidateStats = {
            score: state.score,
            numberOfQuestions: state.numberOfQuestions,
            numberOfAnsweredQuestions: state.correctAnswers + state.wrongAnswers,
            correctAnswers:state.correctAnswers,
            wrongAnswers:state.wrongAnswers,
        }
        console.log(candidateStats);
        setTimeout(() => {
            this.props.history.push('/play/scoredetails', candidateStats);
        }, 1000)
    }

    render (){
        const { 
            currentQuestion, 
            time,
            currentQuestionIndex,
            numberOfQuestions
        } = this.state;

        return (
            <Fragment>
                <div className= "questions">
                    <div className="timer_container">
                        <p>
                            <span style={{float:"left"}}> {currentQuestionIndex + 1} of {numberOfQuestions} </span>
                            <span className="mdi mdi-clock-outline" style={{float:"right"}}></span>
                            <span style={{float:"right"}}>{time.minutes}:{time.seconds} </span>
                        </p>
                    </div>
                    <h2> {currentQuestion.question} </h2>
                    <div className="options_container">
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionA}</p>
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionB}</p>
                    </div>
                    <div className="options_container">
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionC}</p>
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionD}</p>
                    </div>
                    <div className="button_container">
                        <button onClick={this.handlePreviousButtonClick}>Previous</button>
                        <button onClick={this.handleNextButtonClick}>Next</button>
                        <button onClick={this.handleQuitButtonClick}>Submit</button>
                    </div>
                </div>
            </Fragment>
        )
    }
} 
export default Play;