import { GithubRelease, Accounts } from './state';

export const getReleases = async (): Promise<GithubRelease[]> => {
  const data = await fetch(
    'https://api.github.com/repos/cookie-project/cookietouch-releases/releases'
  );
  return data.json();
};

export const getAccounts = async (): Promise<Accounts> => {
  const data = await fetch(
    'https://cookie-project.com:2121/accounts',
  );
  return data.json();
};
