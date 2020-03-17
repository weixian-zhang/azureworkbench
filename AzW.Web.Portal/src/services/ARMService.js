import Subscription from "../models/services/Subscription";
import Region from "../models/services/Region";
import ResourceGroup from "../models/services/ResourceGroup";
import axios from "axios";
import AuthService from './AuthService';

export default class ARMService
{
    constructor(){

        this.authService = new AuthService();
        this.httpErrorMessage = "Error occured while contacting Workbench server:" +
        "This might due to expired login session, or no 'Admin Consent' from your Azure AD Global Admin." +
        "Try re-login or make sure Azure Workbench has admin consent authorized by Azure AD Global Admin"
    }

    async getRegions(onSuccess, onFailure){

      if(!this.authService.isUserLogin())
          return;
          
      var user = this.authService.getUserProfile();

      axios.get('/api/info/arm/loc', 
      {
        headers: {

          'Authorization': 'Bearer ' + user.AccessToken,
          'Content-Type': 'application/json'
        }
      })
      .then(function (response) {
        if(response.data != null)
        {
          var regions = [];
          response.data.map(s => {
            var region = new Region();
            region.Name = s.name;
            regions.push(region)
          });

          onSuccess(regions);
        }
      })
      .catch(function (error) {
        console.log(error);
        onFailure('')
      })
      .finally(function () {
        // always executed
      });  
   }

   async getResourceGroups(subscription, onSuccess, onFailure){

      if(!this.authService.isUserLogin())
          return;
          
      var user = this.authService.getUserProfile();

      axios.get('/api/info/arm/rg', 
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
        onFailure(error)
      })
      .finally(function () {
        // always executed
      });  
  }

    async getSubscriptions(onSuccess, onFailure){

        if(!this.authService.isUserLogin())
            return;
            
        var user = this.authService.getUserProfile();

        axios.get('/api/arm/subs', 
        {
          headers: {
  
            'Authorization': 'Bearer ' + user.AccessToken,
            'Content-Type': 'application/json'
          }
        })
        .then(function (response) {
          if(response.data != null)
          {
            var objArray = JSON.parse(response.data);
            var subs = [];
            objArray.map(s => {
              var sub = new Subscription();
              sub.Name = s.Name;
              sub.SubscriptionId = s.SubscriptionId;

              subs.push(sub)
            });

            onSuccess(subs);
          }
          else
          onFailure(response.data);
        })
        .catch(function (error) {
          console.log(error);
          onFailure(error)
        })
        .finally(function () {
          // always executed
        });  
    }
} 