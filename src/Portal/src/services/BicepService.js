import Toast from '../components/Workbench/Helpers/Toast';
import Messages from '../components/Workbench/Helpers/Messages';
import axios from 'axios';
import axiosRetry from 'axios-retry'
import AuthService from './AuthService';
import BicepDiagramInfo from '../models/services/BicepDiagramInfo';

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

        Toast.show('primary', 2000, "Generating Bicep template, please wait...");

        var user = this.authService.getUserProfile();

        var bicepDiagramInfo = new BicepDiagramInfo();
        bicepDiagramInfo.diagramInfo.userEmail = user.UserName
        bicepDiagramInfo.diagramInfo.diagramContext.azcontexts = provisionContexts
        var jsonStr = JSON.stringify(bicepDiagramInfo);

        axios.post('api/bicep/gen', jsonStr,
        {
            headers: {
                'Accept': 'application/octet-stream',
                'Authorization': 'Bearer ' + user.AccessToken,
                'Content-Type': 'application/json'
            },
            responseType: 'blob'
        })
        .then(function (response) {
            //onSuccess(response.data);

            var bicepFileDonwloadUrl = response.headers['bicep-blob-url']
            this.downloadBicepFile(bicepFileDonwloadUrl, onSuccess, onFailure)
        })
        .catch((err) => {
            if (err.response.status !== 200) {
                onFailure(err);
                Toast.show('danger', 4000, 'Bicep generation API call failed');
            }
        });
    }

    downloadBicepFile(bicepFileUrl, onSuccess, onFailure) {
        axiosRetry(axios, {
            retries: 8, // number of retries
            retryDelay: (retryCount) => {
              console.log(`biceo download retry attempt: ${retryCount}`);
              return 1000; // time interval between retries
            },
            retryCondition: (error) => {
              // if retry condition is not specified, by default idempotent requests are retried
              return error.response.status === 404;
            },
          });

        axios({
            url: bicepFileUrl,
            method: 'GET',
            responseType: 'blob', // important
        }).then((response) => {
            onSuccess(response.data);
        })
        .catch((err) => {
            if (err.response.status !== 200) {
                onFailure(err);
                Toast.show('danger', 4000, 'Bicep download failed...');
            }
        });
    }

    retryDownloadBicepFile(provisionContexts) {

        var fileDownload = new function(resolve, reject) {
            
        };
    }
}

export default (new BicepService);