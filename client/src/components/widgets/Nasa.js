import axios from 'axios';
import React, { useEffect, useState } from 'react';


const Nasa = ({ refresh, display, widget }) => {
  const [type, setType] = useState('');
  const [data, setData] = useState({});

  useEffect(() => {
    const source = axios.CancelToken.source();
    if (display) {
      getNasa(source)
    }
    if (refresh) {
      const interval = setInterval(() => {
        console.log('refresh nasa widget');
        if (display) {
          getNasa(source);
        }
      }, refresh * 1000 * 60);
      return () => {
        source.cancel();
        clearInterval(interval);
      }
    }
    return () => source.cancel();
  }, []);

  const getNasa = async (source) => {
    try {
      const res = await axios.get(process.env.REACT_APP_API + `/service/nasa/${widget}`, {
        cancelToken: source.token,
      });
      setType(res.data?.media_type ?? 'image');
      setData(res.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
      } else {
        console.log(error);
      }
    }
  }

  const displayWidget = () => {
    if (type === 'image') {
      if (data.img_src) {
        return (
          <div className="overflow-hidden object-fit rounded-b-xl mt-1">
            <img src={data.img_src} className="rounded-xl" alt='Astronomy picture of the day' />
          </div>
        )
      } else {
        return (
          <div className="overflow-hidden object-fit rounded-b-xl mt-1">
            <img src={data.hdurl} className="rounded-xl" alt='Astronomy picture of the day' />
          </div>
        )
      }
    } else if (type === 'video') {
      return (
        <div className="w-full h-full rounded-b-xl">
          <iframe src={data.url} className="w-full h-full rounded-b-xl" title={data.title} frameBorder="0" allowFullScreen></iframe>
        </div>
      )
    }
  }

  return (
    <>
      {display &&
        <div key="nasa" className="dark:bg-widgets bg-gray-200 shadow-lg h-full w-full rounded-xl flex flex-col items-center justify-center">
          <p className="text-blue text-2xl tracking-widest font-black">Nasa</p>
          {displayWidget()}
        </div>
      }
    </>
  )
}

export default Nasa
