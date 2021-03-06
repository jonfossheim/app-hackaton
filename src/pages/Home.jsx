import BookingsForm from '../components/admin/BookingsForm';
import axios from 'axios';
import { BOOKINGS_URL } from '../utils/api';

const Home = () => {
  const sendBooking = async (formData) => {
    const options = {
      data: {
        title: formData.title,
        message: formData.message,
        contact: formData.contact,
      },
    };
    const responseData = await axios.post(BOOKINGS_URL, options);
    console.log(responseData);
  };

  return (
    <div>
      <h1>This Page is Public</h1>
      <p>Anyone can access this page</p>
      <h3>Send booking:</h3>
      <BookingsForm sendBooking={sendBooking} />
    </div>
  );
};

export default Home;
