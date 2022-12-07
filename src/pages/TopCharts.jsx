
import { useGetTopChartsQuery } from "../redux/services/shazamCore"
import { useSelector } from "react-redux"
import { Error, Loader, SongCard } from '../components'

const TopCharts = () => {
    const { data, isFetching, error } = useGetTopChartsQuery()
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    if (isFetching )
        return <Loader title="Loading top charts songs..." />

    if (error)
        return <Error />

    return (
        <div className="flex flex-col">
            <h2 className="text-white text-3xl font-bold mt-4 mb-10">Top Charts</h2>
            <div className='flex flex-wrap gap-8 sm:justify-start justify-center'>
                {data?.map((song, idx) => {
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

export default TopCharts