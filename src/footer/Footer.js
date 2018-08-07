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
                    <p>For now, there are 40 available classes of objects which may be distinguished by my model.</p>
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
                        <li><a target={"_blank"} href={"https://github.com/lukasy09/IchLerneCNN.py/blob/master/Objects/src/models/model_3.json/model.json"}>Hosted model</a></li>
                        <li><a target={"_blank"} href={"https://github.com/lukasy09/IchLerneCNN.py/blob/master/Objects/src/objects_classification.ipynb"}>Kernel</a></li>
                    </ol>
                </div>
            </li>

            </ul>
        </div>)
    }

    downloadList = ()=>{
        let downloadTag = this.refs.download;
        downloadTag.href = window.URL.createObjectURL(new Blob(
            ["({'Faces': 0,\n" +
            "            'accordion': 1,\n" +
            "            'barrel': 2,\n" +
            "            'binocular': 3,\n" +
            "            'buddha': 4,\n" +
            "            'butterfly': 5,\n" +
            "            'camera': 6,\n" +
            "            'cougar_body': 7,\n" +
            "            'cougar_face': 8,\n" +
            "            'crab': 9,\n" +
            "            'crayfish': 10,\n" +
            "            'crocodile': 11,\n" +
            "            'dalmatian': 12,\n" +
            "            'scissors': 13,\n" +
            "            'soccer_ball': 14,\n" +
            "            'stegosaurus': 15,\n" +
            "            'stop_sign': 16,\n" +
            "            'strawberry': 17,\n" +
            "            'sunflower': 18,\n" +
            "            'tick': 19,\n" +
            "            'trilobite': 20,\n" +
            "            'umbrella': 21,\n" +
            "            'watch': 22}"], {type: 'application/json'}));
        downloadTag.download = 'info.json';

    }
}