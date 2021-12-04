import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const YoutubeStats = ({ refresh, display, channel, token, channelId }) => {
  const [stats, setStats] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    //IMPORTANT uncomment
    // if (display && token) {
    //   getYoutube()
    // }
    // const interval = setInterval(() => {
    //   if (display && token) {
    //     getYoutube()
    //   }
    // }, refresh * 1000 * 60);
    // return () => clearInterval(interval);
  }, [])

  const getYoutube = async () => {
    const res = await axios.get(process.env.REACT_APP_API + `/service/youtube/channel/stats?channel=${channel}&access_token=${token.access_token}&expiry_date=${token.expiry_date}&refresh_token=${token.refresh_token}&scope=${token.scope}&type=${token.type}&channelId=${channelId}&channelId=${channelId}`);
    if (res.data.err) {
      console.log(res.data.err)
      setError(true);
    } else {
      setStats(res.data);
      setError(false);
    }
    console.log(res.data)
  }

  const displayWidget = () => {
    if (error)
      return <div className="text-text pt-2 text-center px-1">Please authenticate with Youtube in your configuration page</div>
    return (
      <>
      <div class="flex grid-cols-2 gap-1 mx-10 my-2 items-center">
        <div><img src={stats.logo} alt="logo" className="h-1/9 w-auto rounded-xl text-right mr-5"/></div>
        <div><p className="text-blue font-bold text-justify">{stats.title}</p></div>
      </div>
      <div className="text-center italic">
        <p className="text-text"><span className="text-blue">{stats.videos}</span> videos</p>
        <p className="text-text"><span className="text-blue">{stats.subscribers}</span> subscribers</p>
        <p className="text-text"><span className="text-blue">{stats.views}</span> views</p>
      </div>
      </>
    )
  }

  return (
    <>
      {display &&
        <div key="youtube_stats" className="dark:bg-widgets bg-gray-200 shadow-lg h-full w-full rounded-xl flex flex-col items-center justify-center">
          <p className="text-blue text-2xl tracking-widest font-black">Youtube Stats</p>
          {displayWidget()}
        </div>
      }
    </>
  )
}

export const YoutubeLast = ({ refresh, display, channel, token, channelId }) => {
  const [last, setLast] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    if (display && token) {
      getYoutube()
    }
    const interval = setInterval(() => {
      console.log('refreshing youtube last widget');
      if (display && token) {
        getYoutube()
      }
    }, refresh * 1000 * 60);
    return () => clearInterval(interval);
  }, [])

  const getYoutube = async () => {
    const res = await axios.get(process.env.REACT_APP_API + `/service/youtube/channel/video/last?channel=${channel}&access_token=${token.access_token}&expiry_date=${token.expiry_date}&refresh_token=${token.refresh_token}&scope=${token.scope}&type=${token.type}&channelId=${channelId}`);
    if (res.data.err) {
      console.log(res.data.err)
      setError(true);
    } else {
      setLast(res.data);
      console.log(res.data.snippet)
    }
  }

  const displayWidget = () => {
    if (error)
      return <div className="text-text pt-2 text-center">Please authenticate with Youtube in your configuration page</div>
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <p className="mt-2 text-saumon">{last?.snippet?.title}</p>
        <a href={'https://youtube.com/watch?v=' + last?.id?.videoId} target="_blank" rel="noopener noreferrer" className=" w-full h-full overflow-hidden object-fit">
          <img src={last?.snippet?.thumbnails?.medium?.url} alt="thumbnail" className="rounded-lg" />
        </a>
      </div>
    )
  }

  return (
    <>
      {display &&
        <div key="youtube_last" className="dark:bg-widgets bg-gray-200 shadow-lg h-full w-full rounded-xl flex flex-col items-center justify-center">
          <p className="text-saumon text-2xl tracking-widest font-black pt-2">Youtube Last</p>
          {displayWidget()}
        </div>
      }
    </>
  )
}
