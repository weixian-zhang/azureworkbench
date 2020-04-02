import axios from 'axios';
import AuthService from './AuthService';

export default class ProvisionService
{
    constructor(){
      this.authService = new AuthService();
    }

    async provisionDiagram(subscription, resources, onSuccess, onFailure){
        
        var user = this.authService.getUserProfile();
        
        axios.post('api/deploy', subscription, resources,
        {
            headers: {
                'Authorization': 'Bearer ' + user.AccessToken,
                'Content-Type': 'application/json'
            }
        })
        .then(function (response) {
            onSuccess();
        })
        .catch(function (error) {
          console.log(error);
          onFailure(error);
        })
        .finally(function () {
          
        });
    }
}