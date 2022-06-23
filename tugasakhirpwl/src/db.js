// Conveniently import this file anywhere to use db

import { firestore, initializeApp } from 'firebase/app'



import 'firebase/firestore'

// export const db = firebase
//     .initializeApp({ projectId: 'shoppingcart71190468' })
//     .firestore()

export const firebaseConfig = {
    apiKey: "AIzaSyC_LXG1bOhvxnoJGk3QIdvknLzrKTTo7Mc",
  authDomain: "shoppingcart71190468.firebaseapp.com",
  projectId: "shoppingcart71190468",
  storageBucket: "shoppingcart71190468.appspot.com",
  messagingSenderId: "304806533189",
  appId: "1:304806533189:web:a993163a830ad07c2a6b2c",
  measurementId: "G-L4G5MT8D77"
}
const app = initializeApp(firebaseConfig)
export const db = firestore(app)

// Export types that exists in Firestore - Uncomment if you need them in your app
// const { Timestamp, GeoPoint } = firebase.firestore
// export { Timestamp, GeoPoint }
