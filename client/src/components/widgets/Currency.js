import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { GiMoneyStack } from 'react-icons/gi';

const Currency = ({ refresh, from, to, display }) => {
  const [rate, setRate] = useState(null);

  useEffect(() => {
    if (display)
      getRate();
    if (refresh) {
      const interval = setInterval(() => {
        if (display)
        getRate();
      }, refresh * 1000 * 60);
      return () => clearInterval(interval);
    }
  }, [])

  const getRate = async () => {
    const res = await axios.get(process.env.REACT_APP_API + '/service/currency/rates?pair1=' + from + '&pair2=' + to);
    setRate(res.data.rate);
  }

  return (
    <>
    { display ? (
      <div key="currency" className="dark:bg-widgets bg-gray-200 shadow-lg h-full w-full rounded-xl flex flex-col items-center justify-center">
        <p className="text-orange text-2xl tracking-widest font-black">Currency rate</p>
        <p className="pt-2 text-md text-text">{from} <span className="text-blue-300">→</span> {to}</p>
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
