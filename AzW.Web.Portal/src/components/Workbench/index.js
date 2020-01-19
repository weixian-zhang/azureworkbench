import React, { Component } from "react";
import Header from "./Header";
import Workbench from "./Workbench";
import ActionBar from "./ActionBar";

export default class MainWorkbench extends Component {

  constructor(props){
    super(props);
    this.workbench = React.createRef();
  }

  componentDidMount(){
    //this.loadSharedDiagramIfExist();
  }

  render() {
    return (
      <div className="container">
        <Header/>
        <ActionBar shareDiagram={this.shareDiagram} />
        <Workbench queryString={this.props.location.search} ref={this.workbench}/>
      </div>
    );
  }

  shareDiagram = () => {
    this.workbench.current.shareDiagram();
  }

  loadSharedDiagramIfExist() {
    // var parsedQS = queryString.parse(this.props.location.search)
    // if(parsedQS != null && parsedQS.id != null)
    //   this.workbench.current.loadSharedDiagram(parsedQS.id);
  }
}