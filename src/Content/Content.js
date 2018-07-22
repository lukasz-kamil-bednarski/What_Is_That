import React from 'react';
import "./Content.css";
import * as tf from '@tensorflow/tfjs'
import axios from 'axios';
export default class Content extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        return(
            <div className="Content-box" style={{width:window.innerWidth, height:window.innerHeight-50}}>
                <div className={"Input-box"} style={{width:window.innerWidth/3,height:window.innerHeight-50}}>
                    <span title={"Click below!"}>&#x21CA;</span>
                    <input id="file" className={"Image-input"} onChange={(e)=>{this.selectFile(e)}} type='file' title="your text" />
                    <label htmlFor={"file"} className={"Image-input-label"}>Choose a file</label>
                </div>

                <div className={"Image-box"} >
                    <button onClick={()=>this.loadModel()}>Predict</button>
                    <canvas ref={"canvas"} height={400} width={400}> </canvas>
                    <span>Prediction:</span>
                </div>
            </div>
        )
    }

    selectFile = (e)=>{
        let canvas = this.refs.canvas;
        let ctx = canvas.getContext("2d");
        let reader = new FileReader();
        reader.onload = function(event){
            let img = new Image();
            img.onload = function(){

                ctx.canvas.width = img.naturalWidth;
                ctx.canvas.height = img.naturalHeight;
                ctx.drawImage(img,0,0);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);

    };


    loadModel=()=>{
                    console.log("bEgin");
                    const model = tf.loadModel("http://student.agh.edu.pl/~lbednar/model/model.json");
                        console.log("end")
                    }
}