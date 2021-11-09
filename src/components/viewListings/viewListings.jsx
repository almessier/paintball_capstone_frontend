
import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '1200px',
  height: '700px'
};

const center = {
  lat: 43.132990,
  lng: -87.905930
};

function ViewListing() {
  const apiMapsKey = `${process.env.REACT_APP_MAPS_API_KEY}`
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiMapsKey
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        defaultCenter={center}
        center={center}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(ViewListing)