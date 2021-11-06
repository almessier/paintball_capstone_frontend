import { useState, useEffect } from 'react';
import axios from 'axios';

export default function NewUser () {
    const [data, setData] = useState({});
    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
        if (data.data) {
            setUserInfo(data.data);
        }
    }, [data])

    async function register(values) {
        console.log(values);
        const response = await axios.post("http://localhost:8000/api/auth/register/", values);
        if (response.data) {
            setData(response);
        }
    }
    
    return { register, userInfo };
}