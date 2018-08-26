import React from 'react';
import "./MnistView.css";
import * as tfjs from '@tensorflow/tfjs';
import {Pie} from 'react-chartjs-2';
import Converter from '../../utils/Converter';
import StyleManager from "../../utils/StyleManager";
import DataProvider from '../../utils/DataProvider';
import "../Content.css";
import LoadingScreen from "../LoadingScreen";

export default class MnistView extends  React.Component{
    constructor(){
        super();
        this.colorList = [
            'rgba(255, 0, 0, 0.3)',
            'rgba(0, 255, 0, 0.7)',
            'rgba(150, 50, 255, 0.3)',
            'rgba(228, 90, 182, 1)',
            'rgba(178, 221, 70, 1)',
            'rgba(255, 150, 0, 0.3)',
            'rgba(100, 255, 100, 0.3)',
            'rgba(0, 0, 255, 0.3)',
            'rgba(228, 63, 82, 1)',
            'rgba(50, 221, 170, 1)'];

        this.colorFontObject = {
          red : 241,
          blue : 241,
          green:241
        };
        this.state = {
            result : '',
            rubberMode: false,
            realTimePredicting: false,
            isDrawing : false, // isDrawing == mouseDown
            prevPosition : null,
            currentPosition : null,
            loadedData: false,
            charData: {
                labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                datasets:[
                    {
                        data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                        label: "Digit confidence",
                        backgroundColor: this.colorList,
                    }]}};
    };

    componentWillMount(){
        this.thickness = 1;
        this.color = "#f1f1f1";
        this.loadModel().then(()=>this.setState({loadedData :true}));

    }


    render(){
        return (
            this.state.loadedData ?
            <div className={"Mnist-container"} style={{height:window.innerHeight - 50}}>
                <div className={"Drawing-board-container"}>
                    <ul>
                        <li>
                            <div onClick={() => this.props.getBack()} className={"Simple-button"}>Back</div>
                        </li>
                           <li>
                               <div className={"Simple-button"} onClick={()=> this.cleanCanvas()}>Clean</div>
                           </li>
                           <li>
                               <div className={"Simple-button"} style={{border:'solid 2px #f1f1f1'}} onClick={() => this.getPrediction()}>Predict</div>
                           </li>
                            <li>
                                <div className={"Simple-button"} onClick={() => {this.setState({rubberMode : !this.state.rubberMode})}}
                                style={this.state.rubberMode ? {border:'solid 3px #7FFF00'} : {} }>Rubber</div>
                            </li>
                            <li>
                                <a ref={"download"} download={"image.png"}>
                                    <div className={"Simple-button"} onClick={() => this.downloadImg()}>
                                        Download
                                    </div></a></li>
                        </ul>
                        <ul>
                            <li>
                                <div>
                                    <label>
                                        Thickness
                                        <input type={"number"} min={0} defaultValue={1} onChange={(input) => this.thickness = input.target.value}/>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <ul className={"Color-choose-list"} onChange={() => {StyleManager.colorCanvas(this.showCanvas, this.colorFontObject  )}}>
                                    <li><label>RGB</label></li>
                                    <li><input min={0} max={255} defaultValue={241} ref={"R"}  type={"number"} onChange={(input)=>{this.colorFontObject['red'] = input.target.value;}}/></li>
                                    <li><input min={0} max={255} defaultValue={241} ref={"G"}  type={"number"} onChange={(input)=>{this.colorFontObject['green'] = input.target.value}}/></li>
                                    <li><input min={0} max={255} defaultValue={241} ref={"B"}  type={"number"} onChange={(input)=>{this.colorFontObject['blue'] = input.target.value}}/></li>
                                </ul>
                            </li>
                            <li><canvas onClick={()=>{StyleManager.swapDrawColors(this.refs.canvas, this.colorFontObject)}} width={25} height={25}
                                      title={"Swap color"}  ref={(canvas) => this.showCanvas = canvas}> </canvas></li>
                            <li>
                                <div style={{display:'flex',alignItems:'center',justifyContent:"center"}}>
                                    <label className={"switch"}>
                                        <input type={"checkbox"} checked={this.state.realTimePredicting}
                                               onChange={() => {this.setState({realTimePredicting: !this.state.realTimePredicting}) }}/>
                                        <span className={"slider round"}> </span>
                                    </label>
                                    <label>Real-Time predict</label>
                                </div>
                            </li>
                        </ul>
                        <canvas ref={"canvas"} width={500} height={500} onMouseMove={(event)=>{this.addMouseMove(event)}}
                                onMouseUp={()=>this.addMouseUp()} onMouseDown={(event)=>this.addMouseDown(event)} onMouseOut={()=>this.addMouseOut()}> </canvas>
                        </div>
                        <div className={"Prediction-container"} style={{height: window.innerHeight - 50}}>
                            <Pie data = {this.state.charData} />
                            <div>
                                <h1>Prediction: {this.state.result}</h1>
                            </div>
                        </div>
                </div> : <LoadingScreen/>)}

