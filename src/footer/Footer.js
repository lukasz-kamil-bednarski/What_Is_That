import React from 'react';
import './Footer.css';
import '../utils/StyleManager';
import NetworkGraph from '../networkGraph/NetworkGraph';
import DataProvider from "../utils/DataProvider";

export default class Footer extends React.Component{
    render(){
        return(
        <div className={"Footer-container"} style={{width:window.innerWidth}}>
            <ul className={"Project-name-list"}>
                <li><span className={"Project"}>What is that? 2 Models of Kings</span></li>
                <li><NetworkGraph width={400} height={200}/></li>
                <li><span className={"Copyright"}><span>&copy;</span>What is that? All rights reserved.</span></li>
            </ul>
            <ul>
             <li><div className={"Info"}>
                    <h2>About</h2>
                    <p>The project is a result of my training&gaining skills at Machine Learning&Data science.</p>
                    <p>For now, there are 40 available classes of objects which may be distinguished by my model.</p>
                    <p>The second model is using MNIST database.You can draw a number in range 0-9 and try to predict which of those that is.  </p>
                    <a ref={"download"}><span onClick={()=>this.downloadList()}>Download list (Class model)</span></a>
                </div>
            </li>


             <li><div className={"Info"}>
                    <h2>Contact</h2>
                    <ol>
                        <li><span>&#x2709;</span>lukasy09@gmail.com</li>
                        <li><span> &#x260F;</span>606148562</li>
                        <li><a target={"_blank"}  href={"https://facebook.com/lukasy09"}>Lukasz Bednarski</a> on facebook</li>
                    </ol>
                    </div>
             </li>

            <li><div className={"Info"}>
                <h2>Resources</h2>
                    <ol>
                        <li><a target={"_blank"} href={"https://www.udemy.com/machinelearning/"}>Udemy ML course</a></li>
                        <li><a target={"_blank"} href={"https://www.youtube.com/watch?v=FmpDIaiMIeA"}>Video on CNN&ML</a></li>
                        <li><a target={"_blank"} href={"https://github.com/SkalskiP/ILearnMachineLearning.js"}>SkalskiP's repository</a></li>
                        <li><a target={"_blank"} href={"https://github.com/lukasy09/IchLerneCNN.py/blob/master/Objects/src/models/model_3.json/model.json"}>Hosted model</a></li>
                        <li><a target={"_blank"} href={"https://github.com/lukasy09/IchLerneCNN.py/blob/master/MNIST/model/model.json"}>Hosted model 2 (MNIST)</a></li>
                        <li><a target={"_blank"} href={"https://github.com/lukasy09/IchLerneCNN.py/blob/master/Objects/src/objects_classification.ipynb"}>Kernel (class model)</a></li>
                        <li><a target={"_blank"} href={"https://github.com/lukasy09/IchLerneCNN.py/blob/master/MNIST/src/digits.ipynb"}>Kernel (Digit recognition model)</a></li>
                    </ol>
                </div>
            </li>

            </ul>
        </div>)
    }

    downloadList = ()=>{
        let downloadTag = this.refs.download;
        downloadTag.href = window.URL.createObjectURL(new Blob(
          DataProvider.getClasModelList(), {type: 'application/json'}));
        downloadTag.download = 'info.json';

    }
}