import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import './register.css'

import useForm from '../../hooks/useForm';
import useLogin from '../../hooks/useLogin';
import NewUser from '../../hooks/newUser';

const Register = () => {
    const history = useHistory();
    const [error, setError] = useState('');
    const { register, userInfo } = NewUser();
    const send = useLogin();
    const sendRegistration = () => {
        console.log(formValues);
        register(formValues);
        history.push('/login');
    }
    const { formValues, handleChange, handleSubmit } = useForm(sendRegistration);

    useEffect(() => {
        if (userInfo.userName) {
            const loginInfo = {
                username: userInfo.userName,
                password: formValues.password
            };
            send(loginInfo, setError);
        }    
    }, [userInfo])

    return (
        <div className='container-fluid'>
            <div className='row row-size-reg gutter' />
            <div className='row'>
                <div className='col-4 gutter' />
                <div className='col-4 reg-pad'>
                    <form onSubmit={handleSubmit} >
                        <h1>{error}</h1>
                        <h1 className='reg-text'>Register</h1>
                        <div className="mb-3">
                            <label htmlFor="firstnameInput" className="form-label">First Name</label>
                            <input type="text" name="first_name" value={formValues.first_name} onChange={handleChange} className="form-control" id="firstnameInput" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastnameInput" className="form-label">Last Name</label>
                            <input type="text" name="last_name" value={formValues.last_name} onChange={handleChange} className="form-control" id="lastnameInput" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="usernameInput" className="form-label">Username</label>
                            <input type="text" name="username" value={formValues.username} onChange={handleChange} className="form-control" id="usernameInput" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="passwordInput" className="form-label">Password</label>
                            <input type="password" name="password" value={formValues.password} onChange={handleChange} className="form-control" id="passwordInput" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="emailInput" className="form-label">Email address</label>
                            <input type="email" name="email" value={formValues.email} onChange={handleChange} className="form-control" id="emailInput" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phoneInput" className="form-label">Phone</label>
                            <input type="phone" name="phone_number" value={formValues.phone_number} onChange={handleChange} className="form-control" id="phoneInput" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="addressInput" className="form-label">Address</label>
                            <input type="text" name="address" value={formValues.address} onChange={handleChange} className="form-control" id="addressInput" />
                        </div>
                        <button type="submit" className="btn btn-primary sub-button-reg">Submit</button>
                    </form>
                </div>
                <div className='col-4 gutter' />
            </div>
        </div>
    )
}

export default Register;
