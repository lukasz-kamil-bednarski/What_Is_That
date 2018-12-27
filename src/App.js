import React, { Component } from 'react';
import Header from "./header/Header"
import Content from './content/Content';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Entry from './entry/Entry';
export default class App extends Component {
  constructor(props){
      super(props);
      /*
        Sizes of external the root container.
       */
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
  }

  render() {
    return (
        <BrowserRouter>
            <div style={{width:this.windowWidth, height:this.windowHeight,padding:'0',margin:'0'}}>
                <Route exact path = '/' component = {Content}/>
            </div>
        </BrowserRouter>
    );
  }
}