import Toast from '../components/Workbench/Helpers/Toast';
import Messages from '../components/Workbench/Helpers/Messages';
import axios from 'axios';
import AuthService from './AuthService';

class BicepService
{
    constructor()
    {
        this.authService = AuthService;
    }

    async generateBicep(provisionContexts, onSuccess, onFailure) {
        if(!await this.authService.isUserLogin()) {
            Toast.show("warning", 2500, "Please login to generate Bicep template")
            return;
        }

        var user = this.authService.getUserProfile();

        var param = {
            provisionContexts: provisionContexts
        }

        axios.post('api/bicep/gen', JSON.stringify(param),
        {
            headers: {
                'Accept': 'application/octet-stream',
                'Authorization': 'Bearer ' + user.AccessToken,
                'Content-Type': 'application/json'
            },
            responseType: 'blob'
        })
        .then(function (response) {
            onSuccess(response.data);
        })
        .catch(function (error) {
            onFailure(error);
            Toast.show('danger', 8000, Messages.GeneralHttpError());
        })
    }
}

export default (new BicepService);