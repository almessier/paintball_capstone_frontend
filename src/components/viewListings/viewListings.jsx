
import React, { useState, useEffect } from 'react'
import { GoogleMap, useLoadScript, InfoWindow } from '@react-google-maps/api';
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

    const location = useLocation();

    useEffect(() => {
        getListed();
        const values = QueryString.parse(location.search);
        if (values.success) {
            console.log(
                'order placed.'
            );
        }
        if (values.canceled) {
            console.log(
                "order canceled"
            );
        }
    }, []);

    // useEffect(()=> {
    //     getListed();
    // }, [])

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
        history.push('/createListing');
    }

    const goToProfilePage = (listedUser) => {
        props.setListedUserState(listedUser);
        history.push(`/profile/`);
    }

    // const goToPayPage = (listedUser) => {
    //     props.setListedUserState(listedUser);
    //     history.push(`/pay/`);
    // }

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
                            <InfoWindow position={{lat: parseFloat(listedUser.lat), lng: parseFloat(listedUser.lng)}}>
                                <div>
                                    {listedUser.address}
                                    <button onClick={event => goToProfilePage(listedUser)}>See Profile</button>
                                    <h5>$10.00</h5>
                                    <form
				                        action={'http://localhost:8000/api/paintball/create-checkout-session/'}
				                        method='POST'
			                        >
                                        <button className='button' type='submit'>
                                            Checkout
                                        </button>
                                    </form>
                                </div>
                            </InfoWindow>
                        </>
                    ) 
                })}
            </GoogleMap>
            <button onClick={event => goToCreatePage()}>Create Listing</button>
        </div>
    )
}

export default ViewListing