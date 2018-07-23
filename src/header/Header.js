import React from 'react';
import logo from '../images/logo1.png'
import "./Header.css"
export default class Header extends React.Component{
    render(){
        return(
            <div className={"Navigation-bar"}>
                <ul>
                    <li style={{margin:'0 5px'}}><img alt={"ML-logo"} className={"Brain"} width={50} height={50} src={logo} title={"What is That?"}/></li>
                    <li>
                        <p>Machine Learning - Object classifier</p>
                    </li>

                </ul>
                <ul style={{marginRight:'1.5%'}}>
                    <li>
                        <div className={"circle-text"} title={"GitHub"}>
                        </div>
                    </li>
                    <li>
                        <div className={"circle-text-fb"} title={"Facebook"}>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}