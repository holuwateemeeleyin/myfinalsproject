import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
class ScoreDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            numberOfQuestions:0,
            numberOfAnsweredQuestions:0,
            correctAnswers:0,
            wrongAnswers:0
        }
    }

    componentDidMount () {
        const { state } = this.props.location;
        if(state){
            this.setState({
                score: (state.score / state.numberOfQuestions) * 100,
                numberOfQuestions: state.numberOfQuestions,
                numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
                correctAnswers:state.correctAnswers,
                wrongAnswers:state.wrongAnswers
            });
        }
        
    }
    render () {
        const { state }=this.props.location;
        let stats, grade;
        const userScore = this.state.score;
        if(userScore <= 44) {
            grade = 'F';
        } else if (userScore >44 && userScore <= 49){
            grade = 'D'
        }else if (userScore >49 && userScore <= 59){
            grade= 'C'
        }else if (userScore > 59 && userScore <= 69){
            grade = 'B'
        }else {
            grade='A';
        }

        if(state !== undefined) {
            stats = (
                <Fragment>
                    <div>
                        <span className="mdi mdi-check-outline success-icon"></span>
                        <span className="mdi mdi-cube-outline"></span>
                    </div>
                    <h1>Quiz has ended</h1>
                    <div className="container">
                        <h4>{grade}</h4>
                        <h2>Your Score: {this.state.score.toFixed(0)} &#37; </h2>
                        <span className="stat left">Total number of questions: </span>
                        <span className="right">{this.state.numberOfQuestions} </span> <br />

                        <span className="stat left">Number of attempted questions: </span>
                        <span className="right">{this.state.numberOfAnsweredQuestions} </span><br />

                        <span className="stat left">Number of correct answers: </span>
                        <span className="right">{this.state.correctAnswers} </span><br />

                        <span className="stat left">Number of wrong answers: </span>
                        <span className="right">{this.state.wrongAnswers} </span>
                    </div>
                    <section>
                        <ul>
                            <li>
                                <Link to ="/"> Back to Question</Link>
                            </li>
                            <li>
                                <Link to ="/play"> Play Again</Link>
                            </li>
                        </ul>
                    </section>
                </Fragment>
            );
        } else {
            stats = (
                <section>
                    <h1 className="no_stats">No Statistics Available</h1>
                    <ul>
                        <li>
                            <Link to ="/"> Back to Question</Link>
                        </li>
                        <li>
                            <Link to ="/play">Start Test</Link>
                        </li>
                    </ul>
                </section>
            )
        }
        return (
            <Fragment>
                <h1> Quiz Summary</h1>
                {stats}
            </Fragment>
        )
    }
}

export default ScoreDetails;