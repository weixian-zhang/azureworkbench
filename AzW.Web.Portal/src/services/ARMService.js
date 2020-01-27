import Subscription from "../models/services/Subscription";
import axios from "axios";

export default class ARMService
{
    constructor(){}

    static async getSubscriptions(accessToken, callback){
        const token = null; //await authProvider.getAccessToken();
      
        //axios.defaults.baseURL = 'https://localhost:5001';
        //axios.defaults.headers.common['Authorization'] = token.accessToken;
        axios.get('/api/arm/subs', {headers: {
          "Authorization" : "Bearer " + accessToken
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
            })
          }
          else
            callback(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          // always executed
        });  
      }
} 