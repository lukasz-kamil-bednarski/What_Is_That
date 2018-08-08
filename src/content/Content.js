import React from 'react';
import "./Content.css";
import * as tf from '@tensorflow/tfjs';
import Converter from '../utils/Converter';
import StyleManager from '../utils/StyleManager';
import VideoView from './videoView/VideoView'
import camera from '../assets/camera.png';
import LoadingScreen from './LoadingScreen';
import {Bar} from 'react-chartjs-2'

export default class Content extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loadedData: false,
            result: '', //it's a string,
            videoView: false,
            isModelLoaded: false,
            showGraph: false,

            charData : {
                options:{
                    legend: {
                        labels: Converter.getPropNames(),
                        fontColor:'#f1f1f1'
                }},
                datasets:[
                    {
                        label:'Confidence',
                        data : []
                    }
                ]
            }
        }

    }

    componentWillMount() {
        this.loadModel().then(()=> this.setState({isModelLoaded:true,result:''}));
        console.log(Converter.getPropNames())
    }

    render() {
        if(!this.state.showGraph) {
            return (
                this.state.videoView ?
                    <VideoView takeSnapshot={this.takeSnapshot}/> :
                    this.state.isModelLoaded ?
                        <div className="Content-box"
                             style={{width: window.innerWidth, height: window.innerHeight - 50}}>
                            <div className={"Input-box"}
                                 style={{width: window.innerWidth / 3, height: window.innerHeight - 50}}>
                        <span style={StyleManager.arrowStyleHandle(this.state.loadedData)}
                              title={"Click below!"}>&#x21CA;</span>
                                <input accept="image/x-png,image/jpeg" id="file" className={"Image-input"}
                                       onChange={(e) => {
                                           this.selectFile(e)
                                       }} type='file' title="your text"/>
                                <label htmlFor={"file"} className={"Image-input-label"}>Choose a file</label>
                            </div>

                            <div className={"Image-box"} >
                                <ul>
                                    <canvas ref={"canvas"} height={200} width={200}> </canvas>
                                    <span>Prediction:{this.state.result}</span>
                                </ul>

                                <ul style={{marginLeft:'1%'}}>
                                    <li><button onClick={() => this.get_prediction()}>Predict</button></li>
                                    <li><button onClick={()=>this.showGraph()}>Graph</button></li>
                                </ul>

                            </div>
                            <img alt={"Camera mode"} onClick={() => this.getVideoMode()} src={camera}
                                 className={"Camera"} width={40} height={40}
                                 title={"Camera"}/>

                        </div> : <LoadingScreen/>
            );
        }else{
                return(
                    <div className="Content-box" style={{width: window.innerWidth, height: window.innerHeight - 50,padding:'10px',flexDirection:'column'}}>
                        <div className={"Button-back"}>
                            <button onClick={()=>this.setState({showGraph:false})}>Back</button>
                        </div>

                        <div className={"Chart-box"}>
                            <Bar data = {this.state.charData}/>
                        </div>
                    </div>
                )
        }

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
                ctx.drawImage(img, 0, 0, 200,200);
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

         this.model = await tf.loadModel("https://raw.githubusercontent.com/lukasy09/IchLerneCNN.py/master/Objects/src/models/model_40.json/model.json");

    };

    /**
     * Getting image data from canvas&preparing data for prediction&predicting.
     */
    async get_prediction (){
        if (this.state.loadedData) {

            await tf.tidy(()=> {
                let canvas = this.refs.canvas;
                let ctx = canvas.getContext("2d");
                let imageData = ctx.getImageData(0, 0, 200, 200);

                let pixels = tf.fromPixels(imageData, 3);

                let batched = pixels.expandDims(0);
                batched = batched.toFloat().div(tf.scalar(255));

                const output = this.model.predict(batched);
                let data = Array.from(output.dataSync());

                let results = Converter.convertToArray(data);
                console.log(results);
                let str = Converter.mapToStr(results);

                this.setState({
                    result: str,
                    charData : {
                            labels: Converter.getPropNames(),
                            datasets:[
                                {
                                label:'Propablities',
                                data :results,
                                backgroundColor:[
                                    'rgba(255, 0, 0, 0.3)',
                                    'rgba(0, 255, 0, 0.3)',
                                    'rgba(0, 0, 255, 0.3)',
                                    'rgba(228, 63, 82, 1)',
                                    'rgba(178, 221, 70, 1)',
                                    'rgba(255, 0, 0, 0.3)',
                                    'rgba(0, 255, 0, 0.3)',
                                    'rgba(0, 0, 255, 0.3)',
                                    'rgba(228, 63, 82, 1)',
                                    'rgba(178, 221, 70, 1)',
                                    'rgba(255, 0, 0, 0.3)',
                                    'rgba(0, 255, 0, 0.3)',
                                    'rgba(0, 0, 255, 0.3)',
                                    'rgba(228, 63, 82, 1)',
                                    'rgba(178, 221, 70, 1)',
                                    'rgba(255, 0, 0, 0.3)',
                                    'rgba(0, 255, 0, 0.3)',
                                    'rgba(0, 0, 255, 0.3)',
                                    'rgba(228, 63, 82, 1)',
                                    'rgba(178, 221, 70, 1)',
                                    'rgba(255, 0, 0, 0.3)',
                                    'rgba(0, 255, 0, 0.3)',
                                    'rgba(0, 0, 255, 0.3)',
                                    'rgba(228, 63, 82, 1)',
                                    'rgba(178, 221, 70, 1)',
                                    'rgba(178, 221, 70, 1)',
                                    'rgba(255, 0, 0, 0.3)',
                                    'rgba(0, 255, 0, 0.3)',
                                    'rgba(0, 0, 255, 0.3)',
                                    'rgba(228, 63, 82, 1)',
                                    'rgba(178, 221, 70, 1)',
                                    'rgba(178, 221, 70, 1)',
                                    'rgba(255, 0, 0, 0.3)',
                                    'rgba(0, 255, 0, 0.3)',
                                    'rgba(0, 0, 255, 0.3)',
                                    'rgba(228, 63, 82, 1)',
                                    'rgba(178, 221, 70, 1)',
                                    'rgba(178, 221, 70, 1)',
                                    'rgba(255, 0, 0, 0.3)',
                                    'rgba(0, 255, 0, 0.3)',
                                    'rgba(0, 0, 255, 0.3)',
                                    'rgba(228, 63, 82, 1)',
                                    'rgba(178, 221, 70, 1)',
                                ],
                            }
                        ]
                    }
                });
            })
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


    /**
     * Changing stage to graph
     */
    showGraph = ()=>{
        this.setState({
            showGraph : true
        })
    }
}