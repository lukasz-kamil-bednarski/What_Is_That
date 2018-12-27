import React from 'react';
import "./LoadingScreen.css";

export default class LoadingScreen extends React.Component{
    render(){
        return(
            <div className={"Loading-container"} style={{width:window.innerWidth,height:window.innerHeight}}>
                <canvas width={400} height={400} ref={"canvas"}> </canvas>
                <span>Loading...</span>
            </div>
        )
    }
    componentDidMount(){
        let context = this.refs.canvas.getContext("2d");
        this.animateLoadingScreen(context);
    }
    animateLoadingScreen = (context) =>{
        context.strokeStyle = "#f1f1f1";

        context.beginPath();
        context.arc(200,200,200,0,Math.PI/2);
        context.lineWidth = 10;
        context.stroke();

        context.beginPath();
        context.arc(200,200,150,0,Math.PI/2);
        context.lineWidth = 8;
        context.stroke();

        context.beginPath();
        context.arc(200,200,100,0,Math.PI/2);
        context.lineWidth = 5;
        context.stroke();


        context.beginPath();
        context.arc(200,200,200,Math.PI,-Math.PI/2);
        context.lineWidth = 10;
        context.stroke();

        context.beginPath();
        context.arc(200,200,150,Math.PI,-Math.PI/2);
        context.lineWidth = 8;
        context.stroke();

        context.beginPath();
        context.lineWidth = 5;
        context.arc(200,200,100,Math.PI,-Math.PI/2);
        context.stroke();

    }

}