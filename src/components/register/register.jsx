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
        history.push('');
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
        <div className='body'>
            <form onSubmit={handleSubmit} >
                <h1>{error}</h1>
                <div className="mb-3">
                    <label htmlFor="firstnameInput" className="form-label">First Name</label>
                    <input type="text" name="firstname" value={formValues.firstname} onChange={handleChange} className="form-control" id="firstnameInput" />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastnameInput" className="form-label">Last Name</label>
                    <input type="text" name="lastname" value={formValues.lastname} onChange={handleChange} className="form-control" id="lastnameInput" />
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
                    <input type="phone" name="phonenumber" value={formValues.phonenumber} onChange={handleChange} className="form-control" id="phoneInput" />
                </div>
                <div className="mb-3">
                    <label htmlFor="addressInput" className="form-label">Address</label>
                    <input type="text" name="address" value={formValues.address} onChange={handleChange} className="form-control" id="addressInput" />
                </div>
                <button type="submit" className="login-button">Submit</button>
            </form>
        </div>
    )
}

export default Register;
