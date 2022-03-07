import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Login from './pages/Login';
import NavBar from './components/nav/NavBar';

const App = () => {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route index element={<Home />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
