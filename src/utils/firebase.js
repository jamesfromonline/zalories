import firebase from 'firebase'

const config = {
    apiKey: "xxxxx",
    authDomain: "calories-2ea8f.firebaseapp.com",
    databaseURL: "https://calories-2ea8f.firebaseio.com",
    projectId: "calories-2ea8f",
    storageBucket: "",
    messagingSenderId: "171977782628"
  }

firebase.initializeApp(config)
export const google = new firebase.auth.GoogleAuthProvider()
export const twitter = new firebase.auth.TwitterAuthProvider()
export const facebook = new firebase.auth.FacebookAuthProvider()
export const auth = firebase.auth()
export default firebase
