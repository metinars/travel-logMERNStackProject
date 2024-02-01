import classes from './ErrorBlock.module.css';

// eslint-disable-next-line react/prop-types
export default function ErrorBlock({ title, message }) {
  return (
    <div className={classes.error__block}>
      <div className={classes.error__block__icon}>!</div>
      <div className={classes.error__block__text}>
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}
