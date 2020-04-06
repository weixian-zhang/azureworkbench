import VMimage from "../models/services/VMimage";
import axios from "axios";
import AuthService from './AuthService';

export default class ComputeService
{
    constructor(){
        this.authService = new AuthService();
    }

    async searchVMImages(searchPattern, onSuccess, onFailure){
        if(!this.authService.isUserLogin())
        return;

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
          console.log(error);
          onFailure(error)
        })
        .finally(function () {
          // always executed
        });  
    }
}