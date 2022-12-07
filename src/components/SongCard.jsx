import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

// dispatch is used to make changes to the state , 
// state can be whole piece and we can split it in pieces and to selector each piece we use useSelector hook

const SongCard = ({ song, isPlaying, activeSong, data, idx }) => {
  const dispatch=useDispatch(); 
   
  const handlePauseClick = () => {
    dispatch(playPause(false));
  }

  const handlePlayClick = () => {
    dispatch(setActiveSong({song, data, idx}));
    dispatch(playPause(true));

  }
  return (
    <div className='flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer'>
      <div className='relative w-full h-56 group'>
        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song.title ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick} />
        </div>
        <img src={song.images?.coverart} alt="song cover art" />
      </div>
      <div className='mt-4 flex flex-col '>
        <p className='text-white font-semibold text-lg truncate'>
          <Link to={`/songs/${song?.key}`}>{song.title}</Link>
        </p>
        <p className='text-sm truncate text-gray-300 mt-1'>
          <Link to={song.artists ? `/artists/${song?.artists[0]?.adamid}` : '/top-artists'}>{song.subtitle}</Link>
        </p>
      </div>
    </div>

  )
};

export default SongCard;
