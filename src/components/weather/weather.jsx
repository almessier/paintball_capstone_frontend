
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";

function Weather(props) {

    useEffect(() => {
        getWeather();
    }, []);

    const history = useHistory();
    const [weather, setWeather] = useState(null);

    const getWeather = async () => {
        try{
            let response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${props.listedUser.lat},${props.listedUser.lng}&days=7&aqi=no&alerts=no/`);
            setWeather(response.data);
        }
              
        catch(ex){
            console.log('Error in getWeather API call', ex)
        }
    }


    // const getListed = async () => {
    //     try{
    //         let response = await axios.get(`http://localhost:8000/api/auth/getalllisted/`)
    //         let listedUsers = response.data;
    //         props.setListedUsers(listedUsers);
    //     }
              
    //     catch(ex){
    //         console.log('Error in getListed API call', ex)
    //     }
    // }

    return (
        <div>
            <div>
                {props.listing.name}
                {props.listedUser.username}
                {props.listedUser.address}
                {props.listing.start_time}
                {props.listing.end_time}
                {props.listing.start_date}
            </div>
            {weather &&
            weather.forecast.forecastday.map(day => {
                return(
                    <>
                        <div>
                            {day.date}
                            {day.day.maxtemp_f}
                            {day.day.mintemp_f}
                            {day.day.avgtemp_f}
                            {day.day.condition.text}
                        </div>
                    </>
                ) 
            })}
        </div>
    )
}

export default Weather;