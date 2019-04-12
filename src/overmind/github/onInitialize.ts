import { OnInitialize } from 'overmind';

export const onInitialize: OnInitialize = async ({ state, effects }) => {
  state.github.releases = await effects.github.getReleases();
};
