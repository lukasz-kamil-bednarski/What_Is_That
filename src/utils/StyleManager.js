import React from 'react';

export default class StyleManager {


    static arrowStyleHandle = (condition) => {
        if (!condition) {
            return {animation: 'shake 3s infinite cubic-bezier(.36,.07,.19,.97) both'}
        }
        return null;
    };


    static viewListStyle = (condition) =>{
        if(condition) {
            return null;
        }
        return {display:'none'};

    };

    /**
     * Scaling data from canvas.
     * @param canvas
     * @returns {ImageData}
     */
    static getScaledData = (canvas) =>{
        let scaledCanvas = document.createElement("canvas");
        let scaledCtx = scaledCanvas.getContext("2d");

        scaledCtx.width = 28;
        scaledCtx.height = 28;

        scaledCtx.drawImage(canvas, 0, 0, 28, 28);
        return scaledCtx.getImageData(0, 0, 28, 28);
    };



    /**
     *@Deprecated
     * @returns {any[]}
     */
    static renderColors = () =>{
        let counter = -1;
        const colorHexList = ["#A52A2A","#8B0000","#F08080","#000080", "#f1f1f1"];
        return colorHexList.map((singleColor) =>{
            counter++;
            return(
                <option key={counter} style={{minWidth:'2px',minHeight:"2px",color:'black',fontWeight:'bold',backgroundColor:singleColor}}>
                    {singleColor}
                </option>
            )
        })
    };

    /**
     * @Deprecated
     * @param number
     * @returns {Array}
     */

    static generateRandColors = (number) =>{
        let colorList = [];

        for(let i = 0 ; i<number ; i++){
           let colorObject = {
               red : Math.floor(Math.random() * 255),
               green : Math.floor(Math.random() * 255 ),
               blue : Math.floor(Math.random() * 255 ),
               alpha : Math.random()
           };
           let str = `rgba(${colorObject['red']},${colorObject['green']}, ${colorObject['blue']},${colorObject['alpha']})`;
           colorList.push(str);
        }

        return colorList;
    };


    /**
     * @param colorObject
     * @returns {string}
     */
    static getDrawColor = (colorObject) => {
      return `rgb(${colorObject['red']},${colorObject['green']},${colorObject['blue']})`;
    };
    /**
     * Coloring showCanvas while changing fontColor
     * @param canvas
     * @param colorObject
     */
   static colorCanvas = (canvas, colorObject) =>{
       let ctx = canvas.getContext("2d");
       ctx.fillStyle = StyleManager.getDrawColor(colorObject);
       ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
       ctx.fill();
   };

   static swapDrawColors = (canvas, colorFontObject) => {
       let ctx = canvas.getContext("2d");
       let imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

       for (let i = 0; i < imageData.data.length; i = i + 4) {
           if (imageData.data[i] !== 0 && imageData.data[i + 1] !== 0 && imageData.data[i + 2] !== 0) {
               if (imageData.data[i] !== colorFontObject['red'] || imageData.data[i + 1] !== colorFontObject['green'] || imageData.data[i + 2] !== colorFontObject['blue']) {
                   imageData.data[i] = colorFontObject['red'];
                   imageData.data[i + 1] = colorFontObject['green'];
                   imageData.data[i + 2] = colorFontObject['blue'];
               }
           }
       }
       ctx.putImageData(imageData, 0, 0, 0, 0, 500, 500);
   }
}