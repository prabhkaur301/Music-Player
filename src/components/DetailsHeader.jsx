import { Link } from "react-router-dom";
import {BsMusicNoteList} from "react-icons/bs"
import PlayPause from './PlayPause';


// dynamic component which will be used for both song details as well as artist details
const DetailsHeader = ({ artistId, artistData, songData}) => {
  const artistDetail = artistData?.artists[artistId]?.attributes;
  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28"></div>
      <div className="absolute inset-0 flex items-center">
        <img
          src={artistId ?
            artistDetail?.artwork?.url.replace('{w}', '500').replace('{h}', '500') :
            songData?.images?.coverart}
          className='sm:w-48 w-28 sm:h-48 h-28 object-cover border-2 rounded-full shadow-xl shadow-black' />

        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">
            {artistId ? artistDetail?.name : songData?.title}
          </p>
          {!artistId && (
            <Link to={`/artists/${songData?.artists[0].adamid}`}>
              <p className="text-base text-gray-400 mt-2">{songData?.subtitle}</p>
            </Link>
          )}
          <div className="flex flex-row items-center mt-2">
          <BsMusicNoteList className="font-bold text-gray-400 mr-2 "/>
          <p className="font-bold text-gray-400 ">{artistId ? artistDetail?.genreNames[0]: songData?.genres?.primary}</p>

          </div>
        </div>
        
        {/* <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
        /> */}
      </div>
    </div>)
};

export default DetailsHeader;
