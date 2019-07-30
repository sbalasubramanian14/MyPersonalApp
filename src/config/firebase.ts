import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyDJNVdE-lYBXo3mobMCwp1OrVL8vL6N8o4",
  authDomain: "myapp-38bfc.firebaseapp.com",
  databaseURL: "https://myapp-38bfc.firebaseio.com",
  projectId: "myapp-38bfc",
  storageBucket: "myapp-38bfc.appspot.com",
  messagingSenderId: "305408178282",
  appId: "1:305408178282:web:8d8ebf349124b117"
};

const fire = firebase.initializeApp(firebaseConfig);

export { fire, firebase };
