import { Error, Loader, SongCard } from '../components'
import { genres } from '../assets/constants'
import { useDispatch, useSelector } from 'react-redux'
import { useGetSongsByGenreQuery } from '../redux/services/shazamCore'
import { selectGenreListId } from '../redux/features/playerSlice'


const Discover = () => {
    const dispatch = useDispatch();
    const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player);
    const { data, isFetching, error } = useGetSongsByGenreQuery(genreListId || 'POP');

    if (isFetching)
        return <Loader title="Songs loading..." />

    if (error)
        return <Error />

    return (
        //main container
        <div className='flex flex-col'>
            {/* header */}
            <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10'>
                <h2 className='font-bold text-3xl text-white text-left'>Discover {genreListId}</h2>
                <select
                    onChange={(e) => dispatch(selectGenreListId(e.target.value))}
                    value={genreListId || 'POP'}
                    id="genres" className='bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5'>
                    {genres.map((genre) => (<option key={genre.value} value={genre.value}>{genre.title}</option>))}
                </select>
            </div>

            {/* card container */}
            <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
                {data?.map((song, i) => {
                    return (
                        <SongCard
                            key={song?.key}
                            song={song}
                            isplaying={isPlaying}
                            activeSong={activeSong}
                            data={data}
                            idx={i} />)

                })}

            </div>

        </div>
    )
}

export default Discover;
