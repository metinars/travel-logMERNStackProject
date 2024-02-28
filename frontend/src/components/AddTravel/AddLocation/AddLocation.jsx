import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import classes from './AddLocation.module.css';
import { useEffect, useRef, useState } from 'react';
import Geocoder from './Geocoder';

// eslint-disable-next-line react/prop-types
const AddLocation = ({ style }) => {
  const [longitude, setLongitude] = useState(false);
  const [latitude, setLatitude] = useState(false);
  let className = classes[style];

  const mapRef = useRef();

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

  const handleAddClick = (e) => {
    setLatitude(e.lngLat.lat), setLongitude(e.lngLat.lng);
  };

  return (
    <div className={className}>
      <div className={classes.containerLocation}>
        <div className={classes.containerMap}>
          <ReactMapGL
            ref={mapRef}
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_APP_TOKEN}
            initialViewState={{
              longitude: longitude,
              latitude: latitude,
              zoom: 12,
            }}
            onClick={handleAddClick}
            style={{ width: '100rem', height: '60rem' }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
          >
            <Marker
              longitude={longitude}
              latitude={latitude}
              draggable
              onDragEnd={(e) => {
                setLongitude(e.lngLat.lng), setLatitude(e.lngLat.lat);
              }}
            ></Marker>
            <NavigationControl position="bottom-right" />
            <GeolocateControl
              position="top-left"
              trackUserLocation
              o
              onGeolocate={(e) => {
                setLongitude(e.coords.longitude),
                  setLatitude(e.coords.latitude);
              }}
            />
            <Geocoder />
          </ReactMapGL>
        </div>
        <div className={classes.locationInput}>
          <div>
            <label htmlFor="longitude">Longitude</label>
            <input
              id="longitude"
              type="number"
              name="longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="latitude">Latitude</label>
            <input
              id="latitude"
              type="number"
              name="latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLocation;
