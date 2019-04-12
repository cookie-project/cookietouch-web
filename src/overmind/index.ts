import { IConfig, createOvermind } from 'overmind';
import { namespaced } from 'overmind/config';
import * as github from './github';
import * as firebase from './firebase';
import { createHook } from 'overmind-react';

const config = namespaced({
  firebase,
  github
});

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}

const overmind = createOvermind(config);

export const useOvermind = createHook(overmind);
