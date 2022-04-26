import React, { Component } from "react";
import * as go from 'gojs';
import { NumericInput, Switch , Drawer, Button } from "@blueprintjs/core";
import { POSITION_RIGHT } from "@blueprintjs/core/lib/esm/common/classes";
import { CompactPicker } from 'react-color';
import Grid from '@material-ui/core/Grid';
import Utils from './Helpers/Utils';
import Typography from '@material-ui/core/Typography';
import { TextField } from "@material-ui/core";
import GoNodeType from './Helpers/GoNodeType';

export default class StylePropPanel extends Component {
  constructor(props) {
      
      super(props);

      this.state = {
        node: null,
        saveCallback: null,
        colors: ['transparent', '#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF', '#333333', '#808080', '#cccccc', '#D33115', '#E27300', '#FCC400', '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF', '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00', '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E'],
        
        freehandStroke: '#000000',
        freehandStrokeWidth: 2,
        freehandCallbackFunc: null

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
      saveCallback: null
    };
    return originState;
  }

  renderUIByCellType() {

    //set freehand drawing style
    if(this.state.freehandCallbackFunc != null) {
        return this.renderFreeHandDrawingStyleProperties();
    }

    if(Utils.IsNullOrUndefine(this.state.node))
      return;

    if(this.state.node.data.nodetype == GoNodeType.Text()) {
        return this.renderTextblockStyleProperties();
    }
    else if(this.state.node.data.nodetype == GoNodeType.Link()) {
        return this.renderLinkStyleProperties();
    }
    else if(this.state.node.data.nodetype == GoNodeType.Shape()) {
      if(Utils.isVNet(this.state.node) || Utils.isSubnet(this.state.node))
          //show label positioning for VNet/Subnet
          return this.renderShapeStyleProperties(true);
      else
          return this.renderShapeStyleProperties(false);
    }
    else if(this.state.node.data.nodetype == GoNodeType.ImageShape()) {
      return this.renderPictureShapeStyleProperties();
    }
  }

