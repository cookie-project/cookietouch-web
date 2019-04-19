import firebase from 'firebase/app';
import { docData } from 'rxfire/firestore';
import { useEffect, useState } from 'react';

export enum UpdatesChannel {
  LATEST = 'latest',
  BETA = 'beta',
  ALPHA = 'alpha'
}

interface ProxyConfiguration {
  ip: string;
  port: number;
  username: string;
  password: string;
}

interface CharacterCreation {
  create: boolean;
  name: string;
  server: number;
  breed: number;
  sex: number;
  head: number;
  colors: number[];
  completeTutorial: boolean;
}

interface AccountConfiguration {
  username: string;
  password: string;
  server: number;
  character: string;
  switchCharacter?: string;
  characterCreation: CharacterCreation;
  planificationActivated: boolean;
  planification: boolean[];
  proxy: ProxyConfiguration;
}

interface GlobalConfiguration {
  anticaptchaKey: string;
  pushBulletAccessToken: string;
  lang: string;
  accounts: AccountConfiguration[];
  showDebugMessages: boolean;
  updatesChannel: UpdatesChannel;
  themeFile: string;
}

export const useGlobalConfig = (userId: string) => {
  const [config, setConfig] = useState<GlobalConfiguration>();

  useEffect(() => {
    const sub = docData<GlobalConfiguration>(
      firebase.firestore().doc(`/users/${userId}/config/global`)
    ).subscribe(setConfig);

    return () => {
      sub.unsubscribe();
    };
  }, [userId]);

  return config;
};
