import StyledLink from './StyledLink';
const styles = {
  display: 'flex',
  flexDirection: 'row',
  listStyleType: 'none',
  margin: 0,
  padding: 0,
};

const NavBar = () => {
  return (
    <ul style={styles}>
      <li>
        <StyledLink to={'/'}>Home</StyledLink>
      </li>
      <li>
        <StyledLink to={'/login'}>Login</StyledLink>
      </li>
      <li>
        <StyledLink to={'/admin'}>Admin</StyledLink>
      </li>
    </ul>
  );
};

export default NavBar;
