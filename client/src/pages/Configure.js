import React, { useEffect, useState } from 'react'
import Background from '../utils/Background';
import Navbar from '../components/Navbar';
import { auth, db } from '../firebase';
import { getDoc, doc, updateDoc, setDoc } from 'firebase/firestore';
import { useHistory } from 'react-router';
import { circularProgressClasses, Snackbar } from '@mui/material';
import axios from 'axios';

const Configure = () => {
  const [user, setUser] = useState(null);
  const history = useHistory();

  //weather
  const [weatherDisplay, setWeatherDisplay] = useState(false);
  const [weatherCity, setWeatherCity] = useState('');
  //currency
  const [currencyDisplay, setCurrencyDisplay] = useState(false);
  const [currencyFrom, setCurrencyFrom] = useState('');
  const [currencyTo, setCurrencyTo] = useState('');
  const [currencies, setCurrencies] = useState([]);
  //github
  const [githubToken, setGithubToken] = useState(null);
  const [githubDisplay, setGithubDisplay] = useState(false);
  const [githubWidget, setGithubWidget] = useState('');

  //snackbar
  const [settingsChanged, setSettingsChanged] = useState(false);
  const [settingsRef, setSettingsRef] = useState(null);

  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      if (user) {
        const userRef = doc(db, `users/${user.uid}`);
        const settingsRef = doc(db, `settings/${user.uid}`);
        axios.get(process.env.REACT_APP_API + '/service/currency/currencies')
          .then(res => {
            setCurrencies(res.data);
          })
        setSettingsRef(settingsRef);
        getDoc(userRef).then(userDoc => {
          setUser(userDoc.data());
        });
        getDoc(settingsRef).then(settingsDoc => {
          //weather
          setWeatherDisplay(settingsDoc.data().weather.display);
          setWeatherCity(settingsDoc.data().weather.city);
          //currency
          setCurrencyDisplay(settingsDoc.data().currency.display);
          setCurrencyFrom(settingsDoc.data().currency.from);
          setCurrencyTo(settingsDoc.data().currency.to);
          //github
          setGithubToken(settingsDoc.data().github.token);
          setGithubDisplay(settingsDoc.data().github.display);
          setGithubWidget(settingsDoc.data().github.widget);
        })
      } else {
        history.push('/auth');
      }
    })
  }, []);

  const handleDisplayChange = (e, setter) => {
    console.log(e.target.checked);
    setSettingsChanged(true);
    setter(e.target.checked);
  };

  const handleChange = (e, setter) => {
    setSettingsChanged(true);
    setter(e.target.value);
  };

  const submitSettings = async () => {
    setSettingsChanged(false);
    await setDoc(settingsRef, {
      weather: {
        display: weatherDisplay,
        city: weatherCity
      },
      currency: {
        display: currencyDisplay,
        from: currencyFrom,
        to: currencyTo
      },
      github: {
        display: githubDisplay,
        widget: githubWidget
      }
    }, { merge: true }).catch(err => {
      console.log(err);
    });
  }

  return (
    <Background>
      <Navbar />
      <div className="flex flex-col items-center justify-center max-w-2xl m-auto">
        <div className="mt-6 text-2xl dark:text-gray-200 font-bold border-b-4 dark:border-gray-500 border-gray-600">
          Settings
        </div>
        <div className="dark:text-gray-200 w-full">
          {/* Weather */}
          <div className="pl-2 text-lg mt-6 font-bold">Weather Service</div>
          <div className="border-b-2 w-full border-gray-700 mt-1 mb-3"></div>
          <div className="max-w-sm m-auto pl-6 font-mono space-y-2">
            <div className="flex items-center justify-between">
              <div>Display widget</div>
              <input type="checkbox" className="checked:text-green-500 rounded w-4 h-4" onChange={(e) => handleDisplayChange(e, setWeatherDisplay)} checked={weatherDisplay} />
            </div>
            <div className="flex space-x-4">
              <div className="pl-4">City</div>
              <input type="text" className="w-full border-b-2 border-gray-700 bg-gray-600 rounded-md pl-1 text-white" onChange={(e) => handleChange(e, setWeatherCity)} value={weatherCity} />
            </div>
          </div>

          {/* Currency */}
          <div className="pl-2 text-lg mt-6 font-bold">Currency Service</div>
          <div className="border-b-2 w-full border-gray-700 mt-1 mb-3"></div>
          <div className="max-w-sm m-auto pl-6 font-mono space-y-2">
            <div className="flex items-center justify-between">
              <div>Display widget</div>
              <input type="checkbox" className="checked:text-green-500 rounded w-4 h-4" onChange={(e) => handleDisplayChange(e, setCurrencyDisplay)} checked={currencyDisplay} />
            </div>
            <div className="flex space-x-4">
              <div className="pl-4">From</div>
               <input type="text" list="currencies_from" className="pl-1 w-full rounded-md bg-gray-600" onChange={(e) => handleChange(e, setCurrencyFrom)} value={currencyFrom} />
                <datalist id="currencies_from">
                  {currencies !== [] ? currencies.map(currency => (
                    <option key={currency} value={currency} />
                  )) : null}
                </datalist>           
            </div>
            <div className="flex space-x-4">
              <div className="pl-4">To</div>
              <input type="text" list="currencies_to" className="pl-1 w-full rounded-md bg-gray-600" onChange={(e) => handleChange(e, setCurrencyTo)} value={currencyTo} />
                <datalist id="currencies_to">
                  {currencies !== [] ? currencies.map(currency => (
                    <option key={currency} value={currency} />
                  )) : null}
                </datalist>
            </div>
          </div>

          {/* Github */}
          <div className="pl-2 text-lg mt-6 font-bold">Github Service</div>
          <div className="border-b-2 w-full border-gray-700 mt-1 mb-3"></div>
          <div className="max-w-sm m-auto pl-6 font-mono space-y-2">
            {githubToken ? (
              <>
                <div className="flex items-center justify-between">
                  <div>Display widget</div>
                  <input type="checkbox" className="checked:text-green-500 rounded w-4 h-4" onChange={(e) => handleDisplayChange(e, setGithubDisplay)} checked={githubDisplay} />
                </div>
                <div className="flex space-x-4">
                  <div>Widget type</div>
                  <select value={githubWidget} className="bg-gray-600 rounded px-2 py-1 text-white" onChange={(e) => handleChange(e, setGithubWidget)}>
                    <option value="Contributions">Contributions</option>
                    <option value="Pinned">Pinned</option>
                    <option value="Stats">Stats</option>
                  </select>
                </div>
              </>
            ) : (
              <a className="flex justify-center" href={`https://github.com/login/oauth/authorize?scope=user,repo&client_id=${process.env.REACT_APP_GITHUB_ID}&redirect_uri=${process.env.REACT_APP_GITHUB_REDIRECT_URI}`}>
                <div className="flex items-center justify-between mb-2">
                  <button type="button" className="items-center justify-center p-2 px-4 font-semibold text-gray-900 bg-white border-2 border-gray-500 rounded-md shadow outline-none hover:bg-yellow-50 hover:border-yellow-400 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="inline w-8 h-8 mr-3 mb-1 text-gray-900 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                    Sign in with Github
                  </button>
                </div>
              </a>
            )}
          </div>

          {/* Twitter */}
        </div>
      </div>
      {/* <img src="http://ghchart.rshah.org/sisypheus" alt="Github chart"/> */}
      <Snackbar
        className="flex"
        open={settingsChanged}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <button onClick={submitSettings} className="py-2 px-4 bg-green-500 rounded-md text-gray-200 font-bold">Apply settings</button>
      </Snackbar>
    </Background>
  )
}

export default Configure
