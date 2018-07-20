import React from 'react';
import "./Content.css";
import * as tf from '@tensorflow/tfjs'

export default class Content extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        return(
            <div className="Content-box" style={{width:window.innerWidth, height:window.innerHeight-50}}>
                <div className={"Input-box"} style={{width:window.innerWidth/3,height:window.innerHeight-50}}>
                    <span title={"Click below!"}>&#x21CA;</span>
                    <input id="file" className={"Image-input"} type='file' title="your text" />
                    <label for="file" className={"Image-input-label"}>Choose a file</label>
                </div>

                <div className={"Image-box"} >
                    <button>Predict</button>
                    <canvas ref={"canvas"} height={300} width={300}> </canvas>
                    <span>Prediction:</span>
                </div>
            </div>
        )
    }
}