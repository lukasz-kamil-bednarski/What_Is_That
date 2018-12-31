import React from 'react';
import "./Header.css";
import questionMark from '../assets/question_mark.png';
export default class Header extends React.Component{
    render(){
        return(
            <div className={"Navigation-bar"}>
                   <div className={"Title-wrapper"}>
                        What Is That?
                   </div>

                    <div className={"Info-wrapper"}>
                        <div className={"Circle-button"} onClick={this.props.handlePopUp} >
                            <img width={45} height={45} src={questionMark}/>
                        </div>
                    </div>
            </div>
        )
    }
}