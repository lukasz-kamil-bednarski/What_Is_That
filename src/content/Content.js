import React from 'react';
import "./Content.css";
import * as tf from '@tensorflow/tfjs';
import Converter from '../utils/Converter';
import StyleManager from '../utils/StyleManager';
import VideoView from './videoView/VideoView'
import camera from '../assets/camera.png';
import LoadingScreen from './LoadingScreen';
import {Bar} from 'react-chartjs-2';
import MnistView from './mnistView/MnistView';

export default class Content extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loadedData: false,
            result: '', //it's a string,
            videoView: false,
            isModelLoaded: false,
            showGraph: false,
            classificationModel: true,
            mnistModel : false,

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
        this.loadModel().then(()=> this.setState({isModelLoaded:true}));
    }

    render() {
        if(this.state.classificationModel) {
            if (!this.state.showGraph) {
                return (
                    this.state.videoView ?
                        <VideoView takeSnapshot={this.takeSnapshot}/> :
                        this.state.isModelLoaded ?
                            <div className="Content-box"
                                 style={{width: window.innerWidth, height: window.innerHeight - 50}}>
                                <div className={"Input-box"}
                                     style={{width: window.innerWidth / 3, height: window.innerHeight - 50}}>
                                    <ul>
                                        <li>
                                            <span>Class</span>
                                            <label className={"switch"}>
                                                <input type={"checkbox"} checked={this.state.classificationModel}
                                                       onChange={() => this.handleModel(0)}/>
                                                <span className={"slider round"}> </span>
                                            </label>
                                        </li>

                                        <li>
                                            <label className={"switch"}>
                                                <input type={"checkbox"} checked={this.state.mnistModel}
                                                       onChange={() => this.handleModel(1)}/>
                                                <span className={"slider round"}> </span>
                                            </label>
                                            <span>MNIST</span>
                                        </li>
                                    </ul>
                                    <span style={StyleManager.arrowStyleHandle(this.state.loadedData)}
                                          title={"Click below!"}>&#x21CA;</span>
                                    <input accept="image/x-png,image/jpeg" id="file" className={"Image-input"}
                                           onChange={(e) => {
                                               this.selectFile(e)
                                           }} type='file' title="your text"/>
                                    <label htmlFor={"file"} className={"Image-input-label"}>Choose a file</label>
                                </div>

                                <div className={"Image-box"}>
                                    <ul>
                                        <canvas ref={"canvas"} height={400} width={400}> </canvas>
                                        <span>Prediction:{this.state.result}</span>
                                    </ul>

                                    <ul style={{marginLeft: '1%'}}>
                                        <li>
                                            <button onClick={() => this.get_prediction()}>Predict</button>
                                        </li>
                                        <li>
                                            <button onClick={() => this.showGraph()}>Graph</button>
                                        </li>
                                    </ul>

                                </div>
                                <img alt={"Camera mode"} onClick={() => this.getVideoMode()} src={camera}
                                     className={"Camera"} width={40} height={40}
                                     title={"Camera"}/>

                            </div> : <LoadingScreen/>
                );
            } else {
                return (
                    <div className="Content-box" style={{
                        width: window.innerWidth,
                        height: window.innerHeight - 50,
                        padding: '10px',
                        flexDirection: 'column'
                    }}>
                        <div className={"Button-back"}>
                            <button onClick={() => this.setState({showGraph: false})}>Back</button>
                        </div>

                        <div className={"Chart-box"}>
                            <Bar data={this.state.charData}/>
                        </div>
                    </div>
                )
            }
        }else{
            return (
                <MnistView getBack = {this.getBack}/>
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

                ctx.canvas.width = img.naturalWidth;
                ctx.canvas.height = img.naturalHeight;
                ctx.drawImage(img, 0, 0, img.naturalWidth,img.naturalHeight);
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
                let imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

                let pixels = tf.fromPixels(imageData, 3);

                let resized= tf.image.resizeBilinear(pixels,[200,200]);

                let batched = resized.expandDims(0);
                batched = batched.toFloat().div(tf.scalar(255));

                const output = this.model.predict(batched);
                let data = Array.from(output.dataSync());

                let results = Converter.convertToArray(data);
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
        await context.drawImage(video, 0, 0, 400, 400);
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
    };


    /**
     * Allows to switch models
     */
    handleModel = (modelIndex)=>{
       switch (modelIndex){
           case 0:
               if(!this.state.classificationModel){
                   this.setState({
                       classificationModel : true,
                       mnistModel : false
                   });
               }
               break;

           case 1:
               if(!this.state.mnistModel){
                   this.setState({
                       mnistModel : true,
                       classificationModel : false
                   });
               }

               break;

           default:
               console.log("Error in code")
       }
    };

    getBack = ()=> {
        this.setState({
            classificationModel : true,
            mnistModel : false
        })
}

}