export default class ResourceManagerService
{
    constructor(){}

    async getSubscriptions(){
        const token = null; //await authProvider.getAccessToken();
      
        axios.defaults.baseURL = 'https://localhost:5001';
        axios.defaults.headers.common['Authorization'] = token.accessToken;
        axios.get('/api/arm/sub', {headers: {
          "Authorization" : "Bearer " + token.accessToken
        }
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          // always executed
        });  
      }
} 