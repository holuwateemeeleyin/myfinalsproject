import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../../actions'


class Login extends Component {

    state = {
        matric:'',
        password:'',
        error:'',
        success:false
    }




    handleInputMatric = (event)=>{
        this.setState({matric:event.target.value})
    }

    handleInputPassword =(event) =>{
        this.setState({password:event.target.value})
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.user.login.isAuth){ 
            this.props.history.push('/')
        }
    }

    submitForm = (e) =>{
        e.preventDefault();
        this.props.dispatch(loginUser(this.state))
        
    }
    render(){
        let user = this.props.user;
        return (
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2>Sign in here</h2>

                    <div className="form_element">
                        <input
                            type="matric"
                            placeholder="Enter your Matric Num"
                            value={this.state.matric}
                            onChange={this.handleInputMatric}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={this.state.password}
                            onChange={this.handleInputPassword}
                        />
                    </div>

                    <button type="submit">Sign in</button>
                    <div className="error">
                        {
                            user.login ? 
                                <div>{user.login.message} </div>
                            :null
                        }
                    </div>

                </form>
            </div>
        )
    }
}
function mapStateToProps(state){
    console.log(state);
     
    return {
        user:state.user
    }
}

export default connect(mapStateToProps)(Login)