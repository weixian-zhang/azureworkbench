import React, { Component } from "react";
import { NumericInput, Switch , Drawer, Button } from "@blueprintjs/core";
import { POSITION_RIGHT } from "@blueprintjs/core/lib/esm/common/classes";
import { CirclePicker } from 'react-color';
import Grid from '@material-ui/core/Grid';
import { mxConstants } from "mxgraph-js";
import Utils from './Helpers/Utils';
import AzureValidator from './Helpers/AzureValidator';

export default class StylePropPanel extends Component {
  constructor(props) {
      
      super(props);

      this.MxGraphManager = this.props.MxGraphManager;

      this.state = {
        isOpen: false,
        cell: null,
        strokeColor: {
          key: mxConstants.STYLE_STROKECOLOR,
          value: ''
        },
        arrowStrokeWidth: {
          key: mxConstants.STYLE_STROKEWIDTH,
          value: 0
        },
        arrowDashed: {
          key: mxConstants.STYLE_DASHED,
          value: ''
        },
        arrowStartShow:{
          key: mxConstants.STYLE_STARTARROW,
          value: ''
        },
        arrowEndShow:{
          key: mxConstants.STYLE_ENDARROW,
          value: ''
        },
        fontColor:{
          key: mxConstants.STYLE_FONTCOLOR,
          value: 'black'
        },
        fontSize:{
          key: mxConstants.STYLE_FONTSIZE,
          value: ''
        },
        shapeStrokeColor: {
          key: mxConstants.STYLE_STROKECOLOR,
          value: ''
        },
        shapeFillColor: {
          key: mxConstants.STYLE_FILLCOLOR,
          value: ''
        },
        shapeBorderDash:{
          key: mxConstants.STYLE_DASHED,
          value: ''
        },
        saveCallback: null,

        colors: ["transparent","#ffffff", "#cccccc", "#ededed", "#B2B2B2", "#4C4C4C", "#000000", "#f44336", "#e91e63", "#ddd3ee", "#9c27b0", "#673ab7", "#e6f3f7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"]
      }

      this.azureValidator = new AzureValidator();

      this.hydrateStateWithExistingCellStyle = this.hydrateStateWithExistingCellStyle.bind(this);
  }

  componentDidMount = () => {
      this.hydrateStateWithExistingCellStyle();
  }

  render = () => {
    return (
      <Drawer
          title="Style"
          autoFocus= {true}
          canEscapeKeyClose= {true}
          canOutsideClickClose= {true}
          enforceFocus= {true}
          hasBackdrop= {true}
          onClose={() => this.drawerClose()} 
          isOpen= {this.state.isOpen}
          position= {POSITION_RIGHT}
          usePortal= {true}
          size= {Drawer.SIZE_SMALL}
          className='stylePropPanel'>
          <Grid
            container
            direction="row"
            justify="center"
            alignContent="center">
              {
                 this.renderUIByCellType()
              }
         </Grid>
         <Grid
          container
          direction="row"
          justify="center"
          alignContent="center">
            <Grid item md={12}>
              <br />
            </Grid>
            <Grid item md={12}>
              <Button alignText="center" className="buttonStretch" text="Save" onClick={this.saveStyle} />
            </Grid>
          </Grid>
      </Drawer>
    );
  }

  renderUIByCellType(cell) {

    var cell = this.state.cell;

    if(Utils.IsNullOrUndefine(cell)) {return (''); }

    if(!Utils.IsNullOrUndefine(cell) && cell.isEdge()){
      return (
        <div>
          <div>
          <h4>Stroke Color</h4>
            <CirclePicker colors={this.state.colors} min={1} onChangeComplete={this.onArrowStrokeColorChange} />
          </div>
          <div>
            <h4>Edge Width</h4>
            <NumericInput placeholder="Arrow width"
              value={this.state.arrowStrokeWidth.value} onValueChange={this.onArrowWidthChange} />
          </div>
          <div>
            <br />
            <Switch checked={ this.state.arrowDashed.value == '1' ? true : false} label="Dash Arrow" onChange={this.onArrowDashChange} />
          </div>
          <div>
            <br />
            <Switch checked={this.state.arrowStartShow.value == mxConstants.ARROW_CLASSIC ? true : false} label="Show Start Arrow" onChange={this.onArrowStartChange} />
          </div>
          <div>
            <br />
            <Switch checked={this.state.arrowEndShow.value == mxConstants.ARROW_CLASSIC ? true : false} label="Show End Arrow" onChange={this.onArrowEndChange} />
          </div>
        </div>
      );
    }
    else if (this.getMxGraphManager().isText(cell)) {
      return (
        <div>
          <div>
              <h4>Font Color</h4>
              <CirclePicker colors={this.state.colors} onChangeComplete={this.onFontColorChange} />
          </div>
          <div>
              <h4>Font Size</h4>
              <NumericInput placeholder="Font size" min={3}
                allowNumericCharactersOnly={false}
                value={this.state.fontSize.value}
                onValueChange={this.onFontSizeChange} />
          </div>
        </div>
      );
    }
    else {
        return (
          <div>
            <h4>Stroke Color</h4>
            <CirclePicker colors={this.state.colors} onChangeComplete={this.onShapeStrokeColorChange} />
            <h4>Background Color</h4>
            <CirclePicker colors={this.state.colors} onChangeComplete={this.onShapeFillColorChange} />
            <div>
              <br />
              <Switch checked={this.state.shapeBorderDash.value == '1' ? true : false} label="Border Dashed" onChange={this.onShapeBorderDashChange} />
            </div>
            <div>
              <h4>Font Color</h4>
              <CirclePicker colors={this.state.colors} onChangeComplete={this.onFontColorChange} />
          </div>
          </div>
        );
    }
  }

