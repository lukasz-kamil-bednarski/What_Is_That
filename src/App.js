import React, { Component } from 'react';
import Header from "./header/Header"
import Content from './content/Content';
import Footer from './footer/Footer';
import './App.css';
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
            <div style={{width:this.windowWidth, height:this.windowHeight,padding:'0',margin:'0'}}>
                <Header/>
                <Content/>
                <Footer/>
            </div>

    );
  }
}


