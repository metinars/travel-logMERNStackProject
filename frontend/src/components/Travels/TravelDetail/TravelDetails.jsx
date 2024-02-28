import { Link, useSubmit } from 'react-router-dom';
import Map, { FullscreenControl, Marker } from 'react-map-gl';
import classes from './TravelDetails.module.css';
import { useState } from 'react';
import { FaMapPin } from 'react-icons/fa';

import Modal from '../../UI/Modal';

const TravelDetails = ({ travel }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const userData = JSON.parse(localStorage.getItem('currentUser'));

  const submit = useSubmit();

  const handleStartDelete = () => {
    setIsDeleting(true);
  };

  console.log(travel);

  const handleDelete = () => {
    submit(null, { method: 'delete' });
  };

  let nav;

  if (userData) {
    if (userData.id === travel.uId) {
      nav = (
        <nav>
          <Link className={classes.edit} to="edit">
            Edit
          </Link>
          <Link className={classes.delete} onClick={handleStartDelete}>
            Delete
          </Link>
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

      <main className={classes.main}>
        <div className={classes.image}>
          <img src={travel.imageUrl} alt={travel.title} />
        </div>
        <div className={classes.travel__info}>
          <div className={classes.author__details}>
            <div className={classes.author__name}>
              <p>{travel.uName}</p>
            </div>
            <div className={classes.date}>
              <time dateTime={`Todo-DateT$Todo-Time`}>{formattedDate}</time>
            </div>
          </div>
          <div className={classes.travel__actions}>{nav}</div>
        </div>
        <div className={classes.details}>
          <div className={classes.sidebar}>
            <Map
              mapboxAccessToken={import.meta.env.VITE_MAPBOX_APP_TOKEN}
              initialViewState={{
                longitude: travel.longitude,
                latitude: travel.latitude,
                zoom: 12,
              }}
              style={{ width: '100%', height: '100%' }}
              mapStyle="mapbox://styles/mapbox/streets-v9"
            >
              <FullscreenControl />
              <Marker longitude={travel.longitude} latitude={travel.latitude}>
                <FaMapPin className={classes.map__pin} />
              </Marker>
            </Map>
          </div>
          <div className={classes.content}>
            <div className={classes.container}>
              <div className={classes.travel__content}>
                <div>
                  <h2>{travel.title}</h2>
                </div>
                <div>
                  <p>{travel.desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default TravelDetails;
