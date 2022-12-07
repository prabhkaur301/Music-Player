
import { useGetTopChartsQuery } from "../redux/services/shazamCore"
import { Error, Loader, ArtistCard } from '../components'

const TopArtists = () => {
    const { data, isFetching, error } = useGetTopChartsQuery()
    if (isFetching)
        return <Loader title="Loading top artist songs..." />

    if (error)
        return <Error />

    return (
        <div className="flex flex-col">
            <h2 className="text-white text-3xl font-bold mt-4 mb-10">Top Artists</h2>
            <div className='flex flex-wrap gap-8 sm:justify-start justify-center'>
                {data?.map((track) => {
                    return (
                        <ArtistCard
                            key={track.key}
                            track={track}
                        />
                    )
                })}

            </div>
        </div>

    )
}

export default TopArtists
