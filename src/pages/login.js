import  { useState,useEffect,useRef } from 'react';
import {Link,Navigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';
const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    

    const errRef = useRef();
    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    //handling login and logout buttons
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await axios.post(`${process.env.REACT_APP_PATH_URL}/login`, {
            username: username,
            password: password,
          },{ withCredentials: true });
          //console.log(JSON.stringify(response?.data));
          setUsername('');
          setPassword('');
          //setIsLoggedIn(true);
          props.setloginstatus(true);
          props.handleLogin(response.data);
          //localStorage.setItem('isLoggedIn', true); // Update login status in local storage
        } catch (err) {
          if (!err?.response) {
            setErrMsg('No Server Response');
          } else if (err.response?.status === 400) {
            setErrMsg('Missing Username or Password');
          } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
          } else {
            setErrMsg('Login Failed');
          }
          errRef.current.focus();
        }};
        const handleLogout = async () => {
            try {
              await axios.get(`${process.env.REACT_APP_PATH_URL}/logout`, { withCredentials: true });
              //setIsLoggedIn(false);
              props.setloginstatus(false);
              //localStorage.setItem('isLoggedIn', false); // Update login status in local storage
            } catch (err) {
              console.log('Error logging out:', err);
            }
        };

  
    return (
      <>
      {props.isLoggedIn
      ?
      (<section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                    {/* <Link to={"/"}>Home</Link> */}
                    <Navigate to='/' />
                    </p><br />
                    <button onClick={handleLogout}>Logout</button>
                </section>)
        :
        (<section>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <form onSubmit={handleSubmit}>
          <h1 className="text-center">Login</h1>
          <div className="form-group">
            <label for="username">Email:</label><br />
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" />
          </div>
          <div className="form-group">
            <label for="password">Password:</label><br />
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
          <p>
          Not registered?<br />
                        
          <Link to="/register" className="btn2 btn-secondary">
            Register
          </Link>
                            {/* <a href="#">Sign In</a> */}
           </p>
          
        </form>
        </section>)}
      </>
    );
  };
  
  export default Login;