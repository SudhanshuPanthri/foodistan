import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
// import firebase from 'firebase/compat/app';
const firebaseConfig = {
  apiKey: 'AIzaSyC_YvoqyjiW9BXND0uCFYyqd6zVl-WBA5U',
  authDomain: 'foodistan-3bf7d.firebaseapp.com',
  projectId: 'foodistan-3bf7d',
  storageBucket: 'foodistan-3bf7d.appspot.com',
  messagingSenderId: '503873460879',
  appId: '1:503873460879:web:22b80dfd3b8284def7aefa',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase, firestore};
