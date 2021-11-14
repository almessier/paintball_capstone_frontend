import React, { useEffect, useState } from "react";
import "./profile.css"
import axios from 'axios';
import useForm from '../../hooks/useForm';
import { useHistory } from "react-router-dom";
import { getImages } from 'stream-chat-react';


const Profile = (props) => {

    const { formValues, handleChange, handleSubmit } = useForm(submitReview)
    const history = useHistory();
    const [image, setImage] = useState(null);

    useEffect(()=>{
        getReviews();
        changeImageUrl();
    }, [])

    function submitReview(){
        let review = {
            user: props.listedUser.id,
            content: formValues.content,
            rating: parseInt(formValues.rating)
        }
        createReview(review);
    }

    const changeImageUrl = () => {
        let newUrl = 'http://localhost:8000' + props.listedUser.avatar
        setImage(newUrl);
    }

    const getReviews = async () => {
        try{
            let response = await axios.get(`http://localhost:8000/api/paintball/reviews/getall/${props.listedUser.id}/`);
            props.setReviews(response.data)
        }
        catch (ex){
            console.log('Error in getReviews API call', ex);
        }
    }

    const createReview = async (review) => {
        try{
            // const jwt = localStorage.getItem('token');
            let newReview = review
            await axios.post(`http://localhost:8000/api/paintball/reviews/post/`, newReview)//, newReview, { headers: {Authorization: 'Bearer ' + jwt}});
        }
            
        catch(ex){
            console.log('Error in createReview API call', ex)
        }
    }
    
    return (
        <div className="body">
            {props.listedUser.avatar &&
                <img src={image} alt='avatar'></img>
            }  
            <div>
                {props.listedUser.username}
            </div>
            <div>
                {props.listedUser.first_name}
            </div>
            <div>
                {props.listedUser.last_name}
            </div>
            <div>
                {props.listedUser.address}
            </div>
            <div>
                {props.listedUser.email}
            </div>
            <div>
                {props.listedUser.phone_number}
            </div>
            <div className= 'container'>
                <div className ="title">Leave Review</div>
                <form className = "-container" onSubmit={handleSubmit}>
                    <div className ="user-details">
                        <div className="input-box">
                            <span className="details">Content</span>
                            <input type='text' name='content' value={formValues.content} onChange={handleChange}/>
                        </div>
                        <div className="input-box">
                            <span className="details">Rating</span>
                            <input type='number' name='rating' value={formValues.rating} onChange={handleChange}/>
                        </div>
                        <button className="button" type="submit">Submit</button>
                    </div>
                </form>
            </div>
            <div>
                {props.reviews.map(review =>{
                    return (
                        <>
                            {review.content}
                            {review.rating}
                        </>
                    )
                })}
            </div>
        </div>
    );

}

export default Profile;