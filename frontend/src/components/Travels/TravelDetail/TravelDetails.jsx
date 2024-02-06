import { Link } from 'react-router-dom';
import classes from './TravelDetails.module.css';

const TravelDetails = ({ travel }) => {
  const userId = JSON.parse(localStorage.getItem('currentUser'));
  const handleStartDelete = () => {};

  let nav;

  if (userId) {
    if (userId.id === travel.uId) {
      nav = (
        <nav>
          <button onClick={handleStartDelete}>Delete</button>
          <Link to="edit">Edit</Link>
        </nav>
      );
    }
  }

  const formattedDate = new Date(travel.updatedAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  return (
    <article className={classes.travel__details}>
      <header>
        <h1>{travel.title}</h1>
        {nav}
      </header>
      <div className={classes.travel__details__image}>
        <img src={travel.imageUrl} alt={travel.title} />
      </div>
      <div className={classes.travel__details__content}>
        <div className={classes.travel__details__info}>
          <div>
            <p className={classes.travel__details__location}>{travel.uName}</p>
          </div>
          {/* <p className={classes.travel__details__description}>{travel.desc}</p> */}
        </div>
        <div className={classes.travel__details__info}>
          <div>
            <time dateTime={`Todo-DateT$Todo-Time`}>{formattedDate}</time>
          </div>
          {/* <p className={classes.travel__details__description}>{travel.desc}</p> */}
        </div>
      </div>
      <div className={classes.travel__details__description}>
        <p>{travel.desc}</p>
      </div>
    </article>
  );
};

export default TravelDetails;
