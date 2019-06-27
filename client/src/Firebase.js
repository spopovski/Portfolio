import * as firebase from 'firebase';
const config = {
    apiKey: "AIzaSyAmMnLAvToH_DJ4p8Q0mtqGWI0rR28wUpI",
    authDomain: "portfolio-acc8c.firebaseapp.com",
    databaseURL: "https://portfolio-acc8c.firebaseio.com",
    projectId: "portfolio-acc8c",
    storageBucket: "portfolio-acc8c.appspot.com",
    messagingSenderId: "527522464735",
    appId: "1:527522464735:web:291da8c02d758d18"
};
firebase.initializeApp(config);
const storage = firebase.storage();

export const database = firebase.database();
export const auth = firebase.auth();
export {
    storage, firebase as default
}