import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDWfwePfjy0nm3xtyVzB_U12Vm53HPsGXQ",
  authDomain: "journaler-36ac9.firebaseapp.com",
  databaseURL: "https://journaler-36ac9.firebaseio.com",
  projectId: "journaler-36ac9",
  storageBucket: "journaler-36ac9.appspot.com",
  messagingSenderId: "229640134833",
  appId: "1:229640134833:web:391e1fff0ed14a0b870290"
}

firebase.initializeApp(config)
export const google = new firebase.auth.GoogleAuthProvider()
export const twitter = new firebase.auth.TwitterAuthProvider()
export const facebook = new firebase.auth.FacebookAuthProvider()
export const auth = firebase.auth()
export default firebase
