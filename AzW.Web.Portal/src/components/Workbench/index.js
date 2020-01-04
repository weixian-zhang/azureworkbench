import React, { Component } from "react";
import Header from "./Header";
import Workbench from "./Workbench";
import ActionBar from "./ActionBar";

export default class MainWorkbench extends Component {

  constructor(props){
    super(props);

    this.workbench = React.createRef();
  }

  render() {
    return (
      <div className="container">
        <Header/>
        <ActionBar shareDiagram={this.shareDiagram} />
        <Workbench ref={this.workbench}/>
      </div>
    );
  }

  shareDiagram = () => {
    this.workbench.current.shareDiagram();
  }
}