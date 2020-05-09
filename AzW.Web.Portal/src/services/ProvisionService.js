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
        
        var thisComp = this;
        Toast.show("none", 2000, "Diagram sent to server for provisioning, you can continue your work")

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
            var result = response.data;

            if(result.isSuccessful) {
                Toast.show('success', 3000, 'Diagram deployed successfully');
            }
            else { 
                Toast.show('danger', 8000, result.errorMessage);
            }
                
        })
        .catch(function (error) {
            Toast.show('danger', 8000, Messages.GeneralHttpError());
        })
    }
}