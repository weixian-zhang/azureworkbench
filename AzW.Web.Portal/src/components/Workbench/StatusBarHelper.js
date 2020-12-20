import React, { Component } from "reactn";

export default class StatusBarHelper extends Component {
 
    static SourceNone() { return 'none'; }
    static SourceBrowser() { return 'browser'; }
    static SourceMySpace() { return 'myspace'; }
    static SourceSharedDiagram() { return 'shareddiagram'; }

    constructor(props) {
      super(props);

      this.resetStatusBarInternal();
    }

    render(){return (<span></span>);}

    initStatusBar(){
        this.resetStatusBarInternal();
    }

    resetStatusBar(source) {

      //only reset when Shortcut source matches initiator
      // if(source != this.global.diagramSource.source)
      //    return;

      this.setGlobal({diagramSource: {
        source: StatusBarHelper.SourceNone(), //either 'myspace', 'browser' or 'none'
        collection: '', //empty string if browser
        diagramName: '', //empty string if browser
        emailId: '', //shared diagram
        uid: ''     //shared diagram
      }});
    }

    resetStatusBarInternal() {
      this.setGlobal({diagramSource: {
        source: StatusBarHelper.SourceNone(), //either 'myspace', 'browser' or 'none'
        collection: '', //empty string if browser
        diagramName: '', //empty string if browser
        emailId: '', //shared diagram
        uid: ''     //shared diagram
      }});
    }

    setShortcutFromBrowser() {
      this.setGlobal({diagramSource: {
        source: StatusBarHelper.SourceBrowser(), //either 'myspace', 'browser' or 'none'
        collection: '', //empty string if browser
        diagramName: '', //empty string if browser
        emailId: '', //shared diagram
        uid: ''     //shared diagram
      }});
    }

    setShortcutSharedDiagram(emailId, diagramName, uid) {
      this.setGlobal({diagramSource: {
        source: StatusBarHelper.SourceSharedDiagram(), //either 'myspace', 'browser' or 'none'
        collection: '', //empty string if browser
        diagramName: diagramName, //empty string if browser
        emailId: emailId, //shared diagram
        uid: uid     //shared diagram
      }});
    }

    setShortcutSavedDiagram(collection, diagramName) {
      this.setGlobal({diagramSource: {
        source: StatusBarHelper.SourceMySpace(), //either 'myspace', 'browser' or 'none'
        collection: collection, //empty string if browser
        diagramName: diagramName, //empty string if browser
        emailId: '', //shared diagram
        uid: ''     //shared diagram
      }});
    }

    currentShortcut() {
       return this.global.diagramSource.source;
    }

    diagramSource() {
      return this.global.diagramSource;
    }
}