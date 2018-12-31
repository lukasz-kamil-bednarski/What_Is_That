import React from 'react';
import './PopUpView.css';
import left from '../assets/left.png';
import right from '../assets/right.png';
import {InfoView} from './infoView/InfoView';
import {AuthorView} from "./author/AuthorView";

export default  class PopUpView extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isInfo: true
        }
    }
    render(){

        return(
            <div className={"PopUp-container"}>
                {this.state.isInfo? <InfoView/> : <AuthorView/>}
                <div className={"Arrow-wrapper"}>
                    <img onClick={this.toggleView} className={"Arrow-button"} width={80} height={80} src={left}/>
                    <img onClick={this.toggleView} className={"Arrow-button"} width={80} height={80} src={right}/>
                </div>
            </div>
        )
    };

    toggleView = () =>{
        this.setState({
            isInfo: !this.state.isInfo
        })
    }
}