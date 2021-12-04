import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { GiMoneyStack } from 'react-icons/gi';

const Currency = ({ refresh, from, to, display }) => {
  const [rate, setRate] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();
    if (display)
      getRate(source);
    if (refresh) {
      const interval = setInterval(() => {
        if (display)
        getRate(source);
      }, refresh * 1000 * 60);
      return () => {
        source.cancel();
        clearInterval(interval);
      }
    }
    return () => source.cancel();
  }, [])

  const getRate = async (source) => {
    try {
      const res = await axios.get(process.env.REACT_APP_API + '/service/currency/rates?pair1=' + from + '&pair2=' + to, {
        cancelToken: source.token
      });
      setRate(res.data.rate);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
      } else { 
        console.log(error);
      }
    }
  }

  return (
    <>
    { display ? (
      <div key="currency" className="dark:bg-widgets bg-gray-200 shadow-lg h-full w-full rounded-xl flex flex-col items-center justify-center">
        <p className="text-orange text-2xl tracking-widest font-black">Currency rate</p>
        <p className="pt-2 text-md text-text text-center">{from} <span className="text-blue-300 text-center">→</span> {to}</p>
        <p className="pb-2 text-gray-300 text-orange italic">{rate ? parseFloat(rate).toPrecision(4) : rate}</p>
        <GiMoneyStack className="text-3xl text-green" />
    </div>
    ) : (
      <div></div>
    )}
    </>
  )
}

export default Currency
