import StyledLink from './StyledLink';
import AuthContext from '../../context/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  display: 'flex',
  flexDirection: 'row',
  listStyleType: 'none',
  margin: 0,
  padding: 0,
};

const NavBar = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    setAuth(null);
    navigate('/login');
  };
  return (
    <ul style={styles}>
      <li>
        <StyledLink to={'/'}>Home</StyledLink>
      </li>

      <li>
        <StyledLink to={'/admin'}>Admin</StyledLink>
      </li>

      <li>
        {!auth ? (
          <StyledLink to={'/login'}>Login</StyledLink>
        ) : (
          <button className='defaultBtn' onClick={handleLogout}>
            Logout
          </button>
        )}
      </li>
    </ul>
  );
};

export default NavBar;