  getMxGraphManager = () => {
      return this.props.MxGraphManager;
  }

  show = (cell, saveCallback) => {

    this.setState({ 
      isOpen: true, 
      cell: cell,
      saveCallback: saveCallback });

    this.hydrateStateWithExistingCellStyle();
  }

  hydrateStateWithExistingCellStyle = () => {

      var cell = this.state.cell;

      if(Utils.IsNullOrUndefine(cell)){return;}

      var styleObj = this.getMxGraphManager().convertStyleStringToObject(cell.style);

      if(cell.isEdge()){
        let propArrowStrokeWidth =
          Object.getOwnPropertyDescriptor(styleObj, mxConstants.STYLE_STROKEWIDTH);
        this.onArrowWidthChange(propArrowStrokeWidth.value);

        let propArrowStrokeColor =
          Object.getOwnPropertyDescriptor(styleObj, mxConstants.STYLE_STROKECOLOR);
        this.onArrowStrokeColorChange(null, null, propArrowStrokeColor.value);

        let propArrowDash =
          Object.getOwnPropertyDescriptor(styleObj, mxConstants.STYLE_DASHED);
        this.onArrowDashChange(null, propArrowDash.value);

        let propArrowStartChange =
          Object.getOwnPropertyDescriptor(styleObj, mxConstants.STYLE_STARTARROW);
        this.onArrowStartChange(null, propArrowStartChange.value);

        let propArrowEndChange =
          Object.getOwnPropertyDescriptor(styleObj, mxConstants.STYLE_ENDARROW);
        this.onArrowEndChange(null, propArrowEndChange.value);

        return;
      }

      if(this.getMxGraphManager().isText(cell))
      {
        let propFontColor =
          Object.getOwnPropertyDescriptor(styleObj, mxConstants.STYLE_FONTCOLOR);
        this.onFontColorChange(propFontColor.value);

        let propFontSize =
          Object.getOwnPropertyDescriptor(styleObj, mxConstants.STYLE_FONTSIZE);
        this.onFontSizeChange(propFontSize.value);

        return;
      }

      //style for shapes, vnet and subnet
      let propShapeBorderDash =
      Object.getOwnPropertyDescriptor(styleObj, mxConstants.STYLE_DASHED);
      this.onShapeBorderDashChange(null, propShapeBorderDash.value);

      let propShapeFill =
      Object.getOwnPropertyDescriptor(styleObj, mxConstants.STYLE_FILLCOLOR);
      this.onShapeFillColorChange(null, null, propShapeFill.value);

      let propShapeStroke =
      Object.getOwnPropertyDescriptor(styleObj, mxConstants.STYLE_STROKECOLOR);
      this.onShapeStrokeColorChange(null, null, propShapeStroke.value);

      let propShapeFontColor =
      Object.getOwnPropertyDescriptor(styleObj, mxConstants.STYLE_FONTCOLOR);
      this.onFontColorChange(null, null, propShapeFontColor.value);

      return;
  }

  onShapeStrokeColorChange = (color, sender, hydrateFromExisting) => {
    
    var stroke = this.state.shapeStrokeColor;

    if(!Utils.IsNullOrUndefine(hydrateFromExisting))
      stroke.value = hydrateFromExisting;
    else
      stroke.value = color.hex;
    
    
    this.setState({ shapeStrokeColor: stroke });
  }

  onShapeFillColorChange = (color, sender, hydrateFromExisting) => {
    var fill = this.state.shapeFillColor;

    if(!Utils.IsNullOrUndefine(hydrateFromExisting))
      fill.value = hydrateFromExisting;
    else
      fill.value = color.hex;

    this.setState({ shapeFillColor: fill });
  }

  onFontColorChange = (color, sender, hydrateFromExisting) => {
    var fontColor = this.state.fontColor;

    if(!Utils.IsNullOrUndefine(hydrateFromExisting))
      fontColor.value = hydrateFromExisting;
    else
      fontColor.value = color.hex;

    this.setState({ fontColor: fontColor });
  }

