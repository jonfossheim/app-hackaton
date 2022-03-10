import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { bookingSchema } from '../../utils/yupSchemas';
import { useEffect, useState } from 'react';
const EditBooking = ({ booking, updateBooking }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bookingSchema),
    defaultValues: {
      title: booking.title,
      message: booking.message,
      contact: booking.contact,
    },
  });

  useEffect(() => {
    console.log('Reset');
    reset(booking);
  }, [booking]);

  const onSubmit = (formData) => {
    console.log('Form Data: ', formData);

    updateBooking(formData).catch(console.error);
    alert('Booking has been updated.');
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('title')}
          placeholder='Title..'
          defaultValue={booking.title}
        />
        {errors.title && <span>{errors.title.message}</span>}

        <input
          {...register('message')}
          placeholder='Message..'
          defaultValue={booking.message}
        />
        {errors.message && <span>{errors.message.message}</span>}

        <input
          {...register('contact')}
          placeholder='Email..'
          defaultValue={booking.contact}
        />
        {errors.contact && <span>{errors.contact.message}</span>}

        <button>Update</button>
      </form>
    </>
  );
};

export default EditBooking;
