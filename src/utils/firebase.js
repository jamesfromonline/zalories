import firebase from 'firebase'

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "calories-2ea8f.firebaseapp.com",
    databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
    projectId: "calories-2ea8f",
    storageBucket: "",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MSG_SENDER_ID
  }

firebase.initializeApp(config)
export const google = new firebase.auth.GoogleAuthProvider()
export const twitter = new firebase.auth.TwitterAuthProvider()
export const facebook = new firebase.auth.FacebookAuthProvider()
export const auth = firebase.auth()
export default firebase
