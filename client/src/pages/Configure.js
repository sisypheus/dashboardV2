import React, { useEffect, useState } from 'react'
import Background from '../utils/Background';
import Navbar from '../components/Navbar';
import { auth, db } from '../firebase';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { useHistory } from 'react-router';
import { Snackbar } from '@mui/material';

const Configure = () => {
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState(null);
  const history = useHistory();
  const [weatherDisplay, setWeatherDisplay] = useState(false);
  const [weatherCity, setWeatherCity] = useState('');
  const [settingsChanged, setSettingsChanged] = useState(false);
  const [settingsRef, setSettingsRef] = useState(null);

  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      if (user) {
        const userRef = doc(db, `users/${user.uid}`);
        const settingsRef = doc(db, `settings/${user.uid}`);
        setSettingsRef(settingsRef);
        getDoc(userRef).then(userDoc => {
          setUser(userDoc.data());
        });
        getDoc(settingsRef).then(settingsDoc => {
          setSettings(settingsDoc.data());
          setWeatherDisplay(settingsDoc.data().weather.display);
          setWeatherCity(settingsDoc.data().weather.city);
        })
      } else {
        history.push('/login');
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
    await updateDoc(settingsRef, {
      weather: {
        display: weatherDisplay,
        city: weatherCity
      },
    }).catch(err => {
      console.log(err);
    });
  }

  return (
    <Background>
      <Navbar />
      <a
        className="dark:text-white"
        href={`https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.REACT_APP_GITHUB_ID}&redirect_uri=${process.env.REACT_APP_GITHUB_REDIRECT_URI}`}
      >Login with github to access this service</a>
      <div className="flex flex-col items-center justify-center max-w-2xl m-auto">
        <div className="mt-6 text-2xl dark:text-gray-200 font-bold border-b-4 dark:border-gray-500 border-gray-600">
          Settings
        </div>
        <div className="dark:text-gray-200 w-full">
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
        </div>
      </div>
      {/* TODO add this chart with github service */}
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
