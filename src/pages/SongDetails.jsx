import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components'
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery, useGetRelatedSongsQuery} from "../redux/services/shazamCore";

const SongDetails = () => {
    const dispatch = useDispatch();
    const { songid } = useParams();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery({ songid });
    const {data, isFetching: isFetchingRelatedSongs , error} = useGetRelatedSongsQuery({songid});
    const handlePauseClick = () => {
        dispatch(playPause(false));
      }
    
      const handlePlayClick = (song, idx) => {
        dispatch(setActiveSong({song, data, idx}));
        dispatch(playPause(true));
    
      }
    

    if(isFetchingSongDetails || isFetchingRelatedSongs) return <Loader title="Loading Song Details..."/>

    if(error) return <Error/>
    return (
        <div className="flex flex-col ">
            <DetailsHeader artistId="" songData={songData} />

            <div className="mb-10">
                <h2 className="text-white font-bold text-xl">Lyrics:</h2>
                <div className="mt-5">
                    {songData?.sections[1]?.type === 'LYRICS' ?
                        songData?.sections[1].text.map((line, i) =>
                            (<p key={i} className="text-gray-300 text-base my-1">{line}</p>))
                        : <p className="text-gray-300 font-bold">Sorry, No Lyrics Found</p>
                    }
                </div>
            </div>

            {/* ********************************** Related Songs ********************************** */}
            <RelatedSongs
                data={data}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick} />
        </div>
    )
}

export default SongDetails;
