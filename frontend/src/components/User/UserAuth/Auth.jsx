import { Form, Link, useNavigation, useSearchParams } from 'react-router-dom';

import classes from './Auth.module.css';
import Modal from '../../UI/Modal/Modal';
import PasswordField from '../passwordField/PasswordField';
import GoogleLogin from '../googleLogin/GoogleLogin';

const Auth = () => {
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';
  const isSubmitting = navigation.state === 'submitting';

  return (
    <>
      <Modal>
        <Form method="POST" className={classes.login}>
          <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>

          <div className={classes['form-items']}>
            {!isLogin && (
              <div>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" autoComplete="off" />
              </div>
            )}
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" autoComplete="off" />
            </div>
            <PasswordField />
          </div>
          {/* <div className={classes.actions}>
            <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
              {isLogin ? 'Create new user' : 'Login'}
            </Link>
            <button disabled={isSubmitting}>
              {isSubmitting ? 'Submitting..' : 'Save'}
            </button>
          </div> */}

          <div className={classes.login__actions}>
            <Link to="../">Cancel</Link>
            <button className={classes.button} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting..' : 'Save'}
            </button>
          </div>
        </Form>
        <div className={classes['redirect-register-sign-in']}>
          {!isLogin
            ? 'Do you have an account? Sign in now'
            : "Dont't you have an account? Create one now"}
          <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
            {isLogin ? 'Create new user' : 'Login'}
          </Link>
        </div>
        <GoogleLogin />
      </Modal>
    </>
  );
};

export default Auth;
