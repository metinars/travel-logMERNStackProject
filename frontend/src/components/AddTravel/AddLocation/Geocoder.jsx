import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useControl } from 'react-map-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const Geocoder = () => {
  const ctrl = new MapBoxGeocoder({
    accessToken: import.meta.env.VITE_MAPBOX_APP_TOKEN,
    marker: false,
    collapsed: true,
  });
  useControl(() => ctrl);
  return null;
};

export default Geocoder;
