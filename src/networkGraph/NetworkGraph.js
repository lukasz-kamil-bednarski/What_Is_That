import React from 'react';
import DataProvider from '../utils/DataProvider'

export default class NetworkGraph extends React.Component{
   constructor(props){
       super(props);
   }

    render(){
        return(
            <div style={{textAlign:'center'}}>
                <canvas style={{backgroundColor:'transparent'}} ref={(canvas)=> this.canvas = canvas} width={this.props.width} height={this.props.height}> </canvas>
            </div>
        )
    }
    componentDidMount(){
        this.createNetwork();
    }

    createNetwork = ()=>{
            let ctx = this.canvas.getContext("2d");
            const radius = 20;
            const interval = 10;
            let xCoordinate = 20;
            let yCoordinate = 20 + interval/2;
            /*
            First Layer
             */
            ctx.strokeStyle = "#8B008B";
            for(let i = 0 ; i<4; i++){
                ctx.beginPath();
                ctx.lineWidth = 5;
                ctx.arc(xCoordinate,yCoordinate,radius,0,2*Math.PI);
                yCoordinate = yCoordinate + 2*radius + interval;
                ctx.stroke();
            }
            /*
                Second Layer
             */
        ctx.strokeStyle = "#8B0000";
        xCoordinate = 20 + 2*radius + interval*4;
        yCoordinate = 20 + interval/2;
        for(let i = 0 ; i<4; i++){
            ctx.beginPath();
            ctx.arc(xCoordinate,yCoordinate,radius,0,2*Math.PI);
            yCoordinate = yCoordinate + 2*radius + interval;
            ctx.stroke();
        }
        /*
            Connection between 1st and 2st layers
         */
        ctx.beginPath();
        ctx.strokeStyle= "#f1f1f1";
        let yStart = 25;
        for (let i =0; i< 4; i++) {
            let xStart = 20;
            let xEnd = xStart + 2 * radius + interval * 4;
            let yEnd = 25;
            for (let j = 0; j < 4; j++) {
                let thickness = DataProvider.getDiscreteGraphWeight();
                if(thickness === 0){
                    continue
                }
                ctx.lineWidth = thickness;
                ctx.moveTo(xStart, yStart);
                ctx.lineTo(xEnd, yEnd);
                ctx.stroke();
                yEnd = yEnd + 2 * radius + interval;
            }
            yStart = yStart + 2*radius + interval;
        }

        /*
        Third(last) hidden layer
         */
        xCoordinate = xCoordinate + 2*radius + interval*4;
        yCoordinate = 20 + interval/2;
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#8B0000";
        for(let i = 0 ; i<4; i++) {
            ctx.beginPath();
            ctx.arc(xCoordinate, yCoordinate, radius, 0, 2 * Math.PI);
            yCoordinate = yCoordinate + 2 * radius + interval;
            ctx.stroke();
        }


        /*
          Connection between 2st and 3st layers
       */
        ctx.beginPath();
        ctx.strokeStyle= "#f1f1f1";
        yStart = 25;
        for (let i =0; i< 4; i++) {
            let xStart = 20 + 2*radius + interval * 4;
            let xEnd = xStart + 2 * radius + interval * 4;
            let yEnd = 25;
            for (let j = 0; j < 4; j++) {
                let thickness = DataProvider.getDiscreteGraphWeight();
                if(thickness === 0){
                    continue
                }
                ctx.lineWidth = thickness;
                ctx.moveTo(xStart, yStart);
                ctx.lineTo(xEnd, yEnd);
                ctx.stroke();
                yEnd = yEnd + 2 * radius + interval;
            }
            yStart = yStart + 2*radius + interval;
        }


        /*
        Output Layer
         */
        ctx.strokeStyle = "#006400";
        ctx.beginPath();
        ctx.lineWidth =5;
        xCoordinate = xCoordinate + 4*radius + interval*4;
        yCoordinate = 40;
        for(let i = 0 ; i<2; i++) {
            ctx.beginPath();
            ctx.arc(xCoordinate, yCoordinate, radius, 0, 2 * Math.PI);
            yCoordinate = 150;
            ctx.stroke();
        }

        /*
        Connection between 3rd and output layer.
         */
        ctx.beginPath();
        ctx.strokeStyle= "#f1f1f1";
        yStart = 25;
        for (let i =0; i< 4; i++) {
            let xStart = (20 + 2*radius + interval * 4)*2 - radius;
            let xEnd = xStart + 4 * radius + interval * 4;
            let yEnd = 40;
            for (let j = 0; j < 2; j++) {
                let thickness = DataProvider.getDiscreteGraphWeight();
                if(thickness === 0){
                    continue
                }
                ctx.lineWidth = thickness;
                ctx.moveTo(xStart, yStart);
                ctx.lineTo(xEnd, yEnd);
                ctx.stroke();
                yEnd = 140;
            }
            yStart = yStart + 2*radius + interval;
        }
    }



}