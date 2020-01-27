import axios from "axios";
import AnonymousDiagramContext from '../models/services/AnonymousDiagramContext';

export default class DiagramService
{
    async saveAnonymousDiagram(anonyDiagramContext, respCallback, errCallback){
        if(anonyDiagramContext == null || anonyDiagramContext.DiagramXml == null)
            return;
      
        //axios.defaults.headers.common['Authorization'] = token.accessToken;
        axios.post('api/dia/anony/share', anonyDiagramContext)
        .then(function (response) {
          respCallback(response.data)
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

      var sharedAnonyDiagramContext;

      //axios.defaults.headers.common['Authorization'] = token.accessToken;
      return axios.get('api/dia/anony/shareload',{
          params: {
            anonyDiagramId: anonyDiagramId
          }
        });
        // .then(function (response) {
        //   var adc = new AnonymousDiagramContext();
        //   adc.UID = response.data.UID;
        //   adc.DiagramName = response.data.DiagramName;
        //   adc.DiagramXml = response.data.DiagramXml;
        //   adc.SharedLink = response.data.SharedLink;
        //   sharedAnonyDiagramContext = adc;
        // })
        // .catch(function (error) {
        //   console.log(error);
        //   errorCallback(error);
        // })
        // .finally(function () {
        //   responseCallback(sharedAnonyDiagramContext);
        // });   
      }
}