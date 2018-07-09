import firebase from "firebase";

export function initialize() {
  const config = {
    apiKey: "AIzaSyDWK5MrCUhiluOfj8emZT_ARUpbkzbwKTE",
    authDomain: "cookietouch-52c0c.firebaseapp.com",
    databaseURL: "https://cookietouch-52c0c.firebaseio.com",
    messagingSenderId: "423749577733",
    projectId: "cookietouch-52c0c",
    storageBucket: "cookietouch-52c0c.appspot.com"
  };

  return firebase.initializeApp(config);
}

export async function signin(
  email: string,
  password: string
): Promise<boolean> {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    return true;
  } catch (error) {
    throw error;
  }
}

export async function signout() {
  await firebase.auth().signOut();
}

export async function signup(
  email: string,
  password: string
): Promise<boolean> {
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
}

export function presence() {
  firebase.auth().onAuthStateChanged(user => {
    if (!user) {
      return;
    }
    const uid = user.uid;
    const userStatusDatabaseRef = firebase.database().ref(`/status/${uid}`);
    const isOfflineForDatabase = {
      last_changed: firebase.database.ServerValue.TIMESTAMP,
      state: "offline"
    };
    const isOnlineForDatabase = {
      last_changed: firebase.database.ServerValue.TIMESTAMP,
      state: "online"
    };
    firebase
      .database()
      .ref(".info/connected")
      .on("value", snapshot => {
        if (!snapshot) {
          return;
        }
        if (snapshot.val() === false) {
          return;
        }
        userStatusDatabaseRef
          .onDisconnect()
          .set(isOfflineForDatabase)
          .then(() => {
            userStatusDatabaseRef.set(isOnlineForDatabase);
          });
      });
  });
}
