import AuthService from './AuthService';
import Toast from '../components/Workbench/Helpers/Toast';
import Messages from '../components/Workbench/Helpers/Messages';

export default class ServiceHelper
{
    static checkLoginStateAndNotify(authService){
        if(authService.isUserLogin())
            return true;
        else
        {
            Toast.show("warning", 6500,
                "Please login to save diagram to 'MySpace' and any 'Provision' features");
            return false;
        }
    }
}