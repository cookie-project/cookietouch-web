import { Action } from 'overmind';

export const getReleases: Action = async ({ state, effects }) => {
  state.github.releases = await effects.github.getReleases();
};

export const getAccounts: Action = async ({ state, effects }) => {
  state.github.accounts = Number(await effects.github.getAccounts());
};
