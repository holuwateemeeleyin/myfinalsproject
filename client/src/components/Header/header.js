import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons' 
import { Link } from 'react-router-dom'
import Nav from './Sidenav/sidenav'

class Header extends Component {

    state = {
        showNav: false
    }

    onHideNav = ()=>{
        this.setState({showNav:false})
    }



    render(){
        return(
            <header>
                <div className="open_nav">
                    <FontAwesomeIcon icon={faBars}
                        onClick={()=>this.setState({showNav:true})}
                        style={{
                            color:'#ffffff',
                            padding:'10px',
                            cursor:'pointer'
                        }}
                    />
                </div>
                <Nav
                    showNav={this.state.showNav}
                    onHideNav={()=>this.onHideNav()}
                />


                    <Link to="/" className="logo">
                        <img alt="unilorin logo" src="/images/logo.png"/>
                    </Link>
            </header>
        )
    }
}

export default Header;