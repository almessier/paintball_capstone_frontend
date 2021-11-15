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
            <div className= 'container-fluid'>
                <div className = 'row'>
                    <div className ='col-3 gutter' />
                    <div className ='col-6 form-card'>
                        <h1 className ="title">Update Profile</h1>
                        <hr />
                        <form onSubmit={handleSubmit}>
                            <div className ="user-details">
                                <div className="mb-3">
                                    <label htmlFor='username' className="form-label">Username</label>
                                    <input type='text' className='form-control' name='username' id='username' value={formValues.username} defaultValue={props.loggedInUser.username} onChange={handleChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor='firstName' className="form-label">First Name</label>
                                    <input type='text' className='form-control' name='firstName' id='firstName' value={formValues.firstName} defaultValue={props.loggedInUser.first_name} onChange={handleChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor='lastName' className="form-label">Last Name</label>
                                    <input type='text' className='form-control' name='lastName' id='lastName' value={formValues.lastName} defaultValue={props.loggedInUser.last_name} onChange={handleChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor='email' className="form-label">Email Address</label>
                                    <input type='email' className='form-control' name='email' id='email' value={formValues.email} defaultValue={props.loggedInUser.email} onChange={handleChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor='address' className="form-label">Address</label>
                                    <input type='text' className='form-control' name='address' id='address' value={formValues.address} defaultValue={props.loggedInUser.address} onChange={handleChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor='phoneNumber' className="form-label">Phone Number</label>
                                    <input type='text' className='form-control' name='phoneNumber' id='phoneNumber' value={formValues.phoneNumber} defaultValue={props.loggedInUser.phone_number} onChange={handleChange}/>
                                </div>
                                <button className="btn btn-primary" type="submit">Submit</button>
                                <button className="btn btn-secondary change-avatar" onClick={event => goToAvatarUpload()}>Change Avatar</button>
                            </div>
                        </form>
                    </div>
                    <div className='col-3 gutter' />
                </div>
            </div>
    );

}

export default EditProfile;