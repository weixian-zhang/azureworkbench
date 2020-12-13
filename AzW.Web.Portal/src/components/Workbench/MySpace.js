import React, { Component } from "reactn";
import {Tooltip ,Dialog, Card,Elevation, Alignment, Button,Label, MenuItem, H4, Toaster, Intent, Overlay, Position} from "@blueprintjs/core";
import {Select } from "@blueprintjs/select";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from "@material-ui/core";
import moment from 'moment';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Messages from './Helpers/Messages';
import DiagramService from '../../services/DiagramService';
import AuthService from '../../services/AuthService';
import Toast from './Helpers/Toast';

export default class MySpace extends Component {
    constructor(props) {
      super(props);
        
      this.authService = new AuthService();

      this.Index = this.props.Index;

      this.state = {
        isOpen: false,
        isLogin: false,
        saveThisSpaceDialogOpen: false,
        saveThisSpaceCollection: '',
        saveThisSpaceDiagramName: '',
        tab: 'saved',
        isDeleteConfirmationDialogOpen: false,
        selectedDiagramContextForDelete: null,
        collections: [],
        diagrams: [],

        sharedDiagrams: [],
        filteredDiagrams: []
      }
    }

    componentDidMount() {
      var thisComp = this;
      this.authService.isUserLogin().then(isLogin => {
        thisComp.setState({isLogin: isLogin})
      });
    }

    componentWillMount = () => {
      this.diagramService = new DiagramService();
    }

    render = () => {
      

        return (
          <div>
            <Overlay isOpen={this.state.isOpen} onClose={this.handleClose}>

              <Overlay isOpen={this.state.saveThisSpaceDialogOpen}  onClose={this.handleThisSpaceDialogClose}>
                <Card className='myspace-overrideexistingrow-overlay'  elevation={Elevation.TWO}>
                  <p>
                      You are about to save your current diagram on canvas 
                        which overrides this record: <b>{this.state.saveThisSpaceDiagramName}</b>
                  </p>
                  <p>
                    <strong>
                      Do you want to continue?
                    </strong>
                  </p>
                  <div style={{display:'inline', width:'100%','text-align': 'right'}}>
                    <Button text="Yes" onClick={this.saveDiagramToThisSpace} intent="success"/>
                    <Button text="No" onClick={this.handleThisSpaceDialogClose} style={{marginLeft:'5px'}}/>
                  </div>
                  </Card>
                </Overlay>
                <Card className='workspace-overlay-box' interactive={false} elevation={Elevation.TWO}>
                    <H4 align={Alignment.LEFT}>
                      <Typography variant='button'>My Space</Typography>
                    </H4> 
                    {
                        (!this.state.isLogin) ?
                        <Label style={{fontSize:"17pt"}}>
                          Login to retrieve diagrams saved in My Space                       
                        </Label> :
              
                        <span>
                          <AppBar position="static" color = "transparent">
                            <Tabs  value={this.state.tab}  onChange={this.handleTabChange} >
                              <Tab label="Saved Diagrams" value="saved" style={{ textTransform: "none", fontSize: 16, fontWeight: this.state.value === 'saved' ? "bold" : "" }}/>
                              <Tab label="Shared Diagrams" value="shared" style={{ textTransform: "none", fontSize: 16, fontWeight: this.state.value === 'shared' ? "bold" : "" }}/>
                            </Tabs>
                          </AppBar>
                          {this.renderSavedDiagramTab()}
                          {this.renderSharedDiagramTab()}
                        </span>
                    }
                </Card>
                <Overlay isOpen={this.state.isDeleteConfirmationDialogOpen}  onClose={this.handleDeletConfirmClose}>
                  <Card className='workspace-deletediagramdialog-overlay-box'  elevation={Elevation.TWO}>
                    <Label>
                      Are you sure you want to delete diagram?
                    </Label>
                    <Button text="Confirm" icon="delete" 
                      onClick={() => this.confirmDeleteDiagramInWorkspace()} />
                    <span className="bp3-navbar-divider"></span>
                    <Button text="Cancel" onClick={() => 
                        this.setState({
                          isDeleteConfirmationDialogOpen: false,
                          selectedDiagramContextForDelete: null
                          })} />
                  </Card>
                </Overlay>
            </Overlay>
          </div>
        );
      }
    
