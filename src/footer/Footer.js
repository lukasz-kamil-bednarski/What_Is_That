import React from 'react';
import './Footer.css';

export default class Footer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            viewList : false
        }
    };
    render(){
        return(
        <div className={"Footer-container"} style={{width:window.innerWidth}}>
                <div className={"Title"}>
                    <span className={"Project"}>What is that?</span>
                    <span className={"Copyright"}><span>&copy;</span>What is that? All rights reserved. </span>
                </div>
            <ul>
             <li><div className={"Info"}>
                    <h2>About</h2>
                    <p>The project is a result of my training&gaining skills at Machine Learning&Data science.</p>
                    <p>For now, there are 8 available classes of objects which may be distinguished by my model.</p>
                    <ol>
                        <li>Human face</li>
                        <li>Butterfly</li>
                        <li>Cougar body</li>
                        <li>Cougar face</li>
                        <li>Crab</li>
                        <li>Crayfish</li>
                        <li>Crocodile</li>
                        <li>Soccer ball</li>
                    </ol>
                </div>
            </li>


             <li><div className={"Info"}>
                    <h2>Contact</h2>
                    <ol>
                        <li><span>&#x2709;</span>lukasy09@gmail.com</li>
                        <li><span> &#x260F;</span>606148562</li>
                        <li><a href={"https://facebook.com/lukasy09"}>Lukasz Bednarski</a> on facebook</li>
                    </ol>
                    </div>
             </li>

            <li><div className={"Info"}>
                <h2>Links</h2>
                    <ol>
                        <li><a href={"https://www.udemy.com/machinelearning/"}>Udemy ML course</a></li>
                        <li><a href={"https://www.youtube.com/watch?v=FmpDIaiMIeA"}>Video on CNN&ML</a></li>
                        <li><a href={"https://github.com/SkalskiP/ILearnMachineLearning.js"}>SkalskiP's repository</a></li>
                    </ol>
                </div>
            </li>

            </ul>
        </div>)
    }
}