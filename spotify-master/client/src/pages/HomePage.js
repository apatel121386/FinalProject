import React from 'react';
import { Router } from '@reach/router';

import ScrollToTop from '../components/ScrollToTop';
import NavBar from '../components/NavBar';
import ProfilePage from './ProfilePage';
import AllPlaylistsPage from './AllPlaylistsPage';
import SinglePlaylistPage from './SinglePlaylistPage';

import UserDetailsPage from './UserDetailsPage';

const HomePage = () => (
  <div>
    <NavBar />
    <Router primary={false}>
      <ScrollToTop path="/">
        <ProfilePage path="/" />
        <UserDetailsPage path="/details" />
        <AllPlaylistsPage path="/playlists" />
        <SinglePlaylistPage path="/playlists/:playlistId" />
      </ScrollToTop>
    </Router>
  </div>
);

export default HomePage;
