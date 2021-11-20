import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { GiMoneyStack } from 'react-icons/gi';

const Currency = ({ from, to }) => {
  const [rate, setRate] = useState(null);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API + '/service/currency/rates?pair1=' + from + '&pair2=' + to)
      .then(res => {
        setRate(res.data.rate);
      })
  }, [])

  return (
    <div key="currency" className="border-2 border-gray-800 dark:bg-gray-600 bg-gray-200 shadow-lg h-full w-full rounded-xl flex flex-col items-center justify-center">
        <p className="text-xl">Currency rate</p>
        <p className="font-bold text-md">{from} <span className="text-blue-300">=></span> {to}</p>
        <p className="p-2 text-gray-300 font-bold">{rate ? parseFloat(rate).toPrecision(4) : rate}</p>
        <GiMoneyStack className="text-3xl text-green-500" />
    </div>
  )
}

export default Currency
