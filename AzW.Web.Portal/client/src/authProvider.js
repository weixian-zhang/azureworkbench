// authProvider.js
import { MsalAuthProvider, LoginType } from 'react-aad-msal';
 
const config = {
  auth: {
    authority: 'https://login.microsoftonline.com/common',
    clientId: 'd77431ff-1996-404d-970c-adc2725d7e87',
    redirectUri: 'http://localhost:3000/',
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true
  }
};
 
const authenticationParameters = {
  scopes: [
    'openid',
    'api://5700106c-06c4-4bde-ab79-b1dc3a255b85/AzResource.Deploy'
  ],
  prompt: 'consent'
}
 
export const authProvider = new MsalAuthProvider
    (config, authenticationParameters, LoginType.Redirect)