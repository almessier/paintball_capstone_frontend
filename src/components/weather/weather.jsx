
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import moment from 'moment';

function Weather(props) {

    useEffect(() => {
        getWeather();
    }, []);

    const dateOptions = {
        year: "numeric",
        month:"short",
        day:"2-digit"
    }

    const history = useHistory();
    const [weather, setWeather] = useState(null);

    const getWeather = async () => {
        try{
            let response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${props.listedUser.lat},${props.listedUser.lng}&days=3&aqi=no&alerts=no/`);
            setWeather(response.data);
        }
              
        catch(ex){
            console.log('Error in getWeather API call', ex)
        }
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-2 gutter' />
                <div className='col-8 list-header'>
                    <h2>Selected Listing</h2>
                    <h5>{props.listing.name}</h5>
                    <div>Username: {props.listedUser.username}</div>
                    <div>Address: {props.listedUser.address}</div>
                    <div>Start: {moment(props.listing.start_time.slice(0,5), ['HH:mm']).format('hh:mm A')}</div>
                    <div>End: {moment(props.listing.end_time.slice(0,5), ['HH:mm']).format('hh:mm A')}</div>
                    <div>Date: {new Date(props.listing.start_date).toLocaleDateString('en-US', dateOptions)}</div>
                </div>
                <div className='col-2 gutter' />
            </div>
            <div className='row'>
                <div className='col-2 gutter' />
                    <div className='col-8'>
                        <br />
                        <br />
                        <h2>Three Day Forecast</h2>
                        <br />
                        {weather &&
                        weather.forecast.forecastday.map(day => {
                            return(
                                <>
                                    <div className='container-fluid'>
                                        <div className='row'>
                                            <div className='col-4'>
                                                <br />
                                                <h5>{new Date(day.date).toLocaleDateString('en-US', dateOptions)}</h5>
                                            </div>
                                            <div className='col-2'>
                                                <div>High:</div>
                                                <div>Low:</div>
                                                <div>Average:</div>
                                            </div>
                                            <div className='col-4'>
                                                <div>{day.day.maxtemp_f} °F</div>
                                                <div>{day.day.mintemp_f} °F</div>
                                                <div>{day.day.avgtemp_f} °F</div>
                                            </div>
                                            <div className='col-2'>
                                                <div>{day.day.condition.text}</div>
                                                <img src={day.day.condition.icon} alt={day.day.condition.text} />
                                            </div>
                                            <hr />
                                        </div>
                                    </div>
                                </>
                            ) 
                        })}
                    </div>
                    <div className='col-2 gutter' />
                </div>

        </div>
    )
}

export default Weather;