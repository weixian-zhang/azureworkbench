import Subscription from "../models/services/Subscription";
import Region from "../models/services/Region";
import ResourceGroup from "../models/services/ResourceGroup";
import axios from "axios";
import AuthService from './AuthService';
import Messages from '../components/Workbench/Helpers/Messages';
import ServiceHelper from './ServiceHelper';
import Toast from '../components/Workbench/Helpers/Toast';

export default class ARMService
{
    constructor(){

        this.authService = AuthService;
        this.httpErrorMessage = "Error occured, likely due to no 'Admin Consent' from your Azure AD Global Admin.\n" +
        "For deployment, ensure Workbench has admin consent authorized by Azure AD Global Admin";
    }

    async getRegions(onSuccess, onFailure){

      var thisComp = this;

      if(! await this.authService.checkLoginStateAndNotify())
        return;

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
            region.DisplayName = loc.displayName;
            region.ProvisionName = loc.provisionName;
            region.RatecardMeterRegionName = loc.ratecardMeterRegionName;
            regions.push(region)
          });

          onSuccess(regions);
        }
      })
      .catch(function (error) {
        onFailure(thisComp.httpErrorMessage)
      }) 
   }

   async createNewResourceGroup(subscriptionId, location, rgName, onSuccess, onFailure) {
      if(! await this.authService.checkLoginStateAndNotify())
      return;
      
      var user = this.authService.getUserProfile();
      var thisComp = this;

      var params = {
        subscriptionId: subscriptionId,
        location: location,
        rgName: rgName
      };
      axios.post('api/arm/rg/new', JSON.stringify(params),
        {
          headers: {
            'Authorization': 'Bearer ' + user.AccessToken,
            'Content-Type': 'application/json'
          }
        })
        .then(function (response) {
          onSuccess(response.data);
        })
        .catch(function (error) {
          onFailure(thisComp.httpErrorMessage);
        });
   }

   async getResourceGroups(subscription, onSuccess, onFailure){

    if(! await this.authService.checkLoginStateAndNotify())
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
        onFailure(thisComp.httpErrorMessage)
      }) 
  }

    async getSubscriptions(onSuccess, onFailure){

      if(! await this.authService.checkLoginStateAndNotify())
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
        })
        .catch(function (error) {
          onFailure(thisComp.httpErrorMessage)
        })  
    }
} 