    /**
     * Loading a model
     * @returns {Promise<void>}
     */

    async loadModel(){
        this.model = await tfjs.loadModel("https://raw.githubusercontent.com/lukasy09/IchLerneCNN.py/master/MNIST/model/model.json");
    };


    /**
     * Taking the data from Canvas & Preprocessing & loading to the model & returning the prediction
     * @returns {Promise<void>}
     */
    async getPrediction(){
        if(this.state.loadedData) {

            let canvas = this.refs.canvas;
            let imageData = StyleManager.getScaledData(canvas);

            await tfjs.tidy(() => {

                let img = tfjs.fromPixels(imageData, 1);
                img = tfjs.reshape(img, [1, 28, 28, 1]);
                img = tfjs.cast(img, 'float32');
                img = img.div(tfjs.scalar(255));


                const output = this.model.predict(img);
                this.preds = Array.from(output.dataSync());
            });
            this.setState({
                result : Converter.findMaxProp(this.preds),
                charData: {
                    labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                    datasets: [
                        {
                            label: "Digit confidence",
                            data: this.preds,
                        }]}});
        }
    };

    /**
     * Drawing a line
     */

    draw = (color, thickness) =>{
        let canvas = this.refs.canvas;
        let ctx = canvas.getContext("2d");
        ctx.save();

        ctx.lineWidth = 30 * thickness;

        ctx.lineCap = 'round';
        ctx.strokeStyle = color;

        ctx.beginPath();
        ctx.moveTo(this.state.prevPosition.x, this.state.prevPosition.y);
        ctx.lineTo(this.state.currentPosition.x, this.state.currentPosition.y);
        ctx.stroke();
        ctx.restore();

    };


    /**
     * Restarting canvas to initials.
     */
    cleanCanvas = () =>{
        let canvas = this.refs.canvas;
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "black";
        ctx.fill();
        this.setState({
            result: '',
            charData: {
                labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                datasets:[
                    {
                        data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                        label: "Digit confidence",
                        backgroundColor: this.colorList
                    }]}});
    };



    /**
     * Lets user to download a canvas as a .PNG file.
     */
    downloadImg = () =>{
        let download = this.refs.download;
        let canvas = this.refs.canvas;
        download.href = canvas.toDataURL('image/png');
    };

    /**
     * Functions to enable canvas working
     */

    addMouseMove = (event)=>{
        let canvas = this.refs.canvas;
        let fontColor = StyleManager.getDrawColor(this.colorFontObject);
        if (this.state.isDrawing) {
            let pos = DataProvider.getMousePos(canvas, event);
            this.setState({
                prevPosition: this.state.currentPosition,
                currentPosition: pos});
            if(this.state.rubberMode) {
                    fontColor = "black";
                    this.draw(fontColor, this.thickness);
            }else{
                this.draw(fontColor, this.thickness);
                }
                if(this.state.realTimePredicting){
                    this.getPrediction().then();
                }
            }};

    addMouseUp = () => {
        this.setState({
            isDrawing: false
        });
    };

    addMouseDown = (event)=>{
        let canvas = this.refs.canvas;
        let pos = DataProvider.getMousePos(canvas, event);
        this.setState({
            isDrawing: true,
            prevPosition: pos,
            currentPosition: pos});
    };

    addMouseOut = ()=>{
        this.setState({
            isDrawing: false
        });
    }

}