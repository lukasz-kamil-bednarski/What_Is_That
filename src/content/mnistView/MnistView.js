import React from 'react';
import "./MnistView.css";
import * as tfjs from '@tensorflow/tfjs';
import {Doughnut} from 'react-chartjs-2';
import Converter from '../../utils/Converter';
import StyleManager from "../../utils/StyleManager";
import DataProvider from '../../utils/DataProvider';
import "../Content.css";
import LoadingScreen from "../LoadingScreen";

export default class MnistView extends  React.Component{
    constructor(){
        super();
        this.colorList = [
            'rgba(241, 241, 241, 0.3)',
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
        this.color = "#cccccc";
        this.loadModel().then(()=>this.setState({loadedData :true}));

    }


    render(){
        return (
            this.state.loadedData ?
            <div className={"Mnist-container"}>
                <div className={"Drawing-board-container"}>
                    <div className={"Button-wrapper"}>
                        <div className={"Simple-button"} onClick={() => this.props.getBack()} >&larr;</div>
                        <div className={"Simple-button"} onClick={()=> this.cleanCanvas()}>Clean</div>
                        <div className={"Simple-button"} onClick={() => {this.setState({rubberMode : !this.state.rubberMode})}} style={this.state.rubberMode ? {color:'green'} : {} }>Rubber</div>
                    </div>
                    <canvas ref={(canvas) => this.canvas = canvas} className={"Draw-canvas"} width={600} height={600} onMouseMove={(event)=>{this.addMouseMove(event)}}
                              onMouseUp={()=>this.addMouseUp()} onMouseDown={(event)=>this.addMouseDown(event)} onMouseOut={()=>this.addMouseOut()}> </canvas>
                </div>
                    <div className={"Prediction-container"}>
                            <Doughnut  data = {this.state.charData} />
                            <div>
                                Prediction: {this.state.result}
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
     * Taking the data from Canvas & preprocessing & loading to the model & returning the prediction
     * @returns {Promise<void>}
     */
    async getPrediction(){
        if(this.state.loadedData) {

            let canvas = this.canvas;
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

    initializeCanvas = () => {
        let canvas = this.refs.canvas;
        let ctx = canvas.getContext("2d");
        console.log("XD")

        };
    /**
     * Drawing a line
     */

    draw = (color, thickness) =>{
        let canvas = this.canvas;
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
        let canvas = this.canvas;
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
     * Functions to enable canvas working
     */

    addMouseMove = (event)=>{
        let canvas = this.canvas;
        let fontColor = StyleManager.getDrawColor(this.colorFontObject);
        if (this.state.isDrawing) {
            let pos = DataProvider.getMousePos(canvas, event);
            this.setState({
                prevPosition: this.state.currentPosition,
                currentPosition: pos});
            if(this.state.rubberMode) {
                    fontColor = "#111111";
                    this.thickness = 3;
                    this.draw(fontColor, this.thickness);
            }else{
                this.thickness = 1;
                this.draw(fontColor, this.thickness);
            }

            this.getPrediction().then();

            }};

    addMouseUp = () => {
        this.setState({
            isDrawing: false
        });
    };

    addMouseDown = (event)=>{
        let canvas = this.canvas;
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