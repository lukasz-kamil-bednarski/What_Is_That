import React from 'react';
import "./Content.css";
import * as tf from '@tensorflow/tfjs';
import Converter from '../utils/Converter';
import StyleManager from '../utils/StyleManager';
import VideoView from './videoView/VideoView'
import camera from '../assets/camera.png';
export default class Content extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loadedData: false,
            result: '', //it's a string,
            videoView: false
        }

    }

    componentWillMount() {
        this.loadModel().then()
    }

    render() {
        return (
            this.state.videoView ?
                <VideoView takeSnapshot={this.takeSnapshot}/> :
                <div className="Content-box" style={{width: window.innerWidth, height: window.innerHeight - 50}}>
                    <div className={"Input-box"}
                         style={{width: window.innerWidth / 3, height: window.innerHeight - 50}}>
                        <span style={StyleManager.arrowStyleHandle(this.state.loadedData)}
                              title={"Click below!"}>&#x21CA;</span>
                        <input id="file" className={"Image-input"} onChange={(e) => {
                            this.selectFile(e)
                        }} type='file' title="your text"/>
                        <label htmlFor={"file"} className={"Image-input-label"}>Choose a file</label>
                    </div>

                    <div className={"Image-box"}>
                        <button onClick={() => this.get_prediction()}>Predict</button>
                        <canvas ref={"canvas"} height={200} width={200}> </canvas>
                        <span>Prediction:{this.state.result}</span>
                    </div>
                    <img alt={"Camera mode"} onClick={() => this.getVideoMode()} src={camera} className={"Camera"} width={50} height={50}
                         title={"Camera"}/>

                </div>
        );

    }

    componentDidMount() {
        this.canvas = this.refs.canvas;
        this.context = this.canvas.getContext("2d");
    }

    /**
     * @param e -> represents event of selecting a file
     */

    selectFile = (e) => {
        let canvas = this.refs.canvas;
        let ctx = canvas.getContext("2d");
        let reader = new FileReader();
        reader.onload = function (event) {
            let img = new Image();
            img.onload = function () {

                ctx.canvas.width = 200;
                ctx.canvas.height = 200;
                ctx.drawImage(img, 0, 0, 200, 200);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
        this.setState({
            loadedData: true
        })
    };

    /**
     * Loading the pre-trained model.
     * @returns {Promise<void>}
     */
    async loadModel() {
        /*
          Model for development 200x200
         */
        // this.model = await tf.loadModel("https://rawgit.com/lukasy09/What_Is_That/master/src/model.json/model.json");

        /*
         Model for build 200x200
           */
        this.model = await tf.loadModel("https://raw.githubusercontent.com/lukasy09/IchLerneCNN.py/master/Objects/src/models/model_3.json/model.json");


    };

    /**
     * Getting image data from canvas&preparing data for prediction&predicting.
     */
    get_prediction = () => {
        if (this.state.loadedData) {

            let canvas = this.refs.canvas;
            let ctx = canvas.getContext("2d");
            let imageData = ctx.getImageData(0, 0, 200, 200);

            let pixels = tf.fromPixels(imageData, 3);
            let batched = pixels.expandDims(0);
            const output = this.model.predict(batched);
            let data = Array.from(output.dataSync());

            let results = Converter.convertToArray(data);
            let str = Converter.mapToStr(results);


            this.setState({
                result: str
            });
        }
    };

    getVideoMode = () => {
        this.setState({
            videoView: true
        })
    };

    takeSnapshot = (video) => {
        this.setState({
            videoView: false
        });
        this.drawImage(video).then();
    };

    async drawImage(video) {
        let context = this.refs.canvas.getContext("2d");
        await context.drawImage(video, 0, 0, 200, 200);
        this.setState({
            loadedData: true
        });
    }
}