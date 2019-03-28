import React from 'react';
import "./Content.css";
import * as tf from '@tensorflow/tfjs';
import Converter from '../utils/Converter';
import LoadingScreen from './LoadingScreen';
import MnistView from './mnistView/MnistView';


export default class Content extends React.Component {

    constructor(props) {
        super(props);
        this.img = new Image();

        this.state = {
            loadedData: false,
            result: '',
            videoView: false,
            isModelLoaded: false,
            showGraph: false,
            classificationModel: true,
        };
        this.canvasSize = {
            width:500,
            height:500
        }
    }

    componentWillMount() {
        this.loadModel().then(()=> this.setState({isModelLoaded:true}));
    }

    render() {
        if(this.state.classificationModel) {
                return (
                    this.state.isModelLoaded ?
                        <div className="Content-box" style={{width: window.innerWidth, height: window.innerHeight}}>

                            <div className={"Input-box"} style={{width: window.innerWidth / 3, height: window.innerHeight}}>
                                    <span onClick={()=>this.switchModel()}>MNIST</span>
                                    <input id="file" className={"Image-input"} disabled={this.props.settings.disabled}
                                           onChange={(e) => {this.onImageUpload(e)}} type='file' title="Yes, Click it!"/>
                                    <label  htmlFor={"file"} className={"Image-input-label"}>Choose a file</label>
                            </div>

                            <div className={"Image-box"}>
                               <div className={"Canvas-wrapper"}>
                                    <canvas  ref={"canvas"} height={this.canvasSize.height} width={this.canvasSize.width}> </canvas>
                                    <span>{this.state.result}</span>
                               </div>
                                <div className={"Button-wrapper"}>
                                    <button style={this.state.loadedData ? {border:'solid 4px #004d00'} : {}} disabled={this.props.settings.disabled} onClick={() => this.get_prediction()}>Predict</button>
                                </div>

                            </div>
                        </div> : <LoadingScreen/>);
        }else{
            return(<MnistView getBack = {this.getBack}/>)
        }
    }


    componentDidMount() {
        this.img.addEventListener('load', this.drawImageToCanvas);
    }


    onImageUpload = (event) => {
        this.setState({
            result:'',
            loadedData: false
        });

        const file = event.target.files[0];

        if(file) {
            this.img.src = URL.createObjectURL(file);
            this.setState({
                loadedData: true
            });
        }
    };

    drawImageToCanvas = () => {
        let canvas = this.refs.canvas;
        let ctx = canvas.getContext("2d");
        const width = this.canvasSize.width;
        const height = this.canvasSize.height;

        const imgWidth = this.img.naturalWidth;
        const imgHeight = this.img.naturalHeight;
        let aspectRatio = 0;

        if(imgWidth < width && imgHeight < height){
            ctx.canvas.width = imgWidth;
            ctx.canvas.height = imgHeight;
            ctx.drawImage(this.img, 0, 0, imgWidth, imgHeight);

        }else {
            if (imgWidth >= imgHeight) {
                aspectRatio = width / imgWidth;
                ctx.canvas.width = width;
                ctx.canvas.height = imgHeight * aspectRatio;
                ctx.drawImage(this.img, 0, 0, ctx.canvas.width, ctx.canvas.height);
            } else {
                aspectRatio = height / imgHeight;
                ctx.canvas.width = imgWidth * aspectRatio;
                ctx.canvas.height = height;
                ctx.drawImage(this.img, 0, 0, ctx.canvas.width, ctx.canvas.height);
            }
        }
    };


    /**
     * Loading the pre-trained model.
     * @returns {Promise<void>}
     */
    async loadModel() {

         this.model = await tf.loadModel("https://raw.githubusercontent.com/lukasy09/KernelBase.py/master/Objects/src/models/model_40.json/model.json");
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
                    result: str
                })
            });
        }};


    /**
     * Allows to switch models
     */
    switchModel = ()=>{
        if(!this.state.mnistModel){
            this.setState({
                mnistModel : true,
                classificationModel : false});
               }
    };

    getBack = () =>{
        this.setState({
            classificationModel: true,
            mnistModel : false,
            result:''
        })
    }

}