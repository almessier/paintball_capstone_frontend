import React from "react";
import "./editProfile.css"
import axios from 'axios';
import useForm from '../../hooks/useForm';
import { useHistory } from "react-router-dom";


const EditProfile = (props) => {

    const { formValues, handleChange, handleSubmit } = useForm(submitUpdate)
    const history = useHistory();

    function submitUpdate(){
        let updatedProfile = {
            username: formValues.username,
            email: formValues.email,
            first_name: formValues.firstName,
            last_name: formValues.lastName,
            address: formValues.address,
            phone_number: formValues.phoneNumber
        }
        updateProfile(updatedProfile);
    }

    const updateProfile = async (profile) => {
        try{
            let updatedProfile = profile;
            // const jwt = localStorage.getItem('token');
            await axios.put(`http://localhost:8000/api/auth/put/${props.user.user_id}/`, updatedProfile)//, newProduct, { headers: {Authorization: 'Bearer ' + jwt}});
            history.push('/')
        }
            
        catch(ex){
            console.log('Error in updateProfile API call', ex)
        }
    }
    
    return (
        <div className="body">
            <div className= 'container'>
                <div className ="title">Update Profile</div>
                <form className = "-container" onSubmit={handleSubmit}>
                    <div className ="user-details">
                        <div className="input-box">
                            <span className="details">Username</span>
                            <input type='text' name='username' value={formValues.username} defaultValue="test" onChange={handleChange}/>
                        </div>
                        <div className="input-box">
                            <span className="details">First Name</span>
                            <input type='text' name='firstName' value={formValues.firstName} defaultValue={props.user.firstName} onChange={handleChange}/>
                        </div>
                        <div className="input-box">
                            <span className="details">Last Name</span>
                            <input type='text' name='lastName' value={formValues.lastName} defaultValue={props.user.lastName} onChange={handleChange}/>
                        </div>
                        <div className="input-box">
                            <span className="details">Email</span>
                            <input type='text' name='email' value={formValues.email} defaultValue={props.user.email} onChange={handleChange}/>
                        </div>
                        <div className="input-box">
                            <span className="details">Address</span>
                            <input type='text' name='address' value={formValues.address} defaultValue={props.user.address} onChange={handleChange}/>
                        </div>
                        <div className="input-box">
                            <span className="details">Phone Number</span>
                            <input type='text' name='phoneNumber' value={formValues.phoneNumber} defaultValue={props.user.phone_number} onChange={handleChange}/>
                        </div>
                        <button className="button" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default EditProfile;