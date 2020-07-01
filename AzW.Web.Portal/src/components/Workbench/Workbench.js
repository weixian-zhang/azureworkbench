import React, { addCallback, Component } from "reactn";

import ResourcePalette from "./ResourcePalette";
import DiagramEditor from "./DiagramEditor";

import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import SaveSharpIcon from '@material-ui/icons/SaveSharp';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';

import "../../assets/css/WorkbenchGrid.css";


export default class Workbench extends Component {
  constructor(props) {
    super(props);

    this.state = {
      source: 'none',
      collection: '',
      diagramName: '',
      renderResourcePalette: false,
      queryString: this.props.queryString
    }

    this.setGlobal({diagramSource: {
      source: 'none', //either 'myspace', 'browser' or 'none'
      collection: '', //empty string if browser
      diagramName: '' //empty string if browser
    }});

    //global value set this will be called
    addCallback(global => {
      if(this.global.diagramSource.source == 'myspace') {
        if(this.global.diagramSource.collection != this.state.collection ||
          this.global.diagramSource.diagramName != this.state.diagramName){
            this.setState({
              source: this.global.diagramSource.source,
              collection: this.global.diagramSource.collection,
              diagramName: this.global.diagramSource.diagramName,
            });
            return;
          }
      }
      if(this.state.source != this.global.diagramSource.source) {
        this.setState({source: this.global.diagramSource.source});
      }
    });

    this.diagramEditor = React.createRef();
  }

  componentDidMount() {
    this.initDropPNGSVGAZWBFileOnCanvas();
  }



  render = () => {
    const { renderResourcePalette } = this.state
    return (
        <div className="workbenchgrid-container">
          <ResourcePalette DiagramEditor={this.diagramEditor} addResourceToDiagramEditor={this.addResourceToDiagramEditor}/>
          <DiagramEditor ref={this.diagramEditor} queryString={this.state.queryString} />
          <AppBar position="fixed"
            invisible={this.global.diagramSource.source == 'none' ? true : false}
            style={{bottom:'0px', top: 'auto', height:'18px', textAlign: 'right', background: '#2E3B55', padding:0}}>
              {this.renderStatusbarContent()}
          </AppBar>
        </div>
    );
  }

  renderStatusbarContent() {
      if(this.global.diagramSource.source == 'none' || this.global.diagramSource.source == '')
          return this.renderStatusbarLoadFromNoSource();
      else if (this.global.diagramSource.source == 'browser')
          return this.renderStatusbarLoadFromBrowser();
      else if (this.global.diagramSource.source == 'myspace')
          return this.renderStatusbarLoadFromMySpace();
  }

  renderStatusbarLoadFromNoSource() {
    if(this.global.diagramSource.source == 'none' ) {
      return (
        <span>diagram not from source</span>
      );
    }
  }

  renderStatusbarLoadFromBrowser() {
    if(this.global.diagramSource.source == 'browser' ) {
      return (
        <div>
          <span style={{marginRight:3}}>diagram loaded from browser</span>
          <span>
            <Tooltip title="Save to Browser" style={{margin:0,padding:0}}>
              <IconButton color="secondary" >
                <SaveSharpIcon style={{height:'20px', width:'20px'}} onClick={this.statusbarSaveToBrowser} />
              </IconButton>
            </Tooltip>
          </span>
        </div>
      );
    }
  }

  renderStatusbarLoadFromMySpace() {
    if(this.global.diagramSource.source == 'myspace' ) {
      return (
        <div>
          <span style={{marginRight:3}}>diagram loaded from My Space,
          collection: {this.global.diagramSource.collection} | diagram: {this.global.diagramSource.diagramName}</span>
          <span>
            <Tooltip title="Save to My Space" style={{margin:0,padding:0}}>
              <IconButton color="secondary" >
                <SaveSharpIcon style={{height:'20px', width:'20px'}} onClick={this.statusbarSaveToMySpace}/>
              </IconButton>
            </Tooltip>
          </span>
        </div>
      );
    }
  }

  statusbarSaveToBrowser = () => {
      this.diagramEditor.current.saveDiagramToBrowser();
  }

  statusbarSaveToMySpace = () => {
      var collection = this.global.diagramSource.collection;
      var diagramName = this.global.diagramSource.diagramName;
      this.diagramEditor.current.saveDiagramToWorkspace(collection, diagramName);
  }

  initDropPNGSVGAZWBFileOnCanvas() {
    var thisComp = this;

    $("#diagramEditor").on("dragover", function(event) {
      event.preventDefault();  
      event.stopPropagation();
      $(this).addClass('dragging');
    });
    
    $("#diagramEditor").on("dragleave", function(event) {
        event.preventDefault();  
        event.stopPropagation();
        $(this).removeClass('dragging');
    });
    
    $("#diagramEditor").on("drop", function(event) {
      if(event.target.className == '') {
          event.preventDefault();  
          event.stopPropagation();
          thisComp.diagramEditor.current.onDropPNGAZWBFileHandler(event);
      }
    });
  }

  addResourceToDiagramEditor = (dropContext) => {
      this.diagramEditor.current.addResourceToEditorFromPalette(dropContext);
  }

  deployDiagramToAzure = (subscription) => {
    this.diagramEditor.current.deployDiagramToAzure(subscription);
  }

  getDiagramEditor = () => {
    return this.diagramEditor.current;
  }

  shareDiagram() {
    this.diagramEditor.current.shareDiagram();
  }
}