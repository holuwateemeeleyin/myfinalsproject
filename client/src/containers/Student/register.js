import React,{ PureComponent } from 'react'
import { connect } from 'react-redux'
import {getUsers, userRegister} from '../../actions'

class StudentRegister extends PureComponent {

    state = {
        matric :'',
        password:'',
        name:'',
        middlename:'',
        lastname:'',
        faculty:'',
        department:'',
        error:''
    }

    componentWillMount(){
        this.props.dispatch(getUsers())
    }

    handleInputMatric = (event)=>{
        this.setState({matric:event.target.value})
    }
    handleInputPassword = (event)=>{
        this.setState({password:event.target.value})
    }
    handleInputName = (event)=>{
        this.setState({name:event.target.value})
    }
    handleInputMiddlename = (event)=>{
        this.setState({middlename:event.target.value})
    }
    handleInputLastname = (event)=>{
        this.setState({lastname:event.target.value})
    }
    handleInputFaculty = (event)=>{
        this.setState({faculty:event.target.value})
    }
    handleInputDepartment = (event)=>{
        this.setState({department:event.target.value})
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.user.register === false){
            this.setState({error:'Error,try again'})
        } else{
            this.setState({
                name:'',
                middlename:'',
                lastname:'',
                matric :'',
                password:'',
                faculty:'',
                department:''
            })
        }        
    }
    // handleInput =(event,name)=>{
    //     const newFormdata ={
    //         ...this.state.formdata
    //     }
    //     newFormdata[name]=event.target.value

    //     this.setState({
    //         formdata:newFormdata
    //     })
    // }

submitForm =(e)=>{
    e.preventDefault();
    this.setState({error:''});
        
    this.props.dispatch(userRegister({
        matric:this.state.matric,
        password:this.state.password,
        name:this.state.name,
        middlename:this.state.middlename,
        lastname:this.state.lastname,
        faculty:this.state.faculty,
        department:this.state.department
    },this.props.user.users))
}


showUsers= (user) =>(
    user.users ?
        user.users.map(item => (
            <tr key={item._id}>
                <td>{item.matric}</td>
                <td>{item.name}</td>
                <td>{item.middlename}</td>
                <td>{item.lastname}</td>
                <td>{item.faculty}</td>
                <td>{item.department}</td>
            </tr>
        ))
    :null
)


// showUsers = (user) =>(
//     user.users ?
//         user.users.map(item => (
//             <tr key={item._id}>
//                 <td>{item.matric}</td>
//                 <td>{item.name}</td>
//                 <td>{item.middlename}</td>
//                 <td>{item.lastname}</td>
//                 <td>{item.faculty}</td>
//                 <td>{item.department}</td>
//             </tr>
//         ))
//     :null
// )

    render (){
        let user=this.props.user
        return (
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2>Add Student</h2>
                    
                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Student's Name"
                            value={this.state.name}
                            onChange={this.handleInputName}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Student's Middlename"
                            value={this.state.middlename}
                            onChange={this.handleInputMiddlename}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Student's Lastname"
                            value={this.state.lastname}
                            onChange={this.handleInputLastname}
                        />
                    </div>
                    <div className="form_element">
                        <input 
                            type="text"
                            placeholder="Student's Matric"
                            value={this.state.matric}
                            onChange={this.handleInputMatric}
                        />
                    </div>
                    <div className="form_element">
                        <input 
                            type="password"
                            placeholder="Student's Password"
                            value={this.state.password}
                            onChange={this.handleInputPassword}
                        />
                    </div>

                    <div className="form_element">
                    <input
                        list="faculty"
                        // name="faculty"
                        placeholder="Student's Faculty"
                        value={this.state.faculty}
                        onChange={this.handleInputFaculty}
                    />
                    <datalist id="faculty">
                        <option value="Agriculture"/>
                        <option value="Arts"/>
                        <option value="Basic Medical Sciences"/>
                        <option value="Communication and Information Sciences"/>
                        <option value="Clinical Sciences"/>
                        <option value="Education"/>
                        <option value="Engineering and Technology"/>
                        <option value="Environmental Sciences"/>
                        <option value="Law"/>
                        <option value="Life Sciences"/>
                        <option value="Management Sciences"/>
                        <option value="Pharmaceutical Sciences"/>
                        <option value="Physical Sciences"/>
                        <option value="Social Sciences"/>
                        <option value="Veterinary Medicine"/>
                    </datalist>
                    </div>
                    
                    <div className="form_element">
                        <input 
                            type="text"
                            placeholder="Student's Department"
                            value={this.state.department}
                            onChange={this.handleInputDepartment}
                        />
                    </div>

                    <div className="error">
                        {this.state.error}
                    </div>
                    
                    <button type="submit">Add Student</button>
                </form>
                <div className="current_users">
                    <h4>Current admins:</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Student's Matric</th>
                                <th>Student's Name</th>
                                <th>Student's Middlename</th>
                                <th>Student's Lastname</th>
                                <th>Student's Faculty</th>
                                <th>Student's Department</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.showUsers(user)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        user:state.user
    }
}
export default connect(mapStateToProps)(StudentRegister)