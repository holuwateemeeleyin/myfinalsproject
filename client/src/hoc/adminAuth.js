import React, { Component } from 'react';
import { adminAuth } from '../actions'
import {connect} from 'react-redux';

export default function(ComposedClass,reload){
    class AdminAuthenticationCheck extends Component {

        state = {
            loading:true
        }
        componentWillMount(){
            this.props.dispatch(adminAuth())
        }

        componentWillReceiveProps(nextProps){ 
            
            this.setState({loading:false})
            
            if(!nextProps.admin.signin.isAuth){
                if(reload){
                    this.props.history.push('/sign-in');
                }
            }else {
                if(reload === false){
                    this.props.history.push('/admin')
                }
            }
        }

        
        render(){            
            if(this.state.loading){
                return <div className="loader">Loading </div>
            }
            return(

                <ComposedClass {...this.props} admin={this.props.admin}/>
            )
        }
    }

    function mapStateToProps(state){
        return{
            admin:state.admin
        }
    }
    return connect(mapStateToProps)(AdminAuthenticationCheck)
}