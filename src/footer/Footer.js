import React from 'react';
import './Footer.css';
import '../utils/StyleManager';

export default class Footer extends React.Component{
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
                    <p>For now, there are 12 available classes of objects which may be distinguished by my model.</p>
                    <a ref={"download"}><span onClick={()=>this.downloadList()}>Download list</span></a>
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
                <h2>Links</h2>
                    <ol>
                        <li><a target={"_blank"} href={"https://www.udemy.com/machinelearning/"}>Udemy ML course</a></li>
                        <li><a target={"_blank"} href={"https://www.youtube.com/watch?v=FmpDIaiMIeA"}>Video on CNN&ML</a></li>
                        <li><a target={"_blank"} href={"https://github.com/SkalskiP/ILearnMachineLearning.js"}>SkalskiP's repository</a></li>
                        <li><a target={"_blank"} href={"https://github.com/lukasy09/IchLerneCNN.py/blob/master/Objects/src/Model/model_js/model.json"}>Hosted model</a></li>
                    </ol>
                </div>
            </li>

            </ul>
        </div>)
    }

    downloadList = ()=>{
        let downloadTag = this.refs.download;
        downloadTag.href = window.URL.createObjectURL(new Blob(
            ["{" +
            "0: 'Faces',\n" +
            "1 : 'accordion',\n" +
            "2 : 'binocular',\n" +
            "3: 'buddha',\n" +
            "4: 'butterfly',\n" +
            "5: 'camera',\n" +
            "6: 'cougar_body',\n" +
            "7: 'cougar_face',\n" +
            "8: 'crab',\n" +
            "9: 'crayfish',\n" +
            "10: 'crocodile',\n" +
            "11:'soccer ball'"+
            "\n}"], {type: 'application/json'}));
        downloadTag.download = 'info.json';

    }
}