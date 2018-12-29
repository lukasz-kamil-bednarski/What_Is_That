import React from 'react';
import "./Header.css";
import questionMark from '../assets/question_mark.png';
import author from '../assets/author.png';
export default class Header extends React.Component{
    render(){
        return(
            <div className={"Navigation-bar"}>
                   <div className={"Title-wrapper"}>
                        What Is That?
                   </div>

                    <div className={"Info-wrapper"}>
                        <div className={"Circle-button"} >
                            <img width={45} height={45} src={questionMark}/>
                        </div>
                        <div className={"Circle-button"} >
                            <img width={45} height={45} src={author}/>
                        </div>
                    </div>
            </div>
        )
    }
}