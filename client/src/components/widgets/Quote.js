import axios from 'axios';
import React, {useEffect, useState} from 'react'

export const QuoteRandom = ({ refresh, display, category}) => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    // IMPORTANT uncomment
    // if (display) {
    //   return getQuote()
    // }
    // const interval = setInterval(() => {
    //   if (display) {
    //     getQuote()
    //   }
    // }, refresh * 1000 * 60);
    // return () => clearInterval(interval);
  }, [])
  
  const getQuote = async () => {
    const res = await axios.get(process.env.REACT_APP_API + `/service/quote/random/${category}`);
    console.log(res.data.contents);
    setAuthor(res.data.contents.author);
    setQuote(res.data.contents.quote);
  }

  const displayWidget = () => {
    return (
      <div className="flex flex-col justify-center items-center px-3 py-1 text-center">
        <p className="text-sm">{quote}</p>
        <p className="font-semibold text-lg">{author}</p>
      </div>
    )
  }

  return (
    <>
      { display &&
        <div key="nasa" className="dark:bg-widgets bg-gray-200 shadow-lg h-full w-full rounded-xl flex flex-col items-center justify-center">
          <p className="text-saumon text-2xl tracking-widest font-black">Quote random</p>
          {displayWidget()}
        </div>
      }
    </>
  )
}

export const QuoteDay = ({ refresh, display, category}) => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    // IMPORTANT uncomment
    // if (display) {
    //   getQuote()
    // }
    // const interval = setInterval(() => {
    //   if (display) {
    //     getQuote()
    //   }
    // }, refresh * 1000 * 60);
    // return () => clearInterval(interval);
  }, [])

  const getQuote = async () => {
    const res = await axios.get(process.env.REACT_APP_API + `/service/quote/random/${category}`);
    console.log(res.data.contents);
    setAuthor(res.data.contents.author);
    setQuote(res.data.contents.quote);
  }

  const displayWidget = () => {
    return (
      <div className="flex flex-col justify-center items-center px-3 py-1 text-center">
        <p className="text-sm">{quote}</p>
        <p className="font-semibold text-lg">{author}</p>
      </div>
    )
  }

  return (
    <>
      { display &&
        <div key="nasa" className="dark:bg-widgets bg-gray-200 shadow-lg h-full w-full rounded-xl flex flex-col items-center justify-center">
          <p className="text-orange text-2xl tracking-widest font-black">Quote of the day</p>
          {displayWidget()}
        </div>
      }
    </>
  )
}