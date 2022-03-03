import React, { Component } from "react";
import Header from "./Header";
import Workbench from "./Workbench";
import ActionBar from "./ActionBar";
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import { Card} from "@blueprintjs/core";

export default class MainWorkbench extends Component {

  constructor(props){
    super(props);
    this.workbench = React.createRef();
    this.actionBar = React.createRef();

    this.state = {
      showProgress: false,
      progressMessage: '',
      diagramEditor: null
    };
  }

  componentDidMount() {
      this.progress = React.createRef();
      this.diagramEditor = this.getDiagramEditor();
  }

  render() {
    return (
      <div className="container">
        <Header ActionBar={this.actionBar} Workbench={this.workbench} Index={this} />
        <Workbench queryString={this.props.location} ref={this.workbench} Index={this} />
        {
          this.state.showProgress ? 
          <Card ref={this.progress} style={{position:'absolute', marginLeft: '45%', marginTop: '20%'}}>
              <CircularProgress style={{display: 'block', marginLeft: '35%'}} />
              <div style={{'paddingTop': '1.5em', fontFamily: 'Segoe UI', fontSize: '16'}}>
                {this.state.progressMessage}
              </div>
          </Card>
          : ''
        }
      </div>
    );
  }

  getDiagramEditor = (diagramEditor) => {
      return this.workbench.current.state.diagramEditor;
  }
  
  deployDiagramToAzure(subscription) {
    this.workbench.current.deployDiagramToAzure(subscription);
  }

  shareDiagram = () => {
    this.workbench.current.shareDiagram();
  }

  showProgress(toShow, message) {
    if(toShow)
    {
      this.setState({showProgress: toShow, progressMessage: message});
    }
    else
      this.setState({showProgress: false, progressMessage: ''});
    
  }
}