import React from 'react';
import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeaderComponent from './components/Header';
import Dashbroad from './pages/dashbroad';
import Login from './pages/login';
import Register from './pages/Register';

function App() {
  return (
    <>
    <Router>
      <div className="App">
        <HeaderComponent/>
       <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashbroad />} />
        <Route
        path="*"
        element={<Navigate to="/login" replace />}
       />
       </Routes>
      </div>
    </Router>
    <ToastContainer/>
    </>
  );
}

export default App;
