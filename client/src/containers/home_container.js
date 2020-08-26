import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getCourses } from '../actions'

import Courseitem from '../widgetsUI/course_items'

class HomeContainer extends Component {
    componentWillMount(){
        this.props.dispatch(getCourses(2,0,'desc'))
    }

    renderItems = (courses) =>(
        courses.list ?
            courses.list.map(item => (
                <Courseitem {...item} key={item._id}/>
            ))
        :null
    )

    loadmore = ()=>{
        let count = this.props.courses.list.length;
        this.props.dispatch(getCourses(1,count,'desc',this.props.courses.list))
    }

    render(){        
        return (
            <div>
                {this.renderItems(this.props.courses)}
                <div 
                    className="loadmore"
                    onClick={this.loadmore}>
                    More Course(s)
                </div>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        courses:state.courses
    }
}

export default connect(mapStateToProps)(HomeContainer)