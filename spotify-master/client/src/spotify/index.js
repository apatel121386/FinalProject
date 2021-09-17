import axios from 'axios';

// **********************************************************
// TOKENS
// **********************************************************
// 3600 seconds * 1000 = 1 hour in milliseconds
const EXPIRATION_TIME = 3600 * 1000;

// set tokens and timestamp
const setTokenTimestamp = () =>
  window.localStorage.setItem('spotify_token_timestamp', Date.now());
const setLocalRefreshToken = (token) =>
  window.localStorage.setItem('spotify_refresh_token', token);
const setLocalAccessToken = (token) => {
  setTokenTimestamp();
  window.localStorage.setItem('spotify_access_token', token);
};

// get tokens and timestamp
const getTokenTimestamp = () =>
  window.localStorage.getItem('spotify_token_timestamp');
const getLocalRefreshToken = () =>
  window.localStorage.getItem('spotify_refresh_token');
const getLocalAccessToken = () =>
  window.localStorage.getItem('spotify_access_token');

// Refresh the token
const refreshAccessToken = async () => {
  try {
    const { data } = await axios.get(
      `/refresh_token?refresh_token=${getLocalRefreshToken()}`
    );
    const { access_token } = data;
    setLocalAccessToken(access_token);
    window.location.reload();
    return;
  } catch (e) {
    console.error(e);
  }
};

// Get object containing access_token and refresh_token
const getHashParams = () => {
  const hashParams = {};
  let e;
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
};

// Get access token off of query params (called on application init)
export const getAccessToken = () => {
  const { error, access_token, refresh_token } = getHashParams();
  // console.log(getHashParams());

  if (error) {
    console.error(error);
    refreshAccessToken();
  }

  // If token has expired
  if (Date.now() - getTokenTimestamp() > EXPIRATION_TIME) {
    console.warn('Access token has expired, refreshing...');
    refreshAccessToken();
  }

  const localAccessToken = getLocalAccessToken();

  // If there is no ACCESS token in local storage, set it and return `access_token` from params
  if ((!localAccessToken || localAccessToken === 'undefined') && access_token) {
    setLocalAccessToken(access_token);
    setLocalRefreshToken(refresh_token);
    return access_token;
  }

  return localAccessToken;
};

export const token = getAccessToken();

export const logout = () => {
  window.localStorage.removeItem('spotify_token_timestamp');
  window.localStorage.removeItem('spotify_access_token');
  window.localStorage.removeItem('spotify_refresh_token');
  window.location.reload();
};

// **********************************************************
// SPOTIFY API CALLS
// **********************************************************
const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

// Get Current User's Profile
export const getUser = () =>
  axios.get('https://api.spotify.com/v1/me', { headers });

// Get User's Followed Artists
export const getFollowing = () =>
  axios.get('https://api.spotify.com/v1/me/following?type=artist', { headers });

// Get a List of Current User's Playlists
export const getPlaylists = () =>
  axios.get('https://api.spotify.com/v1/me/playlists', { headers });

// Get a Playlist
export const getPlaylist = (playlistId) =>
  axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, { headers });

// Get User Info
export const getUserInfo = () =>
  axios.all([getUser(), getFollowing(), getPlaylists()]).then(
    axios.spread((user, followedArtists, playlists) => ({
      user: user.data,
      followedArtists: followedArtists.data,
      playlists: playlists.data,
    }))
  );
