import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from './../../App';

const Bookings = () => {
    const [bookings,setBookings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
      
    useEffect( ()=> {
        // fetch wr api pore je email likhechi(nicer laine)  use kora oi ta holo jokhon je  user booking  ba  use korbe tar email ba  tar information dekhabe 
        fetch('http://localhost:5000/booking?email=+ loggedInUser.email',{
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => setBookings(data))
    },[])

    return (
        <div>
           <h3>you have : {bookings.length} bookings </h3> 
           {
            //    bookings.map(book => <li>{book.name} from : {book.checkIn}  to : {book.checkOut}</li>)
            // 2 vave i kora jay
            bookings.map(book => <li>{book.name} from : {(new Date(book.checkIn).toDateString('dd/mm/yyy'))}  to : {(new Date(book.checkOut).toDateString('dd/mm/yyy'))}</li>)
           }
        </div>
    );
};

export default Bookings;