import { GithubRelease } from './state';

export const getReleases = async (): Promise<GithubRelease[]> => {
  const data = await fetch(
    'https://api.github.com/repos/cookie-project/cookietouch-releases/releases'
  );
  return data.json();
};

export const getAccounts = async (): Promise<string> => {
  const data = await fetch(
    'https://cookie-project.com:2121/accounts', {
      mode: "no-cors"
    }
  );
  return data.text();
};
