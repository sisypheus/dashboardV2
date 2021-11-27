import React, {useState, useEffect} from 'react'
import { auth, db } from '../firebase';
import { getDoc, doc, setDoc, updateDoc } from '@firebase/firestore';
import Background from '../utils/Background';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import axios from 'axios';

const Youtube = () => {
  const [user, setUser] = useState('');
  const history = useHistory();

  useEffect(() => {
    return auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log('connected');
        const userRef = doc(db, `settings/${user.uid}`);
        const url = window.location.href;
        const code = url.split('?code=')[1];
        console.log(code);
        const res = await axios.get(process.env.REACT_APP_API + '/service/youtube/auth/token' + '?code=' + code);
        // console.log(res.data);
        if (!res.data.err) {
          setUser(res.data);
          await setDoc(userRef, {
            youtube: {
              tokens: res.data
            }
          }, { merge: true });
          setTimeout(() => {
            history.push('/configure');
          }, 2000);
        }
      } else {
        setUser(null);
      }
    })
  }, [])

  return (
    <Background>
      <Navbar />
      <div className="mt-32 text-2xl dark:text-gray-200 flex flex-col items-center justify-center">
        {user === null ? (
          <>
            <div>Something went wrong</div>
            <Link to="/configure" className="py-2 px-6 bg-blue-700 rounded-lg font-bold mt-4">Go back</Link>
          </>
        ) : (
          user != '' ? (
            <>
              <div>You are successfully logged in</div>
              <div>Wait while you are being redirected to your profile...</div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center space-x-3">
                <p>Fetching your token...</p>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </>
          )
        )}
      </div>
    </Background>
  )
}

export default Youtube
