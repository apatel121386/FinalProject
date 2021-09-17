import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import { FaUser } from 'react-icons/fa';

import Loader from '../components/Loader';

import { getUserInfo, logout } from '../spotify';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [followedArtists, setFollowedArtists] = useState(null);
  const [playlists, setPlaylists] = useState(null);

  // CREATE DB entry for the logged-in user
  const saveUserDetailsToDatabase = (user) => {
    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      };

      // eslint-disable-next-line no-unused-vars
      const response = fetch(
        `http://localhost:4200/users/${user.id}/create`,
        options
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { user, followedArtists, playlists } = await getUserInfo();
      setUser(user);
      setFollowedArtists(followedArtists);
      setPlaylists(playlists);
      saveUserDetailsToDatabase(user);
    };
    fetchData();
  }, [user]);

  const totalPlaylists = playlists ? playlists.total : 0;

  return (
    <React.Fragment>
      {user ? (
        <main className="w-full lg:w-9/12 max-w-full mx-auto min-h-screen py-10 flex justify-center items-center">
          <div className="flex flex-col justify-center items-center relative">
            <div className="w-auto h-auto">
              {user.images.length > 0 ? (
                <img
                  className="w-20 h-20 rounded-full"
                  src={user.images[0].url}
                  alt="avatar"
                />
              ) : (
                <div className="flex justify-center items-center p-2 md:p-8 rounded-full border-2">
                  <FaUser className="w-20 h-20 rounded-full" />
                </div>
              )}
            </div>
            <a
              href={user.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h1 className="text-2xl md:text-5xl font-bold mt-5">
                {user.display_name}
              </h1>
            </a>
            <div className="flex justify-between items-center w-72 mt-6">
              <div className="text-center">
                <div style={{ color: '#1db954' }} className="text-lg">
                  {user.followers.total}
                </div>
                <p className="text-gray-300 text-xs uppercase mt-2">
                  Followers
                </p>
              </div>
              {followedArtists && (
                <div className="text-center">
                  <div style={{ color: '#1db954' }} className="text-lg">
                    {followedArtists.artists.items.length}
                  </div>
                  <p className="text-gray-300 text-xs uppercase mt-2">
                    Following
                  </p>
                </div>
              )}
              {totalPlaylists && (
                <div className="text-center">
                  <Link to="playlists">
                    <div style={{ color: '#1db954' }} className="text-lg">
                      {totalPlaylists}
                    </div>
                    <p className="text-gray-300 text-xs uppercase mt-2">
                      Playlists
                    </p>
                  </Link>
                </div>
              )}
            </div>

            <button
              className="bg-transparent hover:bg-white focus:bg-white text-white hover:text-black focus:text-black border border-white rounded-full mt-8 px-8 py-3 text-xs font-bold uppercase text-center cursor-pointer"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </main>
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
};

export default ProfilePage;
