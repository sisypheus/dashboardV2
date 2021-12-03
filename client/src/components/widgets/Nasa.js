import axios from 'axios';
import React, { useEffect, useState } from 'react';


const Nasa = ({ refresh, display, widget }) => {
  const [type, setType] = useState('');
  const [data, setData] = useState({});

  useEffect(() => {
    if (display) {
      getNasa()
    }
    if (refresh) {
      const interval = setInterval(() => {
        console.log('refresh nasa widget');
        if (display) {
          getNasa();
        }
      }, refresh * 1000 * 60);
      return () => clearInterval(interval);
    }
  }, []);

  const getNasa = async () => {
    const res = await axios.get(process.env.REACT_APP_API + `/service/nasa/${widget}`);
    setType(res.data?.media_type ?? 'image');
    setData(res.data);
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
      { display &&
        <div key="nasa" className="dark:bg-widgets bg-gray-200 shadow-lg h-full w-full rounded-xl flex flex-col items-center justify-center">
          <p className="text-blue text-2xl tracking-widest font-black">Nasa</p>
          {displayWidget()}
        </div>
      }
    </>
  )
}

export default Nasa
