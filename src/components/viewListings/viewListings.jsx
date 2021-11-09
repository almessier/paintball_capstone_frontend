
import React, { useState, useEffect } from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Geocode from 'react-geocode';
import axios from 'axios';
            
Geocode.setApiKey(process.env.REACT_APP_MAPS_API_KEY);

const mapContainerStyle = {
  width: '1200px',
  height: '700px'
};

const center = {
  lat: 43.132990,
  lng: -87.905930
};

const libraries = ['places']

const options = {
    disableDefaultUI: true,
    zoomControl: true
}

const getListed = async () => {
    try{
        let response = await axios.get(`http://localhost:8000/api/auth/getalllisted/`)
        let listed = response.data
        return listed
    }
          
    catch(ex){
        console.log('Error in getListed API call', ex)
    }
}

function ViewListing() {

    const listed = getListed();
    
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
        libraries
    })

    if (loadError) return 'Error loading'
    if (!isLoaded) return 'Loading'

    return (
        <div>
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={center} option={options}>
                {/* {listed.map(listing => {
                    return <Marker position={{lat: listing.lat, lng: listing.lng}}/>
                })} */}
            </GoogleMap>
        </div>
    )
}

export default ViewListing