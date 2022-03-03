// import AuthService from './AuthService';
// import Toast from '../components/Workbench/Helpers/Toast';
// import Messages from '../components/Workbench/Helpers/Messages';

// export default class ServiceHelper
// {
//     async checkLoginStateAndNotify(authService){

//         return new Promise(async (resolve, rej) => {
//            var isLoggedIn = await authService.isUserLogin();

//            if(isLoggedIn) {
//             resolve(true);
//            } else {
//             Toast.show("warning", 3000, "Please login to use this feature");
//             resolve(false);
//            }
//         });

//         // authService.isUserLogin().then(isLoggedIn => {
//         //     if(isLoggedIn)
//         //         return true;
//         //     else {
//         //         Toast.show("warning", 5500,
//         //         "Please login to save diagram to 'MySpace' and any 'Provision' features");
//         //         return false;
//         //     }
//         // });
//         // if(authService.isUserLogin())
//         //     return true;
//         // else
//         // {
//         //     Toast.show("warning", 6500,
//         //         "Please login to save diagram to 'MySpace' and any 'Provision' features");
//         //     return false;
//         // }
//     }
// }