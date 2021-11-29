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

  //nasa
  const [nasaDisplay, setNasaDisplay] = useState(false);
  const [nasaWidget, setNasaWidget] = useState('');

  //quotes
  const [quoteCategories, setQuoteCategories] = useState([]);
  //random
  const [randomDisplay, setRandomDisplay] = useState(false);
  const [randomCategory, setRandomCategory] = useState('');
  //qod
  const [qodDisplay, setQodDisplay] = useState(false);
  const [qodCategory, setQodCategory] = useState('');

  //intranet
  const [intranetDisplay, setIntranetDisplay] = useState(false);
  const [intranetTokenPresent, setIntranetTokenPresent] = useState(false);
  const [intranetToken, setIntranetToken] = useState('');
  const [intranetWidget, setIntranetWidget] = useState('');

  //reddit
  const [redditDisplay, setRedditDisplay] = useState(false);
  const [redditToken, setRedditToken] = useState('');
  const [redditLink, setRedditLink] = useState('');
  const [redditSubreddit, setRedditSubreddit] = useState('');
  const [redditPosts, setRedditPosts] = useState(0);

  //youtube
  const [youtubeLink, setYoutubeLink] = useState('');
  const [youtubeToken, setYoutubeToken] = useState('');
  //last video from channel
  const [youtubeDisplayLast, setYoutubeDisplayLast] = useState(false);
  const [youtubeChannelLast, setYoutubeChannelLast] = useState('');
  //statistics of channel
  const [youtubeDisplayStats, setYoutubeDisplayStats] = useState(false);
  const [youtubeChannelStats, setYoutubeChannelStats] = useState('');

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
        axios.get(process.env.REACT_APP_API + '/service/quote/categories')
          .then(res => {
            setQuoteCategories(res.data);
          })
        setSettingsRef(settingsRef);
        getDoc(userRef).then(userDoc => {
          setUser(userDoc.data());
        });
        getDoc(settingsRef).then(settingsDoc => {
          setSettings(settingsDoc);
        });
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
        city: weatherCity,
      },
      currency: {
        display: currencyDisplay,
        from: currencyFrom,
        to: currencyTo
      },
      github: {
        display: githubDisplay,
        widget: githubWidget
      },
      intranet: {
        display: intranetDisplay,
        token: intranetToken,
        widget: intranetWidget,
      },
      nasa: {
        display: nasaDisplay,
        widget: nasaWidget,
      },
      quote: {
        random: {
          display: randomDisplay,
          category: randomCategory,
        },
        qod: {
          display: qodDisplay,
          category: qodCategory,
        },
      },
      reddit: {
        display: redditDisplay,
        token: redditToken,
        subreddit: redditSubreddit,
        posts: redditPosts,
      },
      youtube: {
        last: {
          display: youtubeDisplayLast,
          channel: youtubeChannelLast,
        },
        stats: {
          display: youtubeDisplayStats,
          channel: youtubeChannelStats,
        },
        tokens: youtubeToken ? youtubeToken : {},
      }
    }, { merge: true }).catch(err => {
      console.log(err);
    });
    getDoc(settingsRef).then(settingsDoc => {
      setSettings(settingsDoc);
    })
  }

  const setSettings = (settingsDoc) => {
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

    //nasa
    setNasaDisplay(settingsDoc.data().nasa.display);
    setNasaWidget(settingsDoc.data().nasa.widget);

    //quotes
    //random widget
    setRandomDisplay(settingsDoc.data().quote.random.display);
    setRandomCategory(settingsDoc.data().quote.random.category);
    //qod widget
    setQodDisplay(settingsDoc.data().quote.qod.display);
    setQodCategory(settingsDoc.data().quote.qod.category);

    //intranet
    setIntranetDisplay(settingsDoc.data().intranet.display);
    setIntranetTokenPresent(settingsDoc.data().intranet.token !== '');
    setIntranetToken(settingsDoc.data().intranet.token);
    setIntranetWidget(settingsDoc.data().intranet.widget);

    //reddit
    setRedditDisplay(settingsDoc.data().reddit.display);
    setRedditToken(settingsDoc.data().reddit.tokens);
    setRedditSubreddit(settingsDoc.data().reddit.subreddit);
    setRedditPosts(settingsDoc.data().reddit.posts);

    //youtube
    setYoutubeToken(settingsDoc.data().youtube.tokens);
    //statistics of channel
    setYoutubeDisplayStats(settingsDoc.data().youtube.stats.display);
    setYoutubeChannelStats(settingsDoc.data().youtube.stats.channel);
    //last video from channel
    setYoutubeDisplayLast(settingsDoc.data().youtube.last.display);
    setYoutubeChannelLast(settingsDoc.data().youtube.last.channel);

    //youtube
    if (Object.entries(settingsDoc.data().youtube.tokens).length === 0) {
      axios.get(process.env.REACT_APP_API + '/service/youtube/auth/link')
        .then(res => {
          setYoutubeLink(res.data);
          console.log(res.data);
        })
    }
    //reddit
    if (Object.entries(settingsDoc.data().reddit.tokens).length === 0) {
      axios.get(process.env.REACT_APP_API + '/service/reddit/auth/link')
        .then(res => {
          setRedditLink(res.data);
          console.log(res.data);
        })
    }
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
              <input type="text" list="currencies_from" className="pl-1 w-full text-white rounded-md bg-gray-600" onChange={(e) => handleChange(e, setCurrencyFrom)} value={currencyFrom} />
              <datalist id="currencies_from">
                {currencies !== [] ? currencies.map(currency => (
                  <option key={currency} value={currency} />
                )) : null}
              </datalist>
            </div>
            <div className="flex space-x-4">
              <div className="pl-4">To</div>
              <input type="text" list="currencies_to" className="pl-1 w-full text-white rounded-md bg-gray-600" onChange={(e) => handleChange(e, setCurrencyTo)} value={currencyTo} />
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

          {/* Nasa */}
          <div className="pl-2 text-lg mt-6 font-bold">Nasa Service</div>
          <div className="border-b-2 w-full border-gray-700 mt-1 mb-3"></div>
          <div className="max-w-sm m-auto pl-6 font-mono space-y-2">
            <div className="flex items-center justify-between">
              <div>Display widget</div>
              <input type="checkbox" className="checked:text-green-500 rounded w-4 h-4" onChange={(e) => handleDisplayChange(e, setNasaDisplay)} checked={nasaDisplay} />
            </div>
            <div className="flex space-x-4">
              <div className="pl-4">Type</div>
              <select className="w-full border-b-2 border-gray-700 bg-gray-600 rounded-md pl-1 text-white" onChange={(e) => handleChange(e, setNasaWidget)} value={nasaWidget} >
                <option value="apod">Astro Picture Of the Day</option>
                <option value="mars">Mars rover photo</option>
              </select>
            </div>
          </div>

          {/* Quotes */}
          <div className="pl-2 text-lg mt-6 font-bold">Quote Service</div>
          <div className="border-b-2 w-full border-gray-700 mt-1 mb-3"></div>
          <div className="max-w-sm m-auto pl-6 font-mono space-y-2">
            <div className="text-xl font-bold">Random quote widget</div>
            <div className="flex items-center justify-between">
              <div>Display widget</div>
              <input type="checkbox" className="checked:text-green-500 rounded w-4 h-4" onChange={(e) => handleDisplayChange(e, setRandomDisplay)} checked={randomDisplay} />
            </div>
            <div className="flex space-x-4">
              <div className="pl-4">Category</div>
              <select className="w-full border-b-2 border-gray-700 bg-gray-600 rounded-md pl-1 text-white" onChange={(e) => handleChange(e, setRandomCategory)} value={randomCategory} >
                {quoteCategories !== [] ? quoteCategories.map(category => (
                  <option key={category} value={category} >{category}</option>
                )) : null}
              </select>
            </div>

            {/* separator between widgets */}
            <div className="border-b-2 w-full border-gray-700 py-3"></div>
            {/* separator between widgets */}

            <div className="text-xl font-bold pt-4">Quote of the day widget</div>
            <div className="flex items-center justify-between">
              <div>Display widget</div>
              <input type="checkbox" className="checked:text-green-500 rounded w-4 h-4" onChange={(e) => handleDisplayChange(e, setQodDisplay)} checked={qodDisplay} />
            </div>
            <div className="flex space-x-4">
              <div className="pl-4">Category</div>
              <select className="w-full border-b-2 border-gray-700 bg-gray-600 rounded-md pl-1 text-white" onChange={(e) => handleChange(e, setQodCategory)} value={qodCategory} >
                {quoteCategories !== [] ? quoteCategories.map(category => (
                  <option key={category} value={category} >{category}</option>
                )) : null}
              </select>
            </div>
          </div>

          {/* Intranet */}
          <div className="pl-2 text-lg mt-6 font-bold">Epitech Intranet Service</div>
          <div className="border-b-2 w-full border-gray-700 mt-1 mb-3"></div>
          <div className="max-w-sm m-auto pl-6 font-mono space-y-2">
            {intranetTokenPresent ? (
              <>
                <div className="flex items-center justify-between">
                  <div>Display widget</div>
                  <input type="checkbox" className="checked:text-green-500 rounded w-4 h-4" onChange={(e) => handleDisplayChange(e, setWeatherDisplay)} checked={weatherDisplay} />
                </div>
                <div className="flex space-x-4">
                  <div className="pl-4">Widget</div>
                  <select className="w-full border-b-2 border-gray-700 bg-gray-600 rounded-md pl-1 text-white" onChange={(e) => handleChange(e, setIntranetWidget)} value={intranetWidget} >
                    <option value="stats">Stats</option>
                    <option value="notifications">Notifications</option>
                  </select>
                  {/* <input type="text" className="w-full border-b-2 border-gray-700 bg-gray-600 rounded-md pl-1 text-white" onChange={(e) => handleChange(e, setWeatherCity)} value={weatherCity} /> */}
                </div>
              </>
            ) : (
              <div className="flex">
                <p>Enter your autologin link</p>
                <input type="text" className="w-full border-b-2 border-gray-700 bg-gray-600 rounded-md pl-1 text-white" placeholder="Paste your token here" onChange={(e) => handleChange(e, setIntranetToken)} value={intranetToken} />
              </div>
            )}
          </div>

          {/* Reddit */}
          <div className="pl-2 text-lg mt-6 font-bold">Reddit Service</div>
          <div className="border-b-2 w-full border-gray-700 mt-1 mb-3"></div>
          <div className="max-w-sm m-auto pl-6 font-mono space-y-2">
            {Object.entries(redditToken).length !== 0 ? (
              <>
                <div className="flex items-center justify-between">
                  <div>Display widget</div>
                  <input type="checkbox" className="checked:text-green-500 rounded w-4 h-4" onChange={(e) => handleDisplayChange(e, setRedditDisplay)} checked={redditDisplay} />
                </div>
                <div className="flex-col space-y-2">
                  <div className="flex space-x-4">
                    <div className="pl-4">Subreddit</div>
                    <input type="text" className="w-full border-b-2 border-gray-700 bg-gray-600 rounded-md pl-1 text-white" onChange={(e) => handleChange(e, setRedditSubreddit)} value={redditSubreddit} />
                  </div>
                  <div className="flex justify-between">
                    <div className="pl-4">Posts</div>
                    <div>
                      <input type="text" list="subreddit_posts" className="pl-1 -full text-white rounded-md bg-gray-600" onChange={(e) => handleChange(e, setRedditPosts)} value={redditPosts} />
                      <datalist id="subreddit_posts">
                        {Array.from({ length: 15 }, (_, i) => i + 1).map(number => (
                          <option key={number} value={number} />
                        ))}
                      </datalist>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <a className="flex justify-center" href={redditLink}>
                <div className="flex items-center justify-between mb-2">
                  <button type="button" className="items-center justify-center p-2 px-4 font-semibold text-gray-900 bg-white border-2 border-gray-500 rounded-md shadow outline-none hover:bg-yellow-50 hover:border-yellow-400 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="inline w-8 h-8 mr-3 mb-1 text-gray-900 fill-current" viewBox="0 0 24 24"><path d="M14.238 15.348c.085.084.085.221 0 .306-.465.462-1.194.687-2.231.687l-.008-.002-.008.002c-1.036 0-1.766-.225-2.231-.688-.085-.084-.085-.221 0-.305.084-.084.222-.084.307 0 .379.377 1.008.561 1.924.561l.008.002.008-.002c.915 0 1.544-.184 1.924-.561.085-.084.223-.084.307 0zm-3.44-2.418c0-.507-.414-.919-.922-.919-.509 0-.923.412-.923.919 0 .506.414.918.923.918.508.001.922-.411.922-.918zm13.202-.93c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12zm-5-.129c0-.851-.695-1.543-1.55-1.543-.417 0-.795.167-1.074.435-1.056-.695-2.485-1.137-4.066-1.194l.865-2.724 2.343.549-.003.034c0 .696.569 1.262 1.268 1.262.699 0 1.267-.566 1.267-1.262s-.568-1.262-1.267-1.262c-.537 0-.994.335-1.179.804l-2.525-.592c-.11-.027-.223.037-.257.145l-.965 3.038c-1.656.02-3.155.466-4.258 1.181-.277-.255-.644-.415-1.05-.415-.854.001-1.549.693-1.549 1.544 0 .566.311 1.056.768 1.325-.03.164-.05.331-.05.5 0 2.281 2.805 4.137 6.253 4.137s6.253-1.856 6.253-4.137c0-.16-.017-.317-.044-.472.486-.261.82-.766.82-1.353zm-4.872.141c-.509 0-.922.412-.922.919 0 .506.414.918.922.918s.922-.412.922-.918c0-.507-.413-.919-.922-.919z" /></svg>
                    Sign in with Reddit
                  </button>
                </div>
              </a>
            )}
          </div>

          {/* Youtube */}
          <div className="pl-2 text-lg mt-6 font-bold">Youtube Service</div>
          <div className="border-b-2 w-full border-gray-700 mt-1 mb-3"></div>
          <div className="max-w-sm m-auto pl-6 font-mono space-y-2">
            {Object.entries(youtubeToken).length !== 0 ? (
              <>
                <div className="text-xl font-bold">Last video widget</div>
                <div className="flex items-center justify-between">
                  <div>Display widget</div>
                  <input type="checkbox" className="checked:text-green-500 rounded w-4 h-4" onChange={(e) => handleDisplayChange(e, setYoutubeDisplayLast)} checked={youtubeDisplayLast} />
                </div>
                <div className="flex space-x-4">
                  <div className="pl-4">Channel</div>
                  <input type="text" className="w-full border-b-2 border-gray-700 bg-gray-600 rounded-md pl-1 text-white" onChange={(e) => handleChange(e, setYoutubeChannelLast)} value={youtubeChannelLast} />
                </div>

                {/* separator between widgets */}
                <div className="border-b-2 w-full border-gray-700 py-3"></div>
                {/* separator between widgets */}

                <div className="text-xl font-bold pt-4">Statistics widget</div>
                <div className="flex items-center justify-between">
                  <div>Display widget</div>
                  <input type="checkbox" className="checked:text-green-500 rounded w-4 h-4" onChange={(e) => handleDisplayChange(e, setYoutubeDisplayStats)} checked={youtubeDisplayStats} />
                </div>
                <div className="flex space-x-4">
                  <div className="pl-4">Channel</div>
                  <input type="text" className="w-full border-b-2 border-gray-700 bg-gray-600 rounded-md pl-1 text-white" onChange={(e) => handleChange(e, setYoutubeChannelStats)} value={youtubeChannelStats} />
                </div>
              </>
            ) : (
              <a className="flex justify-center" href={youtubeLink}>
                <div className="flex items-center justify-between mb-2">
                  <button type="button" className="items-center justify-center p-2 px-4 font-semibold text-gray-900 bg-white border-2 border-gray-500 rounded-md shadow outline-none hover:bg-yellow-50 hover:border-yellow-400 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="inline w-8 h-8 mr-3 mb-1 text-gray-900 fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                    Sign in with Youtube
                  </button>
                </div>
              </a>
            )}
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />

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
