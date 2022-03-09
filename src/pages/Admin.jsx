import React from 'react';
import StyledLink from '../components/nav/StyledLink';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BOOKINGS_URL } from '../utils/api';
import { deleteFromLocalstorage } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import BookingsForm from '../components/admin/BookingsForm';

const Admin = () => {
  // Error Object State
  const [error, setError] = useState();
  // Content State
  const [bookings, setBookings] = useState([]);
  // Autoredirect hook
  const navigate = useNavigate();

  const [auth] = useContext(AuthContext);

  // Run Once on Component Load
  useEffect(() => {
    // Define our async logic
    const fetchData = async () => {
      const data = await axios.get(BOOKINGS_URL, {
        // Payload passed to Strapi
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      });
      console.log(data.data.data);
      // Write data to state
      setBookings(data.data.data);
    };
    // Run fetch, catch errors and write to errors object
    fetchData().catch((error) => setError(error.response.data.error));
  }, []);

  // if error object is populated, show user what happened and urge them to login
  if (error) {
    return (
      <div>
        <h1>You must be Authenticated to view this page</h1>
        <h3>The server responded with: {error.status}</h3>
        <p>{error.message}</p>
        <p>Please Login</p>
        <StyledLink to='/login'>Login</StyledLink>
      </div>
    );
  }

  // Logout handler to delete token from storage and redirect
  const handleLogout = () => {
    deleteFromLocalstorage('jwt');
    navigate('/login');
  };

  // if bookings are empty, show loading
  if (bookings.length === 0) {
    return <div>Loading...</div>;
  }

  // render page
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      {bookings.map((item, idx) => {
        return <p key={idx}> {item.attributes.title} </p>;
      })}
      <hr />
      <BookingsForm />
    </div>
  );
};

export default Admin;
