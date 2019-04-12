import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { fromRef, ListenEvent } from 'rxfire/database';

export const useConnectedUsers = () => {
  const [usersConnected, setUsersConnected] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  const listRef = firebase.database().ref('status');

  useEffect(() => {
    const sub = fromRef(listRef, ListenEvent.value).subscribe(change => {
      const { snapshot } = change;

      if (!snapshot) {
        return;
      }
      let num = 0;
      snapshot.forEach(x => {
        if (x.val().state === 'online') {
          num++;
        }
        return false;
      });
      setTotalUsers(snapshot.numChildren());
      setUsersConnected(num);
    });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return [usersConnected, totalUsers];
};