    renderSavedDiagramTab() {

      const tableStyle = makeStyles({
        table: {
          minWidth: 650,
          minWidth: 600,
        },
      });
      const classes = tableStyle;

      if(this.state.tab != 'saved')
        return '';

      return (
        <div style={{marginTop: '10px'}}>
          <Select
                  items={this.state.collections}
                  itemRenderer={this.renderCollection}
                  noResults={<MenuItem disabled={true}
                  text={this.state.isLogin ? "No collection found" : "Login required..."} />}
                  
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
                  <TableCell align="right">Last Modified</TableCell>
                  <TableCell align="right">Size</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.filteredDiagrams.map(diagram => 
              (
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {diagram.collectionName}
                    </TableCell>
                    <TableCell align="right">{diagram.diagramName}</TableCell>
                    <TableCell align="right">{new moment(diagram.dateTimeSaved).fromNow()}</TableCell>
                    <TableCell align="right">{diagram.sizeInMB} MB</TableCell>
                    <TableCell align="right">
                      <Button text="Replace" icon="floppy-disk"
                            onClick={() =>
                              this.promptCurrentDiagramToThisSpace(diagram.collectionName, diagram.diagramName)} />
                    </TableCell>
                    <TableCell align="right">
                      <Button text="Load" icon="cloud-download" onClick={() => this.loadDiagramFromWorkspace(diagram)} /> 
                    </TableCell>
                    <TableCell align="left">
                      <Button text="Delete" icon="delete" intent='danger' onClick={() => this.openDeleteConfirmDialog(diagram)} />
                    </TableCell>
                  </TableRow>
              ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      );
    }

    renderSharedDiagramTab() {

      if(this.state.tab != 'shared')
        return '';

      const tableStyle = makeStyles({
        table: {
          minWidth: 650,
          minWidth: 600,
        },
      });
      const classes = tableStyle;

       return (
         <div style={{marginTop: '10px'}}>
           <Button text='Refresh' rightIcon="refresh" onClick={this.refreshSharedDiagrams} />
           <TableContainer component={Paper}>
            <Table className={classes.table}  size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Diagram Name</TableCell>
                  <TableCell align="right">Link</TableCell>
                  <TableCell align="right">Last Modified</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.sharedDiagrams.map(diagram => 
              (
                  <TableRow>
                    <TableCell component="th" scope="row">{diagram.diagramName}</TableCell>
                    <TableCell align="right">{diagram.sharedLink}</TableCell>
                    <TableCell align="right">{new moment(diagram.dateTimeSaved).fromNow()}</TableCell>
                    <TableCell align="right">
                      <Button text="Update" icon="floppy-disk"
                            onClick={() =>
                              this.promptUpdateSharedDiagramConfirmDialog(diagram.emailId, diagram.uid)} />
                    </TableCell>
                    <TableCell align="right">
                      <Button text="Load" icon="cloud-download" onClick={() => this.loadSharedDiagram(diagram.uid)} /> 
                    </TableCell>
                    <TableCell align="left">
                      <Button text="Delete" icon="delete" intent='danger' onClick={() => this.promptDeleteSharedDiagramConfirmDialog(diagram.emailId, diagram.uid)} />
                    </TableCell>
                  </TableRow>
              ))}
              </TableBody>
            </Table>
          </TableContainer>
         </div>
       );
    }

    handleTabChange = () => {
       if(this.state.tab == 'saved') 
          this.setState({tab: 'shared'});
       else
          this.setState({tab: 'saved'});
    }

    notifyStatusBarLoadSource(source, collection, diagramName) {
        var diagramSrc = this.global.diagramSource;
        diagramSrc.source = source;
    
        if(source == 'myspace') {
          diagramSrc.collection = collection;
          diagramSrc.diagramName = diagramName;
        }
    
        this.setGlobal(diagramSrc);
    }

      promptCurrentDiagramToThisSpace(collection, diagramName) {
          this.setState({
            saveThisSpaceDialogOpen: true,
            saveThisSpaceCollection: collection,
            saveThisSpaceDiagramName: diagramName
          });
      }

      promptUpdateSharedDiagramConfirmDialog(emailId, uid) {

      }

      loadSharedDiagram(uid) {

        var thisComp = this;

        this.diagramService.loadSharedDiagramFromMySpace(uid,
          function onSuccess(diagramXml) {
            if(diagramXml == '')
              return;

            thisComp.props.DiagramEditor.importJsonDiagram(diagramXml);
            thisComp.setState({isOpen: false});
            // thisComp.notifyStatusBarLoadSource
            //   ('myspace', diagramContext.collectionName, diagramContext.diagramName);

            Toast.show('success', 2000, 'Diagram loaded')
            
            return;
          },
          function onError(err){
            Toast.show('danger', 3000, Messages.LoadDiagramFromWorkspaceError());
            return;
          }
        );
      }

      promptDeleteSharedDiagramConfirmDialog(emailId, uid) {

      }

      handleThisSpaceDialogClose = () => {
        this.setState({
          saveThisSpaceDialogOpen: false,
          saveThisSpaceCollection: '',
          saveThisSpaceDiagramName: '',
          isDeleteConfirmationDialogOpen: false
        });
      }
      saveDiagramToThisSpace = () => {
        this.props.DiagramEditor.saveDiagramToWorkspace
          (this.state.saveThisSpaceCollection, this.state.saveThisSpaceDiagramName);
        this.handleThisSpaceDialogClose();
        this.setState({ isOpen: false});
      }
      
      getCollectionFromWorkspace = () => {
        
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
                text={collection.name}
                onClick={this.onCollectionItemClick}
            />
        );
    }

