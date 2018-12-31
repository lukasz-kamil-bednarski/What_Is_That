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
          opacityStyle : {}
      }
  }

  render() {
    return (
        <BrowserRouter>
            <div className={"Project-container"}>
                <Header handlePopUp = {this.handlePopUp} />
                <Content/>
                {this.state.popupActive ? <PopUpView /> : null }
            </div>
        </BrowserRouter>
    );
  }

  handlePopUp = () =>{


      this.setState({
          popupActive : !this.state.popupActive,
          opacityStyle: this.state.popupActive ? {} : {opacity: '0.5'}
      });

  }
}