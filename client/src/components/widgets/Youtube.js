import axios from 'axios'
import React, {useEffect, useState} from 'react'

export const YoutubeStats = ({display, channel, token, channelId, access_token, expiry_date, refresh_token, scope, type}) => {
  const [stats, setStats] = useState({});
  const [error, setError] = useState(false);
  
  useEffect(() => {
    if (display && token) {
      // return getYoutube()
    }
  }, [])
  
  const getYoutube = async () => {
    const res = await axios.get(process.env.REACT_APP_API + `/service/youtube/channel/stats?channel=${channel}&access_token=${token.access_token}&expiry_date=${token.expiry_date}&refresh_token=${token.refresh_token}&scope=${token.scope}&type=${token.type}&channelId=${channelId}`);
    if (res.data.error) {
      console.log(res.data.error) 
      setError(true);
    } else
      setStats(res.data);
    console.log(res.data)
  }

  const displayWidget = () => {
    if (error)
      return <div>Something went wrong</div>
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <img src={stats.logo} alt="logo" className="h-1/2 w-auto" />
        <p>{stats.title}</p>
        <div className="flex flex-row space-x-2">
          <p>{stats.subscribers} subscribers</p>
          <p>{stats.views} views</p>
          <p>{stats.videos} videos</p>
        </div>
      </div>
    )
  }

  return (
    <>
      { display &&
        <div key="youtube_stats" className="dark:bg-widgets bg-gray-200 shadow-lg h-full w-full rounded-xl flex flex-col items-center justify-center">
          <p className="text-blue text-2xl tracking-widest font-black">Youtube Stats</p>
          {displayWidget()}
        </div>
      }
    </>
  )
}

export const YoutubeLast = ({display, widget, token}) => {

  useEffect(() => {
    if (display) {
      return getYoutube()
    }
  }, [])

  const getYoutube = () => {

  }

  const displayWidget = () => {

  }

  return (
    <>
      { display &&
        <div key="youtube_last" className="dark:bg-widgets bg-gray-200 shadow-lg h-full w-full rounded-xl flex flex-col items-center justify-center">
          <p className="text-saumon text-2xl tracking-widest font-black">Youtube Last</p>
          {displayWidget(widget)}
        </div>
      }
    </>
  )
}
