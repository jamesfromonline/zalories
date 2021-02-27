import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyAyS_1LNBYjc61TOZpC4dn3FKjvZEcD4Ys",
  authDomain: "calories-2ea8f.firebaseapp.com",
  databaseURL: "https://calories-2ea8f.firebaseio.com",
  projectId: "calories-2ea8f",
  storageBucket: "calories-2ea8f.appspot.com",
  messagingSenderId: "171977782628",
  appId: "1:171977782628:web:2e9ae5afb2b6128e9eb671"
}

firebase.initializeApp(config)
export const google = new firebase.auth.GoogleAuthProvider()
export const twitter = new firebase.auth.TwitterAuthProvider()
export const facebook = new firebase.auth.FacebookAuthProvider()
export const auth = firebase.auth()
export default firebase