    onCollectionItemClick = (sender) => {
        var collectionName = sender.target.innerText;

        if(collectionName == 'All')
          this.setState({filteredDiagrams: this.state.diagrams})
        else
        {
          var filtered = this.state.diagrams.filter(function (diagram) {
            return diagram.collectionName === collectionName;
          });

          this.setState({filteredDiagrams:filtered })
        }
    }

    getDiagramsFromWorkspace = () => {
      
      var thisComp = this;

      this.diagramService.getDiagramsFromWorkspace(
        function onSuccess(diagrams) {
            thisComp.setState({diagrams: diagrams, filteredDiagrams: diagrams});
        },
        function onError() {
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

                thisComp.props.DiagramEditor.importJsonDiagram(diagramXml);
                thisComp.setState({isOpen: false});
                thisComp.notifyStatusBarLoadSource
                  ('myspace', diagramContext.collectionName, diagramContext.diagramName);

                Toast.show('success', 2000, 'Diagram loaded')
                
                return;
              },
              function onError(err){
                Toast.show('danger', 3000, Messages.LoadDiagramFromWorkspaceError());
                return;
              }
            );
    }

    openDeleteConfirmDialog = (diagramContext) => {
      this.setState({
        isDeleteConfirmationDialogOpen: true,
        selectedDiagramContextForDelete: diagramContext 
      });
    }

    confirmDeleteDiagramInWorkspace = () => {

      if(this.state.selectedDiagramContextForDelete == null)
        return;

      var thisComp = this;

      this.diagramService.deleteDiagramFromWorkspace
        (this.state.selectedDiagramContextForDelete,
          function onSuccess(isDeleted){
            thisComp.setState({
              isDeleteConfirmationDialogOpen: false,
              selectedDiagramContextForDelete: null 
            });
            thisComp.refreshCollectionDiagrams();
            Toaster.create({
              position: Position.TOP,
              autoFocus: false,
              canEscapeKeyClear: true
            }).show({intent: Intent.SUCCESS, timeout: 2000, message: Messages.DeleteDiagramFromWorkspaceTrue()});
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

    getSharedDiagrams = () => {
        
      var thisComp = this;

      this.diagramService.getSharedDiagrams(
        function(diagrams){
          thisComp.setState({sharedDiagrams: diagrams});
        },
        function(error){
          Toast.show('danger', 3000, error);
        },
      );
    
    }

    refreshCollectionDiagrams = async () => {
      if(await this.authService.isUserLogin())
        {
          this.getCollectionFromWorkspace();
          this.getDiagramsFromWorkspace();
        }
    }

    refreshSharedDiagrams = async () => {
      if(await this.authService.isUserLogin())
        {
          this.getSharedDiagrams();
        }
    }

    show = async () => {
      this.setState({ isOpen: true});

      var isLoggedIn = await this.authService.isUserLogin();
      this.setState({isLogin: isLoggedIn});

      if(isLoggedIn)
      {
        this.getCollectionFromWorkspace();
        this.getDiagramsFromWorkspace();
        this.getSharedDiagrams();
      }
    }
    
    handleClose = () => this.setState({ isOpen: false });
    handleDeletConfirmClose  = () => this.setState({ isDeleteConfirmationDialogOpen: false });
}