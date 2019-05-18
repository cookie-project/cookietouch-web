import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';

export const initialize = () => {
  const config = {
    apiKey: 'AIzaSyBr9rnJtS7_jFwfHfsbsKHO4U-xAQ--e7k',
    authDomain: 'cookietouch-52c0c.firebaseapp.com',
    databaseURL: 'https://cookietouch-52c0c.firebaseio.com',
    messagingSenderId: '423749577733',
    projectId: 'cookietouch-52c0c',
    storageBucket: 'cookietouch-52c0c.appspot.com'
  };

  return firebase.initializeApp(config);
};

export const signin = async (
  email: string,
  password: string
): Promise<boolean> => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    return true;
  } catch (error) {
    throw error;
  }
};

export const signout = async () => {
  return firebase.auth().signOut();
};

export const signup = async (
  email: string,
  password: string
): Promise<boolean> => {
  try {
    const userCred = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    if (!userCred.user) {
      return false;
    }
    userCred.user.sendEmailVerification();
    return true;
  } catch (error) {
    throw error;
  }
};
