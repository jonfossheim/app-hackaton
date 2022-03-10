import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Login from './pages/Login';
import NavBar from './components/nav/NavBar';
import { AuthProvider } from './context/AuthContext';
import Booking from './pages/Booking';

const App = () => {
  return (
    <>
      <AuthProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route index element={<Home />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/login' element={<Login />} />
            <Route path='/booking/:id' element={<Booking />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
};

export default App;
