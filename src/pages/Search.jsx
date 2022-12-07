
import { useGetSongsBySearchQuery } from "../redux/services/shazamCore"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Error, Loader, SongCard } from '../components'

const Search = () => {
    const {searchTerm}= useParams();
    const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm)
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    console.log(data)
    const songs= data?.tracks?.hits?.map((song)=> song.track);
    if (isFetching )
        return <Loader title="Loading search result..." />

    if (error)
        return <Error />

    return (
        <div className="flex flex-col">
            <h2 className="text-white text-3xl font-bold mt-4 mb-10">Showing Results for <span className="font-black">{searchTerm}</span></h2>
            <div className='flex flex-wrap gap-8 sm:justify-start justify-center'>
                {songs?.map((song, idx) => {
                    return (
                        <SongCard
                            key={song.key}
                            song={song}
                            activeSong={activeSong}
                            isPlaying={isPlaying}
                            data={data}
                            idx={idx} />
                    )
                })}

            </div>
        </div>

    )
}

export default Search