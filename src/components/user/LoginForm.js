import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userLoginSchema } from '../../utils/yupSchemas';
import axios from 'axios';
import { AUTH_URL } from '../../utils/api';
import { saveToLocalstorage } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userLoginSchema),
  });

  const loginUser = async (formData) => {
    const responseData = await axios.post(AUTH_URL, {
      identifier: formData.email,
      password: formData.password,
    });

    console.log('Response Data: ', responseData);

    saveToLocalstorage('jwt', responseData.data.jwt);
    navigate('/admin');
  };

  const onSubmit = (formData) => {
    console.log('Form Data: ', formData);

    loginUser(formData).catch(console.error);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder='Your email...' />
      {errors.email && <span>{errors.email.message}</span>}

      <input
        {...register('password')}
        type='password'
        placeholder='Your password...'
      />
      {errors.password && <span>{errors.password.message}</span>}

      <button>Send</button>
    </form>
  );
};

export default LoginForm;
