import { GithubRelease } from './state';

export const getReleases = async (): Promise<GithubRelease[]> => {
  const data = await fetch(
    'https://api.github.com/repos/cookie-project/cookietouch-releases/releases'
  );
  return data.json();
};
