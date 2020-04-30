import React, { Component } from "react";
import { NumericInput, Switch , Drawer, Button } from "@blueprintjs/core";
import { POSITION_RIGHT } from "@blueprintjs/core/lib/esm/common/classes";
import { CirclePicker } from 'react-color';
import Grid from '@material-ui/core/Grid';
import { mxConstants } from "mxgraph-js";
import Utils from './Helpers/Utils';
import AzureValidator from './Helpers/AzureValidator';
import Typography from '@material-ui/core/Typography';

export default class StylePropPanel extends Component {
  constructor(props) {
      
      super(props);

      this.MxGraphManager = this.props.MxGraphManager;

      this.state = this.initialState();

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
          hasBackdrop= {false}
          onClose={() => this.drawerClose()} 
          isOpen= {this.state.isOpen}
          position= {POSITION_RIGHT}
          usePortal= {true}
          size= {'400px'}
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
      </Drawer>
    );
  }

  initialState() {
    var originState = {
      isOpen: false,
        cell: null,
        verticalAlign: {
          key: mxConstants.STYLE_VERTICAL_ALIGN,
          value: 'middle'
        },
        align: {
          key: mxConstants.STYLE_ALIGN,
          value: 'center'
        },
        verticalLabelPosition: {
          key: mxConstants.STYLE_VERTICAL_LABEL_POSITION,
          value: 'none'
        },
        strokeColor: {
          key: mxConstants.STYLE_STROKECOLOR,
          value: 'none'
        },
        arrowStrokeWidth: {
          key: mxConstants.STYLE_STROKEWIDTH,
          value: 0
        },
        arrowDashed: {
          key: mxConstants.STYLE_DASHED,
          value: '0'
        },
        arrowStartShow:{
          key: mxConstants.STYLE_STARTARROW,
          value: 'ARROW_CLASSIC'
        },
        arrowEndShow:{
          key: mxConstants.STYLE_ENDARROW,
          value: 'ARROW_CLASSIC'
        },
        fontColor:{
          key: mxConstants.STYLE_FONTCOLOR,
          value: 'black'
        },
        fontSize:{
          key: mxConstants.STYLE_FONTSIZE,
          value: 'none'
        },
        shapeStrokeColor: {
          key: mxConstants.STYLE_STROKECOLOR,
          value: 'none'
        },
        shapeFillColor: {
          key: mxConstants.STYLE_FILLCOLOR,
          value: 'none'
        },
        shapeBorderDash:{
          key: mxConstants.STYLE_DASHED,
          value: 'none'
        },
        shapeRounded: {
          key: mxConstants.STYLE_ROUNDED,
          value: '0'
        },
        saveCallback: null,

        colors: ["transparent","#ffffff", "#cccccc", "#ededed", "#B2B2B2", "#4C4C4C", "#000000", "#f44336", "#e91e63", "#ddd3ee", "#9c27b0", "#673ab7", "#e6f3f7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"]
      
    }
    return originState;
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
        <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={1} style={{marginTop: '15px', width: '100%'}}>
            <Grid container item direction="row" spacing="1" justify="flex-start" alignItems="center" style={{marginTop:'8px'}}>
              <Grid item>
                <Typography variant="body2">Font Color</Typography>
              </Grid>
            </Grid>
            <Grid container item direction="row" spacing="1" justify="center" alignItems="center" style={{marginTop:'8px'}}>
              <Grid item>
                <CirclePicker colors={this.state.colors} onChangeComplete={this.onFontColorChange} />
              </Grid>
            </Grid>
            <Grid container item direction="row" spacing="1" justify="flex-start" alignItems="center" style={{marginTop:'8px'}}>
              <Grid item>
                <Typography variant="body2">Font Size</Typography>
              </Grid>
            </Grid>
            <Grid container item direction="row" spacing="1" justify="center" alignItems="center" style={{marginTop:'8px'}}>
              <Grid item>
                <NumericInput placeholder="Font size" min={3}
                  allowNumericCharactersOnly={false}
                  value={this.state.fontSize.value}
                  onValueChange={this.onFontSizeChange} />
              </Grid>
            </Grid>
        </Grid>
      );
    }
    else {
        // shape style
        return (
          <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={1} style={{marginTop: '15px', width: '100%'}}>
            <Grid container item direction="row" justify="flex-start" alignItems="center">
                <Grid item xs={6}>
                  <Switch checked={this.state.shapeBorderDash.value == '1' ? true : false} label="Border Dashed" onChange={this.onShapeBorderDashChange} />
                </Grid>
                <Grid item xs={6}>
                  <Switch checked={this.state.shapeRounded.value == '1' ? true : false} label="Border Rounded" onChange={this.onShapeBorderRoundedChange} />
                </Grid>
            </Grid>
            <Grid container item direction="row" justify="flex-start" alignItems="center" style={{marginTop:'8px'}}>
              <Grid item>
                <Typography variant="body2">Label Position</Typography>
              </Grid>
            </Grid>
            <Grid container item direction="row" spacing={1} justify="flex-start" alignItems="center">
              <Grid container item direction="row" spacing={1} justify="flex-start" alignItems="center">
                <Grid item md={4}>
                  <Button fill={true} onClick={this.labelPosNW}>NorthWest</Button>
                </Grid>
                <Grid item md={4}>
                  <Button fill={true} onClick={this.labelPosN}>North</Button>
                </Grid>
                <Grid item md={4}>
                  <Button fill={true} onClick={this.labelPosNE}>NorthEast</Button>
                </Grid>
              </Grid>
              <Grid container item direction="row" spacing="1" justify="flex-start" alignItems="center">
                <Grid item md={4}>
                  <Button fill={true} onClick={this.labelPosW}>West</Button>
                </Grid>
                <Grid item md={4}>
                  <Button fill={true} onClick={this.labelPosC}>Center</Button>
                </Grid>
                <Grid item md={4}>
                  <Button fill={true} onClick={this.labelPosE}>East</Button>
                </Grid>
              </Grid>
              <Grid container item direction="row" spacing="1" justify="flex-start" alignItems="center">
                <Grid item md={4}>
                  <Button fill={true} onClick={this.labelPosSW}>SouthWest</Button>
                </Grid>
                <Grid item md={4}>
                  <Button fill={true} onClick={this.labelPosS}>South</Button>
                </Grid>
                <Grid item md={4}>
                  <Button fill={true} onClick={this.labelPosSE}>SouthEast</Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid container item direction="row" spacing="1" justify="flex-start" alignItems="center" style={{marginTop:'8px'}}>
              <Grid item>
                <Typography variant="body2">Stroke Color</Typography>
              </Grid>
            </Grid>
            <Grid container item direction="row" spacing="1" justify="center" alignItems="center">
                <Grid item>
                  <CirclePicker colors={this.state.colors} onChangeComplete={this.onShapeStrokeColorChange} />
                </Grid>
            </Grid>
            <Grid container item direction="row" spacing="1" justify="flex-start" alignItems="center" style={{marginTop:'8px'}}>
              <Grid item>
                <Typography variant="body2">Background Color</Typography>
              </Grid>
            </Grid>
            <Grid container item direction="row" spacing="1" justify="center" alignItems="center">
              <CirclePicker colors={this.state.colors} onChangeComplete={this.onShapeFillColorChange} />
            </Grid>
            <Grid container item direction="row" spacing="1" justify="flex-start" alignItems="center" style={{marginTop:'8px'}}>
              <Grid item>
                <Typography variant="body2">Font Color</Typography>
              </Grid>
            </Grid>
            <Grid container item direction="row" spacing="1" justify="center" alignItems="center">
                <CirclePicker colors={this.state.colors} onChangeComplete={this.onFontColorChange} />
            </Grid>
          </Grid>
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

        //a workaround for Grouped parent cell
        if(Utils.IsNullOrUndefine(propFontColor))
          return;

        this.onFontColorChange(propFontColor.value);

        let propFontSize =
          Object.getOwnPropertyDescriptor(styleObj, mxConstants.STYLE_FONTSIZE);
        this.onFontSizeChange(propFontSize.value);

        return;
      }

      //style for shapes, vnet and subnet
      let verticalAlign =
      Object.getOwnPropertyDescriptor(styleObj, mxConstants.STYLE_VERTICAL_ALIGN);
      if(!verticalAlign)
        return;
      this.onVerticalAlignChange(null, verticalAlign.value);

      let align =
      Object.getOwnPropertyDescriptor(styleObj, mxConstants.STYLE_ALIGN);
      if(!align)
        return;
      this.onAlignChange(null, align.value);

      let verticalLabelPos =
      Object.getOwnPropertyDescriptor(styleObj, mxConstants.STYLE_VERTICAL_LABEL_POSITION);
      if(!verticalLabelPos)
        return;
      this.onverticalLabelPosChange(null, verticalLabelPos.value);


      let propShapeBorderDash =
        Object.getOwnPropertyDescriptor(styleObj, mxConstants.STYLE_DASHED);
        if(!propShapeBorderDash)
          return;
        this.onShapeBorderDashChange(null, propShapeBorderDash.value);

      let propShapeBorderRounded =
        Object.getOwnPropertyDescriptor(styleObj, mxConstants.STYLE_ROUNDED);
        if(!propShapeBorderRounded)
          return;
        this.onShapeBorderRoundedChange(null, propShapeBorderRounded.value);

      let propShapeFill =
        Object.getOwnPropertyDescriptor(styleObj, mxConstants.STYLE_FILLCOLOR);
        if(!propShapeFill)
          return;
        this.onShapeFillColorChange(null, null, propShapeFill.value);

      let propShapeStroke =
        Object.getOwnPropertyDescriptor(styleObj, mxConstants.STYLE_STROKECOLOR);
        if(!propShapeStroke)
          return;
        this.onShapeStrokeColorChange(null, null, propShapeStroke.value);

      let propShapeFontColor =
        Object.getOwnPropertyDescriptor(styleObj, mxConstants.STYLE_FONTCOLOR);
        if(!propShapeFontColor)
          return;
        this.onFontColorChange(null, null, propShapeFontColor.value);

      return;
  }

    //label position
  labelPosNW = () => {
    this.onVerticalAlignChange(null, 'top');
    this.onAlignChange(null, 'left');
    this.onverticalLabelPosChange(null, 'none');
    
  }

  labelPosN = () => {
    this.onVerticalAlignChange(null, 'top');
    this.onAlignChange(null, 'center');
    this.onverticalLabelPosChange(null, 'none');
    
  }

  labelPosNE = () => {
    this.onVerticalAlignChange(null, 'top');
    this.onAlignChange(null, 'right');
    this.onverticalLabelPosChange(null, 'none');
    
  }

  labelPosW = () => {
    this.onVerticalAlignChange(null, 'middle');
    this.onAlignChange(null, 'left');
    this.onverticalLabelPosChange(null, 'none');
    
  }

  labelPosC = () => {
    this.onVerticalAlignChange(null, 'middle');
    this.onAlignChange(null, 'center');
    this.onverticalLabelPosChange(null, 'none');
    
  }

  labelPosE = () => {
    this.onVerticalAlignChange(null, 'middle');
    this.onAlignChange(null, 'right');
    this.onverticalLabelPosChange(null, 'none');
    
  }

  labelPosSW = () => {
    this.onVerticalAlignChange(null, 'bottom');
    this.onAlignChange(null, 'left');
    this.onverticalLabelPosChange(null, 'none');
    
  }

  labelPosS = () => {
    this.onVerticalAlignChange(null, 'bottom');
    this.onAlignChange(null, 'center');
    this.onverticalLabelPosChange(null, 'none');
    
  }

  labelPosSE = () => {
    this.onVerticalAlignChange(null, 'bottom');
    this.onAlignChange(null, 'right');
    this.onverticalLabelPosChange(null, 'none');
    
  }

  onVerticalAlignChange = (sender, hydrateFromExisting) => {
    if(!Utils.IsNullOrUndefine(hydrateFromExisting))
    {
      var state = this.state.verticalAlign;
      state.value = hydrateFromExisting;
      this.setState({verticalAlign: state});
      return;
    }
  }

  //value change methods
  onAlignChange = (sender, hydrateFromExisting) => {
      if(!Utils.IsNullOrUndefine(hydrateFromExisting))
      {
        var state = this.state.align;
        state.value = hydrateFromExisting;
        this.setState({align: state});
        return;
      }
    } 

  onverticalLabelPosChange = (sender, hydrateFromExisting) => {
      if(!Utils.IsNullOrUndefine(hydrateFromExisting))
      {
        var state = this.state.verticalLabelPosition;
        state.value = hydrateFromExisting;
        this.setState({verticalLabelPosition: state});
        return;
      }
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

  onShapeBorderRoundedChange = (sender, hydrateFromExisting) => {
    if(!Utils.IsNullOrUndefine(hydrateFromExisting))
    {
      var shapeBorderRounded = this.state.shapeRounded;
      shapeBorderRounded.value = hydrateFromExisting;
      this.setState({shapeRounded: shapeBorderRounded});
      return;
    }

    var shapeBorderRounded = this.state.shapeRounded;
    shapeBorderRounded.value = sender.target.checked == true ? '1' : '0';
    this.setState({shapeRounded: shapeBorderRounded});
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

        return;
      }

      if(this.getMxGraphManager().isText(cell))
      {
        Object.defineProperty(styleObj, 
          this.state.fontColor.key, { value: this.state.fontColor.value });
        
        Object.defineProperty(styleObj, 
          this.state.fontSize.key, { value: this.state.fontSize.value });

        this.state.saveCallback(styleObj);

        return;
      }

      //style for shapes, vnet and subnet
      Object.defineProperty(styleObj, 
        this.state.verticalAlign.key, { value: this.state.verticalAlign.value });

      Object.defineProperty(styleObj, 
        this.state.align.key, { value: this.state.align.value });
      
      Object.defineProperty(styleObj, 
        this.state.verticalLabelPosition.key, { value: this.state.verticalLabelPosition.value });
  

      Object.defineProperty(styleObj, 
        this.state.verticalAlign.key, { value: this.state.verticalAlign.value });


      Object.defineProperty(styleObj, 
        this.state.shapeBorderDash.key, { value: this.state.shapeBorderDash.value });

      Object.defineProperty(styleObj, 
        this.state.shapeRounded.key, { value: this.state.shapeRounded.value });

      Object.defineProperty(styleObj, 
        this.state.shapeFillColor.key, { value: this.state.shapeFillColor.value });

      Object.defineProperty(styleObj, 
        this.state.shapeStrokeColor.key, { value: this.state.shapeStrokeColor.value });

      Object.defineProperty(styleObj, 
        this.state.fontColor.key, { value: this.state.fontColor.value });
        
      this.state.saveCallback(styleObj);
  }

  drawerClose = () => {
      this.saveStyle();
      this.setState({ isOpen: false});
  }
}