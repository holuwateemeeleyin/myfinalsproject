import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signInAdmin } from '../../actions'
// import { signInUser } from '../../actions'


class SignIn extends Component {

    state = {
        adminID:'',
        password:'',
        error:'',
        success:false
        // matric:'',
        // password:'',
        // error:'',
        // success:false,
    }




    handleInputAdminID = (event)=>{
        this.setState({adminID:event.target.value})
    }

    handleInputPassword =(event) =>{
        this.setState({password:event.target.value})
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.admin.signin.isAuth){ 
            this.props.history.push('/admin')
        }
    }

    submitForm = (e) =>{
        e.preventDefault();
        this.props.dispatch(signInAdmin(this.state))
        
    }
    render(){
        let admin = this.props.admin;
        return (
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2>Sign in here</h2>

                    <div className="form_element">
                        <input
                            type="adminID"
                            placeholder="Enter your admin ID"
                            value={this.state.adminID}
                            onChange={this.handleInputAdminID}
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
                            admin.signin ? 
                                <div>{admin.signin.message} </div>
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
        admin:state.admin
    }
}

export default connect(mapStateToProps)(SignIn)