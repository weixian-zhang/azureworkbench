import Subscription from "../models/services/Subscription";
import axios from "axios";
import AuthService from './AuthService';

export default class ARMService
{
    constructor(){

        this.authService = new AuthService();
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