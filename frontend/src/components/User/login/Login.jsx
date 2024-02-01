import { useEffect, useRef, useState } from 'react';
import { stagger, useAnimate } from 'framer-motion';

import { useValue } from '../../../context/ContextProvider';
import Modal from '../../UI/Modal/Modal';
import classes from './Login.module.css';
import PasswordField from '../passwordField/PasswordField';
import GoogleLogin from '../googleLogin/GoogleLogin';
import { register, login } from '../../../actions/user';
// import GoogleLogin from '../googleLogin';

const Login = () => {
  const { dispatch } = useValue();
  const [title, setTitle] = useState('Login');
  const [isRegister, setIsRegister] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [scope, animate] = useAnimate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (!isRegister) return login({ email, password }, dispatch);
    const name = nameRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (password !== confirmPassword) {
      return dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'error',
          message: 'Passwords do not match',
        },
      });
    }
    register({ name, email, password }, dispatch);

    const challenge = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    if (!challenge.name.trim() || !challenge.email.trim()) {
      animate(
        'input',
        { x: [-10, 0, 10, 0] },
        {
          type: 'spring',
          duration: 0.2,
          delay: stagger(0.05),
        }
      );
      return;
    }
  };

  const handleClose = () => {
    dispatch({ type: 'CLOSE_LOGIN' });
  };

  useEffect(() => {
    isRegister ? setTitle('Register') : setTitle('Login');
  }, [isRegister]);

  return (
    <Modal title={title} onClose={handleClose}>
      <form className={classes.login} onSubmit={handleSubmit} ref={scope}>
        <div className={classes['form-items']}>
          {isRegister && (
            <div>
              <label htmlFor="title">Name</label>
              <input
                ref={nameRef}
                type="text"
                name="name"
                id="name"
                autoComplete="off"
              />
            </div>
          )}
          <div>
            <label htmlFor="email">Email</label>
            <input
              ref={emailRef}
              type="email"
              name="email"
              id="email"
              autoComplete="off"
            />
          </div>
          <PasswordField {...{ passwordRef }} />
          {isRegister && (
            <PasswordField
              passwordRef={confirmPasswordRef}
              id="confirmPassword"
              label="Confirm Password"
            />
          )}
        </div>
        <div className={classes['login-actions']}>
          <button type="button" onClick={handleClose}>
            Cancel
          </button>
          <button type="submit">{title}</button>
        </div>
      </form>
      <div className={classes['redirect-register-sign-in']}>
        {isRegister
          ? 'Do you have an account? Sign in now'
          : "Dont't you have an account? Create one now"}
        <button onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Login' : 'Register'}
        </button>
      </div>
      <GoogleLogin />
    </Modal>
  );
};

export default Login;
