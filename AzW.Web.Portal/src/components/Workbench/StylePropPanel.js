import React, { Component } from "react";
import { NumericInput, Switch , Drawer, Button } from "@blueprintjs/core";
import { POSITION_RIGHT } from "@blueprintjs/core/lib/esm/common/classes";
import { CirclePicker } from 'react-color';
import Grid from '@material-ui/core/Grid';
import { mxConstants } from "mxgraph-js";
import Utils from './Helpers/Utils';
import Typography from '@material-ui/core/Typography';
import GoNodeType from './Helpers/GoNodeType';

export default class StylePropPanel extends Component {
  constructor(props) {
      
      super(props);

      this.MxGraphManager = this.props.MxGraphManager;

      this.state = {
        node: null,
        saveCallback: null,
        colors: ["transparent","#ffffff", "#cccccc", "#ededed", "#B2B2B2", "#4C4C4C", "#000000", "#f44336", "#e91e63", "#ddd3ee", "#9c27b0", "#673ab7", "#e6f3f7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"]
      }; 
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
        saveCallback: null

        
      
    }
    return originState;
  }

  renderUIByCellType() {

    if(Utils.IsNullOrUndefine(this.state.node))
      return;

    if(this.state.node.data.nodetype == GoNodeType.Text()) {
        return this.renderTextblockStyleProperties();
    }
    else if(this.state.node.data.nodetype == GoNodeType.Link()) {
        return this.renderLinkStyleProperties();
    }
    else if(this.state.node.data.nodetype == GoNodeType.Shape()) {
      return this.renderShapeStyleProperties();
    }
    else if(this.state.node.data.nodetype == GoNodeType.ImageShape()) {
      return this.renderPictureShapeStyleProperties();
    }
  }

  renderTextblockStyleProperties() {
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
              <CirclePicker colors={this.state.colors} 
              onChangeComplete={
                (color) => {
                  this.diagram.model.setDataProperty(this.state.node.data, 'stroke', color.hex);
                }
              } />
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
                value={
                  this.getFontSizeFromFont(this.state.node.data.font)
                }
                onValueChange={
                  (numValue) => {
                      var changedFont =
                        this.getFontStringOnFontSizeChange(numValue,this.state.node.data.font );
                      this.diagram.model.setDataProperty(this.state.node.data, 'font', changedFont);
                  }
                } />
            </Grid>
          </Grid>
      </Grid>
    );
  }

  renderLinkStyleProperties() {
    return (
      <div>
          <div>
            <h4>Edge Width</h4>
            <NumericInput placeholder="Arrow width"
              value={this.state.node.data.strokeWidth}
              onValueChange={
                (value) => {
                  this.diagram.model.setDataProperty(this.state.node.data, 'strokeWidth', value);
                }
              } />
          </div>
          <div>
            <br />
            <Switch checked={ this.state.node.data.strokeDashArray == null ? false : true} label="Dash Arrow"
              onChange={() => {
                  if(this.state.node.data.strokeDashArray == null) {
                    this.diagram.model.setDataProperty(this.state.node.data, 'strokeDashArray', [5,5]);
                    
                    var state = this.state.node;
                    state.data.strokeDashArray = [5,5];
                    this.setState({node: state});
                  }
                  else {
                    this.diagram.model.setDataProperty(this.state.node.data, 'strokeDashArray', null);
                    var state = this.state.node;
                    state.data.strokeDashArray = null;
                    this.setState({node: state});
                  }
              }} />
          </div>
          <div>
            <br />
            <Switch checked={this.state.node.data.fromArrow != '' ? true : false} label="End Arrow"
              onChange={() => {
                if(this.state.node.data.fromArrow == '') {
                    this.diagram.model.setDataProperty(this.state.node.data, 'fromArrow', 'Backward');
                    var state = this.state.node;
                    state.data.fromArrow = 'Backward';
                    this.setState({node: state});
                }
                  else {
                    this.diagram.model.setDataProperty(this.state.node.data, 'fromArrow', '');
                    var state = this.state.node;
                    state.data.fromArrow = '';
                    this.setState({node: state});
                  }
              }} />
          </div>
          <div>
            <br />
            <Switch checked={this.state.node.data.toArrow != '' ? true : false} label="Start Arrow"
            onChange={() => {
              if(this.state.node.data.toArrow == '') {
                  this.diagram.model.setDataProperty(this.state.node.data, 'toArrow', 'Standard');
                  var state = this.state.node;
                  state.data.toArrow = 'Standard';
                  this.setState({node: state});
              }
                else {
                  this.diagram.model.setDataProperty(this.state.node.data, 'toArrow', ''); 
                  var state = this.state.node;
                  state.data.toArrow = '';
                  this.setState({node: state});
                }
            }}/>
          </div>
          <div>
            <h4>Stroke Color</h4>
            <CirclePicker colors={this.state.colors} min={1} 
              onChangeComplete={
                (color) => {
                  this.diagram.model.setDataProperty(this.state.node.data, 'stroke', color.hex);
                }
              } />
          </div>
      </div>
    );
  }

  renderShapeStyleProperties() {
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1} style={{marginTop: '15px', width: '100%'}}>
      <Grid container item direction="row" justify="flex-start" alignItems="center">
          <Grid item xs={6}>
            <Switch checked={this.state.node.data.strokeDashArray != null ? true : false} label="Border Dashed"
             onChange={
               () => {
                if(this.state.node.data.strokeDashArray == null) {
                  this.diagram.model.setDataProperty(this.state.node.data, 'strokeDashArray', [5,5]);
                  
                  var state = this.state.node;
                  state.data.strokeDashArray = [5,5];
                  this.setState({node: state});
                }
                else {
                  this.diagram.model.setDataProperty(this.state.node.data, 'strokeDashArray', null);
                  var state = this.state.node;
                  state.data.strokeDashArray = null;
                  this.setState({node: state});
                }
               }
             } />
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
                value={
                  this.getFontSizeFromFont(this.state.node.data.font)
                }
                onValueChange={
                  (numValue) => {
                      var changedFont =
                        this.getFontStringOnFontSizeChange(numValue,this.state.node.data.font );
                      this.diagram.model.setDataProperty(this.state.node.data, 'font', changedFont);
                  }
                } />
            </Grid>
      </Grid>
      <Grid container item direction="row" spacing="1" justify="flex-start" alignItems="center" style={{marginTop:'8px'}}>
        <Grid item>
          <Typography variant="body2">Font Color</Typography>
        </Grid>
      </Grid>
      <Grid container item direction="row" spacing="1" justify="center" alignItems="center">
          <CirclePicker colors={this.state.colors}
            onChangeComplete={
              (color) => {
                this.diagram.model.setDataProperty(this.state.node.data, 'textStroke', color.hex);
              }
            } />
      </Grid>
      <Grid container item direction="row" spacing="1" justify="flex-start" alignItems="center" style={{marginTop:'8px'}}>
        <Grid item>
          <Typography variant="body2">Stroke Color</Typography>
        </Grid>
      </Grid>
      <Grid container item direction="row" spacing="1" justify="center" alignItems="center">
          <Grid item>
            <CirclePicker colors={this.state.colors}
            onChangeComplete={
              (color) => {
                this.diagram.model.setDataProperty(this.state.node.data, 'stroke', color.hex);
              }
            } />
          </Grid>
      </Grid>
      <Grid container item direction="row" spacing="1" justify="flex-start" alignItems="center" style={{marginTop:'8px'}}>
        <Grid item>
          <Typography variant="body2">Background Color</Typography>
        </Grid>
      </Grid>
      <Grid container item direction="row" spacing="1" justify="center" alignItems="center">
        <CirclePicker colors={this.state.colors}
          onChangeComplete={
            (color) => {
              this.diagram.model.setDataProperty(this.state.node.data, 'fill', color.hex);
            }
          } />
      </Grid>
    </Grid>
    );
  }

  renderPictureShapeStyleProperties() {
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1} style={{marginTop: '15px', width: '100%'}}>
            <Grid container item direction="row" spacing="1" justify="flex-start" alignItems="center" style={{marginTop:'8px'}}>
        <Grid item>
          <Typography variant="body2">Font Size</Typography>
        </Grid>
        </Grid>
        <Grid container item direction="row" spacing="1" justify="center" alignItems="center" style={{marginTop:'8px'}}>
          <Grid item>
            <NumericInput placeholder="Font size" min={3}
              allowNumericCharactersOnly={false}
              value={
                this.getFontSizeFromFont(this.state.node.data.font)
              }
              onValueChange={
                (numValue) => {
                    var changedFont =
                      this.getFontStringOnFontSizeChange(numValue,this.state.node.data.font );
                    this.diagram.model.setDataProperty(this.state.node.data, 'font', changedFont);
                }
              } />
          </Grid>
        </Grid>
        <Grid container item direction="row" spacing="1" justify="flex-start" alignItems="center" style={{marginTop:'8px'}}>
          <Grid item>
            <Typography variant="body2">Font Color</Typography>
          </Grid>
        </Grid>
        <Grid container item direction="row" spacing="1" justify="center" alignItems="center">
            <CirclePicker colors={this.state.colors}
              onChangeComplete={
                (color) => {
                  this.diagram.model.setDataProperty(this.state.node.data, 'stroke', color.hex);
                }
              } />
        </Grid>

      </Grid>
    );
  }

  getFontSizeFromFont = (font) => {
    return parseInt(font.split(' ')[0], 10);
  }

  getFontStringOnFontSizeChange = (fontSize, font) => {
      var fontFamily = font.split(' ')[1] + ' ' + font.split(' ')[2]; //Segoe UI
      return fontSize.toString() + 'px ' + fontFamily
  }

  show = (node, diagram) => {

    this.setState({ 
      isOpen: true, 
      node: node}); 
    
    this.diagram = diagram;
  }

  drawerClose = () => {
    this.setState({ isOpen: false});
  }
}