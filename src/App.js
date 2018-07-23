import React, { Component } from 'react';
import Header from "./header/Header"
import Content from './content/Content';
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
            <div className={"Root-container"} style={{width:this.windowWidth, height:this.windowHeight}}>
                <Header/>
                <Content/>
            </div>

    );
  }
}


