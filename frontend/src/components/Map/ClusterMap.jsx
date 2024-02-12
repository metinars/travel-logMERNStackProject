import { useEffect, useRef, useState } from 'react';
import Map, { FullscreenControl, Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { format } from 'timeago.js';

import classes from './ClusterMap.module.css';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function ClusterMap({ travels }) {
  const mapRef = useRef();
  const [longitude, setLongitude] = useState(false);
  const [latitude, setLatitude] = useState(false);
  const [points, setPoints] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 47.040182,
    longitude: 17.071727,
    zoom: 4,
  });

  useEffect(() => {
    if (!longitude && !latitude) {
      fetch('https://ipapi.co/json')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          mapRef.current.flyTo({
            center: [data.longitude, data.latitude],
          });
          setLongitude(data.longitude), setLatitude(data.latitude);
        });
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    const points = travels?.map((travel) => ({
      type: 'Feature',
      properties: {
        markerKey: 'marker-' + travel._id,
        popupKey: 'popup-' + travel._id,
        travelId: travel._id,
        title: travel.title,
        desc: travel.desc,
        lng: travel.longitude,
        lat: travel.latitude,
        photoUrl: travel.imageUrl,
        uName: travel.uName,
        createdAt: travel.createdAt,
      },
      geometry: {
        type: 'Point',
        coordinates: [
          parseFloat(travel.longitude),
          parseFloat(travel.latitude),
        ],
      },
    }));
    setPoints(points);
  }, [travels]);

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  return (
    <>
      <Map
        ref={mapRef}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_APP_TOKEN}
        initialViewState={{
          longitude: longitude,
          latitude: latitude,
          zoom: 6,
        }}
        style={{ width: '100vw', height: '100vh' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <FullscreenControl />
        {points?.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;

          return (
            <div key={cluster.properties.travelId}>
              <Marker
                key={cluster.properties.markerKey}
                longitude={longitude}
                latitude={latitude}
                offsetLeft={-3.5 * viewport.zoom}
                offsetTop={-7 * viewport.zoom}
                onClick={() =>
                  handleMarkerClick(
                    cluster.properties.travelId,
                    latitude,
                    longitude
                  )
                }
              >
                <img
                  src={cluster.properties.photoUrl}
                  alt={cluster.properties.uName}
                  className={classes.avatar}
                ></img>
              </Marker>
              {cluster.properties.travelId === currentPlaceId && (
                <Popup
                  key={cluster.properties.popupKey}
                  latitude={cluster.properties.lat}
                  longitude={cluster.properties.lng}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setCurrentPlaceId(null)}
                  anchor="left"
                >
                  <div className={classes.card}>
                    <img
                      src={cluster.properties.photoUrl}
                      className={classes.avatar}
                      alt={cluster.properties.title}
                      // style="width:100%"
                    />
                    <h2> {cluster.properties.title}</h2>
                    {/* <p className={classes.title}>CEO & Founder, Example</p> */}
                    {/* <p>{cluster.properties.desc}</p> */}
                    <div className={classes.other__info}>
                      <span className={classes.username}>
                        Created by <b>{cluster.properties.uName}</b>
                      </span>
                      <span className="date">
                        {format(cluster.properties.createdAt)}
                      </span>
                    </div>
                    <div className={classes.button}>
                      <Link to={`travels/${cluster.properties.travelId}`}>
                        See More
                      </Link>
                    </div>
                  </div>
                </Popup>
              )}
            </div>
          );
        })}
      </Map>
    </>
  );
}

export default ClusterMap;
