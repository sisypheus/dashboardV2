import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { db } from '../firebase';
import { auth } from '../firebase';
import { useHistory } from 'react-router';
import { LockClosedIcon } from "@heroicons/react/solid";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendEmailVerification } from 'firebase/auth';
import { collection, getDoc, addDoc, setDoc, doc } from '@firebase/firestore';
import Background from '../utils/Background';

const Auth = () => {
  const history = useHistory();
  const [signIn, setSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      if (user) {
        history.push('/');
      }
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (signIn) {
      await signInWithEmailAndPassword(auth, email, password).catch(error => {
        console.log(error);
        alert(error.message);
      });
    } else {
      const signUpData = await createUserWithEmailAndPassword(auth, email, password).catch(error => {
        console.log(error);
        alert(error.message);
      });
      setOpen(true);
      await sendEmailVerification(signUpData.user).then(() => {
        let interval = setInterval(() => {
          signUpData.user.reload().then(async () => {
            if (signUpData.user.emailVerified) {
              clearInterval(interval);
              await createUser(signUpData.user);
              history.push('/');
            } else {
              console.log('email not verified');
            }
          });
        }, 1000)
      });
      
    }
  }

  const createUser = async (user) => {
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
    });

    const settingsRef = doc(db, `settings/${user.uid}`);
    await setDoc(settingsRef, {
      weather: {
        display: true,
        city: 'Lille',
      },
      currency: {
        display: true,
        currency: 'EUR',
        to: 'USD',
      }
    });
    return;
  }

  const googleSignin = async () => {
    const data = await signInWithPopup(auth, new GoogleAuthProvider()).catch((err) => {
      console.log(err);
      alert(err.message);
    });

   createUser(data.user); 
  }

  return (
    <>
    <Background>
      <div className="h-screen">
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg w-full space-y-8 border-2 border-gray-800 shadow-lg px-8 py-16 rounded-xl dark:bg-dark-sidebar">
            <div>
              <img
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
                />
              {signIn ? (
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-300">
                  Sign in to your account
                </h2>
              ) : (
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-300">
                  Sign up for a new account
                </h2>
              )}

              {signIn ? (
                <h4 className="text-center text-2xl font-bold dark:text-gray-200">
                  New user? <a onClick={() => setSignIn(false)} className="cursor-pointer font-black text-indigo-500">Sign Up</a>
                </h4>
              ) : (
                <h4 className="text-center text-2xl font-bold dark:text-gray-200">
                  Got an account? <a onClick={() => setSignIn(true)} className="cursor-pointer font-black text-indigo-500">Sign In</a>
                </h4>
              )}
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                {!signIn ? (
                  <div>
                    <label htmlFor="name" className="sr-only">
                      Full Name
                    </label>
                    <input
                      id="full-name"
                      name="full-name"
                      type="text"
                      autoComplete="full-name"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      />
                  </div>
                ) : (
                  null
                  )}
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <button onClick={googleSignin} type="button" className="items-center justify-center w-full p-2 font-semibold text-gray-900 bg-white border-2 border-gray-500 rounded-md shadow outline-none hover:bg-yellow-50 hover:border-yellow-400 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="inline w-5 h-5 mr-3 mb-1 text-gray-900 fill-current" viewBox="0 0 48 48"><path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    </svg>
                    Sign in with Google
                  </button>
                </div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                  </span>
                  {signIn ? "Sign In" : "Sign Up"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
     <Snackbar
      className="fixed bottom-0 mb-4"
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message="Please verify your email address"
      /> 
      </Background>
    </>
  );
};

export default Auth;