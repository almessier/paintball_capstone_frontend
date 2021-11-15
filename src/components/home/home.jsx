import React, { useEffect, useState } from 'react';
import './home.css';

const Home = (props) => {

    useEffect(() =>{
        if (props.user != null) {
            props.setLoggedInUser(props.user.user_id);
        }
    }, [props.user]);

    return (
        <div className='container-fluid purple'>
            <div className='row'>
                <div className='col-2 gutter' />
                <div className='col-8 white'>
                    <h1 className='welcome'>Welcome to Hoppr</h1>
                </div>
                <div className='col-2 gutter' />
            </div>
            <div className='purple' />
            <div className='row'>
                <div className='col-2 gutter' />
                <div className='col-4 white'>
                <br />
                <br />
                    <h2>Paintball News</h2>
                    <h5>November 15, 2021</h5>
                    <br />
                    <br />
                    <br />
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum faucibus vitae aliquet nec ullamcorper sit. Pharetra massa massa ultricies mi quis. Faucibus in ornare quam viverra orci. Sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus. Fringilla ut morbi tincidunt augue interdum velit euismod in. Duis convallis convallis tellus id. Diam sollicitudin tempor id eu nisl nunc. Egestas purus viverra accumsan in nisl nisi scelerisque. Augue ut lectus arcu bibendum at. Amet cursus sit amet dictum sit. Pellentesque adipiscing commodo elit at imperdiet dui. Vestibulum sed arcu non odio euismod lacinia. Odio facilisis mauris sit amet massa. Odio ut enim blandit volutpat maecenas volutpat blandit aliquam.
                    </div>
                    <br />
                    <div>
                        Vestibulum sed arcu non odio euismod lacinia. Nisi scelerisque eu ultrices vitae auctor eu augue ut. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Id donec ultrices tincidunt arcu non sodales neque. Enim diam vulputate ut pharetra. Proin fermentum leo vel orci porta non pulvinar neque. Sem integer vitae justo eget. In mollis nunc sed id semper risus. Sapien et ligula ullamcorper malesuada proin libero nunc consequat interdum. Scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis. Porta lorem mollis aliquam ut porttitor.
                    </div>
                </div>
                <div className='col-4 white'>
                    <img className='news-img' src='images/paintballer3.jpg' alt='paintballer' />
                </div>
                <div className='col-2 gutter' />
            </div>
        </div>
    )  
}

export default Home;