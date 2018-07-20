import React, { Component } from 'react';
import './App.css';
import Header from "./header/Header"
import Content from './Content/Content';
class App extends Component {
  constructor(props){
      super(props);

      /*
          Used variables
       */
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;

  }

  render() {
    return (
            <div className={"Root-container"} style={{width:this.windowWidth, height:this.windowHeight}}>
                <Header/>
                <Content/>
            </div>

    );
  }
}

export default App;
