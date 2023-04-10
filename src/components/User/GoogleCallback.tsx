import React, {useState, useEffect} from 'react';
import {useLocation} from "react-router-dom";

function GoogleCallback() {

    const location = useLocation();

    // On page load, we take "search" parameters
    // and proxy them to /api/auth/callback on our Laravel API
    useEffect(() => {

        fetch(`http://127.0.0.1:8000/api/auth/googleCallback${location.search}`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
            });
    }, []);
}



export default GoogleCallback;