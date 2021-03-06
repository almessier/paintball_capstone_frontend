
import React, { useState, useEffect } from 'react'
import { GoogleMap, useLoadScript, InfoWindow, Marker } from '@react-google-maps/api';
import axios from 'axios';
import QueryString from 'query-string';
import { useHistory, useLocation } from "react-router-dom";
import moment from 'moment';
import './viewListings.css'


const mapContainerStyle = {
  width: '100vw',
  height: '89vh'
};

const libraries = ['places']


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

    let center = {
        lat: parseFloat(props.loggedInUser.lat),
        lng: parseFloat(props.loggedInUser.lng)
    };

    const location = useLocation();
    const history = useHistory();
    const [selected, setSelected] = useState(null);
    const [listing, setListing] = useState(null);
    const options = {
        disableDefaultUI: true,
        zoomControl: true
    }

    const getListing = async (listedUser) => {
        try{
            const jwt = localStorage.getItem('token');
            let response = await axios.get(`http://localhost:8000/api/paintball/listings/get/${listedUser.id}/`, { headers: {Authorization: 'Bearer ' + jwt}});
            let currentListing = response.data;
            setListing(currentListing);
            props.setListedUserState(listedUser);
            setSelected(listedUser);
        }
              
        catch(ex){
            console.log('Error in getListing API call', ex)
        }
    }

    const getListed = async () => {
        try{
            const jwt = localStorage.getItem('token');
            let response = await axios.get(`http://localhost:8000/api/auth/getalllisted/`, { headers: {Authorization: 'Bearer ' + jwt}});
            let listedUsers = response.data;
            props.setListedUsers(listedUsers);
        }
              
        catch(ex){
            console.log('Error in getListed API call', ex)
        }
    }

    const deleteListing = async () => {
        try{
            const jwt = localStorage.getItem('token');
            await axios.delete(`http://localhost:8000/api/paintball/listings/delete/${props.user.user_id}/`, { headers: {Authorization: 'Bearer ' + jwt}});
            removeIsListed();
        } 
        catch(ex){
            console.log('Error in deleteListing API call', ex)
        }
    }

    const removeIsListed = async () => {
        try{
            let updatedListedStatus = { is_listed: false };
            const jwt = localStorage.getItem('token');
            await axios.put(`http://localhost:8000/api/auth/put/${props.user.user_id}/`, updatedListedStatus, { headers: {Authorization: 'Bearer ' + jwt}});
            getListed();
        }
            
        catch(ex){
            console.log('Error in removeIsListed API call', ex)
        }
    }

    const goToCreatePage = () => {
        history.push('/createListing');
    }

    const goToProfilePage = (listedUser) => {
        props.setListedUserState(listedUser);
        history.push(`/profile`);
    }
    
    const goToWeatherPage = (listedUser, listing) => {
        props.setListedUserState(listedUser);
        props.setListing(listing);
        history.push(`/weather`);
    }

    const dateOptions = {
        year: "numeric",
        month:"short",
        day:"2-digit"
    }

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
        libraries
    })

    if (loadError) return 'Error loading'
    if (!isLoaded) return 'Loading'

    return (
        <div>
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={11} center={center} options={options}>
                {props.listedUsers.map(listedUser => {
                    return(
                        <>
                            <Marker
                                key={`${listedUser.lat}${listedUser.lng}`}
                                position={{lat: parseFloat(listedUser.lat), lng: parseFloat(listedUser.lng)}}
                                onClick={event => {
                                    getListing(listedUser);
                                }}
                            />
                        </>
                    ) 
                })}

                {selected ? (
                    <InfoWindow position={{lat: parseFloat(props.listedUser.lat), lng: parseFloat(props.listedUser.lng)}} onCloseClick={event => setSelected(null)}>
                        <div>
                            <h4>{listing.name}</h4>
                            <h5>
                                Username: {props.listedUser.username}
                            </h5>
                            <button className="btn btn-secondary btn-sm" onClick={event => goToProfilePage(props.listedUser)}>See Profile and Reviews</button>
                            <br />
                            <br />
                            <div>Address: {props.listedUser.address}</div>
                            <div>Start: {moment(listing.start_time.slice(0,5), ['HH:mm']).format('hh:mm A')}</div>
                            <div>End: {moment(listing.end_time.slice(0,5), ['HH:mm']).format('hh:mm A')}</div>
                            <div>Date: {new Date(listing.start_date).toLocaleDateString('en-US', dateOptions)}</div>
                            <br />
                            <button className="btn btn-secondary btn-sm" onClick={event => goToWeatherPage(props.listedUser, listing)}>Check Weather</button>
                            <br />
                            <br />
                            <h5>Price: ${Math.round((listing.price/100), 2)}</h5>
                            <form
                                action={`http://localhost:8000/api/paintball/checkout/post/${listing.price_id}/`}
                                method='POST'
                            >
                                <button className="btn btn-primary btn-sm" type='submit'>
                                    Pay for Event
                                </button>
                            </form>
                        </div>
                    </InfoWindow>
                ) : null}

            </GoogleMap>
            <button className="btn btn-primary btn-sm create-listing" onClick={event => goToCreatePage()}>Create Listing</button>
            <button className="btn btn-secondary btn-sm" onClick={event => deleteListing()}>Delete Listing</button>
        </div>
    )
}

export default ViewListing