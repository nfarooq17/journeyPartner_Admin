

import firebase from "firebase/app";
import "firebase/firestore";
import { useState } from "react";
import AppRouter from './AppRouter';
import AuthContext from "./components/context";
import Example from "./pages/example";
import LoginPage from "./pages/LoginPage";


var firebaseConfig = {
  apiKey: "AIzaSyCQNqyZgj-O5ViMIJlYrE1CWJ23SFcv_TU",
  authDomain: "journey-partner-65289.firebaseapp.com",
  databaseURL: "https://journey-partner-65289.firebaseio.com",
  projectId: "journey-partner-65289",
  storageBucket: "journey-partner-65289.appspot.com",
  messagingSenderId: "652487352209",
  appId: "1:652487352209:web:e71db6943ea363f7108430",
  measurementId: "G-JFGH73WFWV"
};
if (!firebase.apps.length) {
firebase.initializeApp(firebaseConfig);
}


function App() {

  const [user,setUser] = useState(true)


  if(user === true){
    return (
    <AuthContext.Provider value = {{user, setUser}}>
      <AppRouter></AppRouter>
    </AuthContext.Provider>
    )
  }
  else{
    return (
      <AuthContext.Provider value = {{user, setUser}}>
        <LoginPage></LoginPage>
      </AuthContext.Provider>
      )
  }
 


}

export default App;
