import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignInAlt, faCommentDots, faFileUpload, faSignOutAlt, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux'

const SideNavItems =({admin})=>{

    const items=[
        {
            type:'navItem',
            text:"Home",
            link:"/",
            icon:faHome,
            restricted:false
        },
        {
            type:'navItem',
            text:"Admin Profile",
            link:"/admin",
            icon:faFileAlt,
            restricted:true
        },
        {
            type:'navItem',
            text:"Feed Back",
            link:"/feedback",
            icon:faCommentDots,
            restricted:false
        },
        {
            type:'navItem',
            text:"sign-in",
            link:"/sign-in",
            icon:faSignInAlt,
            restricted:false,
            exclude:true
        
        },
        {
            type:'navItem',
            text:"Add Students",
            link:"/admin/register",
            icon:faFileUpload,
            restricted:true
        },
        {
            type:'navItem',
            text:"Add Admin",
            link:"/admin/admin-register",
            icon:faFileUpload,
            restricted:true
        },
        {
            type:'navItem',
            text:"Course review",
            link:"/admin/course-reviews",
            icon:faFileAlt,
            restricted:true
            
        },
        {
            type:'navItem',
            text:"Add Course",
            link:"/admin/add-course",
            icon:faFileAlt,
            restricted:true
            
        },
        {
            type:'navItem',
            text:"Add Question",
            link:"/admin/add-question",
            icon:faFileAlt,
            restricted:true
            
        },
        {
            type:'navItem',
            text:"Sign-out",
            link:"/admin/sign-out",
            icon:faSignOutAlt,
            restricted:true
        }
    ]

    const element = (item,i) =>(
        <div key={i} className={item.type}>
            <Link to={item.link}>
                <FontAwesomeIcon icon={item.icon}/>
                {item.text}
            </Link>
       </div>
    )

    const showItems =()=>(
        admin.signin ?
        items.map((item,i)=>{
            // return element (item,i)
            if(admin.signin.isAuth) {
                return !item.exclude ?
                element(item,i)
                :null
            } else {
                return !item.restricted ?
                    element(item,i)
                    :null
            }
        })
        :null
    )




    // not there
    // const showItems =()=>{
    //     return items.map((item,i)=>{  
    //         return (
    //             <div key={i} className={item.type}>
    //                 <Link to={item.link}>
    //                     <FontAwesomeIcon icon={item.icon} />
    //                         {item.text}
                        
    //                 </Link>
    //             </div>
    //         )
    //     })
    // }
    return(
        <div>
            {showItems()}
        </div>
    )
}

// export default SideNavItems;
function mapStateToProps(state){
    return{
        admin:state.admin
    }
}
export default connect(mapStateToProps)(SideNavItems)