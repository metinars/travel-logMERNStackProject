import Map, { FullscreenControl, Marker } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

function ClusterMap() {
  return (
    <>
      <Map
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_APP_TOKEN}
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        style={{ width: '100vw', height: '100vh' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <FullscreenControl />
        <Marker longitude={-122.4} latitude={37.8} anchor="bottom"></Marker>
      </Map>
    </>
  );
}

export default ClusterMap;
