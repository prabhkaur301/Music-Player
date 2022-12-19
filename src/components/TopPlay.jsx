import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';

//importing swiper css
import 'swiper/css';
import 'swiper/css/free-mode'

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice'
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const TopChartCard = ({ song, idx, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => {

  return (
    <div className='w-full flex flex-row items-center text-white hover:bg-[#4c426e] py-2 p-4 rounded-lg mb-2 cursor-pointer'>
      <h3 className='font-base text-base text-white'>{`${idx + 1}.`}</h3>
      <div className='flex-1 flex flex-row justify-between items-center ml-3'>
        <img src={song?.images.coverart} alt={song?.title} className='w-20 h-20 rounded-lg' />
        <div className='flex-1 flex flex-col mx-3 justify-center'>
          <Link to={`/songs/${song?.key}`}>
            <p className='text-white font-bold text-base text-clip text-overflow-hidden '>{song?.title}</p>
          </Link>
          <p className='text-sm truncate text-gray-300 mt-1'>
            <Link to={song?.artists ? `/artists/${song?.actions[0]?.id}` : '/top-artists'}>{song?.subtitle}</Link>
          </p>
        </div>
      </div>
      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
      />
    </div>
  )
}

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const refDiv = useRef(null);
  const { data } = useGetTopChartsQuery();

  const topPlays = data?.slice(0, 6);
  

  const handlePauseClick = () => {
    dispatch(playPause(false));
  }

  const handlePlayClick = (song, idx) => {
    dispatch(setActiveSong({ song, data, idx }));
    dispatch(playPause(true));

  }

  //useeffect to get to the top of the page using useRef 
  useEffect(() => {
    refDiv.current.scrollIntoView({ behavior: 'smooth' })
  });



  return (
    <div ref={refDiv} className=' xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col'>
      <div className='w-full flex flex-col'>
        <div className='flex flex-row justify-between items-center'>
          <h2 className='text-white font-bold text-2xl'>Top Charts</h2>
          <Link to='/top-charts'>
            <p className='text-gray-300 cursor-pointer font-semibold'>See More</p>
          </Link>
        </div>
        <div className='mt-4 flex flex-col gap-1'>
          {topPlays?.map((song, idx) => (
            <TopChartCard
              key={song.key}
              song={song}
              idx={idx}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, idx)}
            />
          ))}
        </div>
      </div>

      <div className='w-full flex flex-col mt-8'>
        <div className='flex flex-row justify-between items-center'>
          <h2 className='text-white font-bold text-2xl'>Top Artists</h2>
          <Link to='/top-artists'>
            <p className='text-gray-300 cursor-pointer font-semibold'>See More</p>
          </Link>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays?.map((song, idx) => (
            <SwiperSlide
              key={song?.key}
              style={{ width: '25%', height: 'auto' }}
              className=' shadow-lg rounded-full animate-slideright'>
              <Link to={`/artists`}>
                <img src={song?.images.background} alt="Artist Image"
                  className='rounded-full w-full object-cover' />
              </Link>
            </SwiperSlide>
          ))}

        </Swiper>

      </div>

    </div>
  )
}

export default TopPlay;
