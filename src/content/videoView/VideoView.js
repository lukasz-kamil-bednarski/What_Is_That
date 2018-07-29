import React from 'react';
import './VideoView.css';

export default class VideoView extends React.Component{

    render(){
        return(
            <div className={"Video-container"} style={{width:window.innerWidth,height:window.innerHeight}}>
                <video ref={"video"} width={400} height={300} > </video>
                <button ref={"button"} className={"Snapshot-button"}>Take a snapshot </button>
            </div>
        )
    }
    componentDidMount(){
        this.handleVideo();

    }

    handleVideo = ()=>{
        let video = this.refs.video;

        navigator.getMedia = navigator.getUserMedia ||
                            navigator.webkitGetUserMedia||
                            navigator.mozGetUserMedia ||
                            navigator.msGetUserMedia;

        navigator.getMedia({
            video:true,
            audio:false
        },function(stream){
                video.srcObject = stream;
                video.play();
        },function () {
            //errors
            }
            );


        this.refs.button.addEventListener('click',()=>{
            this.props.takeSnapshot(video);
        })
    };
}