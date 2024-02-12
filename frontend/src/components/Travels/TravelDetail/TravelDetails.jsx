import { Link, useSubmit } from 'react-router-dom';
import classes from './TravelDetails.module.css';
import { useState } from 'react';

import Modal from '../../UI/Modal';

const TravelDetails = ({ travel }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const userData = JSON.parse(localStorage.getItem('currentUser'));

  const submit = useSubmit();

  const handleStartDelete = () => {
    setIsDeleting(true);
  };

  const handleDelete = () => {
    submit(null, { method: 'delete' });
  };

  let nav;

  if (userData) {
    if (userData.id === travel.uId) {
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
    <>
      {isDeleting && (
        <>
          <Modal onClose={() => setIsDeleting(false)}>
            <h2>Are you sure?</h2>
            <p>
              Do you really want to delete this event? This action cannot be
              undone.
            </p>
            <div className={classes.modal__delete__actions}>
              <button
                onClick={() => setIsDeleting(false)}
                className={classes.cancel__button}
              >
                Cancel
              </button>
              <button onClick={handleDelete} className={classes.delete__button}>
                Delete
              </button>
            </div>
          </Modal>
        </>
      )}

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
              <p className={classes.travel__details__location}>
                {travel.uName}
              </p>
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
    </>
  );
};

export default TravelDetails;
