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
            phone_number: formValues.phoneNumber,
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

    const goToAvatarUpload = () => {
        history.push('/avatar/');
    }
    
    return (
        <div className="body">
            <div className= 'container'>
                <div className ="title">Update Profile</div>
                <form className = "-container" onSubmit={handleSubmit}>
                    <div className ="user-details">
                        <div className="input-box">
                            <span className="details">Username</span>
                            <input type='text' name='username' value={formValues.username} defaultValue={props.loggedInUser.username} onChange={handleChange}/>
                        </div>
                        <div className="input-box">
                            <span className="details">First Name</span>
                            <input type='text' name='firstName' value={formValues.firstName} defaultValue={props.loggedInUser.first_name} onChange={handleChange}/>
                        </div>
                        <div className="input-box">
                            <span className="details">Last Name</span>
                            <input type='text' name='lastName' value={formValues.lastName} defaultValue={props.loggedInUser.last_name} onChange={handleChange}/>
                        </div>
                        <div className="input-box">
                            <span className="details">Email</span>
                            <input type='text' name='email' value={formValues.email} defaultValue={props.loggedInUser.email} onChange={handleChange}/>
                        </div>
                        <div className="input-box">
                            <span className="details">Address</span>
                            <input type='text' name='address' value={formValues.address} defaultValue={props.loggedInUser.address} onChange={handleChange}/>
                        </div>
                        <div className="input-box">
                            <span className="details">Phone Number</span>
                            <input type='text' name='phoneNumber' value={formValues.phoneNumber} defaultValue={props.loggedInUser.phone_number} onChange={handleChange}/>
                        </div>
                        <button className="button" type="submit">Submit</button>
                        <button className='button' onClick={event => goToAvatarUpload()}>Avatar</button>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default EditProfile;