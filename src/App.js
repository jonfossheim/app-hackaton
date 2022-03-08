import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Login from './pages/Login';
import NavBar from './components/nav/NavBar';
import { AuthProvider } from './context/AuthContext';

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
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
};

export default App;
