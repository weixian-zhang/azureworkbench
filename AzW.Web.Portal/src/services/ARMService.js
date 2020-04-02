import Subscription from "../models/services/Subscription";
import Region from "../models/services/Region";
import ResourceGroup from "../models/services/ResourceGroup";
import axios from "axios";
import AuthService from './AuthService';
import Messages from '../components/Workbench/Helpers/Messages';

export default class ARMService
{
    constructor(){

        this.authService = new AuthService();
        this.httpErrorMessage = "Error occured while contacting Workbench server: " +
        "This could be expired login session, or no 'Admin Consent' from your Azure AD Global Admin. " +
        "Try logging out and re-login or make sure Azure Workbench has admin consent authorized by Azure AD Global Admin"
    }

    async getRegions(onSuccess, onFailure){

      var thisComp = this;

      axios.get('api/arms/loc', 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(function (response) {
        if(response.data != null)
        {
          var regions = [];
          response.data.map(loc => {
            var region = new Region();
            region.Name = loc;
            regions.push(region)
          });

          onSuccess(regions);
        }
      })
      .catch(function (error) {
        console.log(error);
        onFailure(Messages.GeneralHttpError())
      })
      .finally(function () {
        // always executed
      });  
   }

   async createNewResourceGroup(subscriptionId, location, rgName, onSuccess, onFailure) {
      if(!this.authService.isUserLogin())
      return;
      
      var user = this.authService.getUserProfile();
      var thisComp = this;

      axios.post('api/arm/rg', subscriptionId, location, rgName,
        {
          headers: {
            'Authorization': 'Bearer ' + user.AccessToken,
            'Accept': 'application/octet-stream'
          },
          responseType: 'blob',
        })
        .then(function (response) {
          onSuccess(response.data);
        })
        .catch(function (error) {
          console.log(error);
          onFailure(Messages.GeneralHttpError());
        })
   }

   async getResourceGroups(subscription, onSuccess, onFailure){

      if(!this.authService.isUserLogin())
          return;
          
      var user = this.authService.getUserProfile();
      var thisComp = this;

      axios.get('api/arm/rg', 
      {
        params: {
          subscription: subscription
        },
        headers: {

          'Authorization': 'Bearer ' + user.AccessToken,
          'Content-Type': 'application/json'
        }
      })
      .then(function (response) {
        if(response.data != null)
        {
          var rgs = [];
          response.data.map(r => {
            var rg = new ResourceGroup();
            rg.Name = r.name;
            rgs.push(rg)
          });

          onSuccess(rgs);
        }
      })
      .catch(function (error) {
        console.log(error);
        onFailure(Messages.GeneralHttpError())
      })
      .finally(function () {
        // always executed
      });  
  }

    async getSubscriptions(onSuccess, onFailure){

        if(!this.authService.isUserLogin())
            return;
            
        var user = this.authService.getUserProfile();
        var thisComp = this;
        axios.get('api/arm/subs', 
        {
          headers: {
  
            'Authorization': 'Bearer ' + user.AccessToken,
            'Content-Type': 'application/json'
          }
        })
        .then(function (response) {
          if(response.data != null)
          {
            var objArray = response.data;
            var subs = [];
            objArray.map(s => {
              var sub = new Subscription();
              sub.Name = s.displayName;
              sub.SubscriptionId = s.subscriptionId
              subs.push(sub)
            });

            onSuccess(subs);
          }
          else
          onFailure(response.data);
        })
        .catch(function (error) {
          console.log(error);
          onFailure(Messages.GeneralHttpError())
        })
        .finally(function () {
          // always executed
        });  
    }
} 