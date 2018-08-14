import React from 'react';
import './Footer.css';
import '../utils/StyleManager';

export default class Footer extends React.Component{
    render(){
        return(
        <div className={"Footer-container"} style={{width:window.innerWidth}}>
                <div className={"Title"}>
                    <span className={"Project"}>What is that? 2 Models of Kings</span>
                    <span className={"Copyright"} style={{position:'absolute',left:'0%',bottom:'-25%'}}><span>&copy;</span>What is that? All rights reserved. </span>
                </div>
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
            ["{'Faces': 0,\n" +
            " 'Leopards': 1,\n" +
            " 'accordion': 2,\n" +
            " 'barrel': 3,\n" +
            " 'binocular': 4,\n" +
            " 'buddha': 5,\n" +
            " 'butterfly': 6,\n" +
            " 'camera': 7,\n" +
            " 'cougar_body': 8,\n" +
            " 'cougar_face': 9,\n" +
            " 'crab': 10,\n" +
            " 'crayfish': 11,\n" +
            " 'crocodile': 12,\n" +
            " 'dalmatian': 13,\n" +
            " 'grand_piano': 14,\n" +
            " 'hawksbill': 15,\n" +
            " 'headphone': 16,\n" +
            " 'hedgehog': 17,\n" +
            " 'helicopter': 18,\n" +
            " 'ibis': 19,\n" +
            " 'inline_skate': 20,\n" +
            " 'joshua_tree': 21,\n" +
            " 'ketch': 22,\n" +
            " 'lamp': 23,\n" +
            " 'laptop': 24,\n" +
            " 'menorah': 25,\n" +
            " 'metronome': 26,\n" +
            " 'minaret': 27,\n" +
            " 'pigeon': 28,\n" +
            " 'pizza': 29,\n" +
            " 'scissors': 30,\n" +
            " 'soccer_ball': 31,\n" +
            " 'stegosaurus': 32,\n" +
            " 'stop_sign': 33,\n" +
            " 'strawberry': 34,\n" +
            " 'sunflower': 35,\n" +
            " 'tick': 36,\n" +
            " 'trilobite': 37,\n" +
            " 'umbrella': 38,\n" +
            " 'watch': 39}"], {type: 'application/json'}));
        downloadTag.download = 'info.json';

    }
}