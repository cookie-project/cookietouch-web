interface GithubAuthor {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
}

interface GithubAsset {
  url: string;
  id: number;
  name: string;
  size: number;
  download_count: number;
  browser_download_url: string;
}

export interface GithubRelease {
  url: string;
  assets_url: string;
  upload_url: string;
  html_url: string;
  id: number;
  node_id: string;
  tag_name: string;
  target_commitish: string;
  name: string;
  draft: boolean;
  author: GithubAuthor;
  prerelease: boolean;
  created_at: string;
  published_at: string;
  assets: GithubAsset[];
  body: string;
}

export interface State {
  releases: GithubRelease[];
}

export const state: State = {
  releases: []
};
