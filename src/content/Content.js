import React from 'react';
import "./Content.css";
import * as tf from '@tensorflow/tfjs';
import Converter from '../utils/Converter';
import StyleManager from '../utils/StyleManager';
import LoadingScreen from './LoadingScreen';
import MnistView from './mnistView/MnistView';

export default class Content extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loadedData: false,
            result: '',
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
                    }]}
        }}

    componentWillMount() {
        this.loadModel().then(()=> this.setState({isModelLoaded:true}));
    }

    render() {
        if(this.state.classificationModel) {
                return (
                    this.state.isModelLoaded ?
                        <div className="Content-box" style={{width: window.innerWidth, height: window.innerHeight}}>

                            <div className={"Input-box"} style={{width: window.innerWidth / 3, height: window.innerHeight}}>
                                    <p onClick={()=>this.switchModel()}>MNIST</p>
                                    <input id="file" className={"Image-input"}
                                           onChange={(e) => {this.selectFile(e)}} type='file' title="Yes, Click it!"/>
                                    <label htmlFor={"file"} className={"Image-input-label"}>Choose a file</label>
                            </div>

                            <div className={"Image-box"}>
                               <div className={"Canvas-wrapper"}>
                                    <canvas ref={"canvas"} height={550} width={550}> </canvas>
                                    <span>Prediction:{this.state.result}</span>
                               </div>
                                <div className={"Button-wrapper"}>
                                    <button onClick={() => this.get_prediction()}>Predict</button>
                                </div>
                            </div>
                        </div> : <LoadingScreen/>);
        }else{
            return (
                <MnistView getBack = {this.getBack}/>
            )
        }}

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
                ctx.drawImage(img, 0, 0, ctx.canvas.width,ctx.canvas.height);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
        this.setState({
            loadedData: true
        });
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
                    result: str,
                    charData : {
                            labels: Converter.getPropNames(),
                            datasets:[
                                {
                                label:'Confidence',
                                data :results,
                                backgroundColor:StyleManager.generateRandColors(40),
                            }]}});
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

    getBack = ()=> {
        this.setState({
            classificationModel : true,
            mnistModel : false
        })
}}