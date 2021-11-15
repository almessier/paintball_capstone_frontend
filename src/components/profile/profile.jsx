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
            getReviews();
        }
            
        catch(ex){
            console.log('Error in createReview API call', ex)
        }
    }
    
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-2 gutter' />
                <div className='col-4 col-pad'>
                    {props.listedUser.avatar &&
                        <img className='avatar-profile' src={image} alt='avatar'></img>
                    }  
                    <h2>
                        {props.listedUser.username}
                    </h2>
                    <div>
                        First Name: {props.listedUser.first_name}
                    </div>
                    <div>
                        Last Name: {props.listedUser.last_name}
                    </div>
                    <div>
                        Address: {props.listedUser.address}
                    </div>
                    <div>
                        Email Address: {props.listedUser.email}
                    </div>
                    <div>
                        Phone Number: {props.listedUser.phone_number}
                    </div>
                </div>
                <div className='col-4 col-pad'>
                    <h3 className='review-title'>Leave Review</h3>
                    <form onSubmit={handleSubmit}>
                        <div className ="user-details">
                            <div className="mb-3">
                                <label htmlFor='username' className="form-label">Content</label>
                                <input type='text' className='form-control' name='content' value={formValues.content} onChange={handleChange}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor='rating' className="form-label">Rating</label>
                                <br />
                                <input type='number' name='rating' min='1' max='5' value={formValues.rating} onChange={handleChange}/>
                            </div>
                            <button className="btn btn-primary" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
                <div className='col-2 gutter' />
            </div>
            <div className='row'>
                <div className='col-2 gutter' />
                <div className='col-8'>
                    {props.reviews &&
                        <h3>Reviews</h3>
                    }
                    {props.reviews.map(review =>{
                        return (
                            <>
                                <hr />
                                <div className='review'>
                                    <h5>Review:</h5>
                                    {review.content}
                                    <br />
                                    <br />
                                    <h5>Rating:</h5>
                                    {review.rating}/5
                                </div>
                            </>
                        )
                    })}
                </div>
                <div className='col-2 gutter' />
            </div>
        </div>
    )
}

export default Profile;