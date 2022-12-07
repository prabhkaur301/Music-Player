import SongBar from './SongBar';

const RelatedSongs = ({ data, isPlaying, activeSong, handlePauseClick, handlePlayClick, artistId }) => (

  <div className='flex flex-col'>
    <h1 className='font-bold text-3xl text-white'>
      Related Songs
    </h1>

    <div className='mt-6 flex flex-col w-full'>
      {data.map((song, idx) => (

        <SongBar
          key={idx}
          song={song}
          idx={idx}
          artistId={artistId}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick} />
      )
      )}
    </div>
  </div>
);

export default RelatedSongs;
