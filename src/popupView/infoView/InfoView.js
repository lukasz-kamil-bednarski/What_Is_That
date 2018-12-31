import React from 'react';
import '../PopUpView.css';

export const InfoView = () =>{

    let toggleDownload = () => {
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,');
        element.setAttribute('download', "./info.json");
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);

    };

        return (
            <div className={"Paragraph-wrapper"}>
                <h1>Project Info</h1>
                <p className={"Paragraph"}>
                    This project has been created as a combination of  my 2 areas of interests -
                    Machine Learning and frontend programming in JS(particularly ReactJS).
                </p>
                <p className={"Paragraph"}>
                    In this project we can distinguish 2 different models.
                    The first one is capable of distinguishing and recognising some real-life objects & things like
                    scissors, fruits(e.g strawberry), faces and much more.
                    The full list of objects that the model may recognise is available under the following <span onClick={toggleDownload} >link</span>.
                </p>
                <p className={"Paragraph"}>
                    The second model has been trained on MNIST database and can recognise hand-written digits. The ReactApp allows user
                    to draw a number on his/her own and predicts the input while writing it down.
                </p>
            </div>
        );



};











