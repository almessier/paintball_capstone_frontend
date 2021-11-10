
import React, { useState, useEffect } from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';
import { useHistory } from "react-router-dom";


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

function ViewListing(props) {

    useEffect(()=> {
        getListed();
    }, [])

    const history = useHistory();

    const getListed = async () => {
        try{
            let response = await axios.get(`http://localhost:8000/api/auth/getalllisted/`)
            let listedUsers = response.data;
            props.setListedUsers(listedUsers);
        }
              
        catch(ex){
            console.log('Error in getListed API call', ex)
        }
    }

    const goToCreatePage = () => {
        history.push('/createListing')
    }

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
        libraries
    })

    const [selected, setSelected] = useState(null);

    if (loadError) return 'Error loading'
    if (!isLoaded) return 'Loading'

    return (
        <div>
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={center} option={options}>
                {props.listedUsers.map(listedUser => {
                    return(
                        <Marker 
                            position={{lat: parseFloat(listedUser.lat), lng: parseFloat(listedUser.lng)}}
                            onClick={() => {
                                setSelected(listedUser);
                            }}
                        />
                    ) 
                })}
            </GoogleMap>
            <button onClick={event => goToCreatePage()}>Create Listing</button>
        </div>
    )
}

export default ViewListing