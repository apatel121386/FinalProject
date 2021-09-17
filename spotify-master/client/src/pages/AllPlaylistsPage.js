import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import { getPlaylists } from '../spotify';

import Loader from '../components/Loader';
import { FaMusic } from 'react-icons/fa';

const AllPlaylistsPage = () => {
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getPlaylists();
      setPlaylists(data);
    };
    fetchData();
  }, []);

  return (
    <main className="w-full lg:w-9/12 max-w-full mx-auto min-h-screen p-10 mb-28">
      <h2 className="font-bold lg:text-5xl lg:mb-14 text-2xl mb-5">
        Your Playlists
      </h2>
      <div className="flex justify-between items-start">
        <div className="grid grid-cols-plst gap-12 w-full">
          {playlists ? (
            playlists.items.map(({ id, images, name, tracks }, i) => (
              <div key={i} className="flex flex-col text-center">
                <Link to={id} className="shadow relative w-full mb-1.5">
                  {images.length ? (
                    <img
                      className="object-cover"
                      src={images[0].url}
                      alt="Album Art"
                    />
                  ) : (
                    <div className="flex justify-center items-center relative w-full bg-gray-900">
                      <div className="flex justify-center items-center absolute inset-0">
                        <FaMusic />
                      </div>
                    </div>
                  )}
                </Link>
                <div>
                  <Link to={id}>{name}</Link>
                  <div className="uppercase my-2 mx-0 text-gray-500 text-xs tacking-normal">
                    {tracks.total} Tracks
                  </div>
                </div>
              </div>
            ))
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </main>
  );
};

export default AllPlaylistsPage;
