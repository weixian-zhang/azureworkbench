import axios from 'axios';
import AnonymousDiagramContext from '../models/services/AnonymousDiagramContext';
import WorkspaceDiagramContext from '../models/services/WorkspaceDiagramContext';
import QuickstartDiagramContext from '../models/services/QuickstartDiagramContext';
import AuthService from './AuthService';
import Toast from '../components/Workbench/Helpers/Toast';

export default class DiagramService
{
    constructor(){
      this.authService = AuthService;
    }

    async loadQuickstartDiagram(category, name, onSuccess, onFailure) {
      axios.get('/api/dia/qs',{
        params: {
          category: category,
          name: name
        }
      })
      .then(function (response) {
        var qsDiagContext = new QuickstartDiagramContext();
        qsDiagContext.Category = response.data.category;
        qsDiagContext.Name = response.data.name;
        qsDiagContext.DiagramXml = response.data.diagramXml;
        onSuccess(qsDiagContext);
      })
      .catch(function (error) {
        
        onFailure(error);
      })
    }

    async saveAnonymousDiagram(anonyDiagramContext, respCallback, errCallback){
        if(anonyDiagramContext == null || anonyDiagramContext.DiagramXml == null)
            return;
      
        axios.post('api/dia/anony/share', anonyDiagramContext)
        .then(function (response) {

          if(!response.data.isSuccess && response.data.errorCode == 'diagram-to-large')
          {
            Toast.show('warning', 8000,
              "Shared link can't be generated as diagram is over 2Mb, consider break up your diagram into multiple diagrams and save separately");
            return;
          } else {
            respCallback(response.data.sharedLink)
          }
        })
        .catch(function (error) {
          console.log(error);
          errCallback(error);
        })
        .finally(function () {
          // always executed
        });  
    }


    async loadAnonymousDiagram(anonyDiagramId, responseCallback, errorCallback){
      if(anonyDiagramId == null)
        return;

      return axios.get('/api/dia/anony/shareload',{
          params: {
            anonyDiagramId: anonyDiagramId
          }
        });
      }
    
    async saveDiagramToWorkspace
      (workspaceDiagramContext, successCallback, errorCallback)
      {
        if(! await this.authService.checkLoginStateAndNotify())
          return;

        var user = this.authService.getUserProfile();

        axios.post('api/wrkspace/dia/save', 
        {
          UID: workspaceDiagramContext.UID,
          EmailId: workspaceDiagramContext.EmailId,
          CollectionName: workspaceDiagramContext.CollectionName,
          DiagramName: workspaceDiagramContext.DiagramName,
          DiagramXml: workspaceDiagramContext.DiagramXml
        }, 
        {
          headers: {
              'Authorization': 'Bearer ' + user.AccessToken,
              'Content-Type': 'application/json'
          }
        })
        .then(function (response) {

          if(!response.data.isSuccess && response.data.errorCode == 'diagram-to-large')
          {
            Toast.show('warning', 8000,
              "Diagram not saved as it is over 2Mb, consider break up your diagram into multiple diagrams and save separately");
          } else {
            successCallback(response.data);
          }
        })
        .catch(function (error) {
          console.log(error);
          errorCallback(error);
        })
        .finally(function () {
          
        });
      }

      async getCollectionFromWorkspace(successCallback, errorCallback)
      {
        if(! await this.authService.checkLoginStateAndNotify())
          return;

        var user = this.authService.getUserProfile();

        axios.get('api/wrkspace/colls', 
        {
          params: {
            emailId: user.UserName
          },
          headers: {

            'Authorization': 'Bearer ' + user.AccessToken,
            'Content-Type': 'application/json'
          }
        })
        .then(function (response) {
          successCallback(response.data);
        })
        .catch(function (error) {
          console.log(error);
          errorCallback(error);
        })
        .finally(function () {
          
        });
      }
    
    async getDiagramsFromWorkspace(successCallback, errorCallback)
    {
      if(! await this.authService.checkLoginStateAndNotify())
          return;

      var user = this.authService.getUserProfile();

      axios.get('api/wrkspace/diagrams', 
      {
        params: {
          emailId: user.UserName
        },
        headers: {

          'Authorization': 'Bearer ' + user.AccessToken,
          'Content-Type': 'application/json'
        }
      })
      .then(function (response) {
        successCallback(response.data);
      })
      .catch(function (error) {
        console.log(error);
        errorCallback(error);
      })
      .finally(function () {
      });
    }

    async loadDiagramFromWorkspace(diagramContext, successCallback, errorCallback)
    {
      if(! await this.authService.checkLoginStateAndNotify())
        return;

        var user = this.authService.getUserProfile();

        axios.get('api/wrkspace/dia/load', 
        {
          params: {
            emailId: diagramContext.emailId,
            collectionName: diagramContext.collectionName,
            diagramName: diagramContext.diagramName
          },
          headers: {
            'Authorization': 'Bearer ' + user.AccessToken,
            'Content-Type': 'text/plain'
          }
        })
        .then(function (response) {
          var xmlString = response.data;
          successCallback(xmlString);
        })
        .catch(function (error) {
          console.log(error);
          errorCallback(error);
        })
        .finally(function () {
        });
    }

