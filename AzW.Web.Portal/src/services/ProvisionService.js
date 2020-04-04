import axios from 'axios';
import AuthService from './AuthService';
import Toast from '../components/Workbench/Helpers/Toast';
import Messages from '../components/Workbench/Helpers/Messages';

export default class ProvisionService
{
    constructor(){
      this.authService = new AuthService();
    }

    async provisionDiagram(subscriptionId, provisionContexts, onSuccess, onFailure){
        
        if(!this.authService.isUserLogin())
            return;
        
        var user = this.authService.getUserProfile();

        var param = {
            subscriptionId: subscriptionId,
            provisionContexts: provisionContexts
        }
        
        axios.post('api/deploy', JSON.stringify(param),
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
          onFailure(Messages.GeneralHttpError());
        })
        .finally(function () {
          
        });
    }
}