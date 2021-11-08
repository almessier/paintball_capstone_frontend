import React from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import useLogin from '../../hooks/useLogin'
import './login.css';

const Login = (props) => {

    const history = useHistory();
    const send = useLogin();
    
    const { formValues, handleChange, handleSubmit } = useForm(() => login(formValues, send, history));

    const login = (values, send, history) => {
        send(values);
        history.push("/");
    }

    return (
        <div className='body'>
            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label htmlFor="usernameInput" className="form-label">Username</label>
                    <input type="username" name="username" value={formValues.username} onChange={handleChange} className="form-control" id="usernameInput" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">Password</label>
                    <input type="password" name="password" value={formValues.password} onChange={handleChange} className="form-control" id="passwordInput" />
                </div>
                <button className="login-button" type="submit" >Submit</button>
                <p>Not registered? Sign up <Link to="/register">here.</Link></p>
            </form>
        </div>
        )
}

export default Login;