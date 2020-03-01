import React, { Component } from "react";
import { Switch } from "react-router-dom";
import { connect } from "react-redux";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import MainWorkbench from "./components/Workbench"
import { msalLoginAsync } from "./redux/actions";
import {addDiagram, deleteDiagram, addVertex} from './redux/actions/graphActions';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import axios from "axios";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      overlayState: {
        isOpen: true,
      }
    };

    this.closeOverlay = this.closeOverlay.bind(this);
  }

  closeOverlay() {
    this.setState({
      overlayState: {
        isOpen: false
      }
    });
  }

  render() {
    return (
      <Switch>
        {/* <ProtectedRoute exact path="/" account={this.props.account} component={MainWorkbench} overlayState={this.state.overlayState} onOverlayClose={this.closeOverlay} onMsalLogin={this.props.login} isLoginInProcess={this.props.isLoginInProcess}/> */}
        <Route path="/" component={MainWorkbench} />
        <Route path="/shareanonydia:diagramId" component={MainWorkbench} />
      </Switch>
    );
  }
}

function mapStateToProps(state) {
  const { account, isLoginInProcess } = state.msal;
  return { account, isLoginInProcess };
}

function mapDispatchToProps (dispatch) {
  return {
    login: () => dispatch(msalLoginAsync())
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
