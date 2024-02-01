import { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { jwtDecode } from 'jwt-decode';

import classes from './GoogleLogin.module.css';
import { useValue } from '../../../context/ContextProvider';

const GoogleLogin = () => {
  const { dispatch } = useValue();
  const [disabled, setDisabled] = useState(false);

  const handleResponse = (response) => {
    const token = response.credential;
    const decodedToken = jwtDecode(token);
    const { sub: id, email, name } = decodedToken;
    dispatch({
      type: 'UPDATE_USER',
      payload: { id, email, name, token, google: true },
    });
    dispatch({ type: 'CLOSE_LOGIN' });
  };

  const handleGoogleLogin = () => {
    setDisabled(true);

    try {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleResponse,
      });
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed()) {
          throw new Error('Try to clear the cookies or try again later!');
        }
        if (
          notification.isSkippedMoment() ||
          notification.isDismissedMoment()
        ) {
          setDisabled(false);
        }
      });
    } catch (error) {
      dispatch({
        type: 'UPDATE_ALERT',
        payload: { open: true, severity: 'error', message: error.message },
      });
      console.log(error);
    }
  };

  return (
    <>
      <div className={classes['login-with-google']}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.6 }}
          disabled={disabled}
          onClick={handleGoogleLogin}
        >
          <FaGoogle />
          Login with Google
        </motion.button>
      </div>
    </>
  );
};

export default GoogleLogin;
