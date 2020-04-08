import VMimage from "../models/services/VMimage";
import axios from "axios";
import AuthService from './AuthService';
import Toast from '../components/Workbench/Helpers/Toast';
import Messages from '../components/Workbench/Helpers/Messages';

export default class ComputeService
{
    constructor(){
        this.authService = new AuthService();
    }

    async searchVMImages(searchPattern, onSuccess, onFailure){
        if(!this.authService.isUserLogin())
        {
          Toast.show("warning", 2000, "Please login/re-login...")
          return;
        }

        var user = this.authService.getUserProfile();

        axios.get('api/compute/search/images', 
        {
          params: {
            searchPattern: searchPattern
          },
          headers: {
  
            'Authorization': 'Bearer ' + user.AccessToken,
            'Content-Type': 'application/json'
          }
        })
        .then(function (response) {
          if(response.data != null)
          {
            var images= [];
            response.data.map(vmimg => {
              
              var vmImage = new VMimage();
              vmImage.DisplayName = vmimg.displayName;
              vmImage.Publisher = vmimg.publisher;
              vmImage.Offer = vmimg.offer;
              vmImage.Sku = vmimg.sku;
              vmImage.Version = vmimg.version;
              images.push(vmImage)

            })
            onSuccess(images);
          }
        })
        .catch(function (error) {
          Toast.show("warning", 4000, Messages.GeneralHttpError());
          onFailure(error)
        })
        .finally(function () {
          // always executed
        });  
    }
}