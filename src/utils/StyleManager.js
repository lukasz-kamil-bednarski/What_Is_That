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
    }



}