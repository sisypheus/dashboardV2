import React from 'react'
import { useHistory } from 'react-router';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';
import './sidebar.css';

const Sidebar = ({ user, setSettings, settings }) => {
  const history = useHistory();
  
  function handleChangeCurrency(e) {
    setSettings({...settings, currency: {...settings.currency, display: !settings.currency.display}});
    //TODO - update firestore
  };
  
  function handleChangeGithub(e) {
    setSettings({...settings, github: {...settings.github, display: !settings.github.display}});
    //TODO - update firestore
  };
  
  function handleChangeWeather(e) {
    setSettings({...settings, weather: {...settings.weather, display: !settings.weather.display}});
    //TODO - update firestore
  };
  
  function handleChangeNasa(e) {
    setSettings({...settings, nasa: {...settings.nasa, display: !settings.nasa.display}});
    //TODO - update firestore
  };
  
  function handleChangeRandomQuotes(e) {
    setSettings({...settings, quote: {...settings.quote, random: {...settings.quote.random, display: !settings.quote.random.display}}});
    //TODO - update firestore
  };
  
  function handleChangeQodQuotes(e) {
    setSettings({...settings, quote: {...settings.quote, qod: {...settings.quote.qod, display: !settings.quote.qod.display}}});
    //TODO - update firestore
  };
  
  function handleChangeIntranet(e) {
    setSettings({...settings, intranet: {...settings.intranet, display: !settings.intranet.display}});
    //TODO - update firestore
  };
  
  function handleChangeReddit(e) {
    setSettings({...settings, reddit: {...settings.reddit, display: !settings.reddit.display}});
    //TODO - update firestore
  };
  
  function handleChangeLastYoutube(e) {
    setSettings({...settings, youtube: {...settings.youtube, last: {...settings.youtube.last, display: !settings.youtube.last.display}}});
    //TODO - update firestore
  };
  
  function handleChangeStatsYoutube(e) {
    setSettings({...settings, youtube: {...settings.youtube, stats: {...settings.youtube.stats, display: !settings.youtube.stats.display}}});
    //TODO - update firestore
  };

  return (
    <div style={{ height: 'calc(100vh - 6rem)' }} id="sidebar" className="flex justify-center bg-light-sidebar dark:bg-dark-sidebar shadow-lg w-64 p-2">
    {user ? (
        <div className="p-2 flex flex-col items-center text-center dark:text-gray-200">
          <p className="text-sidebar">You are logged in as:</p>
          <p className="italic text-sidebar font-bold">{user.name}</p>
          <p className="p-4 text-sidebar">To personalize your experience, go to <span className="font-bold">your configuration page.</span></p>
          <Link to="/configure">
            <button className="py-2 px-4 hover:bg-blue-700 bg-blue-500 rounded-lg text-white font-bold">Configure</button>
          </Link>
          <button onClick={() => auth.signOut()} className="mb-10 hover:bg-red-700 py-2 mt-4 px-4 bg-red-600 rounded-lg shadow-lg text-white font-bold">
            Log out
          </button>
          <div className="container">
            <p className="text-sidebar">Currency</p>
            <div className="contain-switch">
              <label className="switch">
                <input type="checkbox" onChange={handleChangeCurrency} checked={settings?.currency?.display ?? false}/>
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <div className="container">
            <p className="text-sidebar">Github</p>
            <div className="contain-switch">
              <label className="switch">
                <input type="checkbox" onChange={handleChangeGithub} checked={settings?.github?.display ?? false}/>
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <div className="container">
            <p className="text-sidebar">Nasa</p>
            <div className="contain-switch">
              <label className="switch">
                <input type="checkbox" onChange={handleChangeNasa} checked={settings?.nasa?.display ?? false}/>
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <div className="container">
            <p className="text-sidebar">Intranet</p>
            <div className="contain-switch">
              <label className="switch">
                <input type="checkbox" onChange={handleChangeIntranet} checked={settings?.intranet?.display ?? false}/>
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <div className="container">
            <p className="text-sidebar">Q. of the day</p>
            <div className="contain-switch">
              <label className="switch">
                <input type="checkbox" onChange={handleChangeQodQuotes} checked={settings?.quote?.qod?.display ?? false}/>
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <div className="container">
            <p className="text-sidebar">Random quote</p>
            <div className="contain-switch">
              <label className="switch">
                <input type="checkbox" onChange={handleChangeRandomQuotes} checked={settings?.quote?.random?.display ?? false}/>
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <div className="container">
            <p className="text-sidebar">Reddit</p>
            <div className="contain-switch">
              <label className="switch">
                <input type="checkbox" onChange={handleChangeReddit} checked={settings?.reddit?.display ?? false}/>
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <div className="container">
            <p className="text-sidebar">Youtube last</p>
            <div className="contain-switch">
              <label className="switch">
                <input type="checkbox" onChange={handleChangeLastYoutube} checked={settings?.youtube?.last?.display ?? false}/>
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <div className="container">
            <p className="text-sidebar">Youtube stats</p>
            <div className="contain-switch">
              <label className="switch">
                <input type="checkbox" onChange={handleChangeStatsYoutube} checked={settings?.youtube?.stats?.display ?? false}/>
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <div className="container">
            <p className="text-sidebar">Weather</p>
            <div className="contain-switch">
              <label className="switch">
                <input type="checkbox" onChange={handleChangeWeather} checked={settings?.weather?.display ?? false}/>
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-2 flex flex-col items-center text-center dark:text-gray-200">
          <p className="text-sidebar">To personalize your experience, please login.</p>
          <button onClick={() => history.push('/auth')} className="py-2 mt-2 px-4 hover:bg-green-600 bg-green-500 rounded-lg shadow-lg text-white font-bold">Log in</button>
        </div>
      )}
    </div>
  )
}

export default Sidebar
