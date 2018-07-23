import React from 'react';
import "./Content.css";
import * as tf from '@tensorflow/tfjs'
export default class Content extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            result : '' //it's a string
        }

    }
    componentWillMount(){
        this.loadModel();
    }
    render(){
        return(
            <div className="Content-box" style={{width:window.innerWidth, height:window.innerHeight-50}}>
                <div className={"Input-box"} style={{width:window.innerWidth/3,height:window.innerHeight-50}}>
                    <span title={"Click below!"}>&#x21CA;</span>
                    <input id="file" className={"Image-input"} onChange={(e)=>{this.selectFile(e)}} type='file' title="your text" />
                    <label htmlFor={"file"} className={"Image-input-label"}>Choose a file</label>
                </div>

                <div className={"Image-box"} >
                    <button onClick={()=>this.get_prediction()}>Predict</button>
                    <canvas ref={"canvas"} height={400} width={400}> </canvas>
                    <span>Prediction:{this.state.result}</span>
                </div>
            </div>
        )
    }

    /**
     * @param e -> represents event of selecting a file
     */

    selectFile = (e)=>{
        let canvas = this.refs.canvas;
        let ctx = canvas.getContext("2d");
        let reader = new FileReader();
        reader.onload = function(event){
            let img = new Image();
            img.onload = function(){

                ctx.canvas.width = 150;
                ctx.canvas.height = 150;
                ctx.drawImage(img,0,0,150,150);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);

    };


  async loadModel(){
      /*
        Model for development
       */
      this.model = await tf.loadModel("https://rawgit.com/lukasy09/IchLerneCNN.py/master/Objects/src/Model/model_js/model.json");
                  };

   get_prediction = ()=>{
       let canvas = this.refs.canvas;
       let ctx = canvas.getContext("2d");
       let imageData = ctx.getImageData(0,0,150,150);

       let pixels = tf.fromPixels(imageData,3);
       let batched = pixels.expandDims(0);
       const output = this.model.predict(batched);
       let data = Array.from(output.dataSync());

      let results = this.convertToArray(data);
      let str = Content.resultsToStr(results);
      console.log(str);
      this.setState({
          result:str
      })

   };

   convertToArray = (data) => {
       let outputArray = [];
       data.forEach((num)=>{
            outputArray.push(num)
       });
       return outputArray;
   };

     static resultsToStr(results){
        let winningIndex = results.indexOf(1);
        console.log(winningIndex);
        let str;
        switch (winningIndex) {
            case 0:
                str = "Human face";
                break;
            case 1:
                str = "Butterfly";
                break;
            case 2:
                str = "Cougar body";
                break;
            case 3:
                str = "Cougar face";
                break;
            case 4:
                str = "Crab";
                break;
            case 5:
                str = "Crayfish";
                break;
            case 6:
                str = "Crocodile";
                break;
            case 7:
                str = "Soccer ball";
                break;
            default:
                str = "Not recognized";
                break;
        }
         return str;
    };
}