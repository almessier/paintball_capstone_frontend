
import React, { useState, useEffect } from 'react'
import { GoogleMap, useLoadScript, InfoWindow, Marker } from '@react-google-maps/api';
import axios from 'axios';
import QueryString from 'query-string';
import { useHistory, useLocation } from "react-router-dom";


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

    useEffect(() => {
        getListed();
        const values = QueryString.parse(location.search);
        if (values.success) {
            console.log(
                'order placed'
            );
        }
        if (values.canceled) {
            console.log(
                "order canceled"
            );
        }
    }, []);

    const location = useLocation();
    const history = useHistory();
    const [selected, setSelected] = useState(null);

    const getListing = async (listedUser) => {
        try{
            let response = await axios.get(`http://localhost:8000/api/paintball/listings/get/${listedUser.id}/`)
            let currentListing = response.data;
            props.setListing(currentListing);
            setSelected(listedUser);
        }
              
        catch(ex){
            console.log('Error in getListing API call', ex)
        }
    }

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
        history.push('/createListing');
    }

    const goToProfilePage = (listedUser) => {
        props.setListedUserState(listedUser);
        history.push(`/profile/`);
    }

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
        libraries
    })

    if (loadError) return 'Error loading'
    if (!isLoaded) return 'Loading'

    return (
        <div>
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={center} option={options}>
                {props.listedUsers.map(listedUser => {
                    return(
                        <>
                            <Marker
                                position={{lat: parseFloat(listedUser.lat), lng: parseFloat(listedUser.lng)}}
                                onClick={() => {
                                    getListing(listedUser);
                                }}
                            />

                            {selected ? (
                                <InfoWindow position={{lat: parseFloat(listedUser.lat), lng: parseFloat(listedUser.lng)}}>
                                    <div>
                                        {props.listing.name}
                                        {listedUser.username}
                                        {listedUser.address}
                                        {props.listing.start_time}
                                        {props.listing.end_time}
                                        {props.listing.start_date}
                                        <button onClick={event => goToProfilePage(listedUser)}>See Profile</button>
                                        <h5>{props.listing.price}</h5>
                                        <form
                                            action={`http://localhost:8000/api/paintball/checkout/post/${props.listing.price_id}/`}
                                            method='POST'
                                        >
                                            <button className='button' type='submit'>
                                                Pay for Event
                                            </button>
                                        </form>
                                    </div>
                                </InfoWindow>
                            ) : null}
                        </>
                    ) 
                })}
            </GoogleMap>
            <button onClick={event => goToCreatePage()}>Create Listing</button>
        </div>
    )
}

export default ViewListing