// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from '../api/axios';
// import { setTokens } from '../utils/auth';

// export default function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('token/', { username, password });
//       setTokens(res.data.access, res.data.refresh);
//       navigate('/');
//     } catch (err) {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input type="text" placeholder="Username" className="form-control mb-2" value={username} onChange={e => setUsername(e.target.value)} />
//         <input type="password" placeholder="Password" className="form-control mb-2" value={password} onChange={e => setPassword(e.target.value)} />
//         <button className="btn btn-primary btn-block">Login</button>
//       </form>
//       <p className="mt-2">New here? <Link to="/register">Register</Link></p>
//     </div>
//   );
// }



import React, { useState } from 'react';
import api from '../api';
import { saveToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('token/', { username, password });
      saveToken(response.data.access);
      navigate('/todo');
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
