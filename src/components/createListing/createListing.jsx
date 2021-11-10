import React from "react";
import "./createListing.css"
import axios from 'axios';
import useForm from '../../hooks/useForm';
import { useHistory } from "react-router-dom";


const CreateListing = (props) => {

    const { formValues, handleChange, handleSubmit } = useForm(submitListing)
    const history = useHistory();

    function submitListing(){
        let listing = {
            user: props.user.user_id,
            start_time: (formValues.startTime + ':00.000000'),
            end_time: (formValues.endTime + ':00.000000'),
            start_date: formValues.startDate,
        }
        createListing(listing);
    }

    const createListing = async (listing) => {
        try{
            // const jwt = localStorage.getItem('token');
            let newListing = listing
            await axios.post(`http://localhost:8000/api/paintball/listings/post/`, newListing)//, newListing, { headers: {Authorization: 'Bearer ' + jwt}});
            updateIsListedStatus();
        }
            
        catch(ex){
            console.log('Error in createListing API call', ex)
        }
    }

    const updateIsListedStatus = async () => {
        try{
            let updatedListedStatus = { is_listed: true };
            // const jwt = localStorage.getItem('token');
            await axios.put(`http://localhost:8000/api/auth/put/${props.user.user_id}/`, updatedListedStatus)//, updatedListedStatus, { headers: {Authorization: 'Bearer ' + jwt}});
            history.push('/viewListings');
        }
            
        catch(ex){
            console.log('Error in updateIsListedStatus API call', ex)
        }
    }
    
    return (
        <div className="body">
            <div className= 'container'>
                <div className ="title">Create Listing</div>
                <form className = "-container" onSubmit={handleSubmit}>
                    <div className ="user-details">
                        <div className="input-box">
                            <span className="details">Start Time</span>
                            <input type='time' name='startTime' value={formValues.startTime} onChange={handleChange}/>
                        </div>
                        <div className="input-box">
                            <span className="details">End Time</span>
                            <input type='time' name='endTime' value={formValues.endTime} onChange={handleChange}/>
                        </div>
                        <div className="input-box">
                            <span className="details">Start Date</span>
                            <input type='date' name='startDate' value={formValues.startDate} onChange={handleChange}/>
                        </div>
                        <button className="button" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default CreateListing;