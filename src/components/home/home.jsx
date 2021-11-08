import React, { useEffect, useState } from 'react';
import './home.css';

const Home = (props) => {

    useEffect(() =>{
        if (props.user != null) {
            props.setLoggedInUser(props.user.user_id)
        }
    }, [props.user]);

    return (
        <div>Home</div>
    )  
}

export default Home;