import { createContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getFromLocalstorage } from '../utils/helpers';

const AuthContext = createContext([null, () => {}]);

export const AuthProvider = (props) => {
  const [auth, setAuth] = useLocalStorage('jwt', null);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
