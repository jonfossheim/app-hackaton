import React from 'react';
import StyledLink from '../components/nav/StyledLink';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AUTH_URL, BOOKINGS_URL } from '../utils/api';
import { deleteFromLocalstorage, getFromLocalstorage } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [error, setError] = useState();
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getFromLocalstorage('jwt');
    const fetchData = async () => {
      const data = await axios.get(BOOKINGS_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data.data.data);
      setBookings(data.data.data);
    };
    fetchData().catch((error) => setError(error.response.data.error));
  }, []);

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

  const handleLogout = () => {
    deleteFromLocalstorage('jwt');
    navigate('/login');
  };

  if (bookings.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      {bookings.map((item, idx) => {
        return <p key={idx}> {item.attributes.title} </p>;
      })}
    </div>
  );
};

export default Admin;
