import React from 'react';
import StyledLink from '../components/nav/StyledLink';
import { useEffect, useState } from 'react';
import { BOOKINGS_PATH } from '../utils/api';
import { deleteFromLocalstorage } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import useToggle from '../hooks/useToggle';
import useAxios from '../hooks/useAxios';
import AuthContext from '../context/AuthContext';
import BookingsForm from '../components/admin/BookingsForm';

const Admin = () => {
  const [isTriggered, setIsTriggered] = useToggle();
  const [error, setError] = useState();
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const [auth, setAuth] = useContext(AuthContext);
  const http = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      const data = await http.get(BOOKINGS_PATH);
      setBookings(data.data.data);
    };

    fetchData().catch((error) => setError(error.response.data.error));
  }, [isTriggered, auth]);

  const sendBooking = async (formData) => {
    const options = {
      data: {
        title: formData.title,
        message: formData.message,
        contact: formData.contact,
      },
    };
    const responseData = await http.post(BOOKINGS_PATH, options);
    console.log(responseData);
    setIsTriggered();
  };

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

  const handleLogout = () => {
    setAuth(null);
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
      <hr />
      <BookingsForm sendBooking={sendBooking} />
    </div>
  );
};

export default Admin;
