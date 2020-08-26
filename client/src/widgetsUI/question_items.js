import React from 'react';
// import { Link } from 'react-router-dom'

const Questionitem = (item)=>{
    return (
        // <Link to={`/questions/${item._id}`} className="ques_container">
            <div className="ques_container">
            <div className="ques_header">
                <h2> {item.question}</h2>
            </div>

                <div className="options">
                    <input
                        type= "radio" value="option1"/> {item.option1} <br/>
                    <input
                        type= "radio" value="option2"/> {item.option2} <br/>
                     <input
                        type= "radio" value="option3"/> {item.option3} <br/>
                     <input
                        type= "radio" value="option4"/> {item.option4} 
                    {/* {item.option1} <br />
                    {item.option2} <br />
                    {item.option3} <br />
                    {item.option4} <br /> */}
                </div>
                <br />
            </div>
        // </Link>
    )
}
export default Questionitem;