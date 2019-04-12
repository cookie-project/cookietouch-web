import { OnInitialize } from 'overmind';
import firebase from 'firebase/app';
import { authState } from 'rxfire/auth';

export const onInitialize: OnInitialize = async ({ state, effects }) => {
  effects.firebase.initialize();
  authState(firebase.auth()).subscribe(user => {
    state.firebase.user = user;
  });
};
