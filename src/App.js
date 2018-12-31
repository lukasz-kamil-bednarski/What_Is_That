import React, { Component } from 'react';
import Content from './content/Content';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from "./header/Header";
import PopUpView from './popupView/PopUpView';

export default class App extends Component {
  constructor(props){
      super(props);

      this.state ={
          popupActive: false,
          opacityStyle : {},
          styleSettings : {
              disabled:false,
              globalOpacity : 0.9
          }
      }
  }

  render() {
    return (
        <BrowserRouter>
            <div className={"Project-container"}>
                <Header handlePopUp = {this.togglePopUp} />
                <Content settings = {this.state.styleSettings} />
                {this.state.popupActive ? <PopUpView /> : null }
            </div>
        </BrowserRouter>
    );
  }

  togglePopUp = () =>{
      this.setState({
          popupActive : !this.state.popupActive,
      });
      this.handleStyleSettings();
  };

  handleStyleSettings = () =>{
      if(!this.state.popupActive){
          this.setState({
              styleSettings:{
                  disabled:true,
                  globalOpacity:1
              }
          });
      }else{
          this.setState({
              styleSettings:{
                  disabled:false,
                  globalOpacity:0.9
              }
          });
      }
  }
}