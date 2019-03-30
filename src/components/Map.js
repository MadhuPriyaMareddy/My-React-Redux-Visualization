import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const Map = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap defaultZoom={7} defaultCenter={{ lat: props.lat, lng: props.lng }}>
      <Marker position={{ lat: props.lat, lng: props.lng }} />
    </GoogleMap>
  ))
);

export default Map;
