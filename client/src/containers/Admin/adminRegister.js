import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getAdmins, registerAdmin } from '../../actions';
// import moment from 'moment-js';

class AdminRegister extends PureComponent {

    state = {
        name:'',
        lastname:'',
        adminID:'',
        password:'',
        error:''
    }

    componentWillMount(){
        this.props.dispatch(getAdmins())
    }
    
    handleInputAdminID = (event)=>{
        this.setState({adminID:event.target.value})
    }
    handleInputPassword = (event)=>{
        this.setState({password:event.target.value})
    }
    handleInputName = (event)=>{
        this.setState({name:event.target.value})
    }
    handleInputLastname = (event)=>{
        this.setState({lastname:event.target.value})
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.admin.register === false){
            this.setState({error:'Error,try again'})
        } else{
            this.setState({
                name:'',
                lastname:'',
                adminID:'',
                password:''
            })
        }        
    }

    submitForm =(e) =>{
        e.preventDefault();
        this.setState({error:''});
        
        this.props.dispatch(registerAdmin({
            adminID:this.state.adminID,
            password:this.state.password,
            name:this.state.name,
            lastname:this.state.lastname
        },this.props.admin.admins))

    }

    showAdmins = (admin) =>(
        admin.admins ?
            admin.admins.map(item => (
                <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.lastname}</td>
                    <td>{item.adminID}</td>
                </tr>
            ))
        :null
    )

    render(){
        let admin = this.props.admin;
        return(
            <div className="rl_container">
               <form onSubmit= {this.submitForm}>
                    <h2>Add Admin </h2>

                    <div className="form_element">
                        <input 
                            type="text"
                            placeholder="Enter name"
                            value={this.state.name}
                            onChange={this.handleInputName}
                        />
                    </div>

                    <div className="form_element">
                        <input 
                            type="text"
                            placeholder="Enter Lastname"
                            value={this.state.lastname}
                            onChange={this.handleInputLastname}
                        />
                    </div>

                    <div className="form_element">
                        <input 
                            type="adminID"
                            placeholder="Enter adminID"
                            value={this.state.adminID}
                            onChange={this.handleInputAdminID}
                        />
                    </div>

                    <div className="form_element">
                        <input 
                            type="password"
                            placeholder="Enter Password"
                            value={this.state.password}
                            onChange={this.handleInputPassword}
                        />
                    </div>

                    <button type ="submit">Add Admin </button>
                    <div className="error">
                        {this.state.error}
                    </div>
                    </form>
                <div className="current_users">
                        <h4>Current admins:</h4>
                     <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Lastname</th>
                                <th>Admin ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.showAdmins(admin)}
                        </tbody>
                     </table>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state){
    return{
        admin:state.admin
    }
}
export default connect(mapStateToProps)(AdminRegister)
