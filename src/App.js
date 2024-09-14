import './App.css';
import  { useState,useEffect } from 'react';
import { BrowserRouter,Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/login'
import Home from './pages/home'
import Register from './pages/register'
import axios from 'axios';
import ClassPage from './pages/classdetail';
import ClassPageowned from './pages/classowned';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  console.log(process.env.REACT_APP_PATH_URL);
  const setloginstatus =(status) =>{
    setIsLoggedIn(status);
    if(status===false){
      setUser(null);
    }
  }
  useEffect(() => {
    // Check if the user is logged in on component mount
    checkLoggedInStatus();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData); // Update user state with logged-in user details
  };

  const checkLoggedInStatus = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_PATH_URL}/auth`, { withCredentials: true });
      setIsLoggedIn(response.data.isLoggedIn);
      setUser(response.data.user); // Store user details
    } catch (error) {
      console.log(error);
    }
  };
  
 
  

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path='/c/:id'  element={isLoggedIn ?<ClassPage userdata={user} setloginstatus={setloginstatus}/>:<Navigate to='/login' />}/>
        <Route path='/c/o/:id'  element={isLoggedIn ?<ClassPageowned userdata={user} setloginstatus={setloginstatus}/>:<Navigate to='/login' />}/>
        <Route exact path="/login" element={<Login setloginstatus={setloginstatus} isLoggedIn={isLoggedIn} handleLogin={handleLogin}/>}/>
        <Route path='/register' element={<Register />} />
        <Route path='/' element={isLoggedIn ?<Home userdata={user} setloginstatus={setloginstatus}/> :<Navigate to='/login' />} />
      
        
      
        
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
