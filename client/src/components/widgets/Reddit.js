import { doc, setDoc } from '@firebase/firestore';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';

const Reddit = ({display, subreddit, posts, token, uid, refresh}) => {
  const [edito, setPosts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (display && token) {
      getReddit()
    }
    const interval = setInterval(() => {
      console.log('refreshing Reddit widget');
      if (display && token) {
        return getReddit()
      }
    }, refresh * 1000 * 60);
    return () => clearInterval(interval);
  }, [])
  
  const getReddit = async () => {
    if ((token.expires_in) - (new Date().getTime() / 1000) <= 60 * 15) {
      const res = await axios.get(process.env.REACT_APP_API + '/service/reddit/token/refresh?refresh_token=' + token.refresh_token);
      const document = doc(db, 'settings/' + uid);
      await setDoc(document, {
        reddit: {
          tokens: res.data,
        }
      }, {merge: true}); 
      token = res.data;
    }
    const res = await axios.get(process.env.REACT_APP_API + '/service/reddit/subreddit?subreddit=' + subreddit + '&token=' + token.access_token + '&number=' + posts);
    if (res.data.err)
      setError(true);
    setPosts(res.data?.data?.children);
  }

  const displayWidget = () => {
    if (error)
      return <div className="text-text pt-2 text-center">Please authenticate with Reddit in your configuration page</div>;
    return (
      <div className="flex flex-col space-y-2 px-4 my-2 overflow-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-500">
        {edito ? edito.map((post, i) => {
          return (
            <div key={i}>
              <p className="text-justify max-w-prose border-gray-500 border-t text-green py-3">{post.data.title}</p>
            </div>
          )
        }) : null}
      </div>
    )
  }

  return (
    <>
      { display &&
        <div key="nasa" className="dark:bg-widgets bg-gray-200 shadow-lg h-full w-full rounded-xl flex flex-col items-center justify-center">
          <p className="text-green text-2xl tracking-widest font-black">Reddit</p>
          {displayWidget()}
        </div>
      }
    </>
  )
}

export default Reddit

