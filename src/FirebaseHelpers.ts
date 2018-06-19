import * as firebase from "firebase";

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
    return false;
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
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    return true;
  } catch (error) {
    return false;
  }
}

export function presence() {
  firebase.auth().onAuthStateChanged(user => {
    // Fetch the current user's ID from Firebase Authentication.
    // const uid = firebase.auth().currentUser.uid;
    if (!user) {
      return;
    }

    const uid = user.uid;

    // Create a reference to this user's specific status node.
    // This is where we will store data about being online/offline.
    const userStatusDatabaseRef = firebase.database().ref(`/status/${uid}`);

    // We'll create two constants which we will write to
    // the Realtime database when this device is offline
    // or online.
    const isOfflineForDatabase = {
      last_changed: firebase.database.ServerValue.TIMESTAMP,
      state: "offline"
    };

    const isOnlineForDatabase = {
      last_changed: firebase.database.ServerValue.TIMESTAMP,
      state: "online"
    };

    // Create a reference to the special '.info/connected' path in
    // Realtime Database. This path returns `true` when connected
    // and `false` when disconnected.
    firebase
      .database()
      .ref(".info/connected")
      .on("value", snapshot => {
        if (!snapshot) {
          return;
        }
        // If we're not currently connected, don't do anything.
        if (snapshot.val() === false) {
          return;
        }

        // If we are currently connected, then use the 'onDisconnect()'
        // method to add a set which will only trigger once this
        // client has disconnected by closing the app,
        // losing internet, or any other means.
        userStatusDatabaseRef
          .onDisconnect()
          .set(isOfflineForDatabase)
          .then(() => {
            // The promise returned from .onDisconnect().set() will
            // resolve as soon as the server acknowledges the onDisconnect()
            // request, NOT once we've actually disconnected:
            // https://firebase.google.com/docs/reference/js/firebase.database.OnDisconnect
            // We can now safely set ourselves as 'online' knowing that the
            // server will mark us as offline once we lose connection.
            userStatusDatabaseRef.set(isOnlineForDatabase);
          });
      });
  });
}
