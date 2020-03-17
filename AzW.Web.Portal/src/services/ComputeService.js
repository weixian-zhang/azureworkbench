import Subscription from "../models/services/Subscription";
import axios from "axios";
import AuthService from './AuthService';

export default class ComputeService
{
    constructor(){
        this.authService = new AuthService();
    }

    async getVMImages(subscription, onSuccess, onFailure){
        if(!this.authService.isUserLogin())
        return;

        var user = this.authService.getUserProfile();

        axios.get('/api/info/compute/images', 
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
            onSuccess(response.data);
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