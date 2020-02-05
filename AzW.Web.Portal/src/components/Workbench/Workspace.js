import React, { Component } from "react";
import {Card,Elevation, Alignment, Button,Label, MenuItem, H4, Toaster, Intent, Overlay, Position} from "@blueprintjs/core";
import {Select, ItemRenderer } from "@blueprintjs/select";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Collection from '../../models/services/Collection';
import Messages from './Helpers/Messages';
import DiagramService from '../../services/DiagramService';
import AuthService from '../../services/AuthService';
import LocalStorage from '../../services/LocalStorage';
import AnonymousDiagramContext from "../../models/services/AnonymousDiagramContext";

export default class Workspace extends Component {
    constructor(props) {
      super(props);
        
      this.authService = new AuthService();

      this.state = {
        isOpen: false,
        isAuthenticated: this.authService.isUserLogin(),
        collections: [],
        diagrams: []
      }
    }

    componentWillMount = () => {
      this.diagramService = new DiagramService();
    }

//https://codesandbox.io/s/y086e
    render = () => {
      const tableStyle = makeStyles({
        table: {
          minWidth: 650,
          minWidth: 700,
        },
      });
      const classes = tableStyle;

        return (
            <Overlay isOpen={this.state.isOpen} onClose={this.handleClose}>
                <Card className='workspace-overlay-box ' interactive={false} elevation={Elevation.ONE}>
                    <H4 align={Alignment.LEFT}>Draft Diagram in Browser</H4> 
                    {
                    (!this.isLocalDraftDiagramExist()) ? 
                    <Label className=''>
                    You do not have any draft diagram saved locally in browser                         
                    </Label> :
                    <div>
                        <Button text="Load draft diagram from browser" icon="import"
                        onClick={this.loadDraftDiagramFromBrowser} />
                        <span className="bp3-navbar-divider"></span>
                        <Button text="Delete Draft Diagram" icon="import"
                        onClick={this.deleteDraftDiagramFromBrowser} />
                     </div>
                    }
                    <hr />
                    <H4 align={Alignment.LEFT}>Diagrams in your Workspace</H4> 
                    {
                        (!this.authService.isUserLogin()) ? 
                        <Label>
                        You need to login to retrieve diagrams saved in your workspace                       
                        </Label> :
                        <span>
                          <Select
                                items={this.state.collections}
                                itemRenderer={this.renderCollection}
                                noResults={<MenuItem disabled={true}
                                text={this.authService.isUserLogin() ? "No collection found" : "Login first..."} />}
                                onItemSelect={this.setCurrentCollection}
                                filterable={false}>
                                {/* children become the popover target; render value here */}
                                <Button text='Collections' rightIcon="double-caret-vertical" />
                          </Select>
                          <span className="bp3-navbar-divider"></span>
                          <Button text='Refresh' rightIcon="refresh" onClick={this.refreshCollectionDiagrams} />
                          <TableContainer component={Paper}>
                          <Table className={classes.table}  size="small" aria-label="a dense table">
                            <TableHead>
                              <TableRow>
                                <TableCell>Collection</TableCell>
                                <TableCell align="right">Diagram Name</TableCell>
                                <TableCell align="right">Date Saved</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {this.state.diagrams.map(diagram => 
                            (
                                <TableRow>
                                  <TableCell component="th" scope="row">
                                    {diagram.collectionName}
                                  </TableCell>
                                  <TableCell align="right">{diagram.diagramName}</TableCell>
                                  <TableCell align="right">{diagram.dateTimeSaved}</TableCell>
                                  <TableCell align="right">
                                    <Button text="" icon="cloud-download" onClick={() => this.loadDiagramFromWorkspace(diagram)} /> 
                                  </TableCell>
                                  <TableCell align="left">
                                    {/* <Button text="" icon="delete" onClick={this.deleteDiagramInWorkspace(diagram)} /> */}
                                  </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </span>
                    }
                </Card>
            </Overlay>
        );
      }

      isLocalDraftDiagramExist() {
        if(LocalStorage.get(LocalStorage.KeyNames.TempLocalDiagram) === null)
            return false;
        else
            return true;
      }

      loadDraftDiagramFromBrowser = () => {
          this.props.DiagramEditor.loadDraftDiagramFromBrowser();
          this.setState({ isOpen: false, useTallContent: false });
      }

      deleteDraftDiagramFromBrowser = () => {
        LocalStorage.remove(LocalStorage.KeyNames.TempLocalDiagram);
        this.setState({ isOpen: false, useTallContent: false });
      }
      
      getCollectionFromWorkspace = () => {
        if(!this.authService.isUserLogin())
          return;
        
        var thisComp = this;
     
        this.diagramService.getCollectionFromWorkspace(
            function onSuccess(collections)
            {
              thisComp.setState({collections: collections});
            },
            function onError(error)
            {
              Toaster.create({
                position: Position.TOP,
                autoFocus: false,
                canEscapeKeyClear: true
              }).show({intent: Intent.DANGER, timeout: 2000, message: Messages.GetCollectionError()});
              return;
            });
      }

      renderCollection = (collection, { handleClick, modifiers }) => {
        return (
            <MenuItem
                key={collection.name}
                onClick={this.setCurrentCollection}
                text={collection.name}
            />
        );
    }

    setCurrentCollection = (item, event) => {
        this.setState({currentCollection: item});
    }

    getDiagramsFromWorkspace = () => {
      
      var thisComp = this;

      this.diagramService.getDiagramsFromWorkspace(
        function onSuccess(diagrams) {
            thisComp.setState({diagrams: diagrams});
        },
        function onSuccess() {
          Toaster.create({
            position: Position.TOP,
            autoFocus: false,
            canEscapeKeyClear: true
          }).show({intent: Intent.DANGER, timeout: 2000, message: Messages.GetDiagramFromWorkspaceError()});
          return;
        },
      )
    }

    loadDiagramFromWorkspace = (diagramContext) => {
      var thisComp = this;
      diagramContext.DiagramXml =
          this.diagramService.loadDiagramFromWorkspace
            (diagramContext,
              function onSuccess(diagramXml){
                if(diagramXml == null || diagramContext == '')
                  return;

                var diagramContext = new AnonymousDiagramContext();
                diagramContext.DiagramXml = diagramXml;
                thisComp.props.DiagramEditor.importXmlAsDiagram(diagramContext);
                thisComp.setState({isOpen: false});
              },
              function onError(err){
                Toaster.create({
                  position: Position.TOP,
                  autoFocus: false,
                  canEscapeKeyClear: true
                }).show({intent: Intent.DANGER, timeout: 2000, message: Messages.LoadDiagramFromWorkspaceError()});
                return;
              }
            );
    }

    deleteDiagramInWorkspace = (diagramContext) => {
        this.diagramService.deleteDiagramFromWorkspace
          (diagramContext,
            function onSuccess(isDeleted){
              Toaster.create({
                position: Position.TOP,
                autoFocus: false,
                canEscapeKeyClear: true
              }).show({intent: Intent.DANGER, timeout: 2000, message: Messages.DeleteDiagramFromWorkspaceTrue()});
              return;
            },
            function onError(err){
              Toaster.create({
                position: Position.TOP,
                autoFocus: false,
                canEscapeKeyClear: true
              }).show({intent: Intent.DANGER, timeout: 2000, message: Messages.DeleteDiagramFromWorkspaceIsFalse()});
              return;
            }
          );
    }

    refreshCollectionDiagrams = () => {
      if(this.authService.isUserLogin())
        {
          this.getCollectionFromWorkspace();
          this.getDiagramsFromWorkspace();
        }
    }

    show = () => {
      this.setState({ isOpen: true});

      if(this.authService.isUserLogin()
         && this.state.diagrams.length <= 0
         && this.state.collections.length <= 0)
      {
        this.getCollectionFromWorkspace();
        this.getDiagramsFromWorkspace();
      }
    }
    
    handleClose = () => this.setState({ isOpen: false, useTallContent: false });
}