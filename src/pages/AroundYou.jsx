import { useState, useEffect } from "react"
import { useGetSongsByCountryQuery } from "../redux/services/shazamCore"
import { useSelector } from "react-redux"
import { Error, Loader, SongCard } from '../components'
import axios from "axios"

const AroundYou = () => {
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://geo.ipify.org/api/v2/country?apiKey=${import.meta.env.VITE_GEO_API_KEY}`)
            .then((res) => setLocation(res.data.location))
            .catch((error) => console.log(error))
            .finally(setLoading(false))

    }, [])
    
    const { data, isFetching, error } = useGetSongsByCountryQuery(location.country || 'IN');
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    // console.log(data)
    if (isFetching && loading)
        return <Loader title="Loading songs around your location..." />

    if (error && location !== '')
        return <Error />

    return (
        <div className="flex flex-col">
            <h2 className="text-white text-3xl font-bold mt-4 mb-10">Around You  
            <span className="text-white text-3xl font-bold mt-4 mb-10"> ({'India'})</span> </h2>
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

export default AroundYou