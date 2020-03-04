import React, { Component } from "react";
import Header from "./Header";
import Workbench from "./Workbench";
import ActionBar from "./ActionBar";
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

export default class MainWorkbench extends Component {

  constructor(props){
    super(props);
    this.workbench = React.createRef();
    this.actionBar = React.createRef();

    this.state = {
      showProgress: false,
      progressMessage: ''
    };
  }

  componentDidMount(){
      this.progress = React.createRef();
  }

  render() {
    return (
      <div className="container">
        <Header ActionBar={this.actionBar} Workbench={this.workbench} Index={this} />
        {/* <ActionBar ref={this.actionBar} Workbench={this.workbench} /> */}
        <Workbench Index={this} queryString={this.props.location.search} ref={this.workbench} />
        {
          this.state.showProgress ? 
          <Box ref={this.progress} style={{position:'absolute', 'z-index': '-1', marginLeft: '50%', marginTop: '20%'}}>
              <CircularProgress style={{display: 'block', marginLeft: '35%'}} />
              <div style={{'paddingTop': '1.5em', fontFamily: 'Segoe UI', fontSize: '16'}}>
                {this.state.progressMessage}
              </div>
          </Box>
          : ''
        }
      </div>
    );
  }

  getDiagramEditor = () => {
    return this.workbench.current.getDiagramEditor();
  }

  shareDiagram = () => {
    this.workbench.current.shareDiagram();
  }

  showProgress(toShow, message) {
    if(toShow)
      this.setState({showProgress: toShow, progressMessage: message});
    else
      this.setState({showProgress: toShow, progressMessage: ''});
    
  }
}