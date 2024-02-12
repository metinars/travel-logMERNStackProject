import { Link } from 'react-router-dom';
import classes from './Travels.module.css';

// eslint-disable-next-line react/prop-types
const Travels = ({ travels }) => {
  return (
    <article className={classes.flow}>
      <div className={classes.team}>
        <ul className={classes.auto__grid} role="list">
          {travels?.map((travel) => (
            <li key={travel._id}>
              <Link to={`/travels/${travel._id}`} className={classes.profile}>
                <h2 className={classes.profile__name}>{travel.title}</h2>
                <p>{travel.uName}</p>
                <img alt="Anita Simmons" src={travel.imageUrl} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default Travels;
