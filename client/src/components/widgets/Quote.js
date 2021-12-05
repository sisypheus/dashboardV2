import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const QuoteRandom = ({ refresh, display, category }) => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (display) {
      return getQuote()
    }
    const interval = setInterval(() => {
      if (display) {
        getQuote()
      }
    }, refresh * 1000 * 60);
    return () => clearInterval(interval);
  }, [])

  const getQuote = async () => {
    const res = await axios.get(process.env.REACT_APP_API + `/service/quote/random/${category}`);
    console.log(res.data.contents);
    if (res.data.err) {
      setError(true);
      return;
    }
    setAuthor(res.data.contents.author);
    setQuote(res.data.contents.quote);
  }

  const displayWidget = () => {
    return (
      error ? <div>Something went wrong</div> :
        <div className="flex flex-col justify-center items-center px-3 py-1 text-center">
          <p className="text-sm font-semibold text-text">{quote}</p>
          <p className="font-semibold text-lg text-saumon">{author}</p>
        </div>
    )
  }

  return (
    <>
      {display &&
        <div key="nasa" className="dark:bg-widgets bg-gray-200 shadow-lg h-full w-full rounded-xl flex flex-col items-center justify-center">
          <p className="text-saumon text-2xl tracking-widest font-black">Quote random</p>
          {displayWidget()}
        </div>
      }
    </>
  )
}

export const QuoteDay = ({ refresh, display, category }) => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (display) {
      getQuote()
    }
    const interval = setInterval(() => {
      if (display) {
        getQuote()
      }
    }, refresh * 1000 * 60);
    return () => clearInterval(interval);
  }, [])

  const getQuote = async () => {
    const res = await axios.get(process.env.REACT_APP_API + `/service/quote/qod/${category}`);

    if (res.data.err) {
      setError(true);
      return;
    }
    try {
      setAuthor(res.data.contents.quotes[0].author);
      setQuote(res.data.contents.quotes[0].quote);
    } catch (e) {
      setError(true);
    }
  }

  const displayWidget = () => {
    return (
      error ? <div>Something went wrong</div> :
        <div className="flex flex-col justify-center items-center px-3 py-1 text-center">
          <p className="text-sm text-text font-semibold">{quote}</p>
          <p className="font-semibold text-lg text-saumon">{author}</p>
        </div>
    )
  }

  return (
    <>
      {display &&
        <div key="nasa" className="dark:bg-widgets bg-gray-200 shadow-lg h-full w-full rounded-xl flex flex-col items-center justify-center">
          <p className="text-orange text-2xl tracking-widest font-black">Quote of the day</p>
          {displayWidget()}
        </div>
      }
    </>
  )
}