  onFontSizeChange = (numValue) => {
    var fontSize = this.state.fontSize;
    fontSize.value = numValue;
    this.setState({fontSize: fontSize});
  }

  onArrowStrokeColorChange = (color, sender, hydrateFromExisting) => {

    var strokeColor = this.state.strokeColor;

    if(!Utils.IsNullOrUndefine(hydrateFromExisting))
      strokeColor.value = hydrateFromExisting
    else
      strokeColor.value = color.hex;
        
    this.setState({ strokeColor: strokeColor });
  }

  onArrowWidthChange = (numValue) => {
      var arrowStrokeWidth = this.state.arrowStrokeWidth;
      arrowStrokeWidth.value = numValue;
      this.setState({arrowStrokeWidth: arrowStrokeWidth});
  }

  onArrowDashChange = (sender, hydrateFromExisting) => {
      if(!Utils.IsNullOrUndefine(hydrateFromExisting))
      {
        var arrowDashed = this.state.arrowDashed;
        arrowDashed.value = hydrateFromExisting;
        this.setState({arrowDashed: arrowDashed});
        return;
      }

      var arrowDashed = this.state.arrowDashed;
      arrowDashed.value = sender.target.checked == true ? '1' : '0';
      this.setState({arrowDashed: arrowDashed});
  }

  onArrowStartChange = (sender, hydrateFromExisting) => {
    if(!Utils.IsNullOrUndefine(hydrateFromExisting))
    {
      var arrowStartShow = this.state.arrowStartShow;
      arrowStartShow.value = hydrateFromExisting
      this.setState({arrowStartShow: arrowStartShow});
      return;
    }

    var arrowStartShow = this.state.arrowStartShow;
    arrowStartShow.value = sender.target.checked == true ? mxConstants.ARROW_CLASSIC : 'none';
    this.setState({arrowStartShow: arrowStartShow});
  }

  onArrowEndChange = (sender, hydrateFromExisting) => {
    if(!Utils.IsNullOrUndefine(hydrateFromExisting))
    {
      var arrowEndShow = this.state.arrowEndShow;
      arrowEndShow.value = hydrateFromExisting;
      this.setState({arrowEndShow: arrowEndShow});
      return;
    }

    var arrowEndShow = this.state.arrowEndShow;
    arrowEndShow.value = sender.target.checked == true ? mxConstants.ARROW_CLASSIC : 'none';
    this.setState({arrowEndShow: arrowEndShow});
  }

  onShapeBorderDashChange = (sender, hydrateFromExisting) => {
    if(!Utils.IsNullOrUndefine(hydrateFromExisting))
    {
      var shapeBorderDash = this.state.shapeBorderDash;
      shapeBorderDash.value = hydrateFromExisting;
      this.setState({shapeBorderDash: shapeBorderDash});
      return;
    }

    var shapeBorderDash = this.state.shapeBorderDash;
    shapeBorderDash.value = sender.target.checked == true ? '1' : '0';
    this.setState({shapeBorderDash: shapeBorderDash});
  }

  saveStyle = () => {

      var cell = this.state.cell;
      var styleObj = new Object();

      if(cell.isEdge())
      {
        Object.defineProperty(styleObj, 
          this.state.arrowStrokeWidth.key, { value: this.state.arrowStrokeWidth.value });
          
        Object.defineProperty(styleObj, 
          this.state.arrowDashed.key, { value: this.state.arrowDashed.value });
        
        Object.defineProperty(styleObj, 
            this.state.arrowStartShow.key, { value: this.state.arrowStartShow.value });
  
        Object.defineProperty(styleObj, 
          this.state.arrowEndShow.key, { value: this.state.arrowEndShow.value });

        Object.defineProperty(styleObj, 
          this.state.strokeColor.key, { value: this.state.strokeColor.value });

        this.state.saveCallback(styleObj);
        this.drawerClose();
        return;
      }

      if(this.getMxGraphManager().isText(cell))
      {
        Object.defineProperty(styleObj, 
          this.state.fontColor.key, { value: this.state.fontColor.value });
        
        Object.defineProperty(styleObj, 
          this.state.fontSize.key, { value: this.state.fontSize.value });

        this.state.saveCallback(styleObj);
        this.drawerClose();
        return;
      }

      //style for shapes, vnet and subnet
      Object.defineProperty(styleObj, 
        this.state.shapeBorderDash.key, { value: this.state.shapeBorderDash.value });

      Object.defineProperty(styleObj, 
        this.state.shapeFillColor.key, { value: this.state.shapeFillColor.value });

      Object.defineProperty(styleObj, 
        this.state.shapeStrokeColor.key, { value: this.state.shapeStrokeColor.value });

      Object.defineProperty(styleObj, 
        this.state.fontColor.key, { value: this.state.fontColor.value });
        
      this.state.saveCallback(styleObj);
      this.drawerClose();
  }

  drawerClose = () => {
      this.setState({ isOpen: false});
  }
}