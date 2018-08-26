import React from 'react';
import logo from '../assets/logo1.png';
import "./Header.css";
export default class Header extends React.Component{
    render(){
        return(
            <div className={"Navigation-bar"}>
                <ul>
                    <li><p>What is that? 2 Models of Kings  </p></li>
                </ul>
                <ul style={{marginRight:'1.5%'}}>
                    <li>
                     <a href={"https://www.github.com/lukasy09"} target={"_blank"}> <div className={"circle-text"} style={{marginLeft:'5px'}} title={"GitHub"}>
                     </div></a>
                    </li>
                    <li>
                        <a href={"https://www.facebook.com/lukasy09"} target={"_blank"}><div className={"circle-text-fb"} style={{marginLeft:'5px'}} title={"Facebook"}>
                        </div></a>
                    </li>
                </ul>
            </div>
        )
    }
    redirect=()=>{
        window.location="https://www.google.com"
    }


}