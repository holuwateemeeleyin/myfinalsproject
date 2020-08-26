import React from 'react';

const Admin = (props)=>{
    console.log(props);
    let admin = props.admin.signin
    
    return(
        <div className="user_container">
            <div className="avatar">
                <img alt="avatar" src="/images/avatar.png" />
            </div>
            <div className="nfo">
                <div><span>Admin ID:</span>{admin.adminID} </div>
                {/* <div><span>Matric:</span> {user.matric} </div> */}
                <div><span>Name:</span> {admin.name} </div>
                {/* <div><span>Middlename:</span>{user.middlename} </div> */}
                <div><span>Lastname:</span> {admin.lastname} </div>
                {/* <div><span>Faculty:</span> {user.faculty} </div> */}
                {/* <div><span>Dept:</span> {user.department} </div> */}
            </div>

        </div>
    )
}
export default Admin;