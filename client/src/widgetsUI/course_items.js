import React from 'react';
import { Link } from 'react-router-dom'

const CourseItem = (item)=>{
    return (
        <Link to={`/courses/${item._id}`} className="question_item">
            <div className="question_header">
                <h2> {item.courseCode}</h2>
            </div>
            <div className="question_items">
                <div className="question_bubble"> 
                    {item.courseTitle}
                </div>
                <br />
                <div className="question_bubble">
                    <strong>Course Unit</strong> : {item.courseUnit}
                </div>

            </div>
        </Link>
    )
}
export default CourseItem;