  renderFreeHandDrawingStyleProperties() {
    return (
      <div>
          <div>
            <h4>Freehand Draw - Stroke Width</h4>
            <NumericInput placeholder="Stroke Width"
              max={15}
              allowNumericCharactersOnly ={true}
              clampValueOnBlur={true}
              value={this.state.freehandStrokeWidth}
              onValueChange={
                (value) => {
                    this.setState({freehandStrokeWidth: value});
                }
              } />
          </div>
          <div>
            <h4>Freehand Draw - Stroke Color</h4>
            <CompactPicker  colors={this.state.colors}
              onChangeComplete={
                (color) => {
                  this.setState({freehandStroke: color.hex});
                }
              } />
          </div>
      </div>
    );
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
              <Typography variant="body2">Z Order (+ bring to front, - send to back)</Typography>
            </Grid>
          </Grid>
          <Grid container item direction="row" spacing="1" justify="center" alignItems="center" style={{marginTop:'8px'}}>
            <Grid item>
              <NumericInput placeholder="Z Ordering" min={-300} max={500}
                allowNumericCharactersOnly={true} stepSize={5}
                
                value={
                  this.state.node.data.zOrder
                }
                onValueChange={
                  (numValue) => {
                      this.diagram.model.setDataProperty(this.state.node.data, 'zOrder', numValue);
                      this.updateNodeZOrderState(numValue);
                  }
                } />
            </Grid>
          </Grid>
          <Grid container item direction="row" spacing="1" justify="flex-start" alignItems="center" style={{marginTop:'8px'}}>
            <Grid item>
              <Typography variant="body2">Text Alignment</Typography>
            </Grid>
          </Grid>
          <Grid container item direction="row" spacing="1" justify="center" alignItems="center" style={{marginTop:'8px'}}>
            <Button icon="arrow-left" onClick={ () => {
              this.diagram.model.setDataProperty(this.state.node.data, 'textAlign', 'left');
              }
            }/>
            <Button icon="arrows-horizontal" onClick={ () => {
              this.diagram.model.setDataProperty(this.state.node.data, 'textAlign', 'center');
              }
            }/>
            <Button icon="arrow-right" onClick={ () => {
              this.diagram.model.setDataProperty(this.state.node.data, 'textAlign', 'right');
              }
            }/>
          </Grid>
          <Grid container item direction="row" spacing="1" justify="flex-start" alignItems="center" style={{marginTop:'8px'}}>
            <Grid item>
              <Typography variant="body2">Font Color</Typography>
            </Grid>
          </Grid>
          <Grid container item direction="row" spacing="1" justify="center" alignItems="center" style={{marginTop:'8px'}}>
            <Grid item>
              <CompactPicker  colors={this.state.colors}
              height= {200}
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
              <NumericInput placeholder="Font size" 
                allowNumericCharactersOnly={true}
                min={3} max={100}
                value={
                  this.getFontSizeFromFont(this.state.node.data.font)
                }
                onValueChange={
                  (valAsNum) => {
                      var changedFont =
                        this.getFontStringOnFontSizeChange(valAsNum, this.state.node.data.font );
                      this.diagram.model.setDataProperty(this.state.node.data, 'font', changedFont);
                      this.updateNodeFontState(changedFont);
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
                  this.updateNodeStrokeWidthState(value);
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
            <CompactPicker  colors={this.state.colors}
              onChangeComplete={
                (color) => {
                  this.diagram.model.setDataProperty(this.state.node.data, 'stroke', color.hex);
                }
              } />
          </div>
      </div>
    );
  }

  renderShapeStyleProperties(isVNetSubnet) {
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
          <Typography variant="body2">Z Order (+ bring to front, - send to back)</Typography>
        </Grid>
      </Grid>
      <Grid container item direction="row" spacing="1" justify="center" alignItems="center" style={{marginTop:'8px'}}>
        <Grid item>
          <NumericInput placeholder="Z Ordering" min={-300} max={500}
            allowNumericCharactersOnly={true} stepSize={5}
            value={
              this.state.node.data.zOrder
            }
            onValueChange={
              (numValue) => {
                  this.diagram.model.setDataProperty(this.state.node.data, 'zOrder', numValue);
                  this.updateNodeZOrderState(numValue);
              }
            } />
        </Grid>
      </Grid>
      {
      (isVNetSubnet)
      ? 
      <div>
        <Grid container item direction="row" spacing="1" justify="flex-start" alignItems="center" style={{marginTop:'8px'}}>
          <Grid item>
            <Typography variant="body2">Label Position</Typography>
          </Grid>
        </Grid>
        <Grid container item direction="row" spacing="1" justify="center" alignItems="center" style={{marginTop:'8px'}}>
              <Grid item>
                <div>
                  <Button icon="arrow-top-left" onClick={ () => {
                    this.diagram.model.setDataProperty(this.state.node.data,
                      'alignment', go.Spot.TopLeft);
                      this.diagram.model.setDataProperty(this.state.node.data,
                        'alignmentFocus', go.Spot.BottomLeft);
                    }} />
                  <Button icon="arrow-up" onClick={ () => {
                    var textBlk = this.state.node.findObject("RESOURCELABEL")
                    this.diagram.model.setDataProperty(this.state.node.data,
                      'alignment', go.Spot.Top);
                    this.diagram.model.setDataProperty(this.state.node.data,
                        'alignmentFocus', go.Spot.Bottom);
                    }} />
                  <Button icon="arrow-top-right" onClick={ () => {
                    this.diagram.model.setDataProperty(this.state.node.data,
                      'alignment', go.Spot.TopRight);
                    this.diagram.model.setDataProperty(this.state.node.data,
                        'alignmentFocus', go.Spot.BottomRight);
                    }} />
                </div>
                <div>
                  <Button icon="arrow-bottom-left" onClick={ () => {
                     this.diagram.model.setDataProperty(this.state.node.data,
                      'alignment', go.Spot.BottomLeft);
                      this.diagram.model.setDataProperty(this.state.node.data,
                        'alignmentFocus', go.Spot.TopLeft);
                    }} />
                  <Button icon="arrow-down" onClick={ () => {
                    this.diagram.model.setDataProperty(this.state.node.data,
                      'alignment', go.Spot.Bottom);
                    this.diagram.model.setDataProperty(this.state.node.data,
                        'alignmentFocus', go.Spot.Top);
                    }} />
                  <Button icon="arrow-bottom-right" onClick={ () => {
                   this.diagram.model.setDataProperty(this.state.node.data,
                    'alignment', go.Spot.BottomRight);
                    this.diagram.model.setDataProperty(this.state.node.data,
                      'alignmentFocus', go.Spot.TopRight);
                    }} />
                </div>
              </Grid>
        </Grid>
      </div>
      : ''
      }
      <Grid container item direction="row" spacing="1" justify="flex-start" alignItems="center" style={{marginTop:'8px'}}>
        <Grid item>
          <Typography variant="body2">Font Size</Typography>
        </Grid>
      </Grid>
      <Grid container item direction="row" spacing="1" justify="center" alignItems="center" style={{marginTop:'8px'}}>
        <Grid item>
          <NumericInput placeholder="Font size" min={3} max={100}
            allowNumericCharactersOnly={true}
            value={
              this.getFontSizeFromFont(this.state.node.data.font)
            }
            onValueChange={
              (valAsNum) => {
                  var changedFont =
                    this.getFontStringOnFontSizeChange(valAsNum, this.state.node.data.font );
                  this.diagram.model.setDataProperty(this.state.node.data, 'font', changedFont);
                  this.updateNodeFontState(changedFont);
              }
            } />
        </Grid>
      </Grid>
      <Grid container item direction="row" spacing="1" justify="flex-start" alignItems="center" style={{marginTop:'8px'}}>
        <Grid item>
          <Typography variant="body2">Stroke Color</Typography>
        </Grid>
      </Grid>
      <Grid container item direction="row" spacing="1" justify="center" alignItems="center">
          <Grid item>
          <CompactPicker  colors={this.state.colors}
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
      <CompactPicker  colors={this.state.colors}
          onChangeComplete={
            (color) => {
              this.diagram.model.setDataProperty(this.state.node.data, 'fill', color.hex);
            }
          } />
      </Grid>
      <Grid container item direction="row" spacing="1" justify="flex-start" alignItems="center" style={{marginTop:'8px'}}>
        <Grid item>
          <Typography variant="body2">Font Color</Typography>
        </Grid>
      </Grid>
      <Grid container item direction="row" spacing="1" justify="center" alignItems="center">
      <CompactPicker  colors={this.state.colors}
            onChangeComplete={
              (color) => {
                this.diagram.model.setDataProperty(this.state.node.data, 'textStroke', color.hex);
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
          <Typography variant="body2">Z Order (+ bring to front, - send to back)</Typography>
        </Grid>
      </Grid>
      <Grid container item direction="row" spacing="1" justify="center" alignItems="center" style={{marginTop:'8px'}}>
        <Grid item>
          <NumericInput placeholder="Z Ordering" min={-300} max={500}
            allowNumericCharactersOnly={true} stepSize={5}
            value={
              this.state.node.data.zOrder
            }
            onValueChange={
              (numValue) => {
                  this.diagram.model.setDataProperty(this.state.node.data, 'zOrder', numValue);
                  this.updateNodeZOrderState(numValue);
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
            <NumericInput placeholder="Font size" min={3} max={100}
              allowNumericCharactersOnly={true}
              value={
                this.getFontSizeFromFont(this.state.node.data.font)
              }
              onValueChange={
                (valAsNum)=> {
                    var changedFont =
                      this.getFontStringOnFontSizeChange(valAsNum,this.state.node.data.font );
                    this.diagram.model.setDataProperty(this.state.node.data, 'font', changedFont);
                    this.updateNodeFontState(changedFont);
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
        <CompactPicker  colors={this.state.colors}
              onChangeComplete={
                (color) => {
                  this.diagram.model.setDataProperty(this.state.node.data, 'stroke', color.hex);
                }
              } />
        </Grid>

      </Grid>
    );
  }

  updateNodeFontState(newFont) {
    var node = this.state.node;
    node.data.font = newFont;
    this.setState({ node: node });
  }

  updateNodeZOrderState(newZOrder) {
    var node = this.state.node;
    node.data.zOrder = newZOrder;
    this.setState({ node: node });
  }

  updateNodeStrokeWidthState(newWidth) {
    var node = this.state.node;
    node.data.strokeWidth = newWidth;
    this.setState({ node: node });
  }

  getFontSizeFromFont = (font) => {
    var fontSizePX= font.split(' ')[0];
    var fontSizeStr = fontSizePX.substring(0, fontSizePX.length);
    var fontSize = parseInt(fontSizeStr);
    return fontSize;
  }

  getFontStringOnFontSizeChange = (fontSize, font) => {
      var fontFamily = font.split(' ')[1] + ' ' + font.split(' ')[2]; //Segoe UI
      return fontSize.toString() + 'px ' + fontFamily
  }

  show = (node, diagram) => {

    this.checkZOrderNaN(node, diagram);

    this.setState({ 
      isOpen: true, 
      node: node}); 
    
    this.diagram = diagram;
  }

  showFreehandStyle = (currentStyleObj, callbackFunc) => {
      this.setState({
        isOpen: true,
        freehandStroke: currentStyleObj.freehandStroke,
        freehandStrokeWidth: currentStyleObj.freehandStrokeWidth,
        freehandCallbackFunc: callbackFunc
      });
  }

  checkZOrderNaN(node, diagram) {
    if(node.data && isNaN(node.data.zOrder))
    {
        node.data.zOrder = 0;
        diagram.model.setDataProperty(node.data, 'zOrder', 0);
    }
  }

  drawerClose = () => {

    //return change style to diagramEditor
    if(this.state.freehandCallbackFunc != null) {
      var style = {
        freehandStroke: this.state.freehandStroke,
        freehandStrokeWidth: this.state.freehandStrokeWidth
      }
      this.state.freehandCallbackFunc(style);
    }

    this.setState({ 
      freehandCallbackFunc: null,
      isOpen: false});
  }
}