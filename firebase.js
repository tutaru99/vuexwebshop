import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyDvfa8JsxbClXGjvY8TgFBtRNgi9gacWnw",
    authDomain: "dbforbagels.firebaseapp.com",
    databaseURL: "https://dbforbagels.firebaseio.com",
    projectId: "dbforbagels",
    storageBucket: "dbforbagels.appspot.com",
    messagingSenderId: "604643582119",
    appId: "1:604643582119:web:d5558509c9f8cc3ffbfb82"
  };
  // Initialize Firebase
  export const fb = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()
export const dbMenuAdd = db.collection('menuItems');
export const dbOrders = db.collection('orderItems');