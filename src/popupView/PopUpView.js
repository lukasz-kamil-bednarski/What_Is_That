import React from 'react';
import './PopUpView.css';
import left from '../assets/left.png';
import right from '../assets/right.png';

export default  class PopUpView extends React.Component{

    render(){
        return(
            <div className={"PopUp-container"}>
                <div className={"Paragraph-wrapper"}>
                    <p className={"Paragraph"}>
                    This project has been created as a combination of  my 2 areas of interests -
                    Machine Learning and frontend programming in JS(particularly in React).
                    </p>
                    <p className={"Paragraph"}>
                    In the project we can distinguish 2 different parts. super
                    The first one is Object recognition of different objects coming from real life.
                    The full list of objects is available under this link.
                    </p>
                </div>
                <div className={"Arrow-wrapper"}>
                    <img className={"Arrow-button"} width={80} height={80} src={left}/>
                    <img className={"Arrow-button"} width={80} height={80} src={right}/>
                </div>
            </div>
        )
    }
}