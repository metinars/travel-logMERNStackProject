import { useState } from 'react';
import { LiaEyeSlash, LiaEyeSolid } from 'react-icons/lia';

import classes from './PasswordField.module.css';

const PasswordField = ({
  passwordRef,
  id = 'password',
  label = 'Password',
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const passwordVisibleHandler = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <div className={classes['input-icons']}>
        <input
          ref={passwordRef}
          type={showPassword ? 'text' : 'password'}
          name={label}
          id={id}
          className={classes['input-field']}
        />
        <div className={classes['password-icon']}>
          <button type="button" onClick={passwordVisibleHandler}>
            {showPassword ? (
              <LiaEyeSolid className={classes['icon']} />
            ) : (
              <LiaEyeSlash className={classes['icon']} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordField;
