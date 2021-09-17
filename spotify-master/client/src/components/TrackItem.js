import React from 'react';

const TrackItem = ({ track }) => {
  // Format milliseconds into MM:SS
  const formatDuration = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <>
      <li>
        <div className="flex overflow-hidden mb-4">
          <div className="relative w-12 mr-5" style={{ minWidth: '50px' }}>
            {track.album.images.length && (
              <img src={track.album.images[2].url} alt="Album Artwork" />
            )}
          </div>
          <di className="flex flex-col md:flex-row justify-between flex-1">
            <span className="overflow-hidden overflow-ellipsis whitespace-nowrap pr-px">
              {track.name && (
                <span className="mb-2 border-b-1">{track.name}</span>
              )}
              {track.artists && track.album && (
                <div className="overflow-hidden overflow-ellipsis whitespace-nowrap pr-px text-gray-300 text-xs mt-1">
                  {track.artists &&
                    track.artists.map(({ name }, i) => (
                      <span key={i}>
                        {name}
                        {track.artists.length > 0 &&
                        i === track.artists.length - 1
                          ? ''
                          : ','}
                        &nbsp;
                      </span>
                    ))}
                  &nbsp;&middot;&nbsp;&nbsp;
                  {track.album.name}
                </div>
              )}
            </span>
            {track.duration_ms && (
              <span className="text-gray-300 text-sm">
                {formatDuration(track.duration_ms)}
              </span>
            )}
          </di>
        </div>
      </li>
    </>
  );
};

export default TrackItem;
