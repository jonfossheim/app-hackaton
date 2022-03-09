import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { bookingSchema } from '../../utils/yupSchemas';
import axios from 'axios';
import { BOOKINGS_URL } from '../../utils/api';
import { useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';

const BookingsForm = () => {
  const [auth] = useContext(AuthContext);

  useEffect(() => {
    console.log(auth);
  }, []);

  // YUP
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bookingSchema),
  });

  const sendBooking = async (formData) => {
    const responseData = await axios.post(
      BOOKINGS_URL,
      {
        data: {
          title: formData.title,
          message: formData.message,
          contact: formData.contact,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      }
    );

    console.log(responseData);
  };

  // handleSubmit
  const onSubmit = (formData) => {
    console.log('Form Data: ', formData);

    sendBooking(formData).catch(console.error);
  };

  // Render page
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('title')} placeholder='Title..' />
        {errors.title && <span>{errors.title.message}</span>}

        <input {...register('message')} placeholder='Message..' />
        {errors.message && <span>{errors.message.message}</span>}

        <input {...register('contact')} placeholder='Email..' />
        {errors.contact && <span>{errors.contact.message}</span>}

        <button>Send</button>
      </form>
    </>
  );
};

export default BookingsForm;
