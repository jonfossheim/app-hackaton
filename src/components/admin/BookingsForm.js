import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { bookingSchema } from '../../utils/yupSchemas';

const BookingsForm = ({ sendBooking }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bookingSchema),
  });

  const onSubmit = (formData) => {
    console.log('Form Data: ', formData);

    sendBooking(formData).catch(console.error);
  };

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
