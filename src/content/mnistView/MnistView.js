import React from 'react';
import "./MnistView.css";
import * as tfjs from '@tensorflow/tfjs';
//import LoadingScreen from '../LoadingScreen';
import {Pie} from 'react-chartjs-2';
import Converter from '../../utils/Converter';
import StyleManager from "../../utils/StyleManager";

export default class MnistView extends  React.Component{
    constructor(){
        super();
        this.state = {
            result : '',
            rubberMode: false,
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
                        backgroundColor:[
                            'rgba(255, 0, 0, 0.3)',
                            'rgba(0, 255, 0, 0.7)',
                            'rgba(150, 50, 255, 0.3)',
                            'rgba(228, 90, 182, 1)',
                            'rgba(178, 221, 70, 1)',
                            'rgba(255, 150, 0, 0.3)',
                            'rgba(100, 255, 100, 0.3)',
                            'rgba(0, 0, 255, 0.3)',
                            'rgba(228, 63, 82, 1)',
                            'rgba(50, 221, 170, 1)']
                    }]}
        }};

    componentWillMount(){
        this.thickness = 1;
        this.color = "#f1f1f1";
        this.loadModel().then(()=>this.setState({loadedData :true}));

    }


    render(){
        return (
                <div className={"Mnist-container"} style={{height:window.innerHeight - 50}}>
                    <div className={"Drawing-board-container"}>
                        <ul>
                            <li>
                                <div className={"Simple-button"} onClick={() => this.getPrediction()}>
                                    Predict
                                </div>
                            </li>
                            <li>
                                <div className={"Simple-button"} onClick={()=> this.cleanCanvas()}>
                                    Clean
                                </div>
                            </li>

                            <li>
                                <div className={"Simple-button"} onClick={() => {this.setState({rubberMode : !this.state.rubberMode})}}
                                style={this.state.rubberMode ? {border:'solid 3px #7FFF00'} : {} }>
                                    Rubber
                                </div>
                            </li>
                        </ul>

                        <ul className={"Parameter-list"}>
                            <li>
                                <div>
                                    <label>
                                        Thickness
                                        <input type={"number"} min={0} defaultValue={1} onChange={(input) => this.thickness = input.target.value}/>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <label>
                                        Color
                                    </label>
                                    <select defaultValue={"#f1f1f1"} style={{width:'90px'}}
                                            onChange={(input) => {this.color = input.target.value;}}>
                                        {StyleManager.renderColors()}
                                    </select>
                                </div>
                            </li>
                        </ul>
                        <canvas ref={"canvas"} width={550} height={550}> </canvas>
                        </div>
                        <div className={"Prediction-container"} style={{height: window.innerHeight - 50}}>
                            <Pie data = {this.state.charData} />
                            <div>
                                <h1>Prediction: {this.state.result}</h1>
                            </div>
                        </div>
                </div>)}

    componentDidMount(){
         let canvas = this.refs.canvas;
         let color = '#f1f1f1';
         let thickness = 1;
         canvas.addEventListener("mousedown", (event) => {
             let pos = this.getMousePos(canvas, event);
             this.setState({
                 isDrawing: true,
                 prevPosition: pos,
                 currentPosition: pos
             });
         });


         canvas.addEventListener("mousemove", (event) => {
             thickness = this.thickness;
             if (this.state.isDrawing) {
                 let pos = this.getMousePos(canvas, event);
                 this.setState({
                     prevPosition: this.state.currentPosition,
                     currentPosition: pos
                 });
                 if(this.state.rubberMode) {
                      color = "#222222";
                     this.draw(color, thickness);
                 }else{
                     color = this.color;

                     this.draw(color, thickness);
                 }

             }
         });


        canvas.addEventListener("mouseup", () => {
             this.setState({
                 isDrawing: false
             });
         });

        canvas.addEventListener(("mouseout"), () =>{
            this.setState({
                isDrawing: false
            })
        })
     };

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
            let imageData = this.getScaledData(canvas);

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
                            data: this.preds
                        }]}});
        }
    };


    getScaledData = (canvas) =>{
        let scaledCanvas = document.createElement("canvas");
        let scaledCtx = scaledCanvas.getContext("2d");

        scaledCtx.width = 28;
        scaledCtx.height = 28;

        scaledCtx.drawImage(canvas, 0, 0, 28, 28);
        return scaledCtx.getImageData(0, 0, 28, 28);
    };
    /**
     * Reading the position of a mouse
     * @param canvas
     * @param evt
     * @returns {{x: number, y: number}}
     */
    getMousePos =(canvas, evt)=> {
        let rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
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

        this.setState({
            result: '',
            charData: {
                labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                datasets:[
                    {
                        data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                        label: "Digit confidence",
                        backgroundColor:[
                            'rgba(255, 0, 0, 0.3)',
                            'rgba(0, 255, 0, 0.7)',
                            'rgba(150, 50, 255, 0.3)',
                            'rgba(228, 90, 182, 1)',
                            'rgba(178, 221, 70, 1)',
                            'rgba(255, 150, 0, 0.3)',
                            'rgba(100, 255, 100, 0.3)',
                            'rgba(0, 0, 255, 0.3)',
                            'rgba(228, 63, 82, 1)',
                            'rgba(50, 221, 170, 1)']
                    }]}
        });
    };


}