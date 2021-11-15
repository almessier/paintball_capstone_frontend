import React from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import useLogin from '../../hooks/useLogin'
import './login.css';

const Login = () => {

    const history = useHistory();
    const send = useLogin();
    
    const { formValues, handleChange, handleSubmit } = useForm(() => login(formValues, send, history));

    const login = (values, send, history) => {
        send(values);
        history.push("/");
    }

    return (
        <div className='container-fluid'>
            <div className='row row-size gutter' />
            <div className='row'>
                <div className='col-4 gutter' />
                <div className='col-4 login'>
                    <h1 className='login-text'>Log In</h1>
                    <form onSubmit={handleSubmit} >
                        <div className="mb-3 username-pad">
                            <label htmlFor="usernameInput" className="form-label">Username</label>
                            <input type="username" name="username" value={formValues.username} onChange={handleChange} className="form-control" id="usernameInput" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="passwordInput" className="form-label">Password</label>
                            <input type="password" name="password" value={formValues.password} onChange={handleChange} className="form-control" id="passwordInput" />
                        </div>
                        <button className="btn btn-primary" type="submit" >Submit</button>
                        <br />
                        <br />
                        <p>Not registered? Sign up <Link to="/register">here.</Link></p>
                    </form>
                </div>
                <div className='col-4 gutter' />
            </div>
        </div>
        )
}

export default Login;