import React from 'react'
import axios from 'axios'

const Signout = (props)=>{
    let request = axios.get(`/api/adminLogout`)
                .then(request =>{
                    setTimeout(()=>{
                        props.history.push('/sign-in')
                    }, 2000)

                })
    return (
        <div className="logout_container">
            <h1>
                Logged out
            </h1>
        </div>
    )
};
export default Signout;