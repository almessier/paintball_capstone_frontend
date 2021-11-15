import React from "react";
import "./createListing.css"
import axios from 'axios';
import useForm from '../../hooks/useForm';
import { useHistory } from "react-router-dom";


const CreateListing = (props) => {

    const { formValues, handleChange, handleSubmit } = useForm(submitListing)
    const history = useHistory();

    function submitListing(){
        createProduct();
    }

    const createListing = async (price, product) => {
        let listing = {
            user: props.user.user_id,
            start_time: (formValues.startTime + ':00.000000'),
            end_time: (formValues.endTime + ':00.000000'),
            start_date: formValues.startDate,
            price: (parseInt(formValues.listingPrice * 100)),
            name: formValues.listingName,
            price_id: price.data.id,
            product_id: product.data.id
        }
        try {
            const jwt = localStorage.getItem('token');
            await axios.post(`http://localhost:8000/api/paintball/listings/post/`, listing, { headers: {Authorization: 'Bearer ' + jwt}});
            updateIsListedStatus();
        }
        catch (ex) {
            console.log('Error in createListing API call', ex)
        }
    }

    const createProduct = async () => {
        try{
            let product = await axios.post(`http://localhost:8000/api/paintball/stripe/post/product/${formValues.listingName}/`);
            createPrice(product);
        }
            
        catch(ex){
            console.log('Error in createProduct API call', ex)
        }
    }


    const createPrice = async (product) => {
        try{
            let price = await axios.post(`http://localhost:8000/api/paintball/stripe/post/price/${formValues.listingPrice*100}/product/${product.data.id}/`);
            createListing(price, product);
        }
            
        catch(ex){
            console.log('Error in createPrice API call', ex)
        }
    }

    const updateIsListedStatus = async () => {
        try{
            let updatedListedStatus = { is_listed: true };
            const jwt = localStorage.getItem('token');
            await axios.put(`http://localhost:8000/api/auth/put/${props.user.user_id}/`, updatedListedStatus, { headers: {Authorization: 'Bearer ' + jwt}});
            history.push('/viewListings');
        }
            
        catch(ex){
            console.log('Error in updateIsListedStatus API call', ex)
        }
    }
    
    return (
        <div className="container-fluid">
            <div className= 'row top-row purple' />
            <div className= 'row'>
                <div className ='col-3 gutter' />
                <div className ='col-6 form-card'>
                    <h1 className ="title">Create Listing</h1>
                    <form onSubmit={handleSubmit}>
                        <div className ="user-details">
                            <div className="mb-3">
                                <label htmlFor='startTime' className="form-label">Start Time</label>
                                <input type='time' className='form-control' name='startTime' id='startTime' value={formValues.startTime} onChange={handleChange}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor='endTime' className="form-label">End Time</label>
                                <input type='time' className='form-control' name='endTime' id='endTime' value={formValues.endTime} onChange={handleChange}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor='startDate' className="form-label">Start Date</label>
                                <input type='date' className='form-control' name='startDate' id='startDate' value={formValues.startDate} onChange={handleChange}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor='listingName' className="form-label">Listing Name</label>
                                <input type='name' className='form-control' name='listingName' id='listingName' value={formValues.listingName} onChange={handleChange}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor='listingPrice' className="form-label">Listing Price</label>
                                <input type='price' className='form-control' name='listingPrice' id='listingPrice' value={formValues.listingPrice} onChange={handleChange}/>
                            </div>
                            <button className="btn btn-primary" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
                <div className ='col-3 gutter' />
            </div>
        </div>
    );

}

export default CreateListing;