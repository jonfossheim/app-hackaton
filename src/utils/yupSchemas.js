import * as yup from 'yup';

export const userLoginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Please enter an email address')
    .email('Please enter a valid email address'),
  password: yup.string().required('Please enter your password'),
});
