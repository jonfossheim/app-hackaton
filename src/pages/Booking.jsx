import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EditBooking from '../components/admin/EditBooking';
import useAxios from '../hooks/useAxios';
import { BOOKINGS_PATH } from '../utils/api';

const Booking = () => {
  const { id } = useParams();
  const http = useAxios();
  const [booking, setBooking] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await http.get(`${BOOKINGS_PATH}/${id}`);
      setBooking(responseData.data.data.attributes);
    };
    fetchData().catch(console.error);
  }, []);

  const updateBooking = async (formData) => {
    const options = {
      data: {
        title: formData.title,
        message: formData.message,
        contact: formData.contact,
      },
    };
    const responseData = await http.put(`${BOOKINGS_PATH}/${id}`, options);
    console.log(responseData);
  };

  return (
    <div>
      <h1>{booking.title}</h1>
      <h2>{booking.contact}</h2>
      <p>{booking.message}</p>

      <EditBooking updateBooking={updateBooking} booking={booking} />
    </div>
  );
};

export default Booking;
