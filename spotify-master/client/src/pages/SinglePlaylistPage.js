import React, { useEffect, useState } from 'react';
import { getPlaylist } from '../spotify';

import Loader from '../components/Loader';
import TrackItem from '../components/TrackItem';

const SinglePlaylistPage = (props) => {
  const { playlistId } = props;
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getPlaylist(playlistId);
      setPlaylist(data);
    };
    fetchData();
  }, [playlistId]);

  return (
    <React.Fragment>
      {playlist ? (
        <main className="w-full lg:w-9/12 max-w-full mx-auto min-h-screen p-10 mb-28">
          <h2 className="font-bold lg:text-5xl lg:mb-14 md:text-2xl md:mb-5">
            Playlist
          </h2>
          <div className="lg:flex">
            <div className="lg:w-4/12 text-center mb-10">
              {playlist.images.length && (
                <div className="shadow w-full hidden lg:block">
                  <img src={playlist.images[0].url} alt="Album Art" />
                </div>
              )}

              <a
                href={playlist.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3 className="font-bold text-3xl mt-5">{playlist.name}</h3>
              </a>

              <p className="text-sm text-gray-300">
                By {playlist.owner.display_name}
              </p>

              {playlist.description && (
                <p
                  className="text-gray-300 text-base"
                  dangerouslySetInnerHTML={{ __html: playlist.description }}
                />
              )}

              <p className="text-xs text-white mt-3">
                {playlist.tracks.total} Tracks
              </p>
            </div>
            <div className="lg:w-8/12 lg:ml-12">
              <ul>
                {playlist.tracks &&
                  playlist.tracks.items.map(({ track }, i) => (
                    <TrackItem track={track} playlist={playlist} key={i} />
                  ))}
              </ul>
            </div>
          </div>
        </main>
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
};

export default SinglePlaylistPage;