    async deleteDiagramFromWorkspace(diagramContext, successCallback, errorCallback)
    {
      if(! await this.authService.checkLoginStateAndNotify())
        return;

        var user = this.authService.getUserProfile();

        axios.delete('api/wrkspace/dia/del', 
        {
          params: {
            emailId: diagramContext.emailId,
            collectionName: diagramContext.collectionName,
            diagramName: diagramContext.diagramName
          },
          headers: {

            'Authorization': 'Bearer ' + user.AccessToken,
            'Content-Type': 'application/json'
          }
        })
        .then(function (response) {
          successCallback(response.data);
        })
        .catch(function (error) {
          console.log(error);
          errorCallback(error);
        })
        .finally(function () {
        });
    }

    async exportDiagramAsPNG(svgbase64,  successCallback, errorCallback)
      {
       
        axios.post('api/export/pdf', JSON.stringify(svgbase64),
        {
          headers: {
            'Accept': 'application/octet-stream'
          },
          responseType: 'blob',
        })
        .then(function (response) {
          successCallback(response.data);
        })
        .catch(function (error) {
          console.log(error);
          errorCallback(error);
        })
        .finally(function () {
          
        });
      }
    
    async getSharedDiagrams(successCallback, errorCallback) {
      if(! await this.authService.checkLoginStateAndNotify())
      return;

      var user = this.authService.getUserProfile();

      axios.get('/api/wrkspace/shareddiags', 
      {
        params: {
          emailId: user.UserName
        },
        headers: {

          'Authorization': 'Bearer ' + user.AccessToken,
          'Content-Type': 'application/json'
        }
      })
      .then(function (response) {
        successCallback(response.data);
      })
      .catch(function (error) {
        console.log(error);
        errorCallback(error);
      })
    }

    async deleteSharedDiagram(emailId, uid, successCallback, errorCallback) {

      if(! await this.authService.checkLoginStateAndNotify())
      return;

      var user = this.authService.getUserProfile();

      axios.delete('/api/wrkspace/shareddiag/del', 
      {
        params: {
          emailId: emailId,
          diagramUID: uid
        },
        headers: {

          'Authorization': 'Bearer ' + user.AccessToken,
          'Content-Type': 'application/json'
        }
      })
      .then(function (response) {
        successCallback();
      })
      .catch(function (error) {
        console.log(error);
        errorCallback(error);
      })
    }

    async loadSharedDiagramFromMySpace(uid, successCallback, errorCallback) {
      if(! await this.authService.checkLoginStateAndNotify())
      return;

      var user = this.authService.getUserProfile();

      axios.get('/api/wrkspace/shareddiag/load', 
      {
        params: {
          diagramUID: uid
        },
        headers: {

          'Authorization': 'Bearer ' + user.AccessToken,
          'Content-Type': 'application/json'
        }
      })
      .then(function (response) {
        successCallback(response.data);
      })
      .catch(function (error) {
        console.log(error);
        errorCallback(error);
      })
    }

    async saveSharedDiagramInMySpace(sharedDiagramMySpaceContext, respCallback, errCallback) {
      if(sharedDiagramMySpaceContext == null || sharedDiagramMySpaceContext.DiagramXml == null)
          return;

          var user = this.authService.getUserProfile();

          axios.post('/api/wrkspace/shareddiag/save', 
          {
            UID: sharedDiagramMySpaceContext.UID,
            SharedLink: sharedDiagramMySpaceContext.SharedLink,
            DiagramName: sharedDiagramMySpaceContext.DiagramName,
            DiagramXml: sharedDiagramMySpaceContext.DiagramXml,
            DateTimeSaved: sharedDiagramMySpaceContext.DateTimeSaved
          }, 
          {
            headers: {
                'Authorization': 'Bearer ' + user.AccessToken,
                'Content-Type': 'application/json'
            }
          })
          .then(function (response) {
  
            if(!response.data.isSuccess && response.data.errorCode == 'diagram-to-large')
            {
              Toast.show('warning', 8000,
                "Diagram not saved as it is over 2Mb, consider break up your diagram into multiple diagrams and save separately");
            } else {
              respCallback(response.data);
            }
          })
          .catch(function (error) {
            console.log(error);
            errCallback(error);
          }); 
   }

   async updateSharedDiagramInMySpace(emailId, uid, diagramJson, respCallback, errCallback) {

        var user = this.authService.getUserProfile();

        axios.post('/api/wrkspace/shareddiag/update', 
        {
          emailId: emailId,
          diagramUID: uid,
          diagramJson: diagramJson
        }, 
        {
          headers: {
              'Authorization': 'Bearer ' + user.AccessToken,
              'Content-Type': 'application/json'
          }
        })
        .then(function (response) {

          if(!response.data.isSuccess && response.data.errorCode == 'diagram-to-large')
          {
            Toast.show('warning', 8000,
              "Diagram not saved as it is over 2Mb, consider break up your diagram into multiple diagrams and save separately");
          } else {
            respCallback(response.data);
          }
        })
        .catch(function (error) {
          console.log(error);
          errCallback(error);
        }); 
 